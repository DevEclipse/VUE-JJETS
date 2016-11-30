<template>
  <div v-if="!currentManager">Loading...</div>
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
      <div style="margin: 10px;">
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
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
      computed: {
        ...mapGetters([
            'currentManager',
        ])
      }
  }
</script>

