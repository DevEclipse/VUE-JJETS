<template>
  <div v-if="authEmployee">


    <md-table v-if="storedTransaction">
      <md-table-header>
        <md-table-row>
          <md-table-head>Stock Id</md-table-head>
          <md-table-head>Item</md-table-head>
          <md-table-head>Retail Price</md-table-head>
          <md-table-head>Quantity</md-table-head>
          <md-table-head>Item Sub Total</md-table-head>
          <md-table-head>Item Total</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="({product,stock,item}, index) in storedTransactionProducts" :key="index">
          <md-table-cell>{{stock['.key']}}</md-table-cell>
          <md-table-cell>{{item.name}}</md-table-cell>
          <md-table-cell>
            {{stock.retail_price}}
            <span v-if="stock.taxed" style="color: red;">
              (+{{(stock.retail_price * storedTransaction.store.tax_rate) | estimate}})
            </span>
            <span v-if="stock.discount" style="color: teal;">
              (+{{(stock.retail_price * storedTransaction.store.discount_rate) | estimate}})
            </span>
          </md-table-cell>
          <md-table-cell>
            {{product.quantity}}
          </md-table-cell>
          <md-table-cell>
            {{(stock.retail_price * product.quantity) | estimate}}
            <span v-if="stock.taxed" style="color: red;">
              (+{{(stock.retail_price * storedTransaction.store.tax_rate * product.quantity) | estimate}})
            </span>
            <span v-if="stock.discount" style="color: teal;">
              (+{{(stock.retail_price * storedTransaction.store.discount_rate * product.quantity) | estimate}})
            </span>
          </md-table-cell>
          <md-table-cell>
            {{(stock.retail_price * product.quantity) | estimate}}
            <span v-if="stock.taxed" style="color: red;">
              (+{{(stock.retail_price * storedTransaction.store.tax_rate * product.quantity) | estimate}})
            </span>
            <span v-if="stock.discount" style="color: teal;">
              (+{{(stock.retail_price * storedTransaction.store.discount_rate * product.quantity) | estimate}})
            </span>
          </md-table-cell>

        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
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
        store: null,
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
