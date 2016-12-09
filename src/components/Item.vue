<template>
  <display v-if="!currentItem" message="Item Not Found"/>
  <div v-else>
    <md-dialog v-if="authManager" ref="addStock">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <div class="md-title" style="flex: 1;">
            Add Stock
          </div>
        </div>
        <div class="md-toolbar-container">
          <div class="md-subhead">
            Item | {{stock.item = currentItem['.key']}}
          </div>
        </div>
      </md-toolbar>
      <md-dialog-content style="padding: 3rem;">
        <md-input-container>
          <label>
            <md-icon>timeline</md-icon>
            Retail Price
          </label>
          <md-input v-model="stock.retail_price" type="number" step="10.00" min="0"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>timeline</md-icon>
            Quantity
          </label>

          <md-input v-model="stock.quantity" type="number" min="0"></md-input>
        </md-input-container>
        <md-switch v-model="stock.taxed">Taxed</md-switch>
        <md-switch v-model="stock.discounted">Discounted</md-switch>

        <multiselect :options="authManagerStores"
                     v-model="selectedStores"
                     placeholder="Select Stores"
                     key=".key"
                     label="name"
                     :multiple="true"
                     :searchable="true"></multiselect>

      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="addToStore">
          Add To Stores
        </md-button>
        <md-button class="md-raised md-warn" @click="$refs.addStock.close()">
          Cancel
        </md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog ref="editItemDialog">
      <div v-if="item">
        <md-toolbar>
          <div class="md-title" style="flex: 1;">
            Edit
          </div>
          <div class="md-subhead">
            Item | {{item['.key']}}
          </div>
        </md-toolbar>
        <md-dialog-content style="padding: 3rem;">
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Name
            </label>
            <md-input v-model="item.name"></md-input>
          </md-input-container>
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

        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-raised md-primary" @click="() => {updateItem(item); $refs.editItemDialog.close();}">
            Update
          </md-button>
          <md-button class="md-raised md-warn" @click="$refs.editItemDialog.close()">
            Cancel
          </md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>

    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">
          {{currentItem.name | capitalize}}
        </div>

        <span v-if="authManager" class="hidden-xs">

          <md-button v-if="currentItem.created_by == authManager['.key']" @click="openEditItem">
            <md-icon>edit</md-icon> Edit
          </md-button>

          <md-button v-if="authManagerStores.length" @click="openAddStock">
             <md-icon>store</md-icon> Add To Your Stores
          </md-button>
        </span>


        <span v-if="authManager" class="visible-xs">

          <md-button class="md-icon-button" v-if="currentItem.created_by == authManager['.key']" @click="openEditItem">
            <md-icon>edit</md-icon>
          </md-button>

          <md-button class="md-icon-button" v-if="authManagerStores.length" @click="openAddStock">
            <md-icon>store</md-icon>
          </md-button>
        </span>
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

          <md-list-item v-if="currentItemStocks" v-for="stock in currentItemStocks">

            <md-avatar>
              <img :src="findStore(stock.store).image_url || 'https://placeimg.com/40/40/people/1'" alt="People">
            </md-avatar>
            <div class="md-list-text-container">
              <span>{{findStore(stock.store).name | capitalize}}</span>
              <span>Retail Price: &#8369;{{stock.retail_price}}</span>
              <span>Stock: {{stock.quantity || 'Out of Stock' }}</span>
            </div>
            <router-link tag="md-button" class="md-icon-button md-list-action"
                         :to="{name: 'stocks', params: {store: stock.store},query: {searchKey: currentItem.name}}">
              <md-icon>info</md-icon>
            </router-link>
          </md-list-item>
          <md-list-item v-else>
            <span class="md-title">No Available Stores</span>
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
        'currentItemStocks',
        'authManager',
        'authManagerStores',
        'allStocks',
        'allTags',
        'allStores'
      ]),
    },
    data() {
      return {
        stock: {
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
      findStore(store) {
        return _.find(this.allStores,['.key',store]);
      },
      openAddStock() {
        this.stock.retail_price = this.currentItem.cost_price * 1.5;
        this.$refs.addStock.open();
      },
      openEditItem() {
        this.$refs.editItemDialog.open();
        this.item = _.clone(this.currentItem);
      },
      addToStore() {
        _.forEach(this.selectedStores, store => {
          let storeStocks = _.filter(this.allStocks, ['store', store['.key']]);
          console.log(storeStocks);
          let stock = _.find(storeStocks, ['item', this.stock.item]);
          if (stock) {
            alert(`Item is already existing on ${store.name}`);
            return;
          }
          this.stock.store = store['.key'];
          this.addStock(this.stock);
        });
      },
      ...mapActions([
        'addItem',
        'updateItem',
        'addStock',
        'addTag'
      ]),
    },
  }
</script>
