<template>

  <display v-if="!currentEmployee" message="No Employee Found"></display>
  <div v-else>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">Employee | {{currentEmployee['.key'] | capitalize}}</div>
        <div v-if="authManager">

          <md-button v-if="sameUser">Self Employed</md-button>
          <md-button v-else-if="authManager['.key'] == currentEmployee.manager" @click="terminateEmployee">Terminate</md-button>
          <md-button v-else-if="!hasAlreadyPendingHire" @click="$refs.hireEmployeeDialog.open()">Hire</md-button>
        </div>
        <div v-if="authEmployee">
          <md-button v-if="sameUser && currentEmployee.manager == authManager['.key']">
            Resign
          </md-button>
        </div>
      </div>
    </md-toolbar>
    <md-dialog ref="hireEmployeeDialog">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title">
            Hiring Message
            </div>
          </div>
        </md-toolbar>
        <md-dialog-content style="padding: 2rem;">
          <md-input-container>
            <label>
              <md-icon>store</md-icon>
              Description
            </label>
            <md-textarea v-model="hireMessage"></md-textarea>
          </md-input-container>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-raised md-primary" @click="hireEmployee">
            Send Hiring Message
          </md-button>
          <md-button class="md-raised md-warn" @click="$refs.hireEmployeeDialog.close()">
            Cancel
          </md-button>
        </md-dialog-actions>

    </md-dialog>

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
              <router-link tag="md-button" v-if="authEmployee['.key'] == transaction.employee  && transaction.status == 'Processing' || transaction.status == 'Editing'"
                         class="md-icon-button md-list-action"
                         :to="{name: 'pos', params: {transaction: transaction['.key']}}">
                <md-icon class="md-primary">send</md-icon>
              </router-link>
              <md-button v-else-if="!isExpired(transaction)" class="md-icon-button md-warn" @click="editTransactionStatus(transaction)">
                <md-icon>undo</md-icon>
              </md-button>
            </div>
            <md-divider class="md-inset"></md-divider>
          </md-list-item>
        </md-list>
      </div>
      <div class="col-xs-12 col-md">
        <md-list class="md-triple-line">
          <md-subheader>You're managed by: {{(currentEmployee.manager == currentEmployee['.key'] ? 'Yourself' : currentEmployee.manager) | capitalize }}</md-subheader>
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
      hasAlreadyPendingHire() {
        return _.find(this.currentEmployee.hireMessages,['manager',this.authManager['.key']]) != null;
      },
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
        hireMessage: '',
      }
    },
    methods: {
      setStoreTransaction(store) {
        this.store = store;
        this.$refs.createTransaction.open();
      },
      editTransactionStatus(transaction) {
        console.log(transaction);
        transaction.status = 'Editing';
        this.updateTransaction(transaction);
        this.$router.push({name: 'pos', params: {transaction: transaction['.key']}});
      },
      isExpired(transaction) {
        let now = new Date();
        let expireDate = new Date(transaction.expiration_date);
        console.log(now.getTime() >= expireDate.getTime());
        return now.getTime() >= expireDate.getTime();
      },
      hireEmployee() {

          if(!this.currentEmployee.hireMessages) {
            this.currentEmployee.hireMessages = [];
          }
          this.currentEmployee.hireMessages.push({
            hireMessage: this.hireMessage,
            manager: this.authManager['.key'],
            approved: false,
          });

        this.updateEmployee(this.currentEmployee);
      },
      approveHire() {
        this.currentEmployee.approved = true;
        this.currentEmployee.hireMessage = '';
      },
      terminateEmployee() {
        this.currentEmployee.manager = this.currentEmployee['.key'];
        this.currentEmployee.terminateMessage = 'You have been terminated because:';
        this.updateEmployee(this.currentEmployee);
      },
      ...mapActions([
        'addTransaction',
        'updateTransaction',
        'updateEmployee',
      ])
    },
  }
</script>

