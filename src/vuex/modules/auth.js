const state = {
  uid: null,
  auth: null,
};

const getters = {
  authUID(state) {
    return state.uid;
  },
  authUser(state,getters) {
    if(!getters.authUID) return;
    return state.auth =  _.find(getters.allUsers,['uid',getters.authUID]);;
  },
  authManager(state,getters) {
    if(!getters.authUser) return;
    return _.find(getters.allManagers,['username',getters.authUser.username])
  },
  authManagerStores(state, getters) {
    if(!getters.authManager) return;
    return _.filter(getters.allStores, ['manager', getters.authManager['username']]);
  },
  authManagerItems(state, getters) {
    if(!getters.authManager) return;
    return _.filter(getters.allItems, ['created_by', getters.authManager['username']]);
  },
  authEmployee(state,getters) {
    if(!getters.authUser) return;
    return _.find(getters.allEmployees,['username',getters.authUser.username])
  },
  authEmployeeStores(state, getters) {
    if(!getters.authEmployee) return;
    return _.filter(getters.allStores, ['manager', getters.authEmployee.manager]);
  },
  authCustomer(state,getters) {
    if(!getters.authUser) return;
    return _.find(getters.allCustomers,['username',getters.authUser.username])
  },
  sameUser(state,getters) {
    if(!getters.authUser) return;
    if(!getters.currentUser) return;
    return getters.authUser.username == getters.currentUser.username;
  },
  sameEmployeeManagerStore(state,getters) {
    if(!getters.authEmployee) return;
    if(!getters.currentStore) return;
    return getters.authEmployee.manager == getters.currentStore.manager;
  },
  sameManagerStore(state,getters) {
    if(!getters.authManager) return;
    if(!getters.currentStore) return;
    return getters.authManager.username == getters.currentStore.manager;

  }
};

const mutations = {
  ['SET_UID'](state, uid) {
    state.uid = uid;
  },
  ['SET_AUTH'](state,auth) {
    state.auth = auth;
  },
};

const actions = {
  setAuth({commit,getters}) {
    commit('SET_AUTH',_.find(getters.allUsers,['uid',getters.authUID]));
  },
  setUID({commit},uid) {
    commit('SET_UID',uid);
  },
  setAuthUserStatus({getters,dispatch},status) {
    // let user = getters.authUser;
    // if(user) {
    //   user.status = status;
    //   dispatch('updateUser',user);
    // }
  }
};

//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions,
}
