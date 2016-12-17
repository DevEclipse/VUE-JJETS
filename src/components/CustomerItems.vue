<template>
  <div>
  <items>
    <template slot="buttons" scope="{item}">
      <md-button class="md-icon-button" @click="viewItemStocks(item)">
        <md-icon>info</md-icon>
      </md-button>
    </template>

  </items>
  <md-sidenav class="md-right md-fixed" ref="itemsMenu">
    <template v-if="storedItem">
      <md-toolbar>
        <div class="md-toolbar-container">
          <div class="md-title" style="flex: 1;">
           Item: {{storedItem.name}}
          </div>
          <div class="md-subhead">
            Stores ({{filterItemStockStores | count}})
          </div>
          <md-button class="md-icon-button" @click="$refs.itemsMenu.close()">
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

          <transition-group  v-if="filterItemStockStores.length" mode="in-out"
                            enter-active-class="animated bounceInRight"
                            leave-active-class="animated bounceOutRight">

            <md-list-item v-for="{stock,store,item} in filterItemStockStores" :key="stock['.key']">
              <md-avatar>
                <vue-image :image="item.image_url" alt="Item"/>
              </md-avatar>

              <div class="md-list-text-container">
                <span>Store: {{store.name | capitalize }}</span>
                <span>Retail Price: &#8369;{{stock.retail_price}}</span>
                <span>Quantity: {{stock.quantity || 'Out of Stock'}}</span>
              </div>

              <md-button @click="addToCart({stock,store,item})" v-if="stock.quantity"
                         class="md-icon-button md-list-action">
                <md-icon>send</md-icon>
              </md-button>

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
        let items = this.storedItemStocksStores;
        let regExp;

        if(items.length && this.search) {
          regExp = new RegExp(`${this.search}`, 'i');
          items = _.filter(items,({store}) => {
            return regExp.test(_.get(store,'name'));
          })
        }
        return items;
      },
      ...mapGetters([
          'storedItemStocksStores',
          'storedItemStocks',
          'storedItem'
      ])
    },
    data() {
        return {
            search: ''
        }
    },
    methods: {
      viewItemStocks(item) {
        this.storeItem(item);
        this.$refs.itemsMenu.toggle();
      },
      ...mapActions([
          'addToCart',
          'storeItem'
      ])
    }
  }
</script>
