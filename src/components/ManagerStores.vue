<template>
  <div>

      <md-dialog ref="addStoreDialog">
      <md-toolbar>
        <div class="md-title">
          Add Store | {{store.manager = authManager['.key'] | capitalize}}
        </div>
      </md-toolbar>
      <div style="margin: 10px;">
        <md-input-container >
          <label>
            <md-icon>store</md-icon>
            Store Name
          </label>
          <md-input v-model="store.name"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>timeline</md-icon>
            Tax Rate
          </label>
          <md-input v-model="store.tax_rate" type="number" step="0.01" max="1" min="0"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>timeline</md-icon>
            Discount Rate
          </label>
          <md-input v-model="store.discount_rate" type="number" step="0.01" max="1" min="0"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>store</md-icon>
            Location
          </label>
          <md-input v-model="store.location"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>store</md-icon>
            Image Url
          </label>
          <md-input type="url" v-model="store.image_url"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>store</md-icon>
            Description
          </label>
          <md-textarea v-model="store.description"></md-textarea>
        </md-input-container>
        <md-button class="md-raised md-primary" style="width: 95%;" @click="addStore(store)">
          Create
        </md-button>
      </div>
    </md-dialog>

    <md-button class="md-fab md-mini md-fab-bottom-right" style="position: fixed; z-index: 3;" @click="$refs.addStoreDialog.open();">
      <md-icon>add</md-icon>
    </md-button>

      <stores :stores="currentManagerStores"/>

  </div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'manager-stores',
    data() {
      return {
        store: {
          manager: '',
          name: '',
          image_url: '',
          description: '',
          tax_rate: '',
          discount_rate: '',
          location: '',
        },
        storeSearch: '',
      }
    },
    computed: {
      ...mapGetters([
        'currentManager',
        'currentManagerStores',
        'authManager'
      ])
    },
    methods: {
      ...mapActions([
        'addStore',
      ]),
    }
  }
</script>
