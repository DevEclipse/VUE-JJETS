const routes = [
  {
    path: '/',
    component: require('./components/Index.vue'),
  },

  {
    path: '/news',
    component: require('./components/News.vue'),
  },
  {
    path: '/user/:username',
    component: require('./components/User.vue'),
    name: 'user',
    children: [
      {
        path: '',
        component: {template: `<div> Hello </div>`},
        name: 'home'
      },
      {
        path: 'manager',
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
                path: 'employees',
                component: require('./components/Employees.vue'),
                name: 'storeEmployees',
              },
              {
                path: 'transactions',
                component: require('./components/StoreItems.vue'),
                name: 'storeTransactions',
              },
              {
                path: 'transaction/:transaction',
                component: require('./components/Transaction.vue'),
                name: 'storeTransaction',
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
        path: 'customer',
        component: require('./components/Employee.vue'),
        name: 'customer',
      },
      {
        path: 'employee',
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
    ]
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
    path: '/tags',
    component: require('./components/Tags.vue'),
    name: 'tags'
  },
  {
    path: '/tags/:tag',
    component: require('./components/Tag.vue'),
    name: 'tag'
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
