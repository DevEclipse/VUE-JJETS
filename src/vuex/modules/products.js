const state = {

};

const getters = {
};

const mutations = {

};

const actions = {
  storeProduct({commit,getters},item) {
    commit('STORE_ITEM',_.clone(item) || {
        name: '',
        cost_price: 0,
        image_url: '',
        description: '',
        created_by: getters.authManager.username,
        rating: 0,
        category: '',
        shared: false,
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions
}
