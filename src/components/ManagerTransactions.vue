<template>
  <div v-if="sameManager">
    <transactions :transactions="currentManagerStoresTransactions">

    </transactions>
  </div>
  <display v-else message="You are not the manager of the stores transactions" :noloader="true">

  </display>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'store-transactions',
    computed: {
      ...mapGetters([
        'currentManagerStoresTransactions',
        'sameManager',
        'currentManagerStores'
      ])
    },
  }
</script>
