<template>
  <div>
  <transactions :transactions="currentEmployeeManagerStoresTransactions">
    <template slot="buttons" scope="props">
      <md-button v-if="props.transaction.status == 'Order'" @click="validateTransaction(props.transaction)">
        Validate Transaction
      </md-button>
    </template>
  </transactions>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'employee-orders',
    computed: {
      ...mapGetters([
          'currentEmployeeManagerStoresTransactions',
          'authEmployee',
          
      ])
    },
    methods: {
      validateTransaction(transaction) {
        transaction.status = "Delivered";
        transaction.employee = this.authEmployee.username;
        this.updateTransaction(transaction);
      },
      ...mapActions([
          'updateTransaction'
        ])
    }
  }
</script>
