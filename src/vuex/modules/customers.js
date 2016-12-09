const state = {
  cart: {},
};

const getters = {
  currentCustomer(state, getters) {
    if (!getters.routeParams) return;
    return _.find(getters.allCustomers, ['.key', getters.routeParams.username]);
  },
  getCart(state) {
    return state.cart;
  }
};

const mutations = {
  ['ADD_STORE_ITEM_TO_CART'](state, storeItem) {
    if (!state.cart[storeItem.store]) {
      state.cart[storeItem.store] = {
        items: {},
      }
    }
      state.cart[storeItem.store].items[storeItem.item] = storeItem;
  },
  ['ADD_QUANTITY_TO_STORE_ITEM'](state,storeItem) {
    state.cart[storeItem.store].items[storeItem.item].quantity += storeItem.quantity;
  }
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
  deleteCustomer({getters}, customer) {
    if (!customer) return;
    getters.refCustomers.child(customer['.key']).remove();
  },
  updateCustomer({getters, dispatch}, customer) {
    if (!customer) return;
    dispatch('updatedObject', customer);
    getters.refCustomers.child(customer['.key']).update(getters.getUpdatedObject);
  },
  addItemToCart({commit,}, storeItem) {
    commit('ADD_STORE_ITEM_TO_CART', storeItem);
    if(getters.getCart[storeItem.store].items[storeItem.item])
    commit('ADD_QUANTITY_TO_STORE_ITEM',storeItem)
  }
};

//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
