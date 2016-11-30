const routes = [
  {
    path: '/',
    component: require('./components/Index.vue'),
    name: 'index',
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
    path: 'employee/:employee',
    component: require('./components/Manager.vue'),
    name: 'employee',
  },
  {
    path: 'customer/:customer',
    component: require('./components/Manager.vue'),
    name: 'customer',
  },
];

export default routes
