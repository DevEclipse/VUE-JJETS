
const state = {
  storedEmployee: {
    manager: '',
  },
};

const getters = {

  currentEmployee(state,getters) {
    if(!getters.routeParams) return;
    return _.find(getters.allEmployees,['username',getters.routeParams.username]);
  },
  currentEmployeeManagerStores(state,getters) {
    if(!getters.currentEmployee) return;
    return _.filter(getters.allStores,['manager',getters.currentEmployee.manager]);
  },
  currentEmployeeManagerStoresTransactions(state,getters) {
    if(!getters.currentEmployeeManagerStores.length) return;
    let transactions = [];
    _.forEach(getters.currentEmployeeManagerStores,store => {
      transactions.push(_.filter(getters.allTransactions, ['store',store['.key']]));
    });
    return _.flatten(transactions);
  },
  currentEmployeeTransactions(state,getters) {
    if(!getters.currentEmployee) return;
    return _.filter(getters.allTransactions,['employee',getters.currentEmployee['username']])
  },
  storedEmployee(state) {
    if(!state.storedEmployee) return;
    return state.storedEmployee;
  },
};

const mutations = {};

const actions = {
};

export default {
  state,
  getters,
  mutations,
  actions
}
