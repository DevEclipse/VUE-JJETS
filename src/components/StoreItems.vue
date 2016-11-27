<template>
  <div class="container" style="margin-top:1rem;">
    <div v-if="currentStore">

      <div v-if="currentStore.manager == authUser.username">

        <md-sidenav class="md-right md-fixed" ref="editStoreItemNav">
          <md-toolbar>
            <div class="md-title">
              Item: {{storeItem.item}}
            </div>
          </md-toolbar>

          <md-input-container style="margin: 20px;">
            <label>Retail Price</label>
            <md-input type="number" step="10.01" v-model.number="storeItem.retail_price" required></md-input>
          </md-input-container>

          <md-input-container style="margin: 20px;">
            <label>Quantity</label>
            <md-input type="number" min="1" v-model.number="storeItem.quantity" required></md-input>
          </md-input-container>

          <md-button class="md-raised md-accent" @click="editStoreItem">Save</md-button>
        </md-sidenav>

      </div>

      <vue-section-display v-if="currentStoreItems.length < 1" message="No Items Available"/>

      <div v-else class="row" v-for="item12 in chunkedItems">

        <div class="col-xs-12 col-md-3" v-for="item in item12" :key="'.key'">

          <store-item :item="item" @editItem="toggleEditStoreItemNav" @deleteItem="deleteStoreItem"></store-item>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import StoreItem from './StoreItem.vue'
  export default {
    name: 'store-items',
    components: {
      StoreItem
    },
    computed: {
      chunkedItems() {
        return _.chunk(this.currentStoreItems,4);
      },
      ...mapGetters([
        'authUser',
        'currentStore',
        'dataTagKeys',
        'currentStoreItems'
      ])
    },
    data() {
      return {
        storeItem: {},
      }
    },
    methods: {
      editStoreItem() {
        let {retail_price,quantity,item,store,created_date,updated_date} = this.storeItem;
        this.$store.dispatch('updateStoreItem',{retail_price,quantity,item,store,created_date,updated_date});
      },
      deleteStoreItem(storeItem) {
        this.$store.dispatch('deleteStoreItem',storeItem);
      },
      toggleEditStoreItemNav(storeItem) {
        this.$refs.editStoreItemNav.toggle();

        this.$set(this.$data,'storeItem',storeItem);
      },
    },
  }
</script>
