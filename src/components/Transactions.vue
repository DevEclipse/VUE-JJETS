<template>

  <layout :list="transactions" :searchKey="'name'">
    <template scope="props">
      <transaction v-for="transaction in props" :transaction="transaction">
        <template slot="buttons">
          <slot name="buttons" :transaction="transaction">

          </slot>
        </template>
      </transaction>
    </template>
  </layout>

</template>

<script>
  import Transaction from './Transaction.vue';
  export default {
    name: 'transactions',
    props: ['transactions','authEmployee'],
    components: {
        Transaction
    }
  }
</script>
