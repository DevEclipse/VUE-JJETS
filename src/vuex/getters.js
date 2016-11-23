export default {
    currentStore: state => {
    return _.find(state.stores,['.key',state.route.params.store]);
  },
    managerStoreItems: (state,getters) => {
    if(getters.currentStore) {
      return _.map(getters.currentStore.items, (value, index) => {
        return _.assign(value, _.find(state.items, ['.key', index]));
      })
    }
    return state.items;
  },
    currentEmployee: (state,getters) => {
    return _.find(state.employees,['.key',getters.currentUser.username]);
  },
    currentTransaction: (state,getters) => {
    return _.find(state.transactions,['.key',state.route.params.transaction]);
  },
    employeeStore: (state,getters) => {
    return _.find(state.stores,['.key',getters.currentEmployee.assigned_store])
  },
    currentManager: (state,getters) => {
    return _.find(state.managers,['.key',getters.currentUser.username]);
  },
    managerStores: (state,getters) => {
    return _.filter(state.stores,['manager',getters.currentManager['.key']]);
  },
    chunkedBy3Stores: (state,getters) => {
    return _.chunk(getters.managerStores,3);
  },
    managerStoresCount: (state,getters) => {
    return getters.managerStores ? getters.managerStores.length : 0;
  },
    managerItems: (state,getters) => {
    return _.filter(state.stores,['manager',getters.currentManager['.key']]);
  },
    managerItemsCount: (state,getters) => {
    return getters.managerItems.length;
  },
    storeEmployees: (state,getters) => {
    return _.filter(state.stores,['manager',getters.currentManager['.key']]);
  },
    storeTransactions: (state,getters) => {
    return _.filter(state.transactions,['store',getters.currentStore['.key']])
  }
}
