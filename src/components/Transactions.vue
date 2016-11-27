<template>
  <div>
  <loading v-if="!transactions" message="Loading... Transactions"/>
  <div v-else-if="transactions.length > 1">
asd
  </div>
  <vue-section-display v-else message="No Transactions Available"/>
  </div>
</template>

<script>
  export default {
    name: 'transactions',
    props: ['transactions'],
  }
</script>
