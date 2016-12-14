<template>
  <div>
    <md-dialog ref="addStoreDialog">
      <template v-if="storedStore">
      <md-toolbar>
        <div class="md-title">
          Add Store | {{storedStore.manager | capitalize}}
        </div>
      </md-toolbar>
      <md-dialog-content style="padding: 2rem;">
        <md-input-container>
          <label>
            <md-icon>store</md-icon>
            Store Name
          </label>
          <md-input v-model="storedStore.name"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>timeline</md-icon>
            Tax Rate
          </label>
          <md-input v-model="storedStore.tax_rate" type="number" step="0.01" max="1" min="0"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>timeline</md-icon>
            Discount Rate
          </label>
          <md-input v-model="storedStore.discount_rate" type="number" step="0.01" max="1" min="0"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>store</md-icon>
            Location
          </label>
          <md-input v-model="storedStore.location"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>store</md-icon>
            Image Url
          </label>
          <md-input type="url" v-model="storedStore.image_url"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>store</md-icon>
            Description
          </label>
          <md-textarea v-model="storedStore.description"></md-textarea>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="addNewStore">
          Create
        </md-button>
        <md-button class="md-raised md-warn" @click="$refs.addStoreDialog.close()">
          Cancel
        </md-button>
      </md-dialog-actions>
      </template>
    </md-dialog>

    <md-button v-if="authManager" class="md-fab md-mini md-fab-bottom-right" style="position: fixed; z-index: 3;" @click="createStore">
      <md-icon>add</md-icon>

  </div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'stores',
    props: ['stores','filters','manager','authManager'],
    computed: {
      ...mapGetters([
        'allStores',
        'storedStore'
      ])
    },
    data() {
      return {
        storeSearch: '',
      }
    },
    methods: {
      createStore() {
        this.storeStore();
        console.log(this.storedStore);
        this.$refs.addStoreDialog.open();
      },
      addNewStore() {
        this.addStore(this.storedStore);
        console.log(this.storedStore);
        this.$refs.addStoreDialog.close();
      },
      ...mapActions([
        'addStore',
        'storeStore'
      ]),
    }
  }
</script>
