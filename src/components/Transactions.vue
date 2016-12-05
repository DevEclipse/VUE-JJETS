<template>
  <display v-if="!transactions.length" message="No Transactions Yet"/>
  <div v-else>

  </div>
</template>

<script>
  export default {
    name: 'transactions',
    props: ['transactions'],
  }
</script>
