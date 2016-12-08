<template>
  <display v-if="!authEmployee" message="Loading... Point of Sale"/>
  <div v-else>
    <md-dialog ref="addTransactionItemDialog">
      <div v-if="storeItem">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title" style="flex: 1">
              <md-icon>edit</md-icon>
              Edit
            </div>
            <div class="md-subhead">
              Item | {{storeItem.item | capitalize}}
            </div>
          </div>
        </md-toolbar>

        <div style="margin: 1rem;">
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Retail Price
            </label>
            <md-input v-model="storeItem.retail_price"
                      type="number" step="10.00" min="0"></md-input>
          </md-input-container>
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Quantity
            </label>

            <md-input v-model="storeItem.quantity"
                      type="number" min="0"></md-input>
          </md-input-container>
          <md-switch v-model="storeItem.taxed">Taxed
          </md-switch>
          <md-switch v-model="storeItem.discounted">
            Discounted
          </md-switch>
        </div>


        <md-dialog-actions>
          <md-button class="md-primary" @click="closeEditItem"> Cancel</md-button>
          <md-button class="md-primary" @click="editStoreItem"> Save</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>
    <md-toolbar>
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;" v-if="currentTransaction">
          Point of Sale
        </div>
        <router-link v-if="currentTransactionStore" tag="md-button"
                     :to="{name: 'store', params: {store: currentTransactionStore['.key']}}">
          Store: {{currentTransactionStore.name | capitalize}}
        </router-link>
      </div>
    </md-toolbar>
    <div class="row">
      <div class="col-xs-12 col-md-4">
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search Store Item
          </label>
          <md-input v-model="storeItemSearch"></md-input>
        </md-input-container>
        <md-list>
          <div v-if="filterItems && allItems">
          <transition-group enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
            <md-list-item v-for="(item,index) in filterItems" :key="index">
            <md-avatar>
              <img :src="findItem(index).image_url || 'https://placeimg.com/40/40/people/1'" alt="People">
            </md-avatar>
              <div class="md-list-text-container">
          <span>
            Item: {{index | capitalize}}
          </span>
                <span>
            Retail Price: &#8369;{{item.retail_price}}
          </span>
                <span>
            Stock: {{item.quantity || 'Out of Stock' }}
          </span>
              </div>
              <md-button v-if="item.quantity" class="md-icon-button md-list-action" @click="addTransactionItem(item)">
                <md-icon>send</md-icon>
              </md-button>

          </md-list-item>
          </transition-group>
          </div>
          <div v-else>
            <md-list-item>
              No Items
            </md-list-item>
          </div>
        </md-list>

      </div>
      <div class="col-xs-12 col-md">
        <transaction :isPos="true" :transaction="currentTransaction" :store="currentTransactionStore" @selectItem="selectItem"/>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'point-of-sale',
    data() {
        return {
            storeItemSearch: null,
            storeItem: null,
        }
    },
    computed: {
      filterItems() {
          if(!this.currentTransactionStore) return;
          let items = this.currentTransactionStore.items;
          if(!items) return;
          if (this.storeItemSearch) {
            let regExp = new RegExp(this.storeItemSearch.toLowerCase());
            items = _.filter(items, (item,index) => {
              return regExp.test(index);
            })
          }
          return items;
      },
      ...mapGetters([
          'currentTransaction',
          'currentTransactionStore',
          'authEmployee',
          'allItems',
      ])
    },
    methods: {
      ...mapActions([
        'updateTransaction',
        'updateStore',
      ]),
      findItem(item) {
          return _.find(this.allItems,['.key',item])
      },
      openTransactionItemDialog(item) {
          this.$refs.addTransactionItemDialog.open();
          this.$set(this.$data,'storeItem',item);
      },
      addTransactionItem(item) {
        let key = item.item;
        if(!this.currentTransaction.items) {
          this.currentTransaction.items = {};
        }
        this.currentTransactionStore.items[key].quantity -= 1;
        if(!this.currentTransaction.items[key]) {
          this.currentTransaction.items[key] = {
              item: key,
              quantity: 1,
          }
        } else {
          this.currentTransaction.items[key].quantity += 1;
        }
       this.updateTransaction(this.currentTransaction);
       this.updateStore(this.currentTransactionStore);
      },
    }
  }
</script>
