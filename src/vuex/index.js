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
  },
  getters,
  modules: {
    stores,
    items,
    users,
    managers,
    employees,
    customers,
    transactions,
  },
  mutations: Object.assign({},VuexFire.mutations,{
    ['SET_REFS'](state,payload) {
        state.refs = payload;
    }
  })

}

