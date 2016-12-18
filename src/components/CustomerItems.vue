<template>
  <div>
    <items>
      <template slot="buttons" scope="{item}">
        <md-button class="md-raised md-accent" @click="viewItemStocks(item)">
          <md-icon>reply</md-icon>
          Buy
        </md-button>
      </template>

    </items>
    <md-sidenav class="md-right md-fixed" ref="itemsMenu">
      <template v-if="storedItem">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-subhead" style="flex: 1;">
              Item: {{storedItem.name}}
            </div>

            <md-button class="md-icon-button" @click="$refs.itemsMenu.close()">
              <md-icon>close</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-subheader>
          Stores ({{filterItemStockStores | count}})
        </md-subheader>
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

            <transition-group  v-if="filterItemStockStores.length" name="items"
                               enter-active-class="animated bounceInRight"
                               leave-active-class="animated bounceOutRight">

              <md-list-item class="md-triple-line"
                            v-for="{stock,store,item} in sortByPrice"
                            :key="stock['.key']" >
                <md-avatar>
                  <vue-image :image="store.image_url" alt="Store"/>
                </md-avatar>

                <div class="md-list-text-container">
                  <span>{{store.name | capitalize }}</span>
                  <span>
                      &#8369;{{stock.retail_price}}
                          <span style="color: red;" v-if="stock.taxed">(+{{stock.retail_price * store.tax_rate | estimate}})</span>
                          <span style="color: teal;" v-if="stock.discounted">(-{{stock.retail_price * store.discount_rate | estimate}} )</span>
                    </span>
                  <span>
                      {{stock.created_date | moment('from')}}
                    </span>
                </div>

                <md-button @click="addToCart({stock,store,item})" v-if="!(stock.quantity <= 0)"
                           class="md-icon-button md-list-action">
                  <md-icon>send</md-icon>
                </md-button>
                <span class="md-list-action" v-else>Out of Stock</span>
              </md-list-item>

            </transition-group>

            <md-list-item v-else class="md-title row middle-xs center-xs">No Items</md-list-item>

          </transition>
        </md-list>
      </template>
    </md-sidenav>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Items from './Items.vue';
  export default {
    name: 'customer-items',
    components: {
      Items,
    },
    computed: {
      filterItemStockStores() {
        let items = _.filter(this.storedItemStocksStores, storedStock => {
          let foundStock;
          let foundStore = _.find(this.storedCart, ({store}) => {
            return store['.key'] == storedStock.store['.key'];
          });
          if (foundStore) {
            if (!foundStore.cartItems) return true;
            foundStock = _.find(foundStore.cartItems, ({stock}) => {
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
          items = _.filter(items, ({store}) => {
            return regExp.test(_.get(store, 'name'));
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
        'storedItemStocksStores',
        'storedItemStocks',
        'storedItem',
        'storedCart'
      ])
    },
    data() {
      return {
        search: '',
        order: 'desc',
        priceOrder: 'desc'
      }
    },
    methods: {
      viewItemStocks(item) {
        this.storeItem(item);
        this.$refs.itemsMenu.toggle();
      },
      ...mapActions([
        'addToCart',
        'storeItem',
        'addAlert'
      ])
    }
  }
</script>

<style>
  .items-move {
    transition: all 1s;
  }
</style>
