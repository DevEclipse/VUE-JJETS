import firebase from 'firebase'
const state = {};

const getters = {
  currentStore(state,getters,rootState) {
    if(!rootState.route) return null;
    return _.find(rootState.bstores,['name',rootState.route.params.store]);
  }
};

const mutations = {};

const actions = {
  addStore({rootState,getters},store) {
    if(!store) return;
    let key = `${store.manager}_${store.name}`;
    store['created_date'] = firebase.database.ServerValue.TIMESTAMP;
    store['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.bstores.child(key).set(store);
    rootState.refs.bmanagers.child(store.manager).child('stores').update({[key]: true});
  },
  addStoreItem({rootState},storeItem) {
    if(!storeItem) return;
    storeItem['created_date'] = firebase.database.ServerValue.TIMESTAMP;
    storeItem['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.bstores.child(storeItem.store).child('items').set(storeItem);
    rootState.refs.bstores.child(storeItem.store).update({updated_date: firebase.database.ServerValue.TIMESTAMP});
  },
  updateStoreItem({rootState},storeItem) {
    if(!item) return;
    storeItem['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.bstores.child(storeItem['.key']).update(storeItem);
  },
  deleteStore({rootState},store) {
    if(!store) return;
    rootState.refs.bstores.child(store['.key']).remove();
    rootState.refs.bmanagers.child(store.manager).child('stores').child(store['.key']).remove();
  },
  updateStore({rootState},store) {
    if(!store) return;
    store['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
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
