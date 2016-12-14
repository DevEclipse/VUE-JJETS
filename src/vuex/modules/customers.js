const state = {
  cartItems: {},
  storedCustomer: {
    balance: 0,
  },
};

const getters = {
  currentCustomer(state, getters) {
    if (!getters.routeParams) return;
    return _.find(getters.allCustomers, ['username', getters.routeParams.username]);
  },
  storedCartItems(state) {
    return state.cartItems;
  },
  storedCustomer(state) {
    if(!state.storedCustomer) return;
    return state.storedCustomer;
  },
};

const mutations = {
  ['ADD_CART_ITEM'](state, storeItem) {
    console.log(storeItem);
    if(!state.cartItems[storeItem['.key']]) {
      state.cartItems[storeItem['.key']] = {
        quantity: 1,
      };
    }
  },
};

const actions = {
  checkOutCart({getters}) {

  },
  addItemToCart({commit}, value) {
    commit('ADD_CART_ITEM', value);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
