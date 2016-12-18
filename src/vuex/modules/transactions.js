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
  ['STORE_TRANSACTION'](state,transaction) {
    state.storedTransaction = transaction;
  },
  ['ADD_PRODUCT_TO_TRANSACTION'](state,{stock,item}) {
    let productFound;
    if(state.storedTransactionProducts.length) {
      productFound = _.find(state.storedTransactionProducts, product => {
        return product.stock['.key'] == stock['.key'];
      });
      stock.quantity--;
      productFound.product++;
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
      employee: getters.authEmployee.username,
    };
    let data = _.clone(transaction) || defaultData;
    commit('STORE_TRANSACTION',data);
  },
  addProductToTransaction({state},product) {
    commit('ADD_PRODUCT_TO_TRANSACTION',product);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
}

