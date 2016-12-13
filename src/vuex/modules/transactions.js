const state = {
  storedTransaction: null,
};
const getters = {
  currentTransaction(state, getters) {
    if(!getters.routeParams) return;
    return _.find(getters.allTransactions, ['.key', getters.routeParams.transaction]);
  },
  currentTransactionStore(state, getters) {
    if(!getters.currentTransaction) return;
    return _.find(getters.allStores, ['.key', getters.currentTransaction.store]);
  },
  currentTransactionStoreStocks(state, getters) {
    if (!getters.currentTransactionStore) return ;
    let stocks = _.filter(getters.allStocks, ['store', getters.currentTransactionStore['.key']]);
    return _.map(stocks, stock => {
      let item = _.find(getters.allItems,['.key',stock.item]);
      return {stock,item};
    });
  },
  currentTransactionItemStocks(state,getters) {
    if(!getters.currentTransaction) return;
    if(!getters.currentTransaction.items) return;
    if(!getters.currentTransactionStoreStocks.length) return ;
    return _.map(getters.currentTransaction.items, (transactionItem,key) => {
        let found = _.find(getters.currentTransactionStoreStocks,[`stock['.key']`,key]);
        return {transactionItem,...found,key};
    });
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
      store: getters.currentStore ? getters.currentStore['.key'] : '',
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

