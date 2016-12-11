<template>

  <display v-if="!currentEmployee" message="No Employee Found"></display>
  <div v-else>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">Employee | {{currentEmployee['.key'] | capitalize}}</div>
        <div v-if="authManager">
          <md-button v-if="sameUser">Self Employed</md-button>
          <md-button v-else-if="authManager['.key'] == currentEmployee.manager">Terminate</md-button>
          <md-button v-else>Hire</md-button>
        </div>
        <div v-if="authEmployee">
          <md-button v-if="sameUser">
            Resign
          </md-button>
        </div>
      </div>
    </md-toolbar>
    <div class="row">
      <div class="col-xs-12 col-md" v-if="sameUser">
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
              <router-link tag="md-button" v-if="authEmployee['.key'] == transaction.employee  && transaction.status == 'Processing' || transaction.status == 'Returning'"
                         class="md-icon-button md-list-action"
                         :to="{name: 'pos', params: {transaction: transaction['.key']}}">
                <md-icon class="md-primary">send</md-icon>
              </router-link>
              <md-button v-else class="md-icon-button md-warn" @click="editTransactionStatus(transaction)">
                <md-icon>undo</md-icon>
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
              <router-link tag="md-button" class="md-icon-button" :to="{name: 'transactions', params: {store: store['.key']}}">
                <md-icon>work</md-icon>
              </router-link>
            </div>
          </md-list-item>

        </md-list>
      </div>
    </div>
  </div>
  </auth>
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
        'sameUser'
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
        console.log(transaction);
        transaction.status = 'Returning';
        this.updateTransaction(transaction);
        this.$router.push({name: 'pos', params: {transaction: transaction['.key']}});
      },
      ...mapActions([
        'addTransaction',
        'updateTransaction',
        'updateEmployee',
      ])
    },
  }
</script>

