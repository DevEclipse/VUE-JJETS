import firebase from 'firebase'

const state = {};

const getters = {

};

const mutations = {};

const actions = {
  addItem({getters},item) {
    if(!item) return;
    item['created_date'] = item['updated_date'] = getters.serverTime;
    getters.refItems.child(item.name.replace(/\s/g, "").toLowerCase()).set(item);
  },
  deleteItem({getters},item) {
    if(!item) return;
    getters.refItems.child(item['.key']).remove();
  },
  updateItem({getters},item) {
    if(!item) return;
    item['updated_date'] = getters.serverTime;
    getters.refItems.child(item['.key']).update(item);
  },
  addStoreToItem({getters},storeItem) {
    if(!storeItem) return;
    getters.refItems.child(storeItem.item).child('stores').update({[storeItem.store]: true});
  },
  deleteStoreFromItem({getters},storeItem) {
    if(!storeItem) return;
    getters.refItems.child(storeItem['.key']).child('stores').child(storeItem.store).remove();
  },
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
