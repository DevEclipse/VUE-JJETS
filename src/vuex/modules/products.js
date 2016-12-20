const state = {

};

const getters = {
  storedProducts(state,getters) {
    if(!getters.storedTransaction) return;
    return _.filter(getters.allProducts,['transaction',getters.storedTransaction['.key']]);
  },
};

const mutations = {

};

const actions = {
  storeProduct({commit,getters},item) {
    commit('STORE_ITEM',payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
