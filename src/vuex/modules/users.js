import VuexFire from 'vuexfire'

const state = {
  currentUser: null,
};

const getters = {
  getCurrentUser(state,getters,rootState) {
    if(!state.route.params.username) return state.currentUser;
    return state.currentUser = _.find(rootState.busers,['username',state.route.params.username])
  },
};

const mutations = {};

const actions = {
  addUser({rootState},user) {
    if(!user) return;
    rootState.refs.busers.push(user);
  },
  deleteUser({rootState},user) {
    if(!user) return;
    rootState.refs.busers.child(user['.key']).remove();
  },
  updateUser({rootState},user) {
    if(!user) return;
    rootState.refs.busers.child(user['.key']).update(user);
  },


};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
