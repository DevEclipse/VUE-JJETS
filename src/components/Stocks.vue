<template>
  <display v-if="!currentStore" message="No Stocks Yet"/>
  <div v-else>

    <md-dialog ref="editStock">
      <div v-if="stock">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title" style="flex: 1">
              <md-icon>edit</md-icon>
              Edit
            </div>
            <div class="md-subhead">
              Item | {{findItem(stock.item).name | capitalize}}
            </div>
          </div>

        </md-toolbar>

        <md-dialog-content style="padding: 1rem;">
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Retail Price
            </label>
            <md-input v-model="stock.retail_price"
                      type="number" step="10.00" min="0"></md-input>
          </md-input-container>
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Quantity
            </label>

            <md-input v-model="stock.quantity"
                      type="number" min="0"></md-input>
          </md-input-container>
          <md-switch v-model="stock.taxed">Taxed
          </md-switch>
          <md-switch v-model="stock.discounted">
            Discounted
          </md-switch>
        </md-dialog-content>


        <md-dialog-actions>
          <md-button class="md-raised md-primary" @click="() => {editStock(); $refs.editStock.close();}"> Update</md-button>
          <md-button class="md-raised md-warn" @click="closeEditItem"> Cancel</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>
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
            <router-link tag="md-button"
                         class="md-icon-button"
                         :to="{name: 'item', params: {item: props.data.item}}">
              <md-icon>info</md-icon>
            </router-link>
            <md-button v-if="authManager['.key'] == currentStore.manager" class="md-icon-button" @click="openEditStock(props.data['.key'])">
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
      ...mapGetters([
        'currentStore',
        'currentStocks',
        'authManager',
        'authCustomer',
        'serverTime',
        'allItems'
      ])
    },
    data() {
      return {
        stock: '',
        search: '',
      }
    },
    methods: {
      ...mapActions([
        'updateStock',
        'addItemToCart'
      ]),
      findItem(key) {
        return _.find(this.allItems, ['.key', key]);
      },
      openEditStock(item) {
        this.$refs.editStock.open();
        this.stock = _.clone(_.find(this.currentStocks, ['.key', item]));
      },
      editStock() {
        this.stock.updated_at = this.serverTime;
        this.updateStock(this.stock);
      },
      closeEditItem() {
        this.$refs.editStock.close();
        this.stock = null;
      },
    }
  }
</script>
