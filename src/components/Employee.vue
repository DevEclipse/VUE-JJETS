<template>
  <display v-if="!currentEmployee" message="No Employee Found"></display>
  <div v-else>
    <md-dialog ref="createTransaction">
      <div v-if="store">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title" style="flex: 1;">Transaction</div>
          </div>
        </md-toolbar>
        <md-dialog-content style="margin: 1rem;">
          <md-switch v-model="notRegistered">Not Registered</md-switch>
          <transition enter-class-active="animated bounceInRight" leave-active-class="animated bounceOutRight">
            <multiselect v-if="!notRegistered" v-else :options="allCustomers | keys"
                         v-model="customer"
                         :searchable="true"
                         placeholder="Search Customer">
            </multiselect>
          </transition>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-raised md-primary" @click="createTransaction">Create</md-button>
          <md-button class="md-raised md-warn" @click="$refs.createTransaction.close()">Cancel</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">Employee | {{currentEmployee['.key'] | capitalize}}</div>
        <div v-if="authManager">
          <md-button v-if="authManager['.key'] == currentEmployee['.key']">Self Employed</md-button>
          <md-button v-else-if="authManager['.key'] == currentEmployee.manager">Terminate</md-button>
          <md-button v-else>Hire</md-button>
        </div>
        <div v-if="authEmployee">
          <md-button v-if="authEmployee['.key'] == currentEmployee['.key'] && authManager['.key'] != currentEmployee['.key']">
            Resign
          </md-button>
        </div>
      </div>
    </md-toolbar>
    <div class="row">
      <div class="col-xs-12 col-md" v-if="authEmployee['.key'] == currentEmployee['.key']">
        <md-list class="md-triple-line">
          <md-subheader>Your Transactions</md-subheader>
          <md-subheader>Transactions</md-subheader>
          <md-list-item v-for="transaction in currentEmployeeTransactions">
            <div class="md-list-text-container">
              <span>Status: {{transaction.status}}</span>
              <span>Transaction Key: {{transaction['.key']}}</span>
              <span>{{transaction.customer}}</span>
              <span>Created: {{transaction.created_date | moment("from")}}</span>
              <span>Updated: {{transaction.updated_date | moment("from")}}</span>
              <span v-if="transaction.status == 'Processed'">Expires: {{transaction.expiration_date | moment("from")}}</span>
            </div>
            <div v-if="authEmployee">
              <router-link tag="md-button" v-if="authEmployee['.key'] == transaction.employee  && transaction.status == 'Processing' && transaction.status == 'Returning'"
                         class="md-icon-button md-list-action"
                         :to="{name: 'pos', params: {transaction: transaction['.key']}}">
                <md-icon class="md-primary">send</md-icon>
              </router-link>
              <md-button v-else class="md-icon-button md-warn" @click="editTransactionStatus(transaction)">
                <md-icon>edit</md-icon>
              </md-button>
            </div>
            <md-divider class="md-inset"></md-divider>
          </md-list-item>
        </md-list>
      </div>
      <div class="col-xs-12 col-md">
        <md-list class="md-triple-line">
          <md-subheader>You're managed by: {{currentEmployee.manager | capitalize }}</md-subheader>
          <md-subheader>Manager: {{currentEmployee.manager | capitalize }} Stores</md-subheader>
          <md-list-item v-for="store in currentEmployeeManagerStores">
            <md-avatar>
              <img :src="store.image_url || 'https://placeimg.com/40/40/people/1'" alt="Stores">
            </md-avatar>
            <div class="md-list-text-container">
              <span>{{store.name}}</span>
              <span>{{store['.key']}}</span>
            </div>
            <div v-if="authEmployee">
              <md-button v-if="authEmployee['.key'] == currentEmployee['.key']" class="md-icon-button md-list-action" @click="setStoreTransaction(store)">
                <md-icon class="md-primary">work</md-icon>
              </md-button>
            </div>
          </md-list-item>

        </md-list>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'authManager',
        'authEmployee',
        'currentEmployee',
        'currentEmployeeManagerStores',
        'currentEmployeeTransactions',
        'currentEmployeeManagerStoresTransactions',
        'allCustomers',
      ])
    },
    data() {
      return {
        transaction: null,
        customer: '',
        notRegistered: true,
        store: null,
      }
    },
    methods: {
      setStoreTransaction(store) {
        this.store = store;
        this.$refs.createTransaction.open();
      },
      editTransactionStatus(transaction) {

      },
      async createTransaction() {
        this.transaction = {
          customer: this.customer,
          amount: 0,
          subtotal: 0,
          tax: 0,
          discount: 0,
          total: 0,
          change: 0,
          status: 'Processing',
          store: this.store['.key'],
          employee: this.authEmployee['.key'],
          updated_by: this.authEmployee['.key'],
        };
        let key = await this.addTransaction(this.transaction);
        this.$router.push({name: 'pos', params: {transaction: key}});
        console.log(this.$router);
      },
      ...mapActions([
        'addTransaction',
      ])
    },
  }
</script>

