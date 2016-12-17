const state = {
  storedTransaction: null,
  storedProducts: [],
};
const getters = {
  storedTransaction(state) {
    if(!state.storedTransaction) return;
    return state.storedTransaction;
  },
  storedProducts(state) {
    if(!state.storedProducts) return;
    state.storedProducts;
  }
  storedTransactionProducts(state,getters) {
    if(!getters.storedTransaction) return;
    return _.filter(getters.allProducts,['transaction',getters.storedTransaction.id]);
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
      employee: getters.authEmployee.username,
      updated_by: getters.authEmployee.username,
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

