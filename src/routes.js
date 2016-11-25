
const routes = [
  { path: '/',
    component: require('./components/Index.vue'),
  },

  { path: '/manager/:manager',
    component: require('./components/Manager.vue'),
    name: 'manager',
    children: [
      { path: 'stores',
        component: require('./components/Stores.vue'),
        name: 'managerStores',
      },
      { path: ':store',
        component: require('./components/Store.vue'),
        children: [
          { path: 'transactions',
            component: require('./components/Transactions.vue'),
          },
        ]
      },
      { path: 'items',
        component: require('./components/Items.vue'),
      },
      { path: 'transactions',
        component: require('./components/Transactions.vue'),
      },
    ]
  },

  { path: '/employee/:employee',
    component: require('./components/Employee.vue'),
    name: 'employee',
    children: [
      { path: 'transactions',
        component: require('./components/Transactions.vue'),
      },
      { path: 'pos/:transaction',
        component: require('./components/POS.vue'),
      },
      { path: 'store',
        component: require('./components/Store.vue'),
      },
    ]
  },

  { path: '/user/:username',
    component: require('./components/User.vue'),
    name: 'user',
    children: [
      { path: '',
        component: require('./components/News.vue'),
        name: 'news',
      },
      { path: 'info',
        component: require('./components/Info.vue'),
        name: 'info',
      },
    ],
  },
    { path: '/customers/:customer',
    component: require('./components/Employee.vue'),
    name: 'customer',
  },
  { path: '/stores',
    component: require('./components/Stores.vue'),
  },
  { path: '/items',
    component: require('./components/Items.vue'),
  },
  { path: '/401',
    component: require('./components/Vue401.vue')
  },
  { path: '/*',
    component: require('./components/Vue404.vue'),
  },

];

export default routes


