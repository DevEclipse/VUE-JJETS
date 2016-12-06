<template>
  <display v-if="!transactions" message="No Transactions Yet"/>
  <div v-else>
    <cards :list="transactions">
      <template scope="props">
        {{props}}
      </template>
    </cards>
  </div>
</template>

<script>
  export default {
    name: 'transactions',
    props: ['transactions'],
  }
</script>
