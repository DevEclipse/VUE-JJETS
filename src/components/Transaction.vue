<template>
  <display v-if="!currentTransaction" message="No Transaction In Process"/>
  <div v-else>
    <div v-if="authEmployee">
      <md-card md-with-hover>
        <md-table-card>
          <md-table>
            <md-table-header>
              <md-table-row>
                <md-table-head>Transaction Item Key</md-table-head>
                <md-table-head>Stock Key</md-table-head>
                <md-table-head>Item</md-table-head>
                <md-table-head>Retail Price</md-table-head>
                <md-table-head>Quantity</md-table-head>
                <md-table-head>Item Total</md-table-head>
                <md-table-head>
                  Configuration
                </md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body>

              <transaction-item :item="item"
                                :stock="stock"
                                :transactionItem="transactionItem"
                                :transactionKey="key"
                                :transaction="currentTransaction"
                                v-for="{item,stock,transactionItem,key} in currentTransactionItemStocks">

              </transaction-item>
              <md-table-row>
                <md-table-cell></md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell>Sub Total:</md-table-cell>
                <md-table-cell>&#8369;{{currentTransaction.subtotal}}</md-table-cell>
                <md-table-cell>Total: &#8369;{{currentTransaction.total}}</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell></md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell>Tax:</md-table-cell>
                <md-table-cell>&#8369;{{currentTransaction.tax}}</md-table-cell>
                <md-table-cell>Amount: &#8369;{{currentTransaction.amount}}</md-table-cell>
              </md-table-row>
              <md-table-row>
                <md-table-cell></md-table-cell>
                <md-table-cell></md-table-cell>
                <md-table-cell>Discoun t:</md-table-cell>
                <md-table-cell>&#8369;{{currentTransaction.discount}}</md-table-cell>
                <md-table-cell>Change: &#8369;{{currentTransaction.change}}</md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>
        </md-table-card>
      </md-card>

    </div>
  </div>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import TransactionItem from './TransactionItem.vue';
  export default {
    name: 'transaction',
    components: {
      TransactionItem
    },
    computed: {
      ...mapGetters([
        'currentTransaction',
        'currentTransactionItemStocks',
        'authEmployee'
      ])
    },
  }
</script>
