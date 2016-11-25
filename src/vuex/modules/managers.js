const state = {};

const getters = {
  currentManager(state, getters, rootState) {
    return _.find(rootState.bmanagers, ['.key', rootState.route.params.manager])
  },
  currentManagerStores(state, getters, rootState) {
    return _.filter(rootState.bstores, ['manager', getters.currentManager['.key']]);
  },
  currentManagerItems(state, getters, rootState) {
    return _.filter(rootState.bitems, ['create_by', getters.currentManager['.key']]);
  },
};

const mutations = {
  SET_MANAGER(state, manager) {
    state.manager = manager;
  }
};

const actions = {
  addManager({
    rootState
  }, manager) {
    if (!manager) return;
    rootState.refs.bmanagers.child(manager).set({
      void_code: manager,
      stores: []
    });
  },
  deleteManager({
    rootState
  }, manager) {
    if (!manager) return;
    rootState.refs.bmanagers.child(manager['.key']).remove();
  },
  updateManager({
    rootState
  }, manager) {
    if (!manager) return;
    rootState.refs.bmanagers.child(manager['.key']).update(manager);
  },
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
