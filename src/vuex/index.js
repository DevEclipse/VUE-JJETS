import VuexFire from 'vuexfire'
import users from './modules/users'
import items from './modules/items'
import stores from './modules/stores'
import managers from './modules/managers'
import employees from './modules/employees'
import customers from './modules/customers'
import transactions from './modules/transactions'
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
    uid: null,
  },
  getters: {
    getAuthUser(state) {
      return state.auth = _.find(state.busers,['uid',state.uid])
    }
  },
  mutations:  {
    ['SET_REFS'](state,payload){
      state.refs = payload;
    },
    ['SET_UID'](state,uid) {
      state.uid = uid;
    },
    ...VuexFire.mutations
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

