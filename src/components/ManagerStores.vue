<template>
  <div>
    <md-list>
      <md-input-container style="margin: 1rem;">
        <label>
          <md-icon>search</md-icon>
          Search Store
        </label>
        <md-input></md-input>
      </md-input-container>
      <md-subheader>
            <span style="flex: 1">
              Stores | {{currentManagerStores | count}}
            </span>
        <md-button v-if="authUser.profiles.manager" class="md-icon-button md-accent"  @click="toggleAddStore">
          <md-icon>add</md-icon>
        </md-button>
      </md-subheader>

      <div v-if="currentManagerStores.length">
        <md-list-item v-for="store in currentManagerStores">
          <md-avatar>
            <img :src="store.image_url || 'https://placeimg.com/40/40/people/5'" alt="People">
          </md-avatar>

          <span>{{store.name}}</span>
          <span> Items in Store: {{store.items | toArray | count}}</span>
          <router-link :to="{name: 'store', params: {store: store['.key']}}" class="md-button md-icon-button md-list-action">
            <md-icon class="md-primary">info</md-icon>
          </router-link>
        </md-list-item>
      </div>
      <md-list-item v-else>
        No Stores
      </md-list-item>
    </md-list>
    <md-sidenav class="md-right" ref="addStoreDrawer">
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
    </md-sidenav>
  </div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
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
      }
    },
    computed: {
      ...mapGetters([
        'currentManager',
        'currentManagerStores',
        'currentManagerItems',
        'currentManagerEmployees',
        'authUser'
      ])
    },
    methods: {
      toggleAddStore() {
        this.$refs.addStoreDrawer.toggle();
      },
      updateStoresOnManager() {
        let key = `${this.store.manager}_${this.store.name}`.replace(/\s/g, "").toLowerCase();
        if(!this.currentManager.stores) {
          this.currentManager.stores = {};
        }
        this.currentManager.stores[key] = true;
        this.updateManager(this.currentManager);

        this.addStore(this.store);
      },
      ...mapActions([
        'addStore',
        'updateManager',
      ])
    }
  }
</script>
