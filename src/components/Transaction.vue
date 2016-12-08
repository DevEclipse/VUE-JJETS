<template>
  <display v-if="!transaction" message="Create a Transaction"/>
  <div v-else >
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">Transaction: {{transaction['.key']}}</div>
      </div>
    </md-toolbar>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head> Item </md-table-head>
          <md-table-head>Retail Price</md-table-head>
          <md-table-head>Quantity </md-table-head>
          <md-table-head>Item Total</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body v-if="transaction.items">
        <md-table-row v-for="item in transaction.items" :key="item.item">
          <md-table-cell>
            <router-link :to="{name: 'storeItems', params: {store: store['.key']},query: {searchKey: item.item}}">
              {{item.item}}
            </router-link></md-table-cell>
          <md-table-cell>{{store.items[item.item].retail_price}}</md-table-cell>
          <md-table-cell>
            <md-input-container v-if="$route.name == 'pos'">
              <md-input
                :name="item.item"
                v-model.lazy="item.quantity"  @change="updateStoreItem">
              </md-input>
            </md-input-container>
            <span v-else>{{item.quantity}}</span>
          </md-table-cell>
          <md-table-cell>{{store.items[item.item].retail_price * item.quantity}}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'transaction',
    props: ['transaction','store'],
    computed: {
      updateStoreItem() {

      },
    },
    methods: {
      ...mapActions([
        'updateTransaction',
        'updateStore',
      ]),
    }
  }
</script>
