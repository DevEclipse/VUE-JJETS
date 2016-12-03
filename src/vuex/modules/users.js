import firebase from 'firebase'

const state = {};

const getters = {

  currentUser(state, getters) {
    return _.find(getters.allUsers, ['username', getters.routeParams.username])
  },
};

const mutations = {};

const actions = {
  addUser({getters}, user) {
    if (!user) return;
    user['profiles'] = {
      ['manager']: false,
      ['employee']: false,
      ['customer']: false
    };
    user['created_date'] = user['updated_date'] = getters.serverTime;
    user['status'] = "Online";
    getters.refUsers.child(user.username.replace(/\s/g, "").toLowerCase()).set(user);
  },
  addProfile({getters, dispatch}, {user, profile}) {
    console.log(user,profile)
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
    getters.refUsers.child(user['.key']).child('profiles').update({
      [profile]: user.username
    });
  },
  deleteUser({getters}, user) {
    if (!user) return;
    getters.refUsers.child(user['.key']).remove();
  },
  updateUser({getters}, user) {
    if (!user) return;
    user['updated_date'] = getters.serverTime;
    getters.refUsers.child(user['.key']).update(user);
  },
};

//called by this.$store.dispatch('addUser')
export default {
  state,
  getters,
  mutations,
  actions,
}
