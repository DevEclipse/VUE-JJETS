
const state = {
  storedItem: null,
  foundItem: null,
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
  foundItem(state) {
    if(!state.foundItem) return;
    return state.foundItem;
  }
};

const mutations = {
  ['STORE_ITEM'](state,item) {
    state.storedItem = item;
  },
  ['STORE_FOUND_ITEM'](state,item) {
    state.foundItem = item;
  }
};

const actions = {
  storeItem({commit,getters},item) {
    commit('STORE_ITEM',_.clone(item) || {
        name: '',
        cost_price: 0,
        image_url: '',
        description: '',
        created_by: getters.authManager['username'],
        rating: 0,
        tags: ['item'],
      });
  },
  findItem({commit,getters},key) {
    commit('STORE_FOUND_ITEM',_.find(getters.allItems,['username',key]));
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
