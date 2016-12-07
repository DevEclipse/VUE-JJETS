
const state = {};

const getters = {
  currentUser(state, getters) {
    return _.find(getters.allUsers, ['username', getters.routeParams.username])
  },
};

const mutations = {};

const actions = {
  addUser({getters,dispatch}, user) {
    if (!user) return;
    user['status'] = "Online";
    dispatch('newObject',user);
    getters.refUsers.child(user.username.replace(/\s/g, "").toLowerCase()).set(getters.getNewObject);
  },
  deleteUser({getters}, user) {
    if (!user) return;
    getters.refUsers.child(user['.key']).remove();
  },
  updateUser({getters,dispatch}, user) {
    if (!user) return;
    dispatch('updatedObject',user);
    getters.refUsers.child(user['.key']).update(getters.getUpdatedObject);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
