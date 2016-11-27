import firebase from 'firebase'

const state = {};

const getters = {
  currentManager(state,getters,rootState) {
    if(!rootState.route.params.username) return;
    return _.find(rootState.bmanagers,['.key',rootState.route.params.username])
  },
  currentManagerStores(state, getters, rootState) {
    return _.filter(rootState.bstores, ['manager', getters.currentManager['.key']]);
  },
  currentManagerItems(state, getters, rootState) {
    return _.filter(rootState.bitems, ['created_by', getters.currentManager['.key']]);
  },
  authManager(state,getters,rootState) {
    return _.find(rootState.bmanagers,['.key',rootState.auth.username])
  },
  authManagerStores(state, getters, rootState) {
    return _.filter(rootState.bstores, ['manager', getters.authManager['.key']]);
  },
  authManagerItems(state, getters, rootState) {
    return _.filter(rootState.bitems, ['created_by', getters.authManager['.key']]);
  },
};

const mutations = {};

const actions = {
  addManager({rootState}, manager) {
    if (!manager) return;
    rootState.refs.bmanagers.child(manager).set({
      void_code: manager,
      employees: {[manager]: true},
      created_date: firebase.database.ServerValue.TIMESTAMP,
      updated_date: firebase.database.ServerValue.TIMESTAMP
    });
  },
  addStoreToManager({rootState},store) {
    rootState.refs.bmanagers.child(store.manager).child('stores').update({[store['.key']]: true});
  },
  deleteStoreFromManager({rootState},store) {
    rootState.refs.bmanagers.child(store.manager).child('stores').child(store['.key']).remove();
  },
  addManagerEmployee({rootState},employee) {
    rootState.refs.bmanagers.child(employee.manager).child('employees').update({[employee['.key']]: true});
  },
  deleteManager({rootState}, manager) {
    if (!manager) return;
    rootState.refs.bmanagers.child(manager['.key']).remove();
  },
  updateManager({rootState}, manager) {
    if (!manager) return;
    manager['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
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
