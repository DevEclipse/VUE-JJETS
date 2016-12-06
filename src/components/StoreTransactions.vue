<template>
  <display v-if="!currentStoreTransactions" message="No Transactions Yet"/>
  <transactions v-else :transactions="currentStoreTransactions"/>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'store-transactions',
    computed: {
      ...mapGetters([
          'currentStoreTransactions',
      ])
    }
  }
</script>
