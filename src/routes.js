const routes = [
  {
    path: '/',
    components: {index: resolve => require(['./components/Index.vue'], resolve)},
    name: 'home',
  },
  {
    path: '/stocks/:store',
    component: resolve => require(['./components/StoreStocks.vue'],resolve),
    name: 'storeStocks',
  },
  {
    path: '/transactions/:store',
    component: resolve => require(['./components/StoreTransactions.vue'],resolve),
    name: 'storeTransactions',
  },
  {
    path: '/stocks/:item',
    component: resolve => require(['./components/StoreStocks.vue'],resolve),
    name: 'itemStocks',
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
      { path: '',
        redirect: { name: 'managerItems' },
        name: 'manager',
      },
      {
        path: 'stores',
        component: resolve => require(['./components/ManagerStores.vue'],resolve),
        name: 'managerStores',
      },
      {
        path: 'items',
        component: resolve => require(['./components/ManagerItems.vue'],resolve),
        name: 'managerItems',
      },
      {
        path: 'employees',
        component: resolve => require(['./components/ManagerEmployees.vue'],resolve),
        name: 'managerEmployees',
      },
      {
        path: 'transactions',
        component: resolve => require(['./components/ManagerTransactions.vue'],resolve),
        name: 'managerTransactions',
      },
    ]
  },
  {
    path: 'pos',
    component: resolve => require(['./components/PointOfSale.vue'],resolve),
    name: 'pos',
  },
  {
    path: '/employee/:username',
    component: resolve => require(['./components/Employee.vue'],resolve),
    children: [
      { path: '',
        redirect: { name: 'employeeTransactions' },
        name: 'employee',
      },
      {
        path: 'transactions',
        component: resolve => require(['./components/EmployeeTransactions.vue'], resolve),
        name: 'employeeTransactions',
      },
    ]
  },
  {
    path: '/customer/:username',
    component: resolve => require(['./components/Customer.vue'],resolve),
    children: [
      { path: '',
        redirect: { name: 'items' },
        name: 'customer',
      },
      {
        path: 'items',
        component: resolve => require(['./components/CustomerItems.vue'], resolve),
        name: 'items',
      },
      {
        path: 'stores',
        component: resolve => require(['./components/CustomerStores.vue'], resolve),
        name: 'stores',
      },
      {
        path: 'transactions',
        component: resolve => require(['./components/CustomerTransactions.vue'], resolve),
        name: 'transactions',
      },
    ]
  },
  { path: '/*',
    redirect: { name: 'home' },
  },



];

export default routes
