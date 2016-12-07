import firebase from 'firebase'

const state = {
};

const getters = {
  currentManager(state,getters) {
    if(!getters.routeParams.manager) return;
    return _.find(getters.allManagers,['.key',getters.routeParams.manager])
  },
  currentManagerStores(state, getters) {
    if(!getters.currentManager) return;
    return _.filter(getters.allStores, ['manager', getters.currentManager['.key']]);
  },
  currentManagerItems(state, getters) {
    if(!getters.currentManager) return;
    return _.filter(getters.allItems, ['created_by', getters.currentManager['.key']]);
  },
  currentManagerEmployees(state, getters) {
    if(!getters.currentManager) return;
    return _.filter(getters.allEmployees, ['.key', getters.currentManager['.key']]);
  },

};

const mutations = {

};

const actions = {
  addManager({getters,dispatch}, manager) {
    if (!manager) return;
    let newManager = {
      void_code: manager,
    };
    dispatch('newObject',newManager);
    getters.refManagers.child(manager).set(getters.getNewObject);
  },
  deleteManager({getters}, manager) {
    if (!manager) return;
    getters.refManagers.child(manager['.key']).remove();
  },
  updateManager({getters,dispatch}, manager) {
    if (!manager) return;
    dispatch('updatedObject',manager);
    getters.refManagers.child(manager['.key']).update(getters.getUpdatedObject);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
