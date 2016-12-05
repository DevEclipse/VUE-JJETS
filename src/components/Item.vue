<template>
  <display v-if="!currentItem" message="Item Not Found"/>
  <div v-else>
    <md-toolbar class="md-accent">
      <div class="md-title">
        {{currentItem.name | capitalize}}
      </div>
      <span style="flex: 1"/>
      <md-button @click="toggleAddStoreItemDrawer">
        Add To Your Stores
      </md-button>
      <router-link class="md-button" :to="{name: 'manager',params: {manager: currentItem.created_by}}">
        Go To Creator
      </router-link>
    </md-toolbar>
    <ul>
      <li v-for="(store,index) in currentItem.stores">
        {{index}} {{store}}
      </li>
    </ul>
    <md-sidenav class="md-right" ref="addStoreItemDrawer">
      <md-toolbar>
        <div class="md-title">
          Add Store Item
          <div class="md-subhead">
            Item | {{storeItem.item = currentItem['.key']}}
          </div>
        </div>
      </md-toolbar>
      <div style="margin: 1rem;">
        <md-input-container >
          <label>
            <md-icon>timeline</md-icon>
            Retail Price
          </label>
          <md-input v-model="storeItem.retail_price" type="number" step="10.00" min="0"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>timeline</md-icon>
            Quantity
          </label>

          <md-input v-model="storeItem.quantity" type="number" min="0"></md-input>
        </md-input-container>
        <md-switch v-model="storeItem.taxed">Taxed</md-switch>
        <md-switch v-model="storeItem.discounted">Discounted</md-switch>
        <div  v-if="authManager">
        <multiselect :options="authManager.stores | toIndex"
                     v-model="selectedStores"
                     :multiple="true"
                     :searchable="true"></multiselect>
        </div>
        <md-button class="md-raised md-primary" style="width: 95%;" @click="addToStore">
          Add To Store
        </md-button>

      </div>
    </md-sidenav>
    <md-sidenav class="md-right" ref="editItem">
      <div v-if="storeItem">
        <md-toolbar>
          <div class="md-title">
            Edit Store Item
            <div class="md-subhead">
              Item | {{currentItem['.key'] | capitalize}}
            </div>
          </div>
        </md-toolbar>
        <div style="margin: 1rem;">
          <md-input-container >
            <label>
              <md-icon>timeline</md-icon>
              Cost Price
            </label>
            <md-input v-model.lazy="currentItem.cost_price" @change="updateItem(currentItem)" type="number" step="10.00" min="0"></md-input>
          </md-input-container>
        </div>
      </div>
    </md-sidenav>
  </div>

</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'item',
    computed: {
      ...mapGetters([
        'currentItem',
        'authManager',
        'authManagerStores',
        'serverTime'
      ]),
    },
    methods: {
      toggleAddStoreItemDrawer() {
        this.storeItem.retail_price = this.currentItem.cost_price * 1.5;
        this.$refs.addStoreItemDrawer.toggle();
      },
      toggleEditItem() {
        this.$refs.editItem.toggle();
      },
      addToStore() {
        _.forEach(this.selectedStores,store => {
          console.log(this);
            this.currentItem.stores[store] = true;
            let storeFound = _.find(this.authManagerStores,['.key',store]);
            this.storeItem.store = storeFound['.key'];
            if(!storeFound.items) {
                storeFound.items = {};
            }
              storeFound.items[this.storeItem.item] = this.storeItem;
            console.log(storeFound);
            this.updateStore(storeFound);
        });

        this.updateItem(this.currentItem);
      },
      ...mapActions([
        'addItem',
        'updateItem',
        'updateStore',
      ]),
    },
    data() {
      return {
        storeItem: {
          item: '',
          retail_price: '',
          quantity: 0,
          store: '',
          taxed: true,
          discounted: false,
          created_at: '',
          updated_at: '',
        },
        selectedStores: [],
      }
    }
  }
</script>
