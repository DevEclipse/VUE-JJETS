import firebase from 'firebase'

const state = {};

const getters = {
  currentUser(state, getters, rootState) {
    return _.find(rootState.busers, ['username', rootState.route.params.username])
  }
};

const mutations = {};

const actions = {
  addUser({
    rootState
  }, user) {
    if (!user) return;
    let profiles = {
      ['manager']: false,
      ['employee']: false,
      ['customer']: false
    }
    user['profiles'] = profiles;
    user['created_date'] = firebase.database.ServerValue.TIMESTAMP;
    user['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.busers.child(user.username).set(user);
  },
  addProfile({
    rootState,
    dispatch
  }, {
    user,
    profile
  }) {
    if (!user) return;
    switch (profile) {
      case 'manager':
        dispatch('addManager', user.username);
        break;
      case 'employee':
        dispatch('addEmployee', user.username);
        break;
      case 'customer':
        dispatch('addCustomer', user.username);
        break;
    }
    rootState.refs.busers.child(user['.key']).child('profiles').update({
      [profile]: true
    });
  },
  deleteUser({
    rootState
  }, user) {
    if (!user) return;
    rootState.refs.busers.child(user['.key']).remove();
  },
  updateUser({
    rootState
  }, user) {
    if (!user) return;
    user['updated_date'] = firebase.database.ServerValue.TIMESTAMP;
    rootState.refs.busers.child(user['.key']).update(user);
  },

};
//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions
}
