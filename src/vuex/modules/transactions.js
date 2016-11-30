
const state = {};
const getters = {
  currentTransaction(state,getters) {
    return _.find(getters.allTransactions,['.key',getters.routeParams.transaction]);
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
