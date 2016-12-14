<template>
  <display v-if="!currentStocksItems" message="Loading... Store Stocks"/>
  <div v-else-if="sameManagerStore">

      <main-dialog ref="mainDialog" type="edit" @closeDialog="updateStock(storedStock)">
        <template v-if="storedStock">
          <md-toolbar class="md-large">
            <div class="md-toolbar-container">

              <div class="md-title">
                <md-icon>edit</md-icon>Edit
              </div>
            </div>

            <div class="md-toolbar-container">

              <div class="md-subhead">
                Stock Key | {{storedStock.item}}
              </div>

            </div>

          </md-toolbar>

          <md-dialog-content>
            <md-input-container>
              <label>
                <md-icon>timeline</md-icon>
                Retail Price
              </label>
              <md-input v-model="storedStock.retail_price"
                        type="number" step="10.00" min="0"></md-input>
            </md-input-container>
            <md-input-container>
              <label>
                <md-icon>timeline</md-icon>
                Quantity
              </label>

              <md-input v-model="storedStock.quantity"
                        type="number" min="0"></md-input>
            </md-input-container>
            <md-switch v-model="storedStock.taxed">Taxed
            </md-switch>
            <md-switch v-model="storedStock.discounted">
              Discounted
            </md-switch>
          </md-dialog-content>
        </template>
      </main-dialog>

    <md-button class="md-fab md-mini md-fab-bottom-right"
               style="position: fixed; z-index: 3;">
      <md-icon>add</md-icon>
    </md-button>

    <chunked-rows :list="currentStocksItems" :searchKey="'item.name'">
      <template scope="props">
        <stock-item v-for="data in props" :stock="data.stock" :item="data.item" :store="currentStore" @edit="editStock">

        </stock-item>
      </template>
    </chunked-rows>

      <md-sidenav class="md-fixed md-right" ref="itemsMenu">
        <md-toolbar>
          <div class="md-toolbar-container md-title">
            Items Not On Your Stocks
          </div>
        </md-toolbar>
        <md-list class="md-triple-line">
          <md-list-item v-if="!itemStockExist(item)" v-for="item in filterItems" :key="item['.key']">
            <md-avatar>
              <vue-image :image="item.image_url" alt="Store"/>
            </md-avatar>
            <div class="md-list-text-container">
              <span>Name: {{item.name | capitalize}}</span>
              <span>Cost Price: {{item.cost_price ? `&#8369;${item.cost_price}` : 'Free'}}</span>
              <span>Created By: {{item.created_by | capitalize}}</span>
            </div>
            <md-button class="md-icon-button md-list-action" @click="addItemStock(item)">
              <md-icon>send</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </md-sidenav>



  </div>
  <display v-else message="You are not authorized"/>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import StockItem from './StockItem.vue';
  export default {
    name: 'stocks',
    components: {
      StockItem
    },
    computed: {
      ...mapGetters([
        'currentStore',
        'currentStocksItems',
        'storedStock',
        'sameManagerStore'
      ])
    },
    data() {
      return {
        search: ''
      }
    },
    methods: {
      ...mapActions([
        'addStock',
        'updateStock',
        'storeStock',
        'addItemToCart'
      ]),
      itemStockExist(item) {
        return _.find(this.currentStocksItems,({stock}) => {
            return stock.item == item['.key'];
        }) != null;
      },
      addItemStock(item) {
        this.storeStock();
        this.storedStock.item = item['.key'];
        this.storedStock.retail_price = item.cost_price ? item.cost_price + (item.cost_price * this.currentStore.tax_rate) : 0;
        this.addStock(this.storedStock);
      },
      editStock(stock) {
        console.log(stock)
      }
    }
  }
</script>
