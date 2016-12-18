<template>
  <transactions :transactions="currentEmployeeManagerStoresTransactions">

  </transactions>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Transactions from './Transactions.vue';
  export default {
    name: 'employee-orders',
    computed: {
      ...mapGetters([
          'currentEmployeeManagerStoresTransactions'
      ])
    }
  }
</script>
