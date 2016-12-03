import firebase from 'firebase'

const state = {
  manager: null,
};

const getters = {
  currentManager(state,getters) {
    return _.find(getters.allManagers,['.key',getters.routeParams.manager])
  },
  currentManagerStores(state, getters) {
    return _.filter(getters.allStores, ['manager', getters.currentManager['.key']]);
  },
  currentManagerItems(state, getters) {
    return _.filter(getters.allItems, ['created_by', getters.currentManager['.key']]);
  },
  currentManagerEmployees(state, getters) {
    return _.filter(getters.allEmployees, ['.key', getters.currentManager['.key']]);
  },
  getManager(state,getters) {
    if(!state.manager) return;
    return _.find(getters.allManagers,['.key',state.manager['.key']])
  },
  managerStores(state, getters, rootState) {
    return _.filter(getters.allStores, ['manager', getters.getManager['.key']]);
  },
  managerItems(state, getters, rootState) {
    return _.filter(getters.allItems, ['created_by', getters.getManager['.key']]);
  },

};

const mutations = {
  ['SET_MANAGER'](state,manager) {
    state.manager = manager;
  }
};

const actions = {
  addManager({getters}, manager) {
    if (!manager) return;
    getters.refManagers.child(manager).set({
      void_code: manager,
      employees: {[manager]: true},
      created_date: getters.serverTime,
      updated_date: getters.serverTime
    });
  },
  addStoreToManager({getters},store) {
    getters.refManagers.child(store.manager).child('stores').update({[store['.key']]: true});
  },
  deleteStoreFromManager({getters},store) {
    getters.refManagers.child(store.manager).child('stores').child(store['.key']).remove();
  },
  addEmployeeToManager({getters},employee) {
    getters.refManagers.child(employee.manager).child('employees').update({[employee['.key']]: true});
  },
  deleteManager({getters}, manager) {
    if (!manager) return;
    getters.refManagers.child(manager['.key']).remove();
  },
  updateManager({getters}, manager) {
    if (!manager) return;
    manager['updated_date'] = getters.serverTime
    getters.refManagers.child(manager['.key']).update(manager);
  },

  async setManager({getters,commit},manager) {
    let result = await getters.allManagers;
    let found = await _.find(result,['.key',manager]);
    console.log(found);
    commit('SET_MANAGER',found);
  },
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
