import firebase from 'firebase'

const state = {};

const getters = {

  currentEmployee(state,getters) {
    if(!getters.routeParams) return;
    return _.find(getters.allEmployees,['.key',getters.routeParams.employee]);
  },
  currentEmployeeManagerStores(state,getters) {
    if(!getters.currentEmployee) return;
    return _.filter(getters.allStores,['manager',getters.currentEmployee.manager]);
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
  deleteEmployee({getters},employee) {
    if(!employee) return;
    getters.refEmployees.child(employee['.key']).remove();
  },
  updateEmployee({getters,dispatch},employee) {
    if(!employee) return;
    dispatch('updatedObject',employee);
    getters.refEmployees.child(employee['.key']).update(getters.getUpdatedObject);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
