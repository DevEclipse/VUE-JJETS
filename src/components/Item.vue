<template>
  <display v-if="!currentItem" message="Item Not Found"/>
  <div v-else>
    <md-dialog  ref="addStoreItem">
      <md-toolbar>
        <div class="md-title" style="flex: 1;">
          Add Store Item
        </div>
        <div class="md-subhead">
          Item | {{storeItem.item = currentItem['.key']}}
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
    </md-dialog>
    <md-dialog ref="editItemDialog">
      <div v-if="item">
        <md-toolbar>
          <div class="md-title" style="flex: 1;">
            Edit
          </div>
          <div class="md-subhead">
            Item | {{item.name}}
          </div>
        </md-toolbar>
        <div style="margin: 1rem;">
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Cost Price
            </label>
            <md-input v-model="item.cost_price" type="number" step="10.00" min="0"></md-input>
          </md-input-container>
          <md-input-container>
            <label>
              <md-icon>store</md-icon>
              Image Url
            </label>
            <md-input v-model="item.image_url"></md-input>
          </md-input-container>
          <md-input-container>
            <label>
              <md-icon>store</md-icon>
              Description
            </label>
            <md-textarea v-model="item.description"></md-textarea>
          </md-input-container>

          <multiselect :options="allTags | keys"
                       v-model="item.tags"
                       :multiple="true"
                       :searchable="true"
                       :taggable="true"
                       :limit="5"
                       @tag="addTag"
                       tag-placeholder="Add this as new tag"
                       placeholder="Type to search or add tag"></multiselect>

          <md-button class="md-raised md-primary" style="width: 95%;" @click="updateItem(item)">
            Update
          </md-button>

        </div>
      </div>
    </md-dialog>

    <md-toolbar class="md-accent">
      <div class="md-title"  style="flex: 1;">
        {{currentItem.name | capitalize}}
      </div>
      <div v-if="authManager">
      <md-button v-if="currentItem.created_by == authManager['.key']" @click="openEditItem">
        Edit
      </md-button>
      <md-button @click="openAddStoreItem">
        Add To Your Stores
      </md-button>
      </div>
      <router-link class="md-button" :to="{name: 'manager',params: {manager: currentItem.created_by}}">
        Creator: {{currentItem.created_by}}
      </router-link>
    </md-toolbar>
    <ul>
      <li v-for="(store,index) in currentItem.stores">
        {{index}} {{store}}
      </li>
    </ul>


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
        'serverTime',
        'allTags'
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
        item: null,
      }
    },
    methods: {
      openAddStoreItem() {
        this.storeItem.retail_price = this.currentItem.cost_price * 1.5;
        this.$refs.addStoreItem.open();
      },
      openEditItem() {
        this.$refs.editItemDialog.open();
        this.item = _.clone(this.currentItem);
      },
      addToStore() {
        _.forEach(this.selectedStores,store => {
            this.currentItem.stores[store] = true;
            let storeFound = _.find(this.authManagerStores,['.key',store]);
            let storeItem = _.find(storeFound.items,['item',this.storeItem.item]);
            if(storeItem) {
                alert(`Item is already existing on ${store}`);
                return;
            }
            this.storeItem.store = store;
            this.storeItem.created_at = this.serverTime;
            this.storeItem.updated_at = this.serverTime;
            this.updateStoreItem(this.storeItem);
        });
        this.updateItem(this.currentItem);
      },
      ...mapActions([
        'addItem',
        'updateItem',
        'updateStoreItem',
        'addTag'
      ]),
    },
  }
</script>
