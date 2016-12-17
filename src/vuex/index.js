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
import products from './modules/products'
import firebase from 'firebase'

function generateGetters(refs) {
  let refKeys = Object.keys(refs);
  let getters = [];
  _.forEach(refKeys, key => {
    let capKey = _.upperFirst(key);
    getters[`all${capKey}`] = function (state) {
      return state[`ref${capKey}`];
    };
    getters[`ref${capKey}`] = function (state) {
      return state['refs'][`ref${capKey}`];
    }
  });
  return getters;
};

function generateActions(refs) {
  let refKeys = Object.keys(refs);
  let actions = [];
  let aud = ['add', 'update', 'delete'];
  _.forEach(refKeys, key => {
    let capKey = _.upperFirst(key);
    let singularCapKey = capKey.slice(0, -1);
    let ref = `ref${capKey}`;
    _.forEach(aud, a => {
      actions[`${a}${singularCapKey}`] = function ({dispatch}, payload) {
        dispatch(`${a}RefObject`, {ref, payload});
      };
    });

  });
  return actions;
}

function makeId(length = 5) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
function makeIdNo(length = 5) {
  let text = "";
  let possible = "0123456789";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
async function speakMessage(message) {
  let msg = await new SpeechSynthesisUtterance(message);
  await window.speechSynthesis.speak(msg);
}

const state = {
  refs: null,
  refUsers: null,
  refItems: null,
  refStores: null,
  refManagers: null,
  refEmployees: null,
  refCustomers: null,
  refTransactions: null,
  refStocks: null,
  refProducts: null,
  server_time: null,
  updateObject: null,
  newObject: null,
  deleteObject: null,
  alerts: [],
  itemCategories: ['Appliances', 'Groceries', 'Fashion', 'Accessories', 'Toys', 'Gadgets', 'Others']
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
  products,
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
  ['ADD_ALERT'](state, alert) {
    state.alerts.push(alert);
  },
  ['DELETE_ALERT'](state, alert) {
    state.alerts.splice(state.alerts.findIndex(a => a.id == alert.id), 1);
  },
  ...VuexFire.mutations
};


const getters = {
  getAlerts(state) {
    if (!state.alerts) return;
    return state.alerts;
  },
  getNewObject(state) {
    return state.newObject;
  },
  itemCategories(state) {
    return state.itemCategories;
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
  routeName(state) {
    return state.route.name;
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
    products
  })
};

const actions = {
  async addAlert({commit, dispatch}, alert) {
    alert.id = await makeId();
    await commit('ADD_ALERT', alert);
    await dispatch('speakMessage', alert.message);
  },
  async deleteAlert({commit}, alert) {
    await commit('DELETE_ALERT', alert);
  },
  async speakMessage({state}, message) {
    await speakMessage(message);
  },
  newObject({commit, getters}, object) {
    let resultObject = _.clone(object);
    if(resultObject['.key']) {
      delete resultObject['.key'];
    }
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
    let cloneRef = ref.replace('ref','');
    let singularCloneRef = cloneRef.slice(0, -1);
    let count = getters[`all${cloneRef}`].length;
    getters.getNewObject['.key'] = getters[ref].child(`JJETS${singularCloneRef}${count}${makeIdNo(3)}`).set(getters.getNewObject).key;
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
    products
  })
};


export default {
  state,
  mutations,
  getters,
  actions,
  modules,
}


