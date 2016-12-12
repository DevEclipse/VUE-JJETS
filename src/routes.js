const routes = [
  {
    path: '/',
    components: {index: resolve => require(['./components/Index.vue'], resolve)},
    name: 'home',
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
    name: 'store',
    children: [
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
    component: resolve => require(['./components/User.vue'],resolve),
    name: 'user',
  },
  {
    path: '/manager/:username',
    component: resolve => require(['./components/Manager.vue'],resolve),
    name: 'manager',
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
