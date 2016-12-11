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
import stocks from './modules/stocks'
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
    bstocks: null,
    server_time: null,
    updateObject: null,
    newObject: null,
    deleteObject: null,
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
    ['SET_DELETE_OBJECT'](state,object) {
      state.deleteObject = object;
    },
    ...VuexFire.mutations
  },
  actions: {
    newObject({commit,getters},object) {
      let resultObject = _.clone(object);
      resultObject['created_date'] = resultObject['updated_date'] = getters.serverTime;
      console.log(resultObject);
      commit('SET_NEW_OBJECT',resultObject);
    },
    updateObject({commit,getters},object) {
      let resultObject = _.clone(object);
      resultObject['updated_date'] = getters.serverTime;
      if(resultObject['.key']) {
        delete resultObject['.key'];
      }
      commit('SET_UPDATE_OBJECT',resultObject);
    },
    addRefObject({dispatch,getters},{ref,value}){
      let data = value || getters[`stored${ref}`];
      dispatch('newObject',data);
      getters[`ref${ref}s`].push(getters.getNewObject);
    },
    updateRefObject({dispatch,getters},{ref,value,action}){
      let data = value || getters[`stored${ref}`];
      dispatch('updateObject',data);
      getters[`ref${ref}s`].child(data['.key']).update(getters.getUpdatedObject);
      dispatch(action,getters.getUpdatedObject);
    },
    deleteRefObject({commit},{ref,value}){
      let data = value || getters[`stored${ref}`];
      getters[`ref${ref}s`].child(data['.key']).remove();
      commit('SET_DELETE_OBJECT',data);
    },
  },
  modules: {
    users,
    managers,
    employees,
    customers,
    stores,
    stocks,
    items,
    transactions,
    tags,
    auth,
  },
}
