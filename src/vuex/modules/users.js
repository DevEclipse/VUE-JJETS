
const state = {};

const getters = {

  currentUser(state, getters) {
    return _.find(getters.allUsers, ['username', getters.routeParams.username])
  },
};

const mutations = {};

const actions = {
  addUser({getters,dispatch}, user) {
    if (!user) return;
    user['profiles'] = {
      ['manager']: false,
      ['employee']: false,
      ['customer']: false
    };
    user['status'] = "Online";
    dispatch('newObject',user);
    getters.refUsers.child(user.username.replace(/\s/g, "").toLowerCase()).set(getters.getNewObject);
  },
  addProfile({dispatch},{user,profile}) {
    if(!user) return;
    switch(profile) {
      case 'manager':
        user.profiles.manager = user.username;
        dispatch('addManager',user.username);

        break;
      case 'employee':
        user.profiles.employee = user.username;
        dispatch('addEmployee',user.username);
        break;
      case 'customer':
        user.profiles.customer = user.username;
        dispatch('addCustomer',user.username);
        break;
    }
    dispatch('updateUser',user);
  },
  deleteUser({getters}, user) {
    if (!user) return;
    getters.refUsers.child(user['.key']).remove();
  },
  updateUser({getters,dispatch}, user) {
    if (!user) return;
    dispatch('updatedObject',user);
    getters.refUsers.child(user['.key']).update(getters.getUpdatedObject);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
