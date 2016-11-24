import types from '../types'

const state = {
  users: null,
  user: null,
  current_user: null,
};

const getters = {};

const mutations = {};

const actions = {
  addUser({rootState},user) {
    if(!user) return;
    rootState.refs.users.push(user);
  },
  deleteUser({rootState},user) {
    if(!user) return;
    rootState.refs.users.child(user['.key']).remove();
  },
  updateUser({rootState},user) {
    if(!user) return;
    rootState.refs.users.child(user['.key']).update(user);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}

