import firebase from 'firebase'

const state = {};

const getters = {
  currentItem(state,getters) {
    if(!getters.allItems) return;
    return _.find(getters.allItems,['.key',getters.routeParams.item]);
  },
  currentItemStores(state,getters) {
    if(!getters.currentItem) return;
      return _.filter(getters.allStores,store => {
        return _.has(store.items,getters.currentItem['.key'])
      })
  }
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

export default {
  state,
  getters,
  mutations,
  actions
}
