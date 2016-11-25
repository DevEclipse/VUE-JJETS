const state = {};

const getters = {};

const mutations = {};

const actions = {
  addCustomer({rootState},customer) {
    if(!customer) return;
    rootState.refs.bcustomers.child(customer).set({balance: 0});
  },
  deleteCustomer({rootState},customer) {
    if(!customer) return;
    rootState.refs.bcustomers.child(customer['.key']).remove();
  },
  updateCustomer({rootState},customer) {
    if(!customer) return;
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
