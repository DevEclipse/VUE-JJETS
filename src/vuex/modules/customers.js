const state = {
  cartItems: {},
  storedCustomer: {
    balance: 0,
  },
};

const getters = {
  currentCustomer(state, getters) {
    if (!getters.routeParams) return;
    return _.find(getters.allCustomers, ['.key', getters.routeParams.username]);
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
  addCustomer({getters, dispatch}, customer) {
    if (!customer) return;
    let newCustomer = {
      balance: 0,
    };
    dispatch('newObject', newCustomer);
    getters.refCustomers.child(customer).set(getters.getNewObject);
  },
  deleteCustomer({dispatch}, value) {
    dispatch('deleteRefObject',{ref: 'Customer', value});
  },
  updateCustomer({dispatch}, value) {
    dispatch('updateRefObject',{ref: 'Customer', value})
  },
  checkOutCart({getters}) {

  },
  addItemToCart({commit}, value) {
    commit('ADD_CART_ITEM', value);
  }
};

//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
