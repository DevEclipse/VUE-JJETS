<template>
  <display v-if="!currentManager" message="No Manager Found"/>
  <div v-else>
    <md-sidenav class="md-right" ref="addItemDrawer">
      <md-toolbar>
        <div class="md-title">
          Add Item
          <div class="md-subhead">
            Created By | {{item.created_by = authUser.profiles.manager | capitalize}}
          </div>
        </div>
      </md-toolbar>
      <div style="margin: 1rem;">
        <md-input-container >
          <label>
            <md-icon>store</md-icon>
            Item Name
          </label>
          <md-input v-model="item.name"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>timeline</md-icon>
            Cost Price
          </label>
          <md-input v-model="item.cost_price" type="number" step="10.00" min="0"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>store</md-icon>
            Image Url
          </label>
          <md-input v-model="item.image_url"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>store</md-icon>
            Description
          </label>
          <md-textarea v-model="item.description"></md-textarea>
        </md-input-container>
        <md-button class="md-raised md-primary" style="width: 95%;" @click="addItem(item)">
          Create
        </md-button>

      </div>
    </md-sidenav>

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
        <md-button class="md-raised md-primary" style="width: 95%;" @click="addStore(store)">
          Create
        </md-button>
      </div>
    </md-sidenav>
    <div class="md-display-2 row " style="padding: 1rem; background: #009688; color: white;">
      <div class="col-xs">{{currentManager['.key'] | capitalize}}</div>
      <div class="col-xs end-xs">
        <router-link :to="{name: 'user', params: {username: currentManager['.key']}}" class="md-button">
          Go To User Profile
        </router-link>
      </div>
    </div>
    <md-tabs md-fixed class="md-accent">
      <md-tab md-label="Items" md-icon="shop">
        <md-list>
          <md-input-container style="margin: 1rem;">
            <label>
              <md-icon>search</md-icon>
              Search Item
            </label>
            <md-input></md-input>
          </md-input-container>
          <md-subheader>
            <span style="flex: 1">
              Items | {{currentManagerItems | count}}
            </span>
            <md-button v-if="authUser.profiles.manager" class="md-icon-button md-accent" @click="toggleAddItem">
              <md-icon>add</md-icon>
            </md-button>
          </md-subheader>
          <div v-if="currentManagerItems.length">
            <md-list-item v-for="item in currentManagerItems">
              <md-avatar>
                <img :src="item.image_url || '//placehold.it/250x250'" :alt="item['.key']">
              </md-avatar>

              <span>{{item.name}}</span>
              <span>&#8369;{{item.cost_price}}</span>

              <router-link :to="{name: 'item', params: {item: item['.key']}}" class="md-button md-icon-button md-list-action">
                <md-icon class="md-primary">info</md-icon>
              </router-link>
            </md-list-item>
          </div>
          <md-list-item v-else>
            No Items
          </md-list-item>
        </md-list>
      </md-tab>
      <md-tab md-label="Stores" md-icon="store">
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
      </md-tab>
      <md-tab md-label="Employees" md-icon="face">
        <md-list>
          <md-input-container style="margin: 1rem;">
            <label>
              <md-icon>search</md-icon>
              Search Employee
            </label>
            <md-input></md-input>
          </md-input-container>
          <md-subheader>
            <span style="flex: 1">
              Employees | {{currentManagerEmployees | count}}
            </span>
            <md-button class="md-icon-button md-accent">
              <md-icon>search</md-icon>
            </md-button>
          </md-subheader>

          <div v-if="currentManagerEmployees.length">
            <md-list-item v-for="store in currentManagerEmployees">
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/5" alt="People">
              </md-avatar>

              <span>Abbey Christansen</span>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">chat_bubble</md-icon>
              </md-button>
            </md-list-item>
          </div>
          <md-list-item v-else>
            No Employees
          </md-list-item>
        </md-list>
      </md-tab>
    </md-tabs>

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    data() {
      return {
        item: {
          name: '',
          cost_price: '',
          image_url: '',
          description: '',
          created_by: '',
        },
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
      toggleAddItem() {
        this.$refs.addItemDrawer.toggle();
      },
      toggleAddStore() {
        this.$refs.addStoreDrawer.toggle();
      },
      ...mapActions([
        'addStore',
        'addItem',
      ])
    }
  }
</script>

