<template>
  <display v-if="!currentItem" message="Item Not Found"/>
  <div v-else>
    <div class="row">
      <div class="col-xs">

      </div>
      <div class="col-xs">

      </div>
    </div>
    <md-sidenav class="md-right" ref="addStoreItemDrawer">
      <md-toolbar>
        <div class="md-title">
          Add Store Item
          <div class="md-subhead">
            Item | {{storeItem.item = currentItem['.key']}}
          </div>
        </div>
      </md-toolbar>
      <div style="margin: 1rem;">
        <md-input-container >
          <label>
            <md-icon>timeline</md-icon>
            Retail Price
          </label>
          <md-input v-model="storeItem.retail_price" type="number" step="10.00" min="0"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>timeline</md-icon>
            Quantity
          </label>
          <md-input v-model="storeItem.quantity" type="number" min="0"></md-input>
        </md-input-container>
        <md-button class="md-raised md-primary" style="width: 95%;" @click="addItem(item)">
          Add To Store
        </md-button>

      </div>
    </md-sidenav>
  </div>

</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'item',
    computed: {
      ...mapGetters([
        'currentItem',
      ]),
    },
    methods: {
      ...mapActions([
         'addItem',
      ]),
    },
    data() {
      return {
        storeItem: {
          item: '',
          retail_price: '',
          quantity: '',
          store: '',
        },
      }
    }
  }
</script>
