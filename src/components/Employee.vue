<template>
  <div>

    <v-btn-link waves large v-side-nav:newTransact="{edge: 'right'}" style="display: block">Create Transaction</v-btn-link>

      <router-view :user="currentUser"
      ></router-view>

    <v-side-nav id="newTransact">

      <v-container>
        <h5> New Transact </h5>
        <h5> Store: </h5>
        <div class="input-field">
          <v-text-input v-model.trim="newTransaction.customer" length="30"/>
          <label>Customer</label>
        </div>
        <div class="input-field">
          <v-text-input v-model.trim="newTransaction.employee" length="30"/>
          <label>Employee</label>
        </div>
        <div class="input-field">
          <v-text-input v-model.trim="newTransaction.amount" type="number" step="100.01" min="newTransaction.total" length="30"/>
          <label>Amount</label>
        </div>
        <div class="input-field">
          <button class="btn large" @click="createTransaction" style="display: block;"> Create </button>
        </div>
      </v-container>
    </v-side-nav>
    <vue-transactions :transactions="transactions"></vue-transactions>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newTransaction: {
          amount: '',
          change: 0,
          total: 0,
          tax: 0,
          discount: 0,
          status: 'New',
          customer: this.customer,
          employee: this.employee,
          store: this.store,
        },
      }
    },
    methods: {
        addTransaction() {

        }
    }
  }
</script>
