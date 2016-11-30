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
  },
  getters,
  mutations: {
    ['SET_REFS'](state, payload) {
      state.refs = payload;
    },
    ...VuexFire.mutations
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
