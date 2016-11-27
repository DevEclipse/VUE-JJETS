import VuexFire from 'vuexfire'
import users from './modules/users'
import items from './modules/items'
import stores from './modules/stores'
import managers from './modules/managers'
import employees from './modules/employees'
import customers from './modules/customers'
import transactions from './modules/transactions'


export default {
  state: {
    refs: null,
    busers: null,
    bitems: null,
    bstores: null,
    bmanagers: null,
    bemployees: null,
    bcustomers: null,
    btransactions: null,
    btags: null,
    auth: null,
  },
  getters: {
    authUser(state) {
      return state.auth;
    },
    dataTagKeys(state) {
      let keys = [];
      _.forEach(state.btags,tag => {
          keys.push(tag['.key']);
      });
      console.log(keys);
      return keys;
    },
    currentTag(state) {
      return _.find(state.btags,['.key',state.route.params.tag]);
    }
  },
  mutations: {
    ['SET_REFS'](state, payload) {
      state.refs = payload;
    },
    ['SET_AUTH'](state, auth) {
      state.auth = auth;
    },

    ...VuexFire.mutations
  },
  actions: {
    addTag({state},{name,category,category_value,tagger}) {
      state.refs.btags.child(name).child('categories').child(category).update({[category_value]: true});
      state.refs.btags.child(name).child('taggers').update({[tagger]: true});
    },
    async fetchUser({state},uid) {
     let users = await state.busers;
     return await _.find(users, ['uid', uid]);
    },
    async setAuth({state,commit,dispatch},uid) {
      console.log(uid);
      let auth = await dispatch('fetchUser',uid);
      console.log(auth);
      commit('SET_AUTH', auth);
    }
  },
  modules: {
    stores,
    items,
    users,
    managers,
    employees,
    customers,
    transactions,
  },
}
