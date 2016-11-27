<template>
  <div>
    <loading v-if="!transactionItems" message="Loading... Items"/>
        <md-list v-else-if="transactionItems.length > 1" class="md-dense">
          <md-list-item v-for="item in transactionItems">
            <md-icon>move_to_inbox</md-icon> <span>Inbox</span>
          </md-list-item>
        </md-list>
    <vue-section-display v-else message="No Items"/>
  </div>
</template>

<script>
  export default {
    name: 'transaction-items',
    props: ['transactionItems','store'],

  }
</script>
