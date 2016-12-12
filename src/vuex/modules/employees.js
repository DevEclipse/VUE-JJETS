
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
