<template>
  <div>
    <md-dialog ref="addItemDialog">
      <md-toolbar>
        <div class="md-title" style="flex: 1;">
          Add Item
        </div>
        <div class="md-subhead">
          Created By: {{item.created_by = authUser.profiles.manager | capitalize}}
        </div>
      </md-toolbar>
      <div style="margin: 1rem;">
        <md-input-container>
          <label>
            <md-icon>store</md-icon>
            Item Name
          </label>
          <md-input v-model="item.name"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>timeline</md-icon>
            Cost Price
          </label>
          <md-input v-model="item.cost_price" type="number" step="10.00" min="0"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>store</md-icon>
            Image Url
          </label>
          <md-input v-model="item.image_url"></md-input>
        </md-input-container>
        <md-input-container>
          <label>
            <md-icon>store</md-icon>
            Description
          </label>
          <md-textarea v-model="item.description"></md-textarea>
        </md-input-container>

        <multiselect :options="allTags | keys"
                     v-model="item.tags"
                     :multiple="true"
                     :searchable="true"
                     :taggable="true"
                     :limit="5"
                     @tag="addTag"
                     tag-placeholder="Add this as new tag"
                     placeholder="Type to search or add tag"></multiselect>
        <md-button class="md-raised md-primary" style="width: 95%;" @click="addItem(item)">
          Create
        </md-button>
      </div>
    </md-dialog>

    <md-button class="md-fab md-mini md-fab-bottom-right" style="position: fixed; z-index: 3;" @click="openAddItemDialog">
      <md-icon>add</md-icon>
    </md-button>

    <items :items="currentManagerItems"/>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'manager-items',
    data() {
      return {
        item: {
          name: '',
          cost_price: '',
          image_url: '',
          description: '',
          created_by: '',
          stores: {['unemployed_store']: true},
          tags: [],
        },
      }
    },
    computed: {
      ...mapGetters([,
        'authUser',
        'allTags',
        'currentManagerItems',
      ])
    },
    methods: {
      openAddItemDialog() {
        this.$refs.addItemDialog.open();
      },
      closeAddItemDialog() {
        this.$refs.addItemDialog.close();
      },
      ...mapActions([
        'addStore',
        'addItem',
        'addTag',
      ]),
    },

  }
</script>
