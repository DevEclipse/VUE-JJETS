const state = {
  storedStock: null,
  foundStock: null,
};

const getters = {
  currentStocks(state,getters) {
    if(!getters.currentStore) return;
    return _.filter(getters.allStocks,['store',getters.currentStore['.key']]);
  },
  storedStock(state) {
    if(!state.storedStock) return;
    return state.storedStock;
  },
  storedStockItem(state,getters) {
    if(!getters.storedStock) return;
    return _.find(getters.allItems,['.key',getters.storedStock.item]);
  },
  foundStock(state) {
    if(!state.foundStock) return;
    return state.foundStock;
  }
};

const mutations = {
  ['STORE_STOCK'](state,item) {
    state.storedStock = item;
  },
};

const actions = {
  storeStock({commit,getters},stock) {
    commit('STORE_STOCK',_.clone(stock) || {
        item: '',
        retail_price: '',
        quantity: 0,
        store: getters.currentStore['.key'],
        taxed: true,
        discounted: false,
        returns: '',
        times_bought: '',
      });
  },
  findStock({commit,getters},key) {
    commit('STORE_FOUND_STOCK',_.find(getters.allStocks,['.key',key]));
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
