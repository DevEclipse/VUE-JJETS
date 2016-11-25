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
    auth: null,
  },
  mutations:  {
    ['SET_REFS'](state,payload){
      state.refs = payload;
    },
    ['SET_AUTH'](state,uid) {
      let found = _.find(state.busers,['uid',uid]);
      console.log(state.busers.length,uid);
      state.auth = uid;
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

