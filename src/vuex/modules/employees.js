const state = {
  employee: null,
  employees: null,
  current_employee: null,
};

const getters = {
  getEmployee(state,getters) {
    return _.find(state.employees,['user',state.route.params.employee])
  },
  getCurrentEmployee(state,getters) {
    return state.current_employee;
  }
};

const mutations = {};

const actions = {
  addManager({rootState},employee) {
    if(!employee) return;
    rootState.refs.employees.push(employee);
  },
  deleteManager({rootState},employee) {
    if(!employee) return;
    rootState.refs.employees.child(employee['.key']).remove();
  },
  updateManager({rootState},employee) {
    if(!employee) return;
    rootState.refs.employees.child(employee['.key']).update(employee);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
