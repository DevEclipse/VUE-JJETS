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
    path: '/stores',
    component: resolve => require(['./components/Stores.vue'], resolve),
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
        name: 'transactions',
      },
    ]
  },
  {
    path: '/customers',
    component: resolve => require(['./components/Stores.vue'], resolve),
    name: 'customers',
  },
  {
    path: '/managers',
    component: resolve => require(['./components/Stores.vue'], resolve),
    name: 'managers',
  },
  {
    path: '/employees',
    component: resolve => require(['./components/Stores.vue'], resolve),
    name: 'employees',
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
    component: {template: `<router-view></router-view>`},
    children: [
      {
        path: '',
        component: resolve => require(['./components/User.vue'],resolve),
        name: 'user',
      },
      {
        path: 'manager',
        component: resolve => require(['./components/Manager.vue'],resolve),
        name: 'manager',
      },
      {
        path: 'employee',
        component: resolve => require(['./components/Employee.vue'],resolve),
        name: 'employee',
      },
      {
        path: 'customer',
        component: resolve => require(['./components/Customer.vue'],resolve),
        name: 'customer',
      },
    ]
  },



];

export default routes
