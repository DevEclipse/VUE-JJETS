<template>
  <div>

    <template v-if="authManager">

      <md-dialog ref="addItemDialog">
        <template v-if="storedItem">
          <md-toolbar>
            <div class="md-title" style="flex: 1;">
              Add Item
            </div>
            <div class="md-subhead">
              Created By: {{storedItem.created_by | capitalize}}
            </div>
          </md-toolbar>
          <md-dialog-content>
            <md-input-container>
              <label>
                <md-icon>store</md-icon>
                Item Name
              </label>
              <md-input v-model="storedItem.name" required></md-input>
            </md-input-container>
            <md-input-container>
              <label>
                <md-icon>timeline</md-icon>
                Cost Price
              </label>
              <md-input v-model="storedItem.cost_price" type="number" step="10.00" min="0" required></md-input>
            </md-input-container>
            <md-input-container>
              <label>
                <md-icon>store</md-icon>
                Image Url
              </label>
              <md-input type="url" v-model="storedItem.image_url"></md-input>
            </md-input-container>
            <md-input-container>
              <label>
                <md-icon>store</md-icon>
                Description
              </label>
              <md-textarea v-model="storedItem.description"></md-textarea>
            </md-input-container>


          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-raised md-primary" @click="() => { addItem(storedItem); $refs.addItemDialog.close();}">
              Create
            </md-button>
            <md-button class="md-raised md-warn" @click="$refs.addItemDialog.close()">
              Cancel
            </md-button>
          </md-dialog-actions>
        </template>
      </md-dialog>
      <md-dialog ref="editItemDialog">
        <template v-if="storedItem">
          <md-toolbar class="md-large">
            <div class="md-toolbar-container">
              <div class="md-title" style="flex: 1;">
                Edit
              </div>
            </div>
            <div class="md-toolbar-container">
              <div class="md-subhead">
                Item | {{storedItem['.key']}}
              </div>
            </div>
          </md-toolbar>
          <md-dialog-content>
            <md-input-container>
              <label>
                <md-icon>timeline</md-icon>
                Name
              </label>
              <md-input v-model="storedItem.name"></md-input>
            </md-input-container>
            <md-input-container>
              <label>
                <md-icon>timeline</md-icon>
                Cost Price
              </label>
              <md-input v-model="storedItem.cost_price" type="number" step="10.00" min="0"></md-input>
            </md-input-container>
            <md-input-container>
              <label>
                <md-icon>store</md-icon>
                Image Url
              </label>
              <md-input type="url" v-model="storedItem.image_url"></md-input>
            </md-input-container>
            <md-input-container>
              <label>
                <md-icon>store</md-icon>
                Description
              </label>
              <md-textarea v-model="storedItem.description"></md-textarea>
            </md-input-container>

          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-raised md-primary"
                       @click="() => {updateItem(storedItem); $refs.editItemDialog.close();}">
              Update
            </md-button>
            <md-button class="md-raised md-warn" @click="$refs.editItemDialog.close()">
              Cancel
            </md-button>
          </md-dialog-actions>
        </template>
      </md-dialog>
      <md-button class="md-fab md-mini md-fab-bottom-right"
                 style="position: fixed; z-index: 3;"
                 @click="openAddItem">
        <md-icon>add</md-icon>
      </md-button>

    </template>

    <template v-if="authCustomer">
      <md-sidenav class="md-fixed md-right" ref="buyItemStocks">
        <md-toolbar>
          <div class="md-toolbar-container md-title" v-if="storedItem">
            Available Stores for {{storedItem.name | capitalize}}
          </div>
        </md-toolbar>
        <md-list class="md-triple-line">
          <md-list-item v-for="stock in storedItemStocks" :key="stock['.key']">
            <md-avatar>
              <vue-image :image="findStore(stock.store).image_url" alt="Store"/>
            </md-avatar>
            <div class="md-list-text-container">
              <span>{{stock.retail_price ? `&#8369;${stock.retail_price}` : 'Free'}}</span>
              <span>Quantity: {{stock.quantity || 'Out of Stock'}}</span>
              <span>{{findStore(stock.store).name}}</span>
            </div>
            <md-button v-if="stock.quantity && !storedCartItems[stock['.key']]" class="md-icon-button md-list-action"
                       @click="() => {addItemToCart(stock); $refs.buyItemStocks.toggle();}">
              <md-icon>add</md-icon>
            </md-button>
            <router-link tag="md-button" class="md-icon-button"
                         v-if="findStore(stock.store).manager == authManager['.key']"
                         :to="{name: 'stocks', params: {store: stock.store}}">
              <md-icon>store</md-icon>
            </router-link>
          </md-list-item>
        </md-list>
      </md-sidenav>
    </template>

    <cards :list="items || allItems" :filters="filters || ['name','created_by']">
      <template scope="props">
        <md-toolbar class="md-accent md-large">
          <div class="md-toolbar-container">
            <div class="md-title" style="flex: 1;">{{props.data.name}}</div>
            <span v-if="authManager">
              <md-button v-if="props.data.created_by == authManager['.key']"
                         class="md-icon-button"
                         @click="openEditItem(props.data)">
                <md-icon>edit</md-icon>
              </md-button>
                <md-button class="md-icon-button" v-if="authCustomer"
                           @click="() => {storeItem(props.data); $refs.buyItemStocks.toggle();}">
                  <md-icon>add</md-icon>
                </md-button>
                </span>
          </div>
          <div class="md-toolbar-container">
            <div class="md-subhead" style="flex: 1;">Cost Price: {{props.data.cost_price ? `&#8369;${props.data.cost_price}`
              : 'Free'}}
            </div>
            <router-link tag="md-button" :to="{name: 'manager', params: {username: props.data.created_by}}">
              <md-icon>face</md-icon>
              Created By: {{props.data.created_by}}
            </router-link>
          </div>
        </md-toolbar>
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="16:9">
            <vue-image :image="props.data.image_url" alt="Item"></vue-image>
          </md-card-media>

          <md-card-area>
            <md-card-header>
              <div class="md-body-2">
                Description:
                <p>{{props.data.description || 'No Description'}}</p>
              </div>
            </md-card-header>
          </md-card-area>
        </md-card-media-cover>
        <md-card-media-actions>

          <span class="md-subhead">
            <span style="font-weight: bold">Created: </span>{{props.data.created_date | moment("from")}}
          </span>
          <span class="md-subhead">
            <span style="font-weight: bold">Updated: </span>{{props.data.updated_date | moment("from")}}
          </span>
        </md-card-media-actions>
      </template>
    </cards>

  </div>

</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex';
  export default {
    name: 'items',
    props: ['items','filters','authManager','authCustomer'],
    computed: {
      ...mapGetters([
        'allItems',
        'storedItem',
        'storedItemStocks',
        'allStores',
        'storedCartItems'
      ]),
    },
    methods: {
      findStore(store) {
        return _.find(this.allStores, ['.key', store]);
      },
      openEditItem(item) {
        this.storeItem(item);
        console.log(this.storedItem);
        this.$refs.editItemDialog.open();
      },
      openAddItem(){
        this.storeItem();
        this.$refs.addItemDialog.open()
      },
      ...mapActions([
        'addItem',
        'updateItem',
        'addStock',
        'storeItem',
        'addItemToCart'
      ]),
    },
  }
</script>
