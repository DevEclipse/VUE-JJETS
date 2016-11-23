<template>
  <div>
    <router-link to="transactions" append>Transactions</router-link>
    <router-view :transactions="storeTransactions"/>
    <div>
      <h1> {{ store.manager }}</h1>
      <v-btn-link v-side-nav:addStoreItem="nav" large style="display: block">New Store Item</v-btn-link>
      <v-side-nav id="addStoreItem">
        <v-container>
          <h5> New Store Item </h5>
          <h5> Owner: {{owner}}</h5>
          <div class="input-field">
            <v-text-input v-model="newItem.name" required/>
            <label>Item Name</label>
          </div>
          <div class="input-field">
            <v-text-input v-model="newItem.image_url"/>
            <label>Image Url </label>
          </div>
          <div class="input-field">
            <v-text-input v-model="newItem.cost_price" type="number" step="10.01" required/>
            <label>Cost Price</label>
          </div>
          <div class="input-field">
            <v-text-input v-model="newStoreItem.retail_price" type="number" step="10.01" required/>
            <label>Retail Price</label>
          </div>
          <div class="input-field">
            <v-text-input v-model="newStoreItem.quantity" type="number" required/>
            <label>Quantity</label>
          </div>
          <div class="input-field">
            <button class="btn large" @click="addItem" style="display: block;"> Create </button>
          </div>
        </v-container>
      </v-side-nav>

      <div v-if="items">
        <vue-store-items :items="items" @updateItem="updateItem" @deleteItem="deleteItem"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'store',
    props: ['store','user','items'],
    computed: {
      ...mapGetters([
        'storeTransactions',
      ])
    },
    data() {
      return {
        transactionMode: false,
        newStoreItem: {
          quantity: '',
          retail_price: '',
          store: '',
        },
        newItem: {
          name: '',
          image_url: '',
          cost_price: '',
          created_by: '',
        },
        nav: {
          edge: 'right',
          fixed: false,
        }
      }
    },

    methods: {
      addItem() {
        this.newItem.created_by = this.user.username;
        this.newStoreItem.store = this.store['.key'];
        this.$emit('addItem',this.newStoreItem,this.newItem);
      },
      updateItem(item) {
        this.$emit('updateItem',item);
      },
      deleteItem(item) {
        this.$emit('deleteItem',item);
      },
    }
  }
</script>
