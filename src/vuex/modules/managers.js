

const state = {
  manager: null,
  managers: null,
  current_manager: null,
};

const getters = {};

const mutations = {};

const actions = {
  addManager({rootState},manager) {
    if(!manager) return;
    rootState.refs.bmanagers.child(manager).set({void_code: manager, stores: []});
  },
  deleteManager({rootState},manager) {
    if(!manager) return;
    rootState.refs.bmanagers.child(manager['.key']).remove();
  },
  updateManager({rootState},manager) {
    if(!manager) return;
    rootState.refs.bmanagers.child(manager['.key']).update(manager);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
