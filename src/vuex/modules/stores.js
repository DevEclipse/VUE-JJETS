const state = {};

const getters = {};

const mutations = {};

const actions = {
  addStore({rootState},store) {
    if(!store) return;
    console.log(store);
    rootState.refs.stores.push(store);
  },
  deleteStore({rootState},store) {
    if(!store) return;
    rootState.refs.stores.child(store['.key']).remove();
  },
  updateStore({rootState},store) {
    if(!store) return;
    rootState.refs.stores.child(store['.key']).update(store);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
