<template>
  <div v-if="authEmployee">


    <md-table v-if="storedTransaction">
      <md-table-header>
        <md-table-row>
          <md-table-head>Stock Id</md-table-head>
          <md-table-head>Item</md-table-head>
          <md-table-head>Retail Price</md-table-head>
          <md-table-head>Quantity</md-table-head>
          <md-table-head>Item Total</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <transaction-product
        v-for="({product,stock,item}, index) in storedTransactionProducts" 
        :key="index">

        </transaction-product>
      </md-table-body>
    </md-table>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import TransactionProduct from './TransactionProduct.vue'
  export default {
    name: 'pos',
    computed: {
      ...mapGetters([
        'storedTransaction',

        'authEmployee'
      ])
    },
    data() {
      return {
        search: '',
        store: null
      }
    },
    methods: {
      ...mapActions([
        'updateTransaction',
        'addTransaction',
        'storeTransaction'
      ])
    }

  }
</script>
