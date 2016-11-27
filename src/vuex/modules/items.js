import firebase from 'firebase'

const state = {};

const getters = {};

const mutations = {};

const actions = {
  addItem({rootState},item) {
    if(!item) return;
    item['created_date'] = firebase.database.ServerValue.TIMESTAMP;
    item['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    console.log(item);
    rootState.refs.bitems.child(item.name.replace(/\s/g, "")).set(item);
  },
  deleteItem({rootState},item) {
    if(!item) return;
    rootState.refs.bitems.child(item['.key']).remove();
  },
  updateItem({rootState},item) {
    if(!item) return;
    item['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.bitems.child(item['.key']).update(item);
  }
};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
