const state = {};

const getters = {};

const mutations = {};

const actions = {
  addStore({rootState},store) {
    if(!store) return;
    let key = rootState.refs.stores.push(store).key;
    rootState.refs.managers.child(store.manager).child('stores').update({[key]: true});
  },
  addStoreItem({rootState},item) {
    if(!item) return;
    let key = rootState.refs.stores.push(item).key;
  },
  deleteStore({rootState},store) {
    if(!store) return;
    rootState.refs.stores.child(store['.key']).remove();
    rootState.refs.managers.child(store.manager).child('stores').child(store['.key']).remove();
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
