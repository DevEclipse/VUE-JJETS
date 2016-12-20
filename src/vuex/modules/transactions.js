const state = {
  storedTransaction: null,
  storedTransactionProducts: [],
};
const getters = {
  storedTransaction(state) {
    if(!state.storedTransaction) return;
    return state.storedTransaction;
  },
  storedTransactionProducts(state) {
    if(!state.storedTransactionProducts) return;
    return state.storedTransactionProducts;
  },
};
const mutations = {
  ['RESET_EVERYTHING'](state,payload) {
    state.storedTransactionProducts = null;
  },
  ['STORE_TRANSACTION'](state,transaction) {
    state.storedTransaction = transaction;
  },
  ['ADD_PRODUCT_TO_TRANSACTION'](state,{stock,item}) {
    let productFound;
    if(state.storedTransactionProducts.length) {
      productFound = _.find(state.storedTransactionProducts, product => {
        return product.stock['.key'] == stock['.key'];
      });
      if(productFound) {
        productFound.product.quantity++;
        stock.quantity--;
      } else {
        stock.quantity--;
        productFound = {
          stock: stock,
          item: item,
          product: {
            stock: stock['.key'],
            quantity: 1
          }
        };
        state.storedTransactionProducts.push(productFound);
      }
    }  else {
      stock.quantity--;
      productFound = {
        stock: stock,
        item: item,
        product: {
          stock: stock['.key'],
          quantity: 1,
        }
      };
      state.storedTransactionProducts.push(productFound);
    }
  }
};
const actions = {
  storeTransaction({commit,getters},transaction) {
    let defaultData = {
      customer: '',
      amount: 0,
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      change: 0,
      status: 'Processed',
      store: '',
      store_name:  '',
      store_location: '',
      employee: '',
    };
    let data = _.clone(transaction) || defaultData;
    console.log(data);
    commit('STORE_TRANSACTION',data);
  },
  addProductToTransaction({commit},product) {
    commit('ADD_PRODUCT_TO_TRANSACTION',product);
  },
  async payTransaction({getters,commit,dispatch},{products,store,transaction}) {

    let processedStocks = [];
    let processedProducts = [];
    transaction.status = "Completed";
    transaction.employee = getters.authEmployee.username;
    await _.forEach(products, ({stock, product, item}) => {

      product.price = stock.retail_price;
      product.sub_total = _.round(product.price * product.quantity);

      if (stock.taxed) {
        product.tax = _.round(product.sub_total * store.tax_rate);
      }
      if (stock.discounted) {
        product.discount = _.round(product.sub_total * store.discount_rate,2);
      }
      product.name = item.name;
      product.image_url = item.image_url;

      product.total = (product.sub_total + (product.tax || 0)) - (product.discount || 0);

      processedStocks.push(stock);
      processedProducts.push(product)

    });

    await dispatch('addTransaction',transaction);

    let transactionKey = getters.getKey;

    await _.forEach(processedProducts,(product) => {
      product.transaction = transactionKey;
      dispatch('addProduct',product);
    });

    await _.forEach(processedStocks,(stock) => {
      stock.quantity = stock.quantity < 0 ? 0 : stock.quantity;
      dispatch('updateStock', stock);
    });
    console.log(products,store,transaction);
    dispatch('addAlert',{message: `Transaction Completed ${transactionKey}`});
  },
  resetEverything({dispatch}) {
    dispatch('RESET_EVERYTHING');
  }
};
export default {
  state,
  getters,
  mutations,
  actions
}

