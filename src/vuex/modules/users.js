const state = {
  storedUser: null,
  foundUser: null,
  foundByEmail: null,
  foundByUsername: null,
};

const getters = {
  currentUser(state, getters) {
    return _.find(getters.allUsers, ['username', getters.routeParams.username])
  },
  storedUser(state) {
    if (!state.storedUser) return;
    return state.storedUser;
  },
  foundUser(state) {
    return state.foundUser;
  },
  foundByUsername(state) {
    return state.foundByUsername;
  },
  foundByEmail(state) {
    return state.foundByEmail;
  },
  storedUsernameValid(state, getters) {
    if (!getters.storedUser) return;
    let regEx = /^[A-Za-z][A-Za-z0-9 -]*$/;
    return regEx.test(getters.storedUser.username);
  },
  storedEmailValid(state, getters) {
    if (!getters.storedUser) return;
    let regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(getters.storedUser.email);
  },
};

const mutations = {
  ['STORE_USER'](state, user) {
    state.storedUser = user;
  },
  ['FOUND_USER'](state, user) {
    state.foundUser = user;
  },
  ['FOUND_USER_EMAIL'](state, user) {
    state.foundByEmail = user;
  },
  ['FOUND_USER_USERNAME'](state, user) {
    state.foundByUsername = user;
  },
  ['RESET_USER_STORE'](state) {
    state.storedUser = null;
    state.foundUser = null;
    state.foundByEmail = null;
    state.foundByUsername = null;
  }
};

const actions = {
  storeUser({commit}, user) {
    commit('STORE_USER', _.clone(user) || {
        username: '',
        email: '',
        name: '',
        password: '',
      });
  },
  resetUserStore({commit}) {
    commit('RESET_USER_STORE');
  },
  findUserByEmail({commit, getters}, value) {
    commit('FOUND_USER_EMAIL', _.find(getters.allUsers, ['email', value]));
  },
  findUserByUsername({commit, getters}, value) {
    commit('FOUND_USER_USERNAME', _.find(getters.allUsers, ['username', value]));
  },
  findUserByEmailOrUsername({commit, dispatch, getters}, value) {
    console.log(value);
    dispatch('findUserByEmail', value);
    dispatch('findUserByUsername', value);
    commit('FOUND_USER', getters.foundByUsername || getters.foundByEmail);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
}
