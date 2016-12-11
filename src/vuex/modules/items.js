
const state = {
  storedItem: null,
};

const getters = {
  currentItem(state,getters) {
    if(!getters.allItems) return;
    return _.find(getters.allItems,['.key',getters.routeParams.item]);
  },
  currentItemStocks(state,getters) {
    if(!getters.currentItem) return;
      return _.filter(getters.allStocks,['item',getters.currentItem['.key']]);
  },
  storedItem(state) {
    if(!state.storedItem) return;
    return state.storedItem;
  },
  storedItemStocks(state,getters) {
    if(!getters.storedItem) return;
    return _.filter(getters.allStocks,['item',getters.storedItem['.key']]);
  },
};

const mutations = {
  ['STORE_ITEM'](state,item) {
    state.storedItem = item;
  },
};

const actions = {
  addItem({dispatch},value) {
    dispatch('addRefObject',{ref: 'Item', value});
  },
  deleteItem({dispatch},value) {
    dispatch('deleteRefObject',{ref: 'Item', value});
  },
  updateItem({dispatch},value) {
    dispatch('updateRefObject',{ref: 'Item', value,action: 'storeItem'});
  },
  storeItem({commit,getters},item) {
    commit('STORE_ITEM',_.clone(item) || {
        name: '',
        cost_price: 0,
        image_url: '',
        description: '',
        created_by: getters.authManager['.key'],
        rating: 0,
        tags: ['item'],
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
