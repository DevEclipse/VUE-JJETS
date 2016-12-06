<template>
  <div>

      <md-dialog ref="addStore">
      <md-toolbar>
        <div class="md-title">
          Add Store | {{store.manager = authUser.profiles.manager | capitalize}}
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
            Image Url
          </label>
          <md-input v-model="store.image_url"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>store</md-icon>
            Description
          </label>
          <md-textarea v-model="store.description"></md-textarea>
        </md-input-container>
        <md-button class="md-raised md-primary" style="width: 95%;" @click="updateStoresOnManager">
          Create
        </md-button>
      </div>
    </md-dialog>

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
        },
        storeSearch: '',
      }
    },
    computed: {
      ...mapGetters([
        'currentManager',
        'currentManagerStores',
        'authUser'
      ])
    },
    methods: {
      updateStoresOnManager() {
        let key = `${this.store.manager}_${this.store.name}`.replace(/\s/g, "").toLowerCase();
        if(!this.currentManager.stores) {
          this.currentManager.stores = {};
        }
        this.currentManager.stores[key] = true;
        this.updateManager(this.currentManager);

        this.addStore(this.store);
        this.closeAddStore();
      },
      ...mapActions([
        'addStore',
        'authUser',
        'currentManager',
        'updateManager',
      ]),
    }
  }
</script>
