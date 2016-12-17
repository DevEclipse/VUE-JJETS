const state = {
  storedStore: null,
};

const getters = {
  storedStore(state) {
    if (!state.storedStore) return;
    return state.storedStore;
  },
  storedStoreStocks(state, getters) {
    if (!getters.storedStore) return;
    return _.filter(getters.allStocks, ['store', getters.storedStore['.key']]);
  },
  storedStoreStocksItems(state, getters) {
    if (!getters.storedStoreStocks) return;
    return _.map(getters.storedStoreStocks, stock => {
      let item = _.find(getters.allItems, ['.key', stock.item]);
      return {stock, item};
    })
  },
  storedStoreTransactions(state, getters) {
    if (!getters.storedStore) return;
    return _.filter(getters.allTransactions, ['store', getters.storedStore['.key']]);
  },
  currentStore(state, getters) {
    if (!getters.routeParams) return;
    return _.find(getters.allStores, ['.key', getters.routeParams.store]);
  },
  currentStoreStocks(state, getters) {
    if (!getters.currentStore) return;
    return _.filter(getters.allStocks, ['store', getters.currentStore['.key']]);
  },
  currentStoreStocksItems(state, getters) {
    if (!getters.currentStoreStocks) return;
    let item;
    return _.map(getters.currentStoreStocks, stock => {
      item = _.find(getters.allItems, ['.key', stock.item]);
      return {stock, item, store: getters.currentStore};
    })
  },
  currentStoreTransactions(state, getters) {
    if (!getters.currentStore) return;
    return _.filter(getters.allTransactions, ['store', getters.currentStore['.key']]);
  },
};

const mutations = {
  ['STORE_STOCK'](state, store) {
    state.storedStore = store;
  }
};

const actions = {
  storeStore({commit, getters}, store) {
    commit('STORE_STOCK', _.clone(store) || {
        manager: getters.authManager.username,
        name: '',
        image_url: '',
        description: '',
        tax_rate: 0.12,
        discount_rate: 0,
        location: '',
      });
  },
  mergeStoreStocks({getters, dispatch}, {stocks, mergeStore}) {
    let mergeStocks = _.filter(getters.allStocks, ['store', mergeStore['.key']]);
    let storeStock;
    _.forEach(stocks, stock => {
      storeStock = _.find(mergeStocks, ['item', stock.item]);
      if (storeStock) {
        storeStock.quantity += stock.quantity;
        dispatch('updateStock', storeStock);
        dispatch('deleteStock', stock);
      } else {
        stock.store = mergeStore['.key'];
        dispatch('updateStock', stock);
      }
    });

  },
  moveStockToStore({dispatch, getters}, {stock, store,quantity}) {
    let storeStocks, storeStock;
    storeStocks = _.filter(getters.allStocks, ['store', store['.key']]);
    if (storeStocks.length) {
      storeStock = _.find(storeStocks, ['item', stock.item]);

      if (storeStock) {
        storeStock.quantity += quantity;
        dispatch('updateStock', storeStock);
      } else {
        let clonedStock = _.clone(stock);
        clonedStock.quantity = quantity;
        clonedStock.store = store['.key'];
        dispatch('addStock', clonedStock);
      }


      stock.quantity -= quantity;
      if(stock.quantity <= 0) {
        dispatch('deleteStock', stock);
      } else {
        dispatch('updateStock', stock);
      }
    } else {
      if(stock.quantity == quantity) {
        stock.store = store['.key'];
        dispatch('updateStock', stock);

      } else {
        let clonedStock = _.clone(stock);
        clonedStock.quantity = quantity;
        clonedStock.store = store['.key'];
        dispatch('addStock', clonedStock);
        stock.quantity -= quantity;
        dispatch('updateStock', stock);
      }
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions
}
