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
            path: '',
            component: require('./components/ManagerInfo.vue'),
            name: 'managerInfo',
          },
          {
            path: 'stores',
            component: require('./components/Stores.vue'),
            name: 'managerStores',
          },
          {
            path: 'employees',
            component: require('./components/Employees.vue'),
            name: 'managerEmployees',
          },
          {
            path: 'store/:store',
            component: require('./components/Store.vue'),
            name: 'managerStore',
            children: [
              {
                path: '',
                component: require('./components/StoreInfo.vue'),
                name: 'managerStoreInfo',
              },
              {
                path: 'items',
                component: require('./components/StoreItems.vue'),
                name: 'managerStoreItems',
              },
              {
                path: 'transactions',
                component: require('./components/Transactions.vue'),
                name: 'managerStoreTransactions',
              },
              {
                path: 'transaction/:transaction',
                component: require('./components/Transaction.vue'),
                name: 'managerStoreTransaction',
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
            path: '',
            component: require('./components/EmployeeInfo.vue'),
            name: 'employeeInfo',
          },
          {
            path: 'transactions',
            component: require('./components/Transactions.vue'),
            name: 'employeeTransactions',
          },
          {
            path: 'pos/:transaction',
            component: require('./components/POS.vue'),
            name: 'posTransaction',
          },
          {
            path: 'pos',
            component: require('./components/POS.vue'),
            name: 'pos',
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
    path: '/managers',
    component: require('./components/Managers.vue'),
    name: 'managers',
  },
  {
    path: '/store/:store',
    component: require('./components/Store.vue'),
    name: ''
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
