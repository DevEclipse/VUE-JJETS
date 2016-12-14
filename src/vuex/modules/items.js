
const state = {
  storedItem: null,
};

const getters = {
  storedItem(state) {
    if(!state.storedItem) return;
    return state.storedItem;
  },
  storedItemStocks(state,getters) {
    if(!getters.storedItem) return;
    return _.filter(getters.allStocks,['item',getters.storedItem['.key']]);
  },

  storedItemStocksStores(state,getters) {
    if(!getters.storedItemStocks) return;
    return _.map(getters.storedItemStocks,stock => {
        let store = _.find(getters.allStores,['.key',stock.store]);
        return {stock,store};
    })
  },
};

const mutations = {
  ['STORE_ITEM'](state,item) {
    state.storedItem = item;
  },
};

const actions = {
  storeItem({commit,getters},item) {
    commit('STORE_ITEM',_.clone(item) || {
        name: '',
        cost_price: 0,
        image_url: '',
        description: '',
        created_by: getters.authManager.username,
        rating: 0,
        category: '',
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
