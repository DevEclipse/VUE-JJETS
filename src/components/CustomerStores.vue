<template>
  <div>
    <stores>
      <template slot="buttons" scope="{store}">
        <md-button class="md-icon-button" @click="viewStoreStocks(store)">
          <md-icon>info</md-icon>
        </md-button>
      </template>
    </stores>
    <md-sidenav class="md-right md-fixed" ref="storesMenu">
      <template v-if="storedStore">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title" style="flex: 1;">
              Store: {{storedStore.name}}
            </div>
            <div class="md-subhead">
              Stocks ({{filterItemStockStores | count}})
            </div>
            <md-button class="md-icon-button" @click="$refs.storesMenu.close()">
              <md-icon>close</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-input-container style="margin: 1rem;">
          <label>
            <md-icon>search</md-icon>
            Search
          </label>
          <md-input v-model="search"></md-input>
        </md-input-container>

        <transition enter-active-class="animated bounceInRight"
                    leave-active-class="animated bounceOutRight">
          <div v-if="search">
            <md-button style="width: 95%" class="md-raised md-warn" @click="search = ''">
              Reset Search
            </md-button>
          </div>
        </transition>
        <md-list>
          <transition mode="out-in"
                            enter-active-class="animated bounceInRight"
                            leave-active-class="animated bounceOutRight">

              <transition-group v-if="filterItemStockStores.length" mode="out-in"
                                enter-active-class="animated bounceInRight"
                                leave-active-class="animated bounceOutRight">

                <md-list-item v-for="{stock,store,item} in filterItemStockStores" :key="stock['.key']">
                  <md-avatar>
                    <vue-image :image="item.image_url" alt="Item"/>
                  </md-avatar>

                  <div class="md-list-text-container">
                    <span>Item: {{item.name | capitalize }}</span>
                    <span>Retail Price: &#8369;{{stock.retail_price}}</span>
                    <span>Quantity: {{stock.quantity || 'Out of Stock'}}</span>
                  </div>

                  <md-button @click="addToCart({stock,store: storedStore,item})" v-if="stock.quantity"
                             class="md-icon-button md-list-action">
                    <md-icon>send</md-icon>
                  </md-button>

                </md-list-item>

              </transition-group>

              <md-list-item  v-else class="md-title row middle-xs center-xs">No Stocks</md-list-item>


          </transition>

        </md-list>
      </template>
    </md-sidenav>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Stores from './Stores.vue';
  export default {
    name: 'customer-stores',
    components: {
      Stores,
    },
    computed: {
      filterItemStockStores() {
        let items = this.storedStoreStocksItems;
        let regExp;

        if (items.length && this.search) {
          regExp = new RegExp(`${this.search}`, 'i');
          items = _.filter(items, ({item}) => {
            return regExp.test(_.get(item, 'name'));
          })
        }
        return items;
      },
      ...mapGetters([
        'storedStoreStocksItems',
        'storedStore'
      ])
    },
    data() {
      return {
        search: ''
      }
    },
    methods: {
      viewStoreStocks(store) {
        this.storeStore(store);
        this.$refs.storesMenu.toggle();
      },
      ...mapActions([
        'addToCart',
        'storeStore'
      ])
    }
  }
</script>
