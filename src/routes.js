
const routes = [
  { path: '/',
    component: require('./components/Index.vue'),
  },
  { path: 'employees'

  },
  { path: 'manager/:manager',
    component: require('./components/Manager.vue'),
    children: [
      { path: 'stores',
        component: require('./components/Stores.vue'),
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

  { path: 'employee/:employee',
    component: require('./components/Employee.vue'),
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

  { path: '/user/:user',
    component: require('./components/User.vue'),
    name: 'user',
    children: [
      { path: 'profiles',
        component: require('./components/Home.vue'),
      },
    ],
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


