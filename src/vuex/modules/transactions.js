const state = {
  storedTransaction: null,
};
const getters = {
  currentTransaction(state, getters) {
    if (!getters.routeParams) return;
    return _.find(getters.allTransactions, ['.key', getters.routeParams.transaction]);
  },
  currentTransactionStore(state, getters) {
    if (!getters.currentTransaction) return;
    return _.find(getters.allStores, ['.key', getters.currentTransaction.store]);
  },
  currentTransactionStocks(state, getters) {
    if (!getters.currentTransactionStore) return;
    return _.filter(getters.allStocks, ['store', getters.currentTransactionStore['.key']]);
  },
  storedTransaction(state) {
    if(!state.storedTransaction) return;
    return state.storedTransaction;
  },
};
const mutations = {
  ['STORE_TRANSACTION'](state,transaction) {
    state.storedTransaction = transaction;
  },
};
const actions = {
  addTransaction({dispatch}, value) {
    console.log(value);
    dispatch('addRefObject',{ref: 'Transaction', value});
  },
  deleteTransaction({dispatch}, value) {
    dispatch('deleteRefObject',{ref: 'Transaction', value});
  },
  updateTransaction({dispatch}, value) {
    dispatch('updateRefObject',{ref: 'Transaction', value,action: 'storeTransaction'});
  },
  storeTransaction({commit,getters},transaction) {
    let defaultData = {
      customer: '',
      amount: 0,
      subtotal: 0,
      tax: 0,
      discount: 0,
      total: 0,
      change: 0,
      status: 'Processing',
      store: getters.currentStore['.key'],
      employee: getters.authEmployee['.key'],
      updated_by: getters.authEmployee['.key'],
    };
    let data = _.clone(transaction) || defaultData;
    commit('STORE_TRANSACTION',data);
  },
};
export default {
  state,
  getters,
  mutations,
  actions
}
