const state = {};

const getters = {
  currentStore(state,getters,rootState) {
    if(!rootState.route) return null;
    return _.find(rootState.bstores,['name',rootState.route.params.store]);
  }
};

const mutations = {};

const actions = {
  addStore({rootState},store) {
    if(!store) return;
    let key = rootState.refs.bstores.push(store).key;
    rootState.refs.bmanagers.child(store.manager).child('stores').update({[key]: true});
  },
  addStoreItem({rootState},item) {
    if(!item) return;
    rootState.refs.bstores.child(item.store).child('items').set(item);
  },
  deleteStore({rootState},store) {
    if(!store) return;
    rootState.refs.bstores.child(store['.key']).remove();
    rootState.refs.bmanagers.child(store.manager).child('stores').child(store['.key']).remove();
  },
  updateStore({rootState},store) {
    if(!store) return;
    rootState.refs.bstores.child(store['.key']).update(store);
  },
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
