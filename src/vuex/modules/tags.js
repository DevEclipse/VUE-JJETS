
const state = {};

const getters = {
  currentTag(state,getters) {
    if(!getters.routeParams) return;
    return _.find(getters.allTags,['.key',getters.routeParams.tag]);
  }
};

const mutations = {};

const actions = {
  addTag({getters},tag) {
    getters.refTags.child(tag).set({
      created_at: getters.serverTime,
    });
  },
  removeTag({getters},tag) {
    getters.refTags.child(tag).remove();
  },
  updateTag({getters,dispatch},tag) {
    if(!tag) return;
    dispatch('updatedObject',tag);
    getters.refStores.child(tag['.key']).update(getters.getUpdatedObject);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
