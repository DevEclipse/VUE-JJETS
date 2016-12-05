const routes = [
  {
    path: '/',
    component: require('./components/Index.vue'),
    name: 'home',
  },
  {
    path: '/tag/:tag',
    component: require('./components/Tag.vue'),
    name: 'tag',
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
    children: [
      {
        path: '',
        component: require('./components/StoreInfo.vue'),
        name: 'store',
      },
      {
        path: 'items',
        component: require('./components/StoreItems.vue'),
        name: 'storeItems',
      },
      {
        path: 'transactions',
        component: require('./components/StoreTransactions.vue'),
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
    children: [
      {
        path: '',
        component: require('./components/ManagerInfo.vue'),
        name: 'manager',
      },
      {
        path: 'items',
        component: require('./components/ManagerItems.vue'),
        name: 'managerItems',
      },
      {
        path: 'stores',
        component: require('./components/ManagerStores.vue'),
        name: 'managerStores',
      },
      {
        path: 'employees',
        component: require('./components/ManagerEmployees.vue'),
        name: 'managerEmployees',
      }
    ],
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
