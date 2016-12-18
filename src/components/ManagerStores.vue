<template>
  <div>
    <main-dialog ref="mainDialog"
                 :type="dialogType"
                 :valid="valid"
                 @close="closeDialog"
                 @cancel="cancelDialog">

      <template v-if="storedStore">
        <template v-if="dialogType != 'delete'">

          <reg-exp-input label="Name"
                         icon="edit"
                         v-model="storedStore.name"
                         :regExp="/^[A-Za-z][A-Za-z0-9 -]*$/"
                         @validated="validation => storeNameValid = validation"
                         :required="true"
                         :length="3"
                         regExpMessage="Name must not contain symbols"/>

          <reg-exp-input label="Location"
                         icon="location_on"
                         v-model="storedStore.location"
                         :regExp="/^[A-Za-z0-9 -]*$/"
                         @validated="validation => storeLocationValid = validation"
                         :required="true"
                         :length="3"
                         regExpMessage="Location must not contain symbols"/>

          <max-input icon="trending_up" v-model="storedStore.tax_rate" label="Tax Rate" :max="1" :step="0.01" :float="true">
            ({{storedStore.tax_rate | percent}})
          </max-input>

          <max-input icon="trending_down" v-model="storedStore.discount_rate" label="Discount Rate" :max="1" :step="0.01" :float="true">
            ({{storedStore.discount_rate | percent}})
          </max-input>

          <md-input-container>
            <label>
              <md-icon>photo</md-icon>
              Image Url
            </label>
            <md-input type="url" v-model="storedStore.image_url">
            </md-input>
          </md-input-container>

          <md-input-container>
            <label>
              <md-icon>content_paste</md-icon>
              Description
            </label>
            <md-textarea v-model="storedStore.description">
            </md-textarea>
          </md-input-container>

        </template>
        <template v-else>
          <div style="padding: 1rem">
         <p> Are you sure that you wanted to delete this store? (Store: {{storedStore.name}}) </p>
          </div>
          <template v-if="storedStoreStocks.length">
            <p style="color: teal">
              All Stocks for this item must be moved to another store.
            </p>

          <div class="md-title">Select Merge Store</div>
          <multiselect v-if="otherStores.length" :options="otherStores"
                       v-model="selectedStore"
                       :searchable="true"
                       :allow-empty="false"
                       deselect-label="You must select one store"
                       label="name"
                       name="name"
                       placeholder="Select One Store"></multiselect>
          <span v-else style="color: red;">Can't Delete this store you must have more than 1 store to merge your stocks</span>
          </template>
        </template>
      </template>

    </main-dialog>

    <md-button class="md-fab md-mini md-fab-bottom-right"
               style="position: fixed; z-index: 3;" @click="openDialog('add')">
      <md-icon>add</md-icon>
    </md-button>

    <stores :stores="currentManagerStores">
      <template slot="buttons" scope="{store}">
        <md-button class="md-icon-button md-raised md-accent" v-if="!loadingStocks" @click="showStocks(store)">
        <md-icon>shopping_basket</md-icon>
        <md-tooltip>Show Store Stocks</md-tooltip>
      </md-button>
        <md-button class="md-icon-button md-raised md-accent" v-if="!loadingStocks" @click="showTransactions(store)">
          <md-icon>receipt</md-icon>
          <md-tooltip>Show Store Transactions</md-tooltip>
        </md-button>
        <md-button class="md-icon-button md-raised md-accent"  @click="openDialog('edit',store)">
          <md-icon>edit</md-icon>
          <md-tooltip>Edit Store Information</md-tooltip>
        </md-button>
        <md-button class="md-icon-button md-raised md-accent" @click="openDialog('delete',store)">
          <md-icon>delete</md-icon>
          <md-tooltip>Delete this Store </md-tooltip>
        </md-button>
      </template>
      <template scope="{store}">
        <md-card-media-actions>
        <div class="md-subheading">
          Total Stocks: {{storedStoreStocks | count}}
        </div>
        <div class="md-subheading">
          Total Transactions: {{storedStoreTransactions | count}}
        </div>
        </md-card-media-actions>
      </template>
    </stores>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  import Stores from './Stores.vue';
  export default {
    name: 'manager-stores',
    components: {
      Stores
    },
    computed: {
      otherStores() {
        return _.filter(this.currentManagerStores,store => {
           return store['.key'] != this.storedStore['.key'];
        });
      },
      valid() {
        return this.dialogType != 'delete' ? this.storeNameValid && this.storeLocationValid : !this.storedStoreStocks.length || this.selectedStore != null;
      },
      ...mapGetters([
        'currentManagerStores',
        'storedStore',
        'storedStoreStocks',
        'storedStoreTransactions'
      ])
    },
    data() {
      return {
        dialogType: 'add',
        storeNameValid: false,
        storeLocationValid: false,
        selectedStore: null,
        loadingStocks: false,
      }
    },
    methods: {
      showStocks(store) {
        this.loadingStocks = true;
        this.addAlert({message: `Loading... ${store.name} Stocks`,callback: () => {
          this.storeStore(store);
          this.$router.push({name: 'storeStocks',params: {store: store['.key']}});
          this.addAlert({message: `${store.name} Stocks Loaded`});
        }});
      },
      showTransactions(store) {
        this.loadingStocks = true;
        this.addAlert({message: `Loading... ${store.name} Transactions`,callback: () => {
          this.storeStore(store);
          this.$router.push({name: 'storeTransactions',params: {store: store['.key']}});
          this.addAlert({message: `${store.name} Transactions Loaded`});
        }});
      },
      openDialog(action,store) {
        this.selectedStore = null;
        this.storeNameValid = false;
        this.storeLocationValid = false;
        this.dialogType = action;
        this.storeStore(store);
        this.$refs.mainDialog.openDialog();
        this.addAlert({message: `${action == 'delete' ? 'Delet' : _.upperFirst(action)}ing Store: ${store ? store.name : 'New Store'}`})
      },
      closeDialog() {
        if (this.dialogType == 'edit') {
          this.updateStore(this.storedStore);
          this.addAlert({message: ` ${this.storedStore.name} Store Updated`})
        } else if(this.dialogType == 'add') {
          this.addStore(this.storedStore);
          this.addAlert({message: ` ${this.storedStore.name} Store Created`})
        } else {
          if(this.storedStoreStocks.length) {
            this.mergeStoreStocks({stocks: this.storedStoreStocks, mergeStore: this.selectedStore});
            this.addAlert({message: `${this.storedStore.name} Store Stocks Merged to ${this.selectedStore.name}`})
          }
          this.deleteStore(this.storedStore);
          this.addAlert({message: `${this.storedStore.name} Store Deleted`})
        }
      },
      cancelDialog() {
        this.addAlert({message: `Store ${_.upperFirst(this.dialogType)} Cancelled`})
      },
      ...mapActions([
        'addStore',
        'updateStore',
        'deleteStore',
        'storeStore',
        'mergeStoreStocks',
        'addAlert',
      ]),
    }
  }
</script>
