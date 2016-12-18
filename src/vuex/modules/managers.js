
const state = {
  storedManager: {
    void_code: '',
    hire_code: '',
  },
};

const getters = {
  currentManager(state,getters) {
    if(!getters.routeParams) return;
    return _.find(getters.allManagers,['username',getters.routeParams.username])
  },
  currentManagerStores(state, getters) {
    if(!getters.currentManager) return;
    return _.filter(getters.allStores, ['manager', getters.currentManager['username']]);
  },
  currentManagerItems(state, getters) {
    if(!getters.currentManager) return;
    return _.filter(getters.allItems, ['created_by', getters.currentManager['username']]);
  },
  currentManagerEmployees(state, getters) {
    if(!getters.currentManager) return;
    return _.filter(getters.allEmployees, ['manager', getters.currentManager['username']]);
  },
  currentManagerEmployeesUsers(state, getters) {
    if(!getters.currentManagerEmployees) return;
    return _.map(getters.currentManagerEmployees, employee => {
      let user = _.find(getters.allUsers,['username',employee.username]);
      return {user,employee};
    });
  },
  currentManagerApplicationMessages(state,getters) {
    if(!getters.currentManager) return;
    if(!getters.currentManager.app_messages) return;
    let employee,message,user;
    let applications = [];
    _.forEach(getters.currentManager.app_messages,(appMessage,index) => {
        employee = _.find(getters.allEmployees,['username',appMessage.employee]);
        user = _.find(getters.allUsers,['username',appMessage.employee]);
        message = appMessage.message;
        if(employee) {
          applications.push({employee, message,user});
        }
    });
    return applications;
  },
  currentManagerStoresTransactions(state,getters) {
    if(!getters.currentManagerStores) return;
      let transactions = [];
      _.forEach(getters.currentManagerStores,store => {
        transactions.push(_.filter(getters.allTransactions, ['store',store['.key']]));
      });
      return _.flatten(transactions);
  },
  storedManager(state) {
    if(!state.storedManager) return;
    return state.storedManager;
  },
  allManagersAssets(state,getters) {
    if(!getters.allManagers) return;
    return _.map(getters.allManagers,manager => {
        let user = _.find(getters.allUsers,['username',manager.username]);
        let stores = _.filter(getters.allStores,['manager',manager.username]);
        let employees = _.filter(getters.allEmployees,['manager',manager.username]);
        return {user,manager,storeCount: stores.length,employeeCount: employees.length};
    })
  },
};

const mutations = {

};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
}
