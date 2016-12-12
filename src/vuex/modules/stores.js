const state = {
  storedStore: null,
};

const getters = {
  currentStore(state, getters) {
    if (!getters.routeParams.store) return null;
    return _.find(getters.allStores, ['.key', getters.routeParams.store]);
  },
  currentStoreTransactions(state, getters) {
    if (!getters.currentStore) return;
    return _.filter(getters.allTransactions, ['store', getters.currentStore['.key']]);
  },
  storedStore(state) {
    if (!state.storedStore) return;
    return state.storedStore;
  },
};

const mutations = {
  ['STORE_STOCK'](state, store) {
    state.storedStore = store;
  }
};

const actions = {
  storeStore({commit, getters}, store) {
    commit('STORE_STOCK', _.clone(store) || {
        manager: getters.authManager.username,
        name: '',
        image_url: '',
        description: '',
        tax_rate: '',
        discount_rate: '',
        location: '',
        rating: 0,
      });
  },
};
export default {
  state,
  getters,
  mutations,
  actions
}
