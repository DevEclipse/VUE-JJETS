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
    </md-button>

    <cards v-if="allStores.length" :list="stores || allStores" :filters="filters || ['name','manager']">
      <template scope="props">
        <md-toolbar class="md-accent md-large">
          <div class="md-toolbar-container">
            <div class="md-title"  style="flex: 1">
              {{props.data.name}}
            </div>

            <router-link tag="md-button" :to="{name: 'store',params: {store: props.data['.key']}}"
                         class="md-icon-button">
              <md-icon>info</md-icon>
            </router-link>
          </div>
          <div class="md-toolbar-container">
           <div class="md-subhead" style="flex: 1;"> Location: {{props.data.location || 'Unknown Location'}} </div>
            <router-link tag="md-button" :to="{name: 'manager', params: {username: props.data.manager}}">
              Manager: {{props.data.manager | capitalize}}
            </router-link>
          </div>
        </md-toolbar>
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="16:9">
            <vue-image :image="props.data.image_url" alt="Store"></vue-image>
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
          <div class="md-subheading">Tax Rate:
            <span class="md-caption">
            {{props.data.tax_rate | percent}}</span></div>
          <div class="md-subheading">Discount Rate:
            <span class="md-caption">
            {{props.data.discount_rate | percent}}</span></div>
        </md-card-media-actions>
        <md-card-media-actions>
          <div class="md-subheading">Created:
            <span class="md-caption">
            {{props.data.created_date | moment("from")}}</span></div>
          <div class="md-subheading">Updated:
            <span class="md-caption">
            {{props.data.updated_date | moment("from")}}</span></div>
        </md-card-media-actions>
      </template>
    </cards>
    <display v-else message="No Stores Yet"/>
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
