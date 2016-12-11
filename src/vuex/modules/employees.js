
const state = {
  storedEmployee: {
    manager: '',
  },
};

const getters = {

  currentEmployee(state,getters) {
    if(!getters.routeParams) return;
    return _.find(getters.allEmployees,['.key',getters.routeParams.username]);
  },
  currentEmployeeManagerStores(state,getters) {
    if(!getters.currentEmployee) return;
    return _.filter(getters.allStores,['manager',getters.currentEmployee.manager]);
  },
  currentEmployeeTransactions(state,getters) {
    if(!getters.currentEmployee) return;
    return _.filter(getters.allTransactions,['employee',getters.currentEmployee['.key']])
  },
  currentEmployeeManagerStoresTransactions(state,getters) {
    if(getters.currentEmployeeManagerStores.length) {
      return _.filter(getters.allTransactions,transaction => {
          _.forEach(getters.currentEmployeeManagerStores,store => {
            console.log(transaction.store == store['.key']);
            return transaction.store == store['.key'] && transaction.employee == '';
          })
      })
    }
  },
  storedEmployee(state) {
    if(!state.storedEmployee) return;
    return state.storedEmployee;
  },
};

const mutations = {};

const actions = {
  addEmployee({getters,dispatch},employee) {
    if(!employee) return;
    let newEmployee = {
      manager: employee,
    };
    dispatch('newObject',newEmployee);
    getters.refEmployees.child(employee).set(getters.getNewObject);
  },
  deleteEmployee({dispatch}, value) {
    dispatch('deleteRefObject',{ref: 'Employee', value});
  },
  updateEmployee({dispatch}, value) {
    dispatch('updateRefObject',{ref: 'Employee', value})
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
