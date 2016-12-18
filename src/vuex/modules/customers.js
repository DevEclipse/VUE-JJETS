const state = {
  cartStoresItems: [],
  storedCustomer: {
    balance: 0,
  },
};

const getters = {
  currentCustomer(state, getters) {
    if (!getters.routeParams) return;
    return _.find(getters.allCustomers, ['username', getters.routeParams.username]);
  },
  currentCustomerTransactions(state,getters) {
    if(!getters.currentCustomer) return;
    return _.filter(getters.allTransactions,['customer',getters.currentCustomer.username]);
  },
  storedCart(state) {
    return state.cartStoresItems;
  },
  storedCustomer(state) {
    if (!state.storedCustomer) return;
    return state.storedCustomer;
  },
};

const mutations = {
  ['CART_ADD'](state, {stock, store, item}) {

    let foundStore, foundCartItem;

    if (state.cartStoresItems.length) {
      foundStore = _.find(state.cartStoresItems, cartStore => {
        return cartStore.store['.key'] == store['.key'];
      });
    }
    console.log(foundStore);
    if (!foundStore) {
      foundStore = {
        store: store,
        cartItems: [],
      };
      state.cartStoresItems.push(foundStore);
    }

    if (foundStore.cartItems.length) {
      foundCartItem = _.find(foundStore.cartItems, cartStock => {
        return cartStock.stock['.key'] == stock['.key'];
      });
    }
    if (!foundCartItem) {
      foundCartItem = {
        stock: stock,
        item: item,
        product: {
          stock: stock['.key'],
          quantity: 1,
        }
      };
      foundCartItem.stock.quantity--;
      foundStore.cartItems.push(foundCartItem);
    } else {
      foundCartItem.stock.quantity--;
      foundCartItem.product.quantity++;
    }
  },
  ['CART_ITEM_REMOVE'](state, {storeIndex, stockIndex}) {
    let foundCartItem = state.cartStoresItems[storeIndex].cartItems[stockIndex];
    foundCartItem.stock.quantity += foundCartItem.product.quantity;
    state.cartStoresItems[storeIndex].cartItems.splice(stockIndex, 1);
    if (!state.cartStoresItems[storeIndex].cartItems.length) {
      state.cartStoresItems.splice(storeIndex, 1);
    }
  },
  ['CART_STORE_REMOVE'](state, store) {
    let storeIndex = _.findIndex(state.cartStoresItems, cartStore => {
      return cartStore.store['.key'] == store['.key'];
    });
    state.cartStoresItems.splice(storeIndex, 1);
  },
  ['CART_ITEM_INCREASE'](state, {storeIndex, stockIndex}) {
    let foundCartItem = state.cartStoresItems[storeIndex].cartItems[stockIndex];
    foundCartItem.stock.quantity--;
    foundCartItem.product.quantity++;
  },
  ['CART_ITEM_DECREASE'](state, {storeIndex, stockIndex}){
    let foundCartItem = state.cartStoresItems[storeIndex].cartItems[stockIndex];
    foundCartItem.stock.quantity++;
    foundCartItem.product.quantity--;
  },
  ['RESET_CART'](state){
    state.cartStoresItems = [];
  }
};

const actions = {
  async checkOutCart({getters,commit,dispatch}, {store, cartItems}) {

    let transaction = {
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      amount: 0,
      change: 0,
      store: store['.key'],
      store_name: store.name,
      product_count: 0,
      customer: getters.authCustomer.username,
      employee: '',
      status: 'Order',
      updated_by: '',
      manager: store.manager
    };

    let processedStocks = [];
    let processedProducts = [];

    await _.forEach(cartItems, ({stock, product, item}) => {

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

      transaction.subtotal += product.sub_total;
      transaction.total += product.total;
      transaction.tax += product.tax || 0;
      transaction.discount += product.discount || 0;
      transaction.product_count++;

      processedStocks.push(stock);
      processedProducts.push(product)

    });

    await dispatch('addTransaction', transaction);

    let transactionKey = getters.getKey;

    await _.forEach(processedProducts,(product) => {
      product.transaction = transactionKey;
      dispatch('addProduct',product);
    });

    await _.forEach(processedStocks,(stock) => {
      stock.quantity = stock.quantity < 0 ? 0 : stock.quantity;
      dispatch('updateStock', stock);
    });

    dispatch('addAlert',{message: `${store.name} cart items checked out with a total of ${transaction.total}`});
    commit('CART_STORE_REMOVE', store);
  },
  addToCart({commit,dispatch}, value) {
    commit('CART_ADD', value);
    dispatch('addAlert',{message: `Item ${value.item.name} added to ${value.store.name} cart`});
  },
  removeToCart({commit}, value) {
    commit('CART_REMOVE', value);
  },
  increaseCartItem({commit}, value) {
    commit('CART_ITEM_INCREASE', value);
  },
  decreaseCartItem({commit}, value) {
    commit('CART_ITEM_DECREASE', value);
  },
  removeCartItem({commit}, value) {
    commit('CART_ITEM_REMOVE', value);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
