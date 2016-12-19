<template>
  <div>
  <transactions :transactions="currentEmployeeManagerStoresTransactions">

  </transactions>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'employee-orders',
    computed: {
      ...mapGetters([
          'currentEmployeeManagerStoresTransactions'
      ])
    },
  }
</script>
