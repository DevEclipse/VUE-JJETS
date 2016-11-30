import firebase from 'firebase'

const state = {};

const getters = {

  currentEmployee(state,getters) {
    return _.find(getters.allEmployees,['.key',getters.currentUser.username]);
  },
  currentEmployeeManagerStores(state,getters,rootState) {
    return _.filter(getters.allStores,['manager',getters.currentEmployee.manager]);
  },
};

const mutations = {};

const actions = {
  addEmployee({getters},employee) {
    if(!employee) return;
    getters.refEmployees.child(employee).set({
      manager: employee,
      created_date: getters.serverTime,
      updated_date: getters.serverTime
    });
  },
  applyToStore({getters},employee) {
    if(!employee) return;
  },
  deleteEmployee({getters},employee) {
    if(!employee) return;
    getters.refEmployees.child(employee['.key']).remove();
  },
  updateEmployee({getters},employee) {
    if(!employee) return;
    employee['updated_date'] = getters.serverTime;
    getters.refEmployees.child(employee['.key']).update(employee);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
