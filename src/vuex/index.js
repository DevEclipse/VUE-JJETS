import VuexFire from 'vuexfire'
import users from './modules/users'
import items from './modules/items'
import stores from './modules/stores'
import managers from './modules/managers'
import employees from './modules/employees'
import customers from './modules/customers'
import transactions from './modules/transactions'
import auth from './modules/auth'
import stocks from './modules/stocks'
import firebase from 'firebase'

const generateGetters = function (refs) {
  let refKeys = Object.keys(refs);
  let getters = [];
  _.forEach(refKeys,key => {
    let capKey = _.upperFirst(key);
    getters[`all${capKey}`] = function(state) {
      return state[`b${key}`];
    };
    getters[`ref${capKey}`] = function(state) {
      return state['refs'][`b${key}`];
    }
  });
  return getters;
};
const generateActions = function (refs) {
  let refKeys = Object.keys(refs);
  let actions = [];
  let aud = ['add','update','delete'];
  _.forEach(refKeys,key => {
    let capKey = _.upperFirst(key);
    let singularCapKey = capKey.slice(0, -1);
    let ref = `ref${capKey}`;
    _.forEach(aud, a => {
      actions[`${a}${singularCapKey}`] = function({dispatch},payload) {
        dispatch(`${a}RefObject`,{ref, payload});
      };
    });

  });
  return actions;
};

const state = {
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
  bnotifier: null,
  server_time: null,
  updateObject: null,
  newObject: null,
  deleteObject: null,
  main: null,
};


const modules = {
  users,
  managers,
  employees,
  customers,
  stores,
  stocks,
  items,
  transactions,
  auth,
};

const mutations = {
  ['SET_REFS'](state, payload) {
    state.refs = payload;
  },
  ['SET_UPDATE_OBJECT'](state, object) {
    state.updateObject = object;
  },
  ['SET_NEW_OBJECT'](state, object) {
    state.newObject = object;
  },
  ['SET_DELETE_OBJECT'](state, object) {
    state.deleteObject = object;
  },
  ...VuexFire.mutations
};


const getters = {
  getNewObject(state) {
    return state.newObject;
  },
  getUpdatedObject(state) {
    return state.updateObject;
  },
  serverTime(state) {
    return state.server_time = firebase.database.ServerValue.TIMESTAMP;
  },
  routeParams(state) {
    return state.route.params;
  },
  routeQuery(state) {
    return state.route.query;
  },
  ...generateGetters({
    users,
    managers,
    employees,
    customers,
    stores,
    stocks,
    items,
    transactions,
  })
};

console.log(getters);
const actions = {
  newObject({commit, getters}, object) {
    let resultObject = _.clone(object);
    resultObject['created_date'] = resultObject['updated_date'] = getters.serverTime;
    commit('SET_NEW_OBJECT', resultObject);
  },
  updateObject({commit, getters}, object) {
    let resultObject = _.clone(object);
    resultObject['updated_date'] = getters.serverTime;
    if (resultObject['.key']) {
      delete resultObject['.key'];
    }
    commit('SET_UPDATE_OBJECT', resultObject);
  },
  addRefObject({dispatch, getters}, {ref, payload}){
    dispatch('newObject', payload);
    getters.getNewObject['.key'] = getters[ref].push(getters.getNewObject).key;
  },
  updateRefObject({dispatch, getters}, {ref, payload}){
    dispatch('updateObject', payload);
    getters[ref].child(payload['.key']).update(getters.getUpdatedObject);
  },
  deleteRefObject({commit, getters}, {ref, payload}){
    getters[ref].child(payload['.key']).remove();
    commit('SET_DELETE_OBJECT', payload);
  },
  ...generateActions({
    users,
    managers,
    employees,
    customers,
    stores,
    stocks,
    items,
    transactions,
  })
};

console.log(actions);
export default {
  state,
  mutations,
  getters,
  actions,
  modules,
}


