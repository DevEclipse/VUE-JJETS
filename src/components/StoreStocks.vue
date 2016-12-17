<template>
  <div v-if="currentStore">

    <main-dialog ref="mainDialog"
                 :type="dialogType"
                 :valid="dialogType == 'send' ? sendValid : true"
                 @close="closeDialog"
                 @cancel="cancelDialog">
      <template v-if="storedStock && storedStockItem">
        <template v-if="dialogType == 'add' || dialogType == 'edit'">

          <md-input-container>
            <label>
              &#8369; Retail Price ({{storedStockItem.cost_price}})
            </label>
            <md-input v-model="storedStock.retail_price"
                      type="number" :min="storedStockItem.cost_price">
            </md-input>
            <span v-if="storedStock.taxed" class="md-caption" style="color: teal;">
              (+{{stockUnitTax(storedStock)}})
            </span>
            <span v-if="storedStock.discounted" class="md-caption" style="color: red;">
              (-{{stockUnitDiscount(storedStock)}})
            </span>
          </md-input-container>

          <md-input-container>
            <label>
              Quantity ({{stockCostPriceTotal(storedStock,storedStockItem.cost_price)}})
            </label>
            <md-input v-model="storedStock.quantity"
                      type="number" min="0">
            </md-input>
            <span class="md-caption" style="color: blue;">
             ({{stockTotal(storedStock)}})
            </span>
            <span v-if="storedStock.taxed" class="md-caption" style="color: teal;">
              (+{{stockTotalTax(storedStock)}})
            </span>
            <span v-if="storedStock.discounted" class="md-caption" style="color: red;">
              (-{{stockTotalDiscount(storedStock)}})
            </span>
          </md-input-container>

          <md-checkbox v-model="storedStock.taxed">Taxed</md-checkbox>

          <md-checkbox v-model="storedStock.discounted">Discounted

          </md-checkbox>

        </template>
        <template v-else-if="dialogType == 'delete'">
          Are you sure that you wanted to delete this stock (Stock: {{storedStock['.key']}})
        </template>
        <template v-else-if="dialogType == 'send'">
          Are you sure that you wanted to send this stock to another store?

          Select Store to Merge On
          <multiselect :options="otherStores"
                       v-model="selectedStore"
                       :searchable="true"
                       :allow-empty="false"
                       deselect-label="You must select one store"
                       label="name"
                       name="name"
                       placeholder="Select One Store"></multiselect>

          (Stock: {{storedStock['.key']}})
          <max-input v-model="quantityToSend" label="Quantity To Send" min="0" :max="storedStock.quantity">

          </max-input>

        </template>
      </template>
    </main-dialog>

    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title">
          Store: {{currentStore.name}}
        </div>
      </div>
    </md-toolbar>

    <stocks :stocks="currentStoreStocksItems">
      <template v-if="sameManagerStore" slot="buttons" scope="{stock}">
        <md-button class="md-icon-button" @click="openDialog('edit',stock)">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button class="md-icon-button" @click="openDialog('delete',stock)">
          <md-icon>delete</md-icon>
        </md-button>
        <md-button v-if="stock.quantity >= 1 && authManagerStores.length > 1" class="md-icon-button" @click="openDialog('send',stock)">
          <md-icon>send</md-icon>
        </md-button>
      </template>
    </stocks>

    <md-button v-if="sameManagerStore" class="md-fab md-mini md-fab-bottom-right"
               style="position: fixed; z-index: 3;" @click="$refs.itemsMenu.toggle()">
      <md-icon>add</md-icon>
    </md-button>

    <md-sidenav class="md-right md-fixed" ref="itemsMenu">
      <div class="md-toolbar">
        <div class="md-toolbar-container">
          <div class="md-title" style="flex: 1;">
            {{ownItems ? 'Owned Items' : 'Public Items'}} ({{itemsNotOnStoreStocks | count}})
          </div>
          <md-button class="md-icon-button" @click="$refs.itemsMenu.close()">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </div>

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
      <transition mode="out-in"
                  enter-active-class="animated bounceInRight"
                  leave-active-class="animated bounceOutRight">
        <div v-if="!ownItems" key="owned">
          <md-button style="width: 95%" class="md-raised md-primary" @click="ownItems = true">
            Own Items
          </md-button>
        </div>
        <div v-else key="notOwned">
          <md-button style="width: 95%" class="md-raised md-accent" @click="ownItems = false">
            Public Items
          </md-button>
        </div>
      </transition>
      <md-list>
        <template v-if="itemsNotOnStoreStocks.length">
          <transition-group enter-active-class="animated bounceInRight"
                            leave-active-class="animated bounceOutRight">

            <md-list-item v-for="item in itemsNotOnStoreStocks" :key="item['.key']">
              <md-avatar>
                <vue-image :image="item.image_url" alt="Item"/>
              </md-avatar>

              <div class="md-list-text-container">
                <span>Item: {{item.name | capitalize }}</span>
                <span>Cost Price: &#8369;{{item.cost_price}}</span>
                <span>Created By: {{item.created_by | capitalize}}</span>
              </div>

              <md-button @click="addItemToStocks(item)"
                         class="md-icon-button md-list-action">
                <md-icon>send</md-icon>
              </md-button>

            </md-list-item>

          </transition-group>
        </template>

        <template v-else>
          <span class="md-title row middle-xs center-xs">No Items</span>
        </template>
      </md-list>
    </md-sidenav>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Stocks from './Stocks.vue';
  export default {
    name: 'store-stocks',
    props: ['authManager'],
    components: {
      Stocks
    },
    data() {
      return {
        ownItems: true,
        search: '',
        dialogType: 'add',
        selectedStore: null,
        quantityToSend: 0,
      }
    },
    computed: {
      sendValid() {
        return this.selectedStore != null && this.quantityToSend;
      },
      itemsNotOnStoreStocks() {
        let regExp;
        let items = this.ownItems ? this.authManagerItems : this.sharedItems;
        let itemStocks = _.filter(items, item => {
          return _.find(this.currentStoreStocks, ['item', item['.key']]) == null;
        });
        if (items && this.search) {
          regExp = new RegExp(`${this.search}`, 'i');
          itemStocks = _.filter(itemStocks, itemStock => {
            console.log(itemStock);
            return regExp.test(itemStock.name);
          });
        }
        return itemStocks;
      },
      otherStores() {
        return _.filter(this.authManagerStores,store => {
          return store['.key'] != this.currentStore['.key'];
        });
      },
      ...mapGetters([
        'currentStoreStocksItems',
        'currentStoreStocks',
        'currentStore',
        'authManagerStores',
        'sameManagerStore',
        'sharedItems',
        'authManagerItems',
        'storedStock',
        'storedStockItem'
      ])
    },
    methods: {
      addItemToStocks(item) {
        this.storeStock();
        console.log(item.cost_price);
        this.storedStock.retail_price = item.cost_price * 2;
        this.storedStock.item = item['.key'];
        this.addStock(this.storedStock);
        this.addAlert({message: ` ${item.name} Item Stock Added`})
      },
      openDialog(action, stock) {
        this.dialogType = action;
        this.storeStock(stock);
        this.$refs.mainDialog.openDialog();
        this.addAlert({message: `${action == 'delete' ? 'Delet' : _.upperFirst(action)}ing Stock: ${this.storedStockItem.name}`})
      },
      closeDialog() {
        if (this.dialogType == 'edit') {
          this.updateStock(this.storedStock);
          this.addAlert({message: ` ${this.storedStock['.key']} Stock Updated `})
        } else if (this.dialogType == 'send') {
          let sendQuantity = this.quantityToSend > this.storedStock.quantity ? this.storedStock.quantity : this.quantityToSend;
            this.moveStockToStore({stock: this.storedStock,store: this.selectedStore,quantity: sendQuantity});
          this.addAlert(
              {message: ` ${this.storedStockItem.name}
              Sent ${sendQuantity}
              ${sendQuantity == 1 ? 'Stock' : 'Stocks'} to ${this.selectedStore.name}`})
        } else {
          this.deleteStock(this.storedStock);
          this.addAlert({message: ` ${this.storedStockItem.name} Stock Deleted`})
        }
      },
      cancelDialog() {
        this.addAlert({message: `Stock ${_.upperFirst(this.dialogType)} Cancelled`})
      },
      stockCostPriceTotal(stock,cost_price) {
        return _.round(stock.quantity * cost_price,2);
      },
      stockUnitTax(stock) {
        return _.round(stock.retail_price * this.currentStore.tax_rate, 2)
      },
      stockUnitDiscount(stock) {
        return _.round(stock.retail_price * this.currentStore.discount_rate, 2)
      },
      stockTotal(stock) {
        if (!stock) return 0;
        return _.round(stock.quantity * stock.retail_price, 2)
      },
      stockTotalTax(stock) {
        if (!stock) return 0;
        return _.round(this.stockUnitTax(stock) * stock.quantity, 2);
      },
      stockTotalDiscount(stock) {
        if (!stock) return 0;
        return _.round(this.stockUnitDiscount(stock) * stock.quantity, 2);
      },
      ...mapActions([
        'storeStock',
        'addStock',
        'addAlert',
        'updateStock',
        'deleteStock',
        'moveStockToStore'
      ])
    }
  }
</script>
