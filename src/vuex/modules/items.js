import firebase from 'firebase'

const state = {};

const getters = {
  currentItem(state,getters) {
    if(!getters.allItems) return;
    return _.find(getters.allItems,['.key',getters.routeParams.item]);
  },
  currentItemStocks(state,getters) {
    if(!getters.currentItem) return;
      return _.filter(getters.allStocks,['item',getters.currentItem['.key']]);
  }
};

const mutations = {};

const actions = {
  addItem({getters,dispatch},item) {
    if(!item) return;
    dispatch('newObject',item);
    getters.refItems.push(getters.getNewObject);
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
