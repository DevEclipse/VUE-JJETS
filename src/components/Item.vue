<template>
  <display v-if="!currentItem" message="Item Not Found"/>
  <div v-else>
    <md-dialog ref="addStoreItem">
      <md-toolbar>
        <div class="md-title" style="flex: 1;">
          Add Store Item
        </div>
        <div class="md-subhead">
          Item | {{storeItem.item = currentItem['.key']}}
        </div>
      </md-toolbar>
      <div style="margin: 1rem;">
        <md-input-container>
          <label>
            <md-icon>timeline</md-icon>
            Retail Price
          </label>
          <md-input v-model="storeItem.retail_price" type="number" step="10.00" min="0"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>timeline</md-icon>
            Quantity
          </label>

          <md-input v-model="storeItem.quantity" type="number" min="0"></md-input>
        </md-input-container>
        <md-switch v-model="storeItem.taxed">Taxed</md-switch>
        <md-switch v-model="storeItem.discounted">Discounted</md-switch>
        <div v-if="authManager">

          <multiselect :options="authManagerStores | keys"
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
            <md-input type="url" v-model="item.image_url"></md-input>
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
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">
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
      </div>
    </md-toolbar>

    <div class="row">
      <div class="col-xs-12 center-xs middle-xs col-md">
        <md-card md-with-hover>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">&#8369;{{currentItem.cost_price}}</div>
              <div class="md-subhead">Cost Price</div>
            </md-card-header-text>
          </md-card-header>
          <md-card-media-cover>
            <md-card-media>
              <img :src="currentItem.image_url || '//placehold.it/1920x1080'"/>
            </md-card-media>
          </md-card-media-cover>
          <md-card-content>
            <md-card-header>
              <div class="md-title">Description</div>
              <p class="md-caption">
                {{currentItem.description || 'No Description'}}
              </p>
            </md-card-header>
            <md-card-header>
              <md-card-header-text>
                <div class="md-subhead">
                  <span style="font-weight: bold;">
                    Created:
                  </span>
                  {{currentItem.created_date | moment("from")}}
                </div>
              </md-card-header-text>
              <md-card-header-text>
                <div class="md-subhead">
                  <span style="font-weight: bold;">
                    Updated:
                  </span>
                  {{currentItem.updated_date | moment("from")}}
                </div>
              </md-card-header-text>
              <md-card-header-text>
                <span style="font-weight: bold;">Tags: </span>
                <span v-if="!currentItem.tags">
                  No Tags
                </span>
                <span v-else v-for="tag in currentItem.tags">
                  <router-link :to="{name: 'tag',params: {tag: tag}}">{{tag}}</router-link>
                </span>
              </md-card-header-text>
            </md-card-header>

          </md-card-content>
        </md-card>
      </div>

      <div class="col-xs-12 col-md">
        <md-list class="col-xs-12 col-md md-triple-line">
          <md-subheader>Available Stores</md-subheader>
          <md-list-item v-for="store in currentItemStores">
            <md-avatar>
              <img :src="store.image_url || 'https://placeimg.com/40/40/people/1'" alt="People">
            </md-avatar>
            <div class="md-list-text-container">
          <span>
            {{store.name | capitalize}}
          </span>
              <span>
            Retail Price: &#8369;{{store.items[currentItem['.key']].retail_price}}
          </span>
              <span>
            Stock: {{store.items[currentItem['.key']].quantity || 'Out of Stock' }}
          </span>
            </div>
            <router-link tag="md-button" class="md-icon-button md-list-action"
                         :to="{name: 'storeItems', params: {store: store['.key']},query: {searchKey: currentItem['.key']}}">
              <md-icon>info</md-icon>
            </router-link>
          </md-list-item>
        </md-list>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'item',
    computed: {
      ...mapGetters([
        'currentItem',
        'currentItemStores',
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
        _.forEach(this.selectedStores, store => {
          let storeFound = _.find(this.authManagerStores, ['.key', store]);
          let storeItem = _.find(storeFound.items, ['item', this.storeItem.item]);
          if (storeItem) {
            alert(`Item is already existing on ${store}`);
            return;
          }
          this.storeItem.store = store;
          this.storeItem.created_at = this.serverTime;
          this.storeItem.updated_at = this.serverTime;
          this.updateStoreItem(this.storeItem);
        });
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
