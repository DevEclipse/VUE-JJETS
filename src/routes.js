const routes = [
  {
    path: '/',
    component: require('./components/Index.vue'),
    name: 'home',
  },
  {
    path: '/items',
    component: require('./components/Items.vue'),
    name: 'items',
  },
  {
    path: '/item/:item',
    component: require('./components/Item.vue'),
    name: 'item',
  },
  {
    path: '/stores',
    component: require('./components/stores.vue'),
    name: 'stores',
  },
  {
    path: '/store/:store',
    component: require('./components/Store.vue'),
    name: 'store',
    children: [
      {
        path: '',
        component: require('./components/StoreInfo.vue'),
        name: 'storeInfo',
      },
      {
        path: 'items',
        component: require('./components/StoreItems.vue'),
        name: 'storeItems',
      },
      {
        path: 'transactions',
        component: require('./components/StoreItems.vue'),
        name: 'storeTransactions',
      }
    ]
  },
  {
    path: '/transaction/:transaction',
    component: require('./components/Transaction.vue'),
    name: 'transaction',
  },
  {
    path: '/user/:username',
    component: require('./components/User.vue'),
    name: 'user',
  },
  {
    path: '/manager/:manager',
    component: require('./components/Manager.vue'),
    name: 'manager',
  },
  {
    path: '/employee/:employee',
    component: require('./components/Employee.vue'),
    name: 'employee',
  },
  {
    path: '/customer/:customer',
    component: require('./components/Customer.vue'),
    name: 'customer',
  },
];

export default routes
