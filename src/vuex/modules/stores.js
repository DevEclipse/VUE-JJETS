const state = {
  storedStore: null,
};

const getters = {
  currentStore(state,getters) {
    if(!getters.routeParams.store) return null;
    return _.find(getters.allStores,['.key',getters.routeParams.store]);
  },
  currentStoreTransactions(state,getters) {
    if(!getters.currentStore) return;
    return _.filter(getters.allTransactions,['store',getters.currentStore['.key']]);
  },
  storedStore(state) {
    if(!state.storedStore) return;
    return state.storedStore;
  },
};

const mutations = {

};

const actions = {
  addStore({dispatch},value) {
    dispatch('addRefObject',{ref: 'Store', value});
  },
  deleteStore({dispatch},value) {
    dispatch('deleteRefObject',{ref: 'Store', value});
  },
  updateStore({dispatch},value) {
    dispatch('updateRefObject',{ref: 'Store', value,action: 'storeStock'});
  },
};
export default {
  state,
  getters,
  mutations,
  actions
}
