const state = {

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
};

const mutations = {

};

const actions = {
  addStore({getters,dispatch},store) {
    if(!store) return;
    dispatch('newObject',store);
    getters.refStores.push(getters.getNewObject);
  },
  deleteStore({getters,dispatch},store) {
    if(!store) return;
    console.log(store);
    getters.refStores.child(store['.key']).remove();
  },
  updateStore({getters,dispatch,commit},store) {
    if(!store) return;
    dispatch('updatedObject',store);
    getters.refStores.child(store['.key']).update(getters.getUpdatedObject);
  },

};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
