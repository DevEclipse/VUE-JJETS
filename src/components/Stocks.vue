<template>
  <display v-if="!currentStore" message="No Stocks Yet"/>
  <div v-else-if="authManager">
    <template v-if="authManager['.key'] == currentStore.manager">

      <md-dialog ref="editStock">
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


          <md-dialog-actions>
            <md-button class="md-raised md-primary" @click="updateItemStock(storedStock)"> Update</md-button>
            <md-button class="md-raised md-warn" @click="$refs.editStock.close()"> Cancel</md-button>
          </md-dialog-actions>
        </template>
      </md-dialog>

      <md-button class="md-fab md-mini md-fab-bottom-right"
                 style="position: fixed; z-index: 3;"
                 @click="$refs.itemsMenu.toggle()">
        <md-icon>add</md-icon>
      </md-button>

      <md-input-container>
        <label>
          <md-icon>search</md-icon>
          Search Stock
        </label>
        <md-input v-model="search"></md-input>
      </md-input-container>

      <cards :list="filterStocks">
        <template scope="props">
          <md-toolbar>
            <div class="md-toolbar-container">
              <div class="md-title md-accent" style="flex: 1;">
                {{findItem(props.data.item).name | capitalize}}
              </div>
              <md-button class="md-icon-button" @click="openEditStock(props.data)">
                <md-icon>edit</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-card-media md-ratio="16:9">
            <vue-image :image="findItem(props.data.item).image_url" alt="Stock"></vue-image>
          </md-card-media>

          <md-card-media-actions>
            <div class="md-subheading">Retail Price:
              &#8369;{{props.data.retail_price}}</span></div>
            <div class="md-subheading">
              Quantity: {{props.data.quantity || 'Out of Stock'}}
            </div>
          </md-card-media-actions>

          <md-card-media-actions>
            <div class="md-subheading">Taxed: {{props.data.taxed ? 'Yes' : 'No'}}</span></div>
            <div class="md-subheading">Discounted: {{props.data.discounted ? 'Yes' : 'No'}}</div>
          </md-card-media-actions>
          <md-card-media-actions>
            <div class="md-subheading">Created:
              <span class="md-caption">
            {{props.data.created_date | moment("from")}}</span></div>
            <div class="md-subheading">Updated:
              <span class="md-caption">
            {{props.data.updated_date | moment("from")}}</span></div>
          </md-card-media-actions>
        </template>
      </cards>
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
              <span>{{item.cost_price ? `&#8369;${item.cost_price}` : 'Free'}}</span>
              <span>{{item.name}}</span>
              <span>Created By: {{item.created_by | capitalize}}</span>
            </div>
            <md-button class="md-icon-button md-list-action" @click="addItemStock(item)">
              <md-icon>send</md-icon>
            </md-button>
          </md-list-item>
        </md-list>
      </md-sidenav>
    </template>

    <template v-else>
      <display message="You are not authorized"/>
    </template>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'stocks',
    computed: {
      filterStocks() {
        let stocks = this.currentStocks;
        if(stocks && this.search) {
          let regExp = new RegExp(this.search,'i');
          stocks = _.filter(stocks,stock => {

            let item = this.findItem(stock.item);
            return regExp.test(item.name);
          })
        }
        return stocks;
      },
      filterItems() {
        return this.allItems;
      },
      ...mapGetters([
        'currentStore',
        'currentStocks',
        'authManager',
        'serverTime',
        'allItems',
        'storedStock'
      ])
    },
    data() {
      return {
        search: '',
      }
    },
    methods: {
      ...mapActions([
        'addStock',
        'updateStock',
        'storeStock',
        'addItemToCart'
      ]),
      findItem(key) {
        return _.find(this.allItems, ['.key', key]);
      },
      itemStockExist(item) {
        return _.find(this.currentStocks,['item',item['.key']]) != null;
      },
      openEditStock(stock) {
        this.storeStock(stock);
        this.$refs.editStock.open();
      },
      updateItemStock(stock) {
        this.updateStock(stock);
        this.$refs.editStock.close();
      },
      addItemStock(item) {
        this.storeStock();
        this.storedStock.item = item['.key'];
        this.storedStock.retail_price = item.cost_price ? item.cost_price + (item.cost_price * this.currentStore.tax_rate) : 0;
        this.addStock(this.storedStock);
      }
    }
  }
</script>
