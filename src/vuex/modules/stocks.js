const state = {
  storedStock: null,
};

const getters = {
  storedStock(state) {
    if(!state.storedStock) return;
    return state.storedStock;
  },
  storedStockItem(state,getters) {
    if(!getters.storedStock) return;
    return _.find(getters.allItems,['.key',getters.storedStock.item]);
  },
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
