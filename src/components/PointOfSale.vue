<template>
  <!--<div v-if="authEmployee && currentTransaction ">-->
    <!--<md-toolbar class="md-accent">-->
      <!--<div class="md-toolbar-container">-->
        <!--<div class="md-title" style="flex: 1;">Transaction: <span class="md-caption">-->
          <!--{{currentTransaction['.key']}}-->
        <!--</span></div>-->
        <!--<md-button-->
          <!--v-if="currentTransaction.items && (currentTransaction.status == 'Processing' || currentTransaction.status == 'Editing')">-->
          <!--<md-icon>payment</md-icon>-->
          <!--Check Out-->
        <!--</md-button>-->
        <!--<md-button v-if="!currentTransaction.items">-->
          <!--<md-icon>block</md-icon>-->
          <!--Cancel Transaction-->
        <!--</md-button>-->
        <!--<router-link tag="md-button" :to="{name: 'receipt', params: {transaction: currentTransaction['.key']}}" v-else>-->
          <!--<md-icon>receipt</md-icon>-->
          <!--Receipt-->
        <!--</router-link>-->
      <!--</div>-->
    <!--</md-toolbar>-->
    <!--<md-sidenav class="md-fixed md-right" ref="storeStocksMenu">-->

      <!--<md-toolbar>-->
        <!--<div class="md-toolbar-container">-->
          <!--<div class="md-title">-->
            <!--{{currentTransactionStore.name | capitalize}} Stocks-->
          <!--</div>-->
        <!--</div>-->
      <!--</md-toolbar>-->
      <!--<md-input-container style="margin: 1rem;">-->
        <!--<label>-->
          <!--<md-icon>search</md-icon>-->
          <!--Search Store Item-->
        <!--</label>-->
        <!--<md-input v-model="search"></md-input>-->
      <!--</md-input-container>-->
      <!--<md-list>-->

        <!--<div v-if="filterStocks.length">-->
          <!--<transition-group enter-active-class="animated bounceInRight"-->
                            <!--leave-active-class="animated bounceOutRight">-->

            <!--<md-list-item v-for="{stock,item} in filterStocks" :key="stock['.key']">-->
              <!--<md-avatar>-->
                <!--<vue-image :image="item.image_url" alt="No Stock Image"/>-->
              <!--</md-avatar>-->

              <!--<div class="md-list-text-container">-->
                <!--<span>Item: {{item.name | capitalize }}</span>-->
                <!--<span>Retail Price: &#8369;{{stock.retail_price}}</span>-->
                <!--<span>Stock: {{stock.quantity || 'Out of Stock' }}</span>-->
              <!--</div>-->

              <!--<md-button v-if="stock.quantity"-->
                         <!--@click="addItemToTransaction(stock)"-->
                         <!--class="md-icon-button md-list-action">-->
                <!--<md-icon>send</md-icon>-->
              <!--</md-button>-->

            <!--</md-list-item>-->

          <!--</transition-group>-->
        <!--</div>-->

        <!--<div v-else>-->
          <!--<md-list-item>-->
            <!--No Items-->
          <!--</md-list-item>-->
        <!--</div>-->
      <!--</md-list>-->

    <!--</md-sidenav>-->
    <!--<md-button class="md-fab md-mini md-fab-bottom-right"-->
               <!--style="position: fixed; z-index: 3;"-->
               <!--@click="$refs.storeStocksMenu.toggle()">-->
      <!--<md-icon>add</md-icon>-->
    <!--</md-button>-->
    <!--<transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">-->
      <!--<transaction></transaction>-->
    <!--</transition>-->
  <!--</div>-->
  <!--<div v-if="authEmployee">-->
    <!--<md-card md-with-hover>-->
      <!--<md-table-card>-->
        <!--<md-table>-->
          <!--<md-table-header>-->
            <!--<md-table-row>-->
              <!--<md-table-head>Transaction Item Key</md-table-head>-->
              <!--<md-table-head>Stock Key</md-table-head>-->
              <!--<md-table-head>Item</md-table-head>-->
              <!--<md-table-head>Retail Price</md-table-head>-->
              <!--<md-table-head>Quantity</md-table-head>-->
              <!--<md-table-head>Item Total</md-table-head>-->
              <!--<md-table-head>-->
                <!--Configuration-->
              <!--</md-table-head>-->
            <!--</md-table-row>-->
          <!--</md-table-header>-->

          <!--<md-table-body>-->

            <!--<transaction-item :item="item"-->
                              <!--:stock="stock"-->
                              <!--:transactionItem="transactionItem"-->
                              <!--:transactionKey="key"-->
                              <!--:transaction="currentTransaction"-->
                              <!--:store="currentTransactionStore"-->
                              <!--@reUpdateTransaction="reUpdateTransaction"-->
                              <!--v-for="{item,stock,transactionItem,key} in currentTransactionItemStocks">-->

            <!--</transaction-item>-->
            <!--<md-table-row>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell>Sub Total:</md-table-cell>-->
              <!--<md-table-cell>&#8369;{{currentTransaction.subtotal}}</md-table-cell>-->
              <!--<md-table-cell>Total: &#8369;{{currentTransaction.total}}</md-table-cell>-->
            <!--</md-table-row>-->
            <!--<md-table-row>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell>Tax:</md-table-cell>-->
              <!--<md-table-cell>&#8369;{{currentTransaction.tax}}</md-table-cell>-->
              <!--<md-table-cell>Amount: &#8369;{{currentTransaction.amount}}</md-table-cell>-->
            <!--</md-table-row>-->
            <!--<md-table-row>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell></md-table-cell>-->
              <!--<md-table-cell>Discount:</md-table-cell>-->
              <!--<md-table-cell>&#8369;{{currentTransaction.discount}}</md-table-cell>-->
              <!--<md-table-cell>Change: &#8369;{{currentTransaction.change}}</md-table-cell>-->
            <!--</md-table-row>-->
          <!--</md-table-body>-->
        <!--</md-table>-->
      <!--</md-table-card>-->
    <!--</md-card>-->

  <!--</div>-->
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'pos',
    computed: {
      filterStocks() {
        let stockItems = this.currentTransactionStoreStocks;
        if (stockItems && this.search) {
          let regExp = new RegExp(`${this.search}`, 'i');
          stockItems = _.filter(stockItems, ({item}) => {
            return regExp.test(item['name'])
          });
        }
        return stockItems;
      },
      ...mapGetters([
        'authEmployee',
        'currentTransaction',
        'currentTransactionStoreStocks',
        'currentTransactionStore'
      ])
    },
    data() {
      return {
        search: '',
      }
    },
    methods: {
      addItemToTransaction(stock) {
        if (!this.currentTransaction.items) {
          this.currentTransaction.items = {}
        }
        if (!this.currentTransaction.items[stock['.key']]) {
          stock.quantity--;
          this.currentTransaction.items[stock['.key']] = {
            stock: stock['.key'],
            quantity: 1,
            subtotal: stock.retail_price,
            tax: stock.taxed
              ? _.round(stock.retail_price * this.currentTransactionStore.tax_rate, 2)
              : 0,
            discount: stock.discounted
              ? _.round(stock.retail_price * this.currentTransactionStore.discount_rate,2)
              : 0,
          };
          this.updateTransaction(this.currentTransaction);
        }
      },
      ...mapActions([
        'updateTransaction'
      ])
    }
  }
</script>
