<template>
  <div>
    <md-dialog ref="transactionProductsDialog">

    </md-dialog>

    <layout :list="filterByStartToEndDate" :searchKey="searchKey">
      <template slot="extra">
        <template v-if="$route.name == 'storeTransactions' || $route.name == 'managerTransactions'">
          <md-toolbar>
            <div class="md-toolbar-container row center-xs">
              <div class="col-xs-6 col-md md-subhead">
                Total: {{totalSales | estimate}}
              </div>
              <div class="col-xs-6 col-md md-subhead">
                Taxes: {{totalTax | estimate}}
              </div>
              <div class="col-xs-6 col-md md-subhead">
                Discounts: {{totalDiscount | estimate}}
              </div>
              <div class="col-xs-6 col-md md-subhead">
                Sub Totals: {{totalSubTotal | estimate}}
              </div>
            </div>
          </md-toolbar>
        </template>
        <transition enter-active-class="animated bounceInRight"
                    leave-active-class="animated bounceOutRight" mode="out-in">
        <md-whiteframe align="center" md-elevation="24" style="z-index: 20" v-if="showFilters">
          <div class="row center-xs middle-xs" style="padding: 0.25rem;">
            <div class="col-xs-6 col-md-4" v-if="transactionsStores.length != 0 && $route.name != 'storeTransactions'">
              <multiselect :options="transactionsStores"
                           v-model="store"
                           :searchable="true"
                           label="storeName"
                           name="storeName"
                           placeholder="Select A Store"></multiselect>
            </div>
            <div class="col-xs-6 col-md-4" v-if="transactionsCustomers.length != 0 && $route.name != 'transactions'">
              <multiselect :options="transactionsCustomers"
                           v-model="customer"
                           :searchable="true"
                           placeholder="Select A Customer"></multiselect>
            </div>
            <template v-if="$route.name == 'managerTransactions'">

              <div class="col-xs-6 col-md-4" v-if="transactionsEmployees.length != 0">
                <multiselect :options="transactionsEmployees"
                             v-model="employee"
                             :searchable="true"
                             placeholder="Select An Employee"></multiselect>
              </div>
            </template>
            <div class="col-xs-6 col-md-4">
              <multiselect :options="['Order','Processed','Returned','Pending','Voided','Completed','Delivered']"
                           v-model="status"
                           :searchable="true"
                           placeholder="Select Status"></multiselect>
            </div>
            <div class="col-xs-6 col-md">
              <md-input-container>
                <label>Start Date</label>
                <md-input :max="endDate ? endDate : ''" v-model="startDate" type="date"></md-input>
              </md-input-container>
            </div>
            <div class="col-xs-6 col-md" v-if="startDate">
              <md-input-container>
                <label>End Date</label>
                <md-input v-model="endDate" :min="startDate" type="date"></md-input>
              </md-input-container>
            </div>
            <div class="col-xs-12 col-md-2">
              <md-button class="md-raised md-accent" @click="resetToAllTransactions">
                <md-icon>clear_all</md-icon>
                All
              </md-button>
            </div>

          </div>
        </md-whiteframe>
        </transition>

        <md-button class="md-fab md-mini md-fab-bottom-right"
                   style="margin-right: 15rem;z-index: 1000; position: fixed;"
                   @click="showFilters = !showFilters">
          <md-icon>filter_list</md-icon>
          <md-tooltip md-direction="left">{{showFilters ? 'Hide Filters' : 'Show Filters'}}</md-tooltip>
        </md-button>

        <md-button class="md-fab md-mini md-fab-bottom-right"
                   style="margin-right: 12rem;z-index: 1000; position: fixed;"
                   @click="() => {order = order == 'desc' ? 'asc' : 'desc'; sorted = true;}">
          <md-icon>sort</md-icon>
          <md-tooltip md-direction="right">Sort By Newest or Oldest</md-tooltip>
        </md-button>
      </template>
      <template scope="props">
        <transaction v-for="transaction in props" :transaction="transaction">

        </transaction>
      </template>
    </layout>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Transaction from './Transaction.vue';
  export default {
    name: 'transactions',
    props: ['transactions', 'authEmployee', 'searchKey'],
    methods: {
      ...mapActions([
        'addAlert'
      ]),
      resetToAllTransactions() {
        this.store = '';
        this.status = '';
        this.startDate = null;
        this.endDate = null;
        this.sorted = false;
        this.customer = null;
        this.employee = null;
      }
    },
    computed: {
      totalSales() {
        return _.sumBy(this.sortByDate, transaction => {
          return transaction.total;
        });
      },
      totalTax() {
        return _.sumBy(this.sortByDate, transaction => {
          return transaction.tax;
        });
      },
      totalDiscount() {
        return _.sumBy(this.sortByDate, transaction => {
          return transaction.discount;
        });
      },
      totalSubTotal() {
        return _.sumBy(this.sortByDate, transaction => {
          return transaction.subtotal;
        });
      },
      transactionsCustomers() {
        let customers = [];
        let customerFound;
        _.forEach(this.transactions, transaction => {
          if (customers.length) {
            customerFound = _.find(customers, customer => {
              if (transaction.customer == '') return true;
              return customer == transaction.customer;
            });
            if (!customerFound) {
              customers.push(transaction.customer || 'Anonymous');
            }
          } else {
            customers.push(transaction.customer || 'Anonymous');
          }
        });
        return customers;
      },
      transactionsEmployees() {
        let employees = [];
        let employeeFound;
        _.forEach(this.transactions, transaction => {
          if (employees.length) {
            employeeFound = _.find(employees, employee => {
              if (transaction.employee == '') return true;
              return employee == transaction.employee;
            });
            if (!employeeFound) {
              employees.push(transaction.employee || 'Unassigned');
            }
          } else {
            employees.push(transaction.employee || 'Unassigned');
          }
        });
        return employees;
      },

      transactionsStores() {
        let stores = [];
        let storeFound;
        _.forEach(this.transactions, transaction => {
          if (stores.length) {
            storeFound = _.find(stores, ({store}) => {
              return store == transaction.store;
            });
            if (!storeFound) {
              stores.push({store: transaction.store, storeName: transaction.store_name});
            }
          } else {
            stores.push({store: transaction.store, storeName: transaction.store_name});
          }
        });
        return stores;
      },
      filterByEmployee() {
        let transactions = this.transactions;
        if (transactions && this.employee) {
          transactions = _.filter(transactions, ['employee', this.employee == 'Unassigned' ? '' : this.employee]);
        }
        return transactions;
      },
      filterByCustomer() {
        let transactions = this.filterByEmployee;
        if (transactions && this.customer) {
          if (this.customer == 'Anonymous') return transactions;
          transactions = _.filter(transactions, ['customer', this.customer == 'Anonymous' ? '' : this.customer]);
        }
        return transactions;
      },
      filterByStore() {
        let transactions = this.filterByCustomer;
        if (transactions && this.store) {
          transactions = _.filter(transactions, ['store', this.store['store']]);
        }
        return transactions;
      },
      filterByStatus() {
        let transactions = this.filterByStore;
        if (transactions && this.status) {
          transactions = _.filter(transactions, ['status', this.status]);
        }
        return transactions;
      },
      sortByDate() {
        let items = this.filterByStatus;

        if (items && this.order) {
          items = _.orderBy(items, ['created_date'], [this.order]);
          if (this.sorted) {
            this.addAlert({message: `Sorted Transactions by ${this.order == 'desc' ? 'Newest' : 'Oldest'}`});
            this.sorted = false;
          }
        }

        return items;
      },
      filterByStartToEndDate() {
        let transactions = this.sortByDate;
        if (transactions && this.startDate && this.endDate) {
          transactions = _.filter(transactions, transaction => {
            let targetDate = new Date(transaction.created_date);
            let startDate = new Date(this.startDate);
            let endDate = new Date(this.endDate);
            let resultDate = new Date(endDate.getTime());
            resultDate.setDate(resultDate.getDate() + 1);
            let inRange = targetDate >= startDate && targetDate < resultDate;
            console.log(inRange);
            return inRange;
          });
        }
        return transactions;
      }
    },
    data() {
      return {
        store: '',
        employee: '',
        customer: '',
        status: '',
        order: 'desc',
        sorted: false,
        startDate: null,
        endDate: null,
        transaction: null,
        products: [],
        showFilters: true
      }
    },
    components: {
      Transaction
    }
  }
</script>
