const state = {};

const getters = {};

const mutations = {};

const actions = {
  addCustomer({getters,dispatch},customer) {
    if(!customer) return;
    let newCustomer = {
      balance: 0,
    };
    dispatch('newObject',newCustomer);
    getters.refCustomers.child(customer).set(getters.getNewObject);
  },
  deleteCustomer({getters},customer) {
    if(!customer) return;
    getters.refCustomers.child(customer['.key']).remove();
  },
  updateCustomer({getters,dispatch},customer) {
    if(!customer) return;
    dispatch('updatedObject',customer);
    getters.refCustomers.child(customer['.key']).update(getters.getUpdatedObject);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
