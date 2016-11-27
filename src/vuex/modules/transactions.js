
const state = {};
const getters = {
  currentTransaction(state,getters,rootState) {
    return _.find(rootState.btransactions,['.key',rootState.route.params.transaction]);
  }
};
const mutations = {};
const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
}
