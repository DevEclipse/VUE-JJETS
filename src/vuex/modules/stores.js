
const state = {

};

const getters = {

  currentStore(state,getters) {
    if(!getters.routeParams.store) return null;
    return _.find(getters.allStores,['.key',getters.routeParams.store]);
  },
  currentStoreItems(state,getters) {
    return _.map(getters.currentStore.items,(value,key) => {
      return _.assign(value,_.find(getters.allItems,['.key',key]))
    })
  },
  currentStoreTransactions(state,getters) {
    return _.find(getters.allTransactions,['.key',getters.routeParams.transaction]);
  },

};

const mutations = {};

const actions = {
  addStore({getters,dispatch},store) {
    if(!store) return;
    let key = `${store.manager}_${store.name}`.replace(/\s/g, "").toLowerCase();
    store['created_date'] = store['updated_date'] = getters.serverTime;
    getters.refStores.child(key).set(store);
    dispatch('addStoreToManager',store);
  },
  deleteStore({getters,dispatch},store) {
    if(!store) return;
    console.log(store);
    getters.refStores.child(store['.key']).remove();
    dispatch('deleteStoreFromManager',store);
  },
  updateStore({getters},store) {
    if(!store) return;
    store['updated_date'] = getters.serverTime;
    getters.refStores.child(store['.key']).update(store);
  },
  addStoreItem({getters,dispatch},storeItem) {
    if(!storeItem) return;
    storeItem['created_date'] = storeItem['updated_date'] = getters.serverTime;
    getters.refStores.child(storeItem.store).child('items').child(storeItem.item).set(storeItem);
    getters.refStores.child(storeItem.store).update({updated_date: getters.serverTime});
    dispatch('addStoreToItem',storeItem);
  },
  deleteStoreItem({getters,dispatch},storeItem) {
    getters.refStores.child(storeItem.store).child('items').child(storeItem['.key']).remove();
    dispatch('deleteStoreFromItem',storeItem);
  },
  updateStoreItem({getters},storeItem) {
    if(!storeItem) return;
    storeItem['updated_date'] = getters.serverTime;
    getters.refStores.child(storeItem.store).child('items').child(storeItem.item).update(storeItem);
  },
  setCurrentStores({getters},stores) {

  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
