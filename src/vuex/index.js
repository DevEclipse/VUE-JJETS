import VuexFire from 'vuexfire'
import users from './modules/users'
import items from './modules/items'
import stores from './modules/stores'
import managers from './modules/managers'
import employees from './modules/employees'
import customers from './modules/customers'
import transactions from './modules/transactions'
import auth from './modules/auth'
import tags from './modules/tags'
import getters from './getters'


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
    server_time: null,
    updateObject: null,
    newObject: null,
  },
  getters,
  mutations: {
    ['SET_REFS'](state, payload) {
      state.refs = payload;
    },
    ['SET_UPDATE_OBJECT'](state,object) {
      state.updateObject = object;
    },
    ['SET_NEW_OBJECT'](state,object) {
      state.newObject = object;
    },
    ...VuexFire.mutations
  },
  actions: {
    newObject({commit,getters},object) {
      let resultObject = _.clone(object);
      resultObject['created_date'] = resultObject['updated_date'] = getters.serverTime;
      commit('SET_NEW_OBJECT',resultObject);
    },
    updatedObject({commit,getters},object) {
      let resultObject = _.clone(object);
      resultObject['updated_date'] = getters.serverTime;
      if(resultObject['.key']) {
        delete resultObject['.key'];
      }
      commit('SET_UPDATE_OBJECT',resultObject);
    }
  },
  modules: {
    users,
    managers,
    employees,
    customers,
    stores,
    items,
    transactions,
    tags,
    auth,
  },

}
