
const state = {};

const getters = {
  currentUser(state, getters) {
    return _.find(getters.allUsers, ['username', getters.routeParams.username])
  },
};

const mutations = {};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
}
