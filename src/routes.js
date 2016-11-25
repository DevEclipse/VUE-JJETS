const routes = [
  {
    path: '/',
    component: require('./components/Index.vue'),
  },

  {
    path: '/manager/:manager',
    component: require('./components/Manager.vue'),
    name: 'manager',
    children: [
      {
        path: 'stores',
        component: require('./components/Stores.vue'),
        name: 'managerStores',
      },
      {
        path: 'store/:store',
        component: require('./components/Store.vue'),
        name: 'managerStore',
        children: [
          {
            path: 'transactions',
            component: require('./components/Transactions.vue'),
            name: 'managerTransactions',
          },
          {
            path: 'transactions/:transaction',
            component: require('./components/Transaction.vue'),
            name: 'managerTransaction',
          },
        ]
      },
      {
        path: 'items',
        component: require('./components/Items.vue'),
        name: 'managerItems',
      },
      {
        path: 'transactions',
        component: require('./components/Transactions.vue'),
      },
    ]
  },

  {
    path: '/employee/:employee',
    component: require('./components/Employee.vue'),
    name: 'employee',
    children: [
      {
        path: 'transactions',
        component: require('./components/Transactions.vue'),
      },
      {
        path: 'pos/:transaction',
        component: require('./components/POS.vue'),
      },
      {
        path: 'store',
        component: require('./components/Store.vue'),
      },
    ]
  },
  {
    path: '/news',
    component: require('./components/News.vue'),
  },
  {
    path: '/user/:username',
    component: require('./components/User.vue'),
    name: 'user',
  },
  {
    path: '/customers/:customer',
    component: require('./components/Employee.vue'),
    name: 'customer',
  },
  {
    path: '/stores',
    component: require('./components/Stores.vue'),
  },
  {
    path: '/items',
    component: require('./components/Items.vue'),
  },
  {
    path: '/401',
    component: require('./components/Vue401.vue')
  },
  {
    path: '/*',
    component: require('./components/Vue404.vue'),
  },

];

export default routes
