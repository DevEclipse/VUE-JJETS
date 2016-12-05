<template>
  <display v-if="!currentStoreTransactions" message="No Transactions Yet"/>
  <transactions v-else :transactions="currentStoreTransactions"/>
</template>

<script>
  import Transactions from './Transactions.vue';
  import {mapGetters} from 'vuex';
  export default {
    name: 'store-transactions',
    components: {
        Transactions,
    },
    computed: {
      ...mapGetters([
          'currentStoreTransactions',
      ])
    }
  }
</script>
