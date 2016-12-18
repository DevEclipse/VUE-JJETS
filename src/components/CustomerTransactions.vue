<template>
  <transactions :transactions="currentCustomerTransactions">
    <template slot="buttons">

    </template>
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
    }
  }
</script>
