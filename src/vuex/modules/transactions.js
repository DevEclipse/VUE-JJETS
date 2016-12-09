
const state = {};
const getters = {
  currentTransaction(state,getters) {
    if(!getters.routeParams) return;
    return _.find(getters.allTransactions,['.key',getters.routeParams.transaction]);
  },
  currentTransactionStore(state,getters) {
    if(!getters.currentTransaction) return;
    return _.find(getters.allStores,['.key',getters.currentTransaction.store]);
  },
  currentTransactionStocks(state,getters) {
    if(!getters.currentTransactionStore) return;
    return _.filter(getters.allStocks,['store',getters.currentTransactionStore['.key']]);
  },
};
const mutations = {};
const actions = {
  addTransaction({getters,dispatch},transaction) {
    if(!transaction) return;
    dispatch('newObject',transaction);
    let newTransaction = getters.refTransactions.push(getters.getNewObject);
    return newTransaction.key;
  },
  deleteTransaction({getters},transaction) {
    if(!transaction) return;
    getters.refTransactions.child(transaction['.key']).remove();
  },
  updateTransaction({getters,dispatch},transaction) {
    if(!transaction) return;
    dispatch('updatedObject',transaction);
    getters.refTransactions.child(transaction['.key']).update(getters.getUpdatedObject);
  },
};
export default {
  state,
  getters,
  mutations,
  actions
}
