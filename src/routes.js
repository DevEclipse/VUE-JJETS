const routes = [
  {
    path: '/',
    component: resolve => require(['./components/Index.vue'], resolve),
    name: 'home',
  },
  {
    path: '/tag/:tag',
    component: resolve => require(['./components/Tag.vue'], resolve),
    name: 'tag',
  },
  {
    path: '/items',
    component: resolve => require(['./components/Items.vue'], resolve),
    name: 'items',
  },
  {
    path: '/item/:item',
    component: resolve => require(['./components/Item.vue'], resolve),
    name: 'item',
  },
  {
    path: '/stores',
    component: resolve => require(['./components/Shops.vue'], resolve),
    name: 'stores',
  },
  {
    path: '/store/:store',
    component: resolve => require(['./components/Store.vue'],resolve),
    children: [
      {
        path: '',
        component: resolve=> require(['./components/StoreInfo.vue'],resolve),
        name: 'store',
      },
      {
        path: 'stocks',
        component: resolve => require(['./components/Stocks.vue'],resolve),
        name: 'stocks',
      },
      {
        path: 'transactions',
        component: resolve => require(['./components/StoreTransactions.vue'],resolve),
        name: 'storeTransactions',
      },
    ]
  },
  {
    path: '/pos/:transaction',
    component: resolve => require(['./components/Transaction.vue'],resolve),
    name: 'pos',
  },
  {
    path: '/receipt/:transaction',
    component: resolve => require(['./components/Receipt.vue'],resolve),
    name: 'receipt',
  },
  {
    path: '/user/:username',
    component: resolve => require(['./components/User.vue'],resolve),
    name: 'user',
  },
  {
    path: '/manager/:username',
    component: resolve => require(['./components/Manager.vue'],resolve),
    children: [
      {
        path: '',
        component: resolve => require(['./components/ManagerInfo.vue'],resolve),
        name: 'manager',
      },
      {
        path: 'items',
        component: resolve => require(['./components/ManagerItems.vue'],resolve),
        name: 'managerItems',
      },
      {
        path: 'stores',
        component: resolve => require(['./components/ManagerStores.vue'],resolve),
        name: 'managerStores',
      },
      {
        path: 'employees',
        component: resolve => require(['./components/ManagerEmployees.vue'],resolve),
        name: 'managerEmployees',
      }
    ],
  },
  {
    path: '/employee/:username',
    component: resolve => require(['./components/Employee.vue'],resolve),
    name: 'employee',
  },
  {
    path: '/customer/:username',
    component: resolve => require(['./components/Customer.vue'],resolve),
    name: 'customer',
  },
];

export default routes
