import firebase from 'firebase'

const state = {};

const getters = {
  currentItem(state,getters) {
    if(!getters.allItems) return;
    return _.find(getters.allItems,['.key',getters.routeParams.item]);
  },
};

const mutations = {};

const actions = {
  addItem({getters,dispatch},item) {
    if(!item) return;
    dispatch('newObject',item);
    getters.refItems.child(item.name.replace(/\s/g, "").toLowerCase()).set(getters.getNewObject);
  },
  deleteItem({getters},item) {
    if(!item) return;
    getters.refItems.child(item['.key']).remove();
  },
  updateItem({getters,dispatch},item) {
    if(!item) return;
    dispatch('updatedObject',item);
    getters.refItems.child(item['.key']).update(getters.getUpdatedObject);
  },
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
