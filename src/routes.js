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
        path: 'items',
        component: resolve => require(['./components/StoreItems.vue'],resolve),
        name: 'storeItems',
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
    component: resolve => require(['./components/PointOfSale.vue'],resolve),
    name: 'pos',
  },
  {
    path: '/transaction/:transaction',
    component: resolve => require(['./components/Transaction.vue'],resolve),
    name: 'transaction',
  },
  {
    path: '/user/:username',
    component: resolve => require(['./components/User.vue'],resolve),
    name: 'user',
  },
  {
    path: '/manager/:manager',
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
    path: '/employee/:employee',
    component: resolve => require(['./components/Employee.vue'],resolve),
    name: 'employee',
  },
  {
    path: '/customer/:customer',
    component: resolve => require(['./components/Customer.vue'],resolve),
    name: 'customer',
  },
];

export default routes
