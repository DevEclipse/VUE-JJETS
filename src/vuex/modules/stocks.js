const state = {

};

const getters = {
  currentStocks(state,getters) {
    if(!getters.currentStore) return;
    return _.filter(getters.allStocks,['store',getters.currentStore['.key']]);
  },
};

const mutations = {

};

const actions = {
  addStock({getters,dispatch},stock) {
    if(!stock) return;
    console.log(stock);
    dispatch('newObject',stock);
    getters.refStocks.push(getters.getNewObject);
  },
  deleteStock({getters,dispatch},store) {
    if(!store) return;
    console.log(store);
    getters.refStocks.child(stock['.key']).remove();
  },
  updateStock({getters,dispatch},stock) {
    if(!stock) return;
    dispatch('updatedObject',stock);
    getters.refStocks.child(stock['.key']).update(getters.getUpdatedObject);
  },

};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
