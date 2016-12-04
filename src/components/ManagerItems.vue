<template>
  <div>
    <md-list>
      <md-input-container style="margin: 1rem;">
        <label>
          <md-icon>search</md-icon>
          Search Item
        </label>
        <md-input v-model="itemSearch"></md-input>
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
        <transition-group enter-active-class="animated lightSpeedIn" leave-active-class="animated lightSpeedOut">
        <md-list-item v-for="item in filteredItems" :key="item['.key']">


          <md-avatar>
            <img :src="item.image_url || '//placehold.it/250x250'" :alt="item['.key']">
          </md-avatar>

          <span>{{item.name}}</span>
          <span>&#8369;{{item.cost_price}}</span>

          <router-link :to="{name: 'item', params: {item: item['.key']}}" class="md-button md-icon-button md-list-action">
            <md-icon class="md-primary">info</md-icon>
          </router-link>

        </md-list-item>

        </transition-group>
      </div>
      <md-list-item v-else>
        No Items
      </md-list-item>
    </md-list>
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
    </md-sidenav>
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
            stores: {['unemployed_store']: true},
            tags: [],
          },
          itemSearch: '',
        }
    },
    computed: {
      filteredItems() {
        let items = this.currentManagerItems;
        if(this.itemSearch) {
          let regExp = new RegExp(this.itemSearch);
          items = _.filter(items,item => {
            return regExp.test(item['.key']);
          })
        }
        return items;
      },
      ...mapGetters([
        'allTags',
        'currentManager',
        'currentManagerItems',
        'authUser'
      ])
    },
    methods: {
      toggleAddItem() {
        this.$refs.addItemDrawer.toggle();
      },
      ...mapActions([
        'addStore',
        'addItem',
        'addTag',
      ]),
    }
  }
</script>
