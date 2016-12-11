import firebase from 'firebase'

const state = {
  storedManager: {
    void_code: '',
  }
};

const getters = {
  currentManager(state,getters) {
    if(!getters.routeParams) return;
    return _.find(getters.allManagers,['.key',getters.routeParams.username])
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
  storedManager(state) {
    if(!state.storedManager) return;
    return state.storedManager;
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
  deleteManager({dispatch}, value) {
    dispatch('deleteRefObject',{ref: 'Manager', value});
  },
  updateManager({dispatch}, value) {
    dispatch('updateRefObject',{ref: 'Manager', value})
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
