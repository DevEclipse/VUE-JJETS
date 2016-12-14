<template>
  <div>
    <main-dialog ref="mainDialog"
                 :type="dialogType"
                 @close="updateOrAdd"
                 @cancel="addAlert({message: `Item ${dialogType} Cancelled`})"
                 :customer="authCustomer">
      <template v-if="storedItem">
        <template v-if="dialogType != 'remove'">
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Name
            </label>
            <md-input v-model="storedItem.name">
            </md-input>
          </md-input-container>
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Cost Price
            </label>
            <md-input v-model="storedItem.cost_price"
                      type="number" step="10.00" min="0">
            </md-input>
          </md-input-container>
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Image Url
            </label>
            <md-input type="url" v-model="storedItem.image_url">
            </md-input>
          </md-input-container>
          <md-input-container>
            <label>
              <md-icon>timeline</md-icon>
              Description
            </label>
            <md-textarea v-model="storedItem.description">
            </md-textarea>
          </md-input-container>
        </template>
      </template>
    </main-dialog>

    <md-button v-if="authManager"
               class="md-fab md-mini md-fab-bottom-right"
               style="position: fixed; z-index: 3;" @click="createItem">
      <md-icon>add</md-icon>
    </md-button>
    <chunked-rows :list="allItems" :searchKey="'name'">
      <template scope="props">
        <item v-for="item in props" :item="item" @edit="editItem">

        </item>
      </template>
    </chunked-rows>

  </div>

</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex';
  import Item from './Item.vue';

  export default {
    name: 'items',
    props: ['items','filters','authManager','authCustomer'],
    components: {
      Item
    },
    computed: {
      ...mapGetters([
        'allItems',
        'storedItem',
        'storedItemStocks',
        'allStores',
        'storedCartItems',
      ]),
    },
    data() {
        return {
          dialogType: 'add',
        }
    },
    methods: {
      editItem(item) {
        this.dialogType = 'edit';
        this.storeItem(item);
        this.$refs.mainDialog.openDialog();
        this.addAlert({message: `Editing Item: ${item.name}`})
      },
      createItem() {
        this.dialogType = 'add';
        this.storeItem();
        this.$refs.mainDialog.openDialog();
        this.addAlert({message: `Creating Item`})
      },
      updateOrAdd() {
        if(this.dialogType == 'edit') {
          this.updateItem(this.storedItem);
          this.addAlert({message: `Item Updated: ${this.storedItem.name}`})
        } else {
          this.addItem(this.storedItem);
          this.addAlert({message: `Added Item: ${this.storedItem.name}`})
        }
      },
      ...mapActions([
        'addItem',
        'updateItem',
        'addStock',
        'storeItem',
        'addItemToCart',
        'addAlert'
      ]),
    },
  }
</script>
