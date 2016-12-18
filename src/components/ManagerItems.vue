<template>
<div>

  <main-dialog ref="mainDialog"
               :type="dialogType"
               :valid="valid"
               @close="closeDialog"
               @cancel="cancelDialog">

    <template v-if="storedItem">
      <template v-if="dialogType != 'delete'">
        <span class="md-subheader">Select a Category (Required)</span>

        <multiselect :options="itemCategories"
                     v-model="storedItem.category"
                     :searchable="true"
                     :allow-empty="false"
                     deselect-label="You must have one category"
                     placeholder="Select One Category"></multiselect>

        <reg-exp-input label="Name"
                       icon="content_paste"
                       v-model="storedItem.name"
                       :regExp="/^[A-Za-z][A-Za-z0-9 -]*$/"
                       @validated="validation => itemNameValid = validation"
                       :required="true"
                       :length="3"
                       regExpMessage="Name must not contain symbols"></reg-exp-input>

        <max-input v-model="storedItem.cost_price" label="Cost Price" :max="999999999">

        </max-input>
        <reg-exp-input label="Image Url"
                      icon="photo"
                      v-model="storedItem.image_url"
                       @validated="validation => itemImageValid = validation"
                      type="url"
                      :regExp="/(http)?s?:?(\/\/[^]*\.(?:png|jpg|jpeg|gif|png|svg))/i"
                      regExpMessage="Image only accepts png,jpg,gif,svg format images">
        </reg-exp-input>
        <md-input-container>
          <label>
            <md-icon>content_paste</md-icon> Description
          </label>
          <md-textarea v-model="storedItem.description">
          </md-textarea>
        </md-input-container>

        <md-checkbox v-model="storedItem.shared">
         <md-icon>share</md-icon> Shared
        </md-checkbox>
        <p style="color: red">Checking shared will share this item to all managers and use it on their stores</p>
      </template>
      <template v-else>
        Are you sure that you wanted to delete this item (Item: {{storedItem.name}})
        <p>
          Total Stocks Dependent on this item: {{storedItemStocks | count}}
        </p>
        <p style="color: red;" v-if="storedItemStocks.length">
          All Stocks dependent on this item will also be deleted are you really sure about this?
        </p>
      </template>
    </template>
  </main-dialog>

  <md-button class="md-fab md-mini md-fab-bottom-right"
             style="position: fixed; z-index: 3;" @click="openDialog('add')">
    <md-icon>add</md-icon>
  </md-button>

  <items :items="currentManagerItems">
    <template slot="buttons" scope="{item}">
      <md-button class="md-icon-button md-raised md-accent"  @click="openDialog('edit',item)">
        <md-icon>edit</md-icon>
        <md-tooltip>Edit this Item</md-tooltip>
      </md-button>
      <md-button class="md-icon-button md-raised md-accent" @click="openDialog('delete',item)">
        <md-icon>delete</md-icon>
        <md-tooltip>Delete this Item</md-tooltip>
      </md-button>
    </template>
  </items>

</div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Items from './Items.vue';
  export default {
    name: 'manager-items',
    components: {
      Items,
    },
    computed: {
      valid() {
        return this.dialogType != 'delete' ? this.itemNameValid && this.itemImageValid && this.storedItem.category : this.storedItemStocks.length || true;
      },
      ...mapGetters([
        'storedItem',
        'currentManagerItems',
        'itemCategories',
        'storedItemStocks'
      ])
    },
    data() {
      return {
        dialogType: 'add',
        itemNameValid: false,
        itemImageValid: true,
      }
    },
    methods: {
      openDialog(action,item) {
        this.dialogType = action;
        this.itemNameValid = action == 'edit';
        this.itemImageValid = true;
        this.storeItem(item);
        this.$refs.mainDialog.openDialog();
        this.addAlert({message: `${action == 'delete' ? 'Delet' : _.upperFirst(action)}ing Item: ${item ? item.name : 'New Item'}`})
      },
      closeDialog() {
        if (this.dialogType == 'edit') {
          this.updateItem(this.storedItem);
          this.addAlert({message: ` ${this.storedItem.name} Item Updated`})
        } else if (this.dialogType == 'add') {
          this.addItem(this.storedItem);
          this.addAlert({message: `${this.storedItem.name} Item Created`})
        } else {
          this.deleteItem(this.storedItem);
          this.deleteItemStocks(this.storedItemStocks);
          this.addAlert({message: ` ${this.storedItem.name} Item Deleted`})
        }
      },
      cancelDialog() {
        this.addAlert({message: `Item ${_.upperFirst(this.dialogType)} Cancelled`})
      },
      ...mapActions([
        'addItem',
        'updateItem',
        'addStock',
        'storeItem',
        'addItemToCart',
        'addAlert',
        'deleteItem',
        'deleteItemStocks'
      ])
    },
  }
</script>
