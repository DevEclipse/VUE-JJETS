
const state = {};

const getters = {
  currentTag(state,getters) {
    return _.find(getters.allTags,['.key',getters.routeParams.tag]);
  }
};

const mutations = {};

const actions = {
  addTag({getters},{name,category,category_value,tagger}) {
    getters.refTags.child(name).child('categories').child(category).update({[category_value]: true});
    getters.refTags.child(name).child('taggers').update({[tagger]: true});
  },

};

export default {
  state,
  getters,
  mutations,
  actions,
}
