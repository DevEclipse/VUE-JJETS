const state = {};

const getters = {};

const mutations = {};

const actions = {
  addCustomer({getters},customer) {
    if(!customer) return;
    getters.refCustomers.child(customer).set({
      balance: 0,
      created_date: getters.serverTime,
      updated_date: getters.serverTime
    });
  },
  deleteCustomer({getters},customer) {
    if(!customer) return;
    getters.refCustomers.child(customer['.key']).remove();
  },
  updateCustomer({getters},customer) {
    if(!customer) return;
    customer['updated_date'] = getters.serverTime;
    getters.refCustomers.child(customer['.key']).update(customer);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
