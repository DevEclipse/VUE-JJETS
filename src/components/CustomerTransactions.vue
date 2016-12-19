<template>
  <transactions :transactions="currentCustomerTransactions">

  </transactions>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'customer-transactions',
    computed: {
      ...mapGetters([
        'currentCustomerTransactions'
      ])
    },
  }
</script>
