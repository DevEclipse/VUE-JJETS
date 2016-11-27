import firebase from 'firebase'

const state = {};

const getters = {
  currentEmployee(state,getters,rootState) {
    return _.find(rootState.bemployees,['.key',rootState.route.params.username]);
  },
  currentEmployeeManagerStores(state,getters,rootState) {
    return _.filter(rootState.bstores,['manager',getters.currentEmployee.manager]);
  },
};

const mutations = {};

const actions = {
  addEmployee({rootState},employee) {
    if(!employee) return;
    rootState.refs.bemployees.child(employee).set({
      manager: employee,
      created_date: firebase.database.ServerValue.TIMESTAMP,
      updated_date: firebase.database.ServerValue.TIMESTAMP
    });
  },
  applyToStore({rootState},employee) {
    if(!employee) return;
  },
  deleteEmployee({rootState},employee) {
    if(!employee) return;
    rootState.refs.bemployees.child(employee['.key']).remove();
  },
  updateEmployee({rootState},employee) {
    if(!employee) return;
    employee['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.bemployees.child(employee['.key']).update(employee);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
