import firebase from 'firebase'

const state = {};

const getters = {};

const mutations = {};

const actions = {
  addEmployee({rootState},employee) {
    if(!employee) return;
    rootState.refs.bemployees.child(employee).set({
      assigned_store: 'unemployed_store',
      created_date: firebase.database.ServerValue.TIMESTAMP,
      updated_date: firebase.database.ServerValue.TIMESTAMP
    });
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
