
const state = {};

const getters = {
  currentUser(state, getters) {
    return _.find(getters.allUsers, ['.key', getters.routeParams.username])
  },
};

const mutations = {};

const actions = {
  addUser({getters,dispatch}, user) {
    if (!user) return;
    user.username.replace(/\s/g, "").toLowerCase();
    dispatch('newObject',user);
    getters.refUsers.child(user.username).set(getters.getNewObject);
  },
  deleteUser({dispatch}, value) {
    dispatch('updateRefObject',{ref: 'User', value,action: 'storeUser'});
  },
  updateUser({dispatch}, value) {
    dispatch('deleteRefObject',{ref: 'User', value,action: 'storeUser'});
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
