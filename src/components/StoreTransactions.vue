<template>

    <transactions :authManager="authManager" :authEmployee="authEmployee"  :transactions="currentStoreTransactions"/>

</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'store-transactions',
    props: ['authManager','authEmployee'],
    computed: {
      ...mapGetters([
          'currentStoreTransactions',
          'currentStore'
      ])
    }
  }
</script>
