<template>
  <display v-if="!authEmployee" message="Loading... Point of Sale"/>
  <div v-else>
    <md-toolbar>
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;" v-if="currentTransaction">
          Point of Sale | Transaction: {{currentTransaction['.key']}}
        </div>
        <router-link v-if="currentTransactionStore" tag="md-button"
                     :to="{name: 'store', params: {store: currentTransactionStore['.key']}}">
          Store: {{currentTransactionStore.name | capitalize}}
        </router-link>
      </div>
    </md-toolbar>
    <div class="row">
      <div class="col-xs">
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search Store Item
          </label>
          <md-input v-model="storeItemSearch"></md-input>
        </md-input-container>
        <md-list>
          <transition-group enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
          <md-list-item v-for="item in currentTransactionStoreItems" :key="item['.key']">
            <md-avatar>
              <img :src="item.image_url || 'https://placeimg.com/40/40/people/1'" alt="People">
            </md-avatar>
            <div class="md-list-text-container">
          <span>
            Item: {{item.name | capitalize}}
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
        </md-list>
      </div>
      <div class="col-xs">
        <transaction :transaction="currentTransaction"/>
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
            storeItemSearch: '',
        }
    },
    computed: {
      filterItems() {
          let items = this.currentTransaction.items;
          if(!items) return;
          let regExp = new RegExp(this.storeItemSearch.toLowerCase());
          if (this.storeItemSearch) {
            items = _.filter(items, item => {
              return regExp.test(item['name']);
            })
          }
          return _.chunk(items, 3);
      },
      ...mapGetters([
          'currentTransaction',
          'currentTransactionStore',
          'currentTransactionStoreItems',
          'authEmployee'
      ])
    },
    methods: {
      addTransactionItem(item) {
        if(!this.currentTransaction.items) {
          this.currentTransaction.items = {};
        }
        item.quantity -= 1;
        if(!this.currentTransaction.items[item['.key']]) {
          this.currentTransaction.items[item['.key']] = {
            item: item['.key'],
            quantity: 1,
            retail_price: item.retail_price,
            taxed: item.taxed,
            discounted: item.discounted,
          }

        } else {
            this.currentTransaction.items[item['.key']].quantity += 1;
        }
      },
    }
  }
</script>
