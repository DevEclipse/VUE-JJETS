import firebase from 'firebase'

const state = {};

const getters = {};

const mutations = {};

const actions = {
  addCustomer({rootState},customer) {
    if(!customer) return;
    rootState.refs.bcustomers.child(customer).set({
      balance: 0,
      created_date: firebase.database.ServerValue.TIMESTAMP,
      updated_date: firebase.database.ServerValue.TIMESTAMP
    });
  },
  deleteCustomer({rootState},customer) {
    if(!customer) return;
    rootState.refs.bcustomers.child(customer['.key']).remove();
  },
  updateCustomer({rootState},customer) {
    if(!customer) return;
    customer['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.bcustomers.child(customer['.key']).update(customer);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
