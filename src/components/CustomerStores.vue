<template>
  <div>

  <md-whiteframe align="center" md-elevation="24" style="z-index: 20">
  <div class="md-display-1" align="center" style="padding: 1rem;">Filters</div>
  <div class="row center-xs middle-xs">
    <div class="col-xs-6 col-md">
      <multiselect :options="allManagers"
                   v-model="manager"
                   :searchable="true"
                   label="username"
                   name="username"
                   placeholder="Select A Manager"></multiselect>
    </div>
    <div class="col-xs-12 col-md-2">
      <md-button class="md-raised md-accent" @click="manager = null">
        <md-icon>clear_all</md-icon>
        All
      </md-button>
    </div>
  </div>
</md-whiteframe>
    <stores :stores="filterStoresByManager">
      <template slot="buttons" scope="{store}">
        <md-button  class="md-raised md-accent" @click="viewStoreStocks(store)">
          <md-icon>reply</md-icon>
          Buy Items
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
        <div class="row center-xs">
          <md-button class="col-xs" @click="order = order == 'desc' ? 'asc' : 'desc'">{{order == 'desc' ?  'Oldest Stock' : 'Newest Stock'  }}
          </md-button>
          <md-button class="col-xs" @click="priceOrder = priceOrder == 'desc' ? 'asc' : 'desc'">{{priceOrder == 'desc' ? 'Lowest Price' : 'Highest Price'}}
          </md-button>
        </div>
        <md-input-container style="margin: 1rem;">
          <label>
            <md-icon>search</md-icon>
            Search
          </label>
          <md-input ref="searchInput" v-model="search"></md-input>
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

              <transition-group v-if="filterItemStockStores.length" name="stores"
                                enter-active-class="animated bounceInRight"
                                leave-active-class="animated bounceOutRight">

                <md-list-item class="md-triple-line"
                              v-for="{stock,store,item} in sortByPrice"
                              :key="stock['.key']">
                  <md-avatar>
                    <vue-image :image="item.image_url" alt="Item"/>
                  </md-avatar>

                  <div class="md-list-text-container">
                    <span>{{item.name | capitalize }}</span>
                    <span>&#8369;{{stock.retail_price}}
                          <span style="color: red;" v-if="stock.taxed">(+{{stock.retail_price * storedStore.tax_rate | estimate}})</span>
                          <span style="color: teal;" v-if="stock.discounted">(-{{stock.retail_price * storedStore.discount_rate | estimate}} )</span>
                    </span>
                    <span>
                      {{stock.created_date | moment('from')}}
                    </span>
                  </div>

                  <md-button @click="addToCart({stock,store: storedStore,item})" v-if="!(stock.quantity <= 0)"
                             class="md-icon-button md-list-action">
                    <md-icon>send</md-icon>
                  </md-button>
                  <span v-else>
                    Out of Stock
                  </span>

                </md-list-item>

              </transition-group>

            <md-list-item v-else class="md-title row middle-xs center-xs">No Stocks</md-list-item>


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
      Stores
    },
    computed: {
      filterStoresByManager() {
        let stores = this.allStores;
        if(stores && this.manager) {
          stores = _.filter(this.allStores,['manager',this.manager.username]);
        }
        return stores;
      },
      filterItemStockStores() {
        let items = _.filter(this.storedStoreStocksItems,storedStock => {
          let foundStock;
          let foundStore = _.find(this.storedCart,({store}) => {
              return store['.key'] == this.storedStore['.key'];
          });
          console.log(foundStore);
          if(foundStore) {
            if(!foundStore.cartItems) return true;
            foundStock = _.find(foundStore.cartItems,({stock}) => {
              console.log(stock);
              return stock['.key'] == storedStock.stock['.key'];
            })
          }
          return foundStock == null;
        });
        let regExp;

        if (items.length && this.search) {
          regExp = new RegExp('^[A-Za-z0-9 -]*$','i');
          if(!regExp.test(this.search)) {
            this.addAlert({message: `Search input must not contain symbols`});
            this.search = '';
            this.$refs.searchInput.$el.value = '';
            return items;
          }
          regExp = new RegExp(`${this.search}`, 'i');
          items = _.filter(items, ({item}) => {
            return regExp.test(_.get(item, 'name'));
          })
        }
        return items;
      },
      sortByDate() {
        let items = this.filterItemStockStores;

        if (items && this.order) {
          items = _.orderBy(items, ({stock}) => {
            return stock['created_date'];
          }, [this.order]);
        }

        return items;
      },
      sortByPrice() {
        let items = this.sortByDate;

        if (items && this.priceOrder) {
          items = _.orderBy(items, ({stock}) => {
            return stock['retail_price'];
          }, [this.priceOrder]);
        }

        return items;
      },
      ...mapGetters([
        'storedStoreStocksItems',
        'storedStore',
        'storedCart',
        'allManagers',
        'allStores'
      ])
    },
    data() {
      return {
        search: '',
        order: 'desc',
        priceOrder: 'desc',
        manager: null,
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

<style>
  .stores-move {
    transition: all 1s;
  }
</style>
