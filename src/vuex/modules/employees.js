const state = {
  employee: null,
  employees: null,
  current_employee: null,
};

const getters = {};

const mutations = {};

const actions = {
  addEmployee({rootState},employee) {
    if(!employee) return;
    console.log(rootState.refs.bemployees)
    rootState.refs.bemployees.child(employee).set({assigned_store: 'unemployed_store'});
  },
  deleteEmployee({rootState},employee) {
    if(!employee) return;
    rootState.refs.bemployees.child(employee['.key']).remove();
  },
  updateEmployee({rootState},employee) {
    if(!employee) return;
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
