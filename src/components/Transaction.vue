<template>
  <div>
    {{transaction}}
  <loading v-if="!transaction" message="Loading... Transaction"/>
  <div v-else>
    <md-toolbar>
      <div class="md-title" style="flex: 1">
       Transaction | {{transaction['.key']}}
      </div>
      <div class="row">
      <div class="col-xs">
        Total: {{transaction.total}}
      </div>
      </div>
    </md-toolbar>
    <transaction-items :transaction-items="transaction.items"></transaction-items>
  </div>
  </div>
</template>

<script>
  import TransactionItems from './TransactionItems.vue'
  export default {
    name: 'transaction',
    props: ['transaction'],
    components: {
        TransactionItems
    }
  }
</script>
