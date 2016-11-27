import firebase from 'firebase'
const state = {};

const getters = {
  currentStore(state,getters,rootState) {
    if(!rootState.route.params.store) return null;
    return _.find(rootState.bstores,['.key',rootState.route.params.store]);
  },
  currentStoreItems(state,getters,rootState) {
    return _.map(getters.currentStore.items,(value,key) => {
      return _.assign(value,_.find(rootState.bitems,['.key',key]))
    })
  }
};

const mutations = {};

const actions = {
  addStore({rootState,getters},store) {
    if(!store) return;
    let key = `${store.manager}_${store.name}`.toLowerCase();
    store['created_date'] = firebase.database.ServerValue.TIMESTAMP;
    store['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.bstores.child(key).set(store);
    rootState.refs.bmanagers.child(store.manager).child('stores').update({[key]: true});

  },
  addStoreItem({rootState},storeItem) {
    if(!storeItem) return;
    console.log(storeItem);
    storeItem['created_date'] = firebase.database.ServerValue.TIMESTAMP;
    storeItem['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.bstores.child(storeItem.store).child('items').child(storeItem.item).set(storeItem);
    rootState.refs.bstores.child(storeItem.store).update({updated_date: firebase.database.ServerValue.TIMESTAMP});
    rootState.refs.bitems.child(storeItem.item).child('stores').update({[storeItem.store]: true});
  },
  deleteStoreItem({rootState},storeItem) {
    rootState.refs.bstores.child(storeItem.store).child('items').child(storeItem['.key']).remove();
    rootState.refs.bitems.child(storeItem['.key']).child('stores').child(storeItem.store).remove();
  },
  updateStoreItem({rootState},storeItem) {
    if(!item) return;
    storeItem['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.bstores.child(storeItem['.key']).child('items').update(storeItem);
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
