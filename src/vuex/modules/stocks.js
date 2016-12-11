const state = {
  storedStock: null,
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
};

const mutations = {
  ['STORE_STOCK'](state,item) {
    state.storedStock = item;
  },
};

const actions = {
  addStock({dispatch},value) {
    dispatch('addRefObject',{ref: 'Stock', value});
  },
  deleteStock({dispatch},value) {
    dispatch('deleteRefObject',{ref: 'Stock', value});
  },
  updateStock({dispatch},value) {
    dispatch('updateRefObject',{ref: 'Stock', value,action: 'storeStock'});
  },
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
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
