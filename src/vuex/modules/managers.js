import firebase from 'firebase'

const state = {
  storedManager: {
    void_code: '',
  }
};

const getters = {
  currentManager(state,getters) {
    if(!getters.routeParams) return;
    return _.find(getters.allManagers,['username',getters.routeParams.username])
  },
  currentManagerStores(state, getters) {
    if(!getters.currentManager) return;
    return _.filter(getters.allStores, ['manager', getters.currentManager['username']]);
  },
  currentManagerItems(state, getters) {
    if(!getters.currentManager) return;
    return _.filter(getters.allItems, ['created_by', getters.currentManager['username']]);
  },
  currentManagerEmployees(state, getters) {
    if(!getters.currentManager) return;
    return _.filter(getters.allEmployees, ['manager', getters.currentManager['username']]);
  },
  storedManager(state) {
    if(!state.storedManager) return;
    return state.storedManager;
  },
};

const mutations = {

};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
}
