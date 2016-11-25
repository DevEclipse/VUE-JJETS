<template>
  <div>
    <loading v-if="!currentStore"></loading>
    <div v-if="currentStore">
      <div class="md-display-2" align="center" style="padding-bottom: 30px;">
        {{currentStore.name}}
        <div v-if="currentStore.manager == authUser.username">
          <md-button class="md-fab">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="left">Add Store Item</md-tooltip>
          </md-button>
        </div>
      </div>
      <md-sidenav class="md-right" ref="addStoreItemNav">
        <md-toolbar>
          <div class="md-toolbar-container">
            <h3 class="md-title" style="flex: 1">Store:{{currentStore.name}}</h3>

            <h4 class="md-subhead">Status: {{newStore.status}}</h4>
          </div>
        </md-toolbar>

        <md-input-container style="margin: 20px;">
          <label>Store Name</label>
          <md-input v-model.lazy.trim="newItem.name" type="text" required></md-input>
        </md-input-container>

        <md-input-container style="margin: 20px;">
          <label>Cost Price</label>
          <md-input type="number" max="1" step="0.01" v-model.number="newItem.cost_price" required></md-input>
        </md-input-container>

        <md-input-container style="margin: 20px;">
          <label>Retail Price</label>
          <md-input type="number" max="1" step="0.01" v-model.number="newStoreItem.retail_price" required></md-input>
        </md-input-container>

        <md-input-container style="margin: 20px;">
          <label>Image Url</label>
          <md-input v-model.lazy.trim="newItem.image_url" type="text"></md-input>
        </md-input-container>

        <md-input-container style="margin: 20px;">
          <label>Description</label>
          <md-textarea v-model="newItem.description" maxlength="70"></md-textarea>
        </md-input-container>

        <multi-select :options="dataTagKeys" v-model="newItem.tags" :multiple="true"
                      :searchable="true" @tag="addTag"
                      :taggable="true" track-by=".key">
        <span slot="noResult">
        Oops! No Tags Create one!
        </span>
        </multi-select>

        <md-button class="md-raised md-accent" @click="addStore">Add Store</md-button>
      </md-sidenav>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'store',
    computed: {
      ...mapGetters([
        'authUser',
        'currentStore',
        'dataTagKeys'
      ])
    },
    data() {
        return {
            newStoreItem: {
                item: this.newItem.name,
                retail_price: 0,
                quantity: 0,
                store: this.currentStore['.key']
            },
            newItem: {
                name: '',
                cost_price: 0,
                description: '',
                image_url: '',
                created_by: this.authUser.username,
                tags: ['item','new'],
            }
        }
    },
    methods: {
      addStoreItem() {
        this.$store.dispatch('addStoreItem',this.newStoreItem);
        _.forEach(this.newItem.tags,tag => {
          this.$store.dispatch('addTag', {
            name: tag,
            category: 'items',
            category_value: this.newItem.name,
            tagger: this.newItem.created_by
          });
      });
      },
      toggleAddStoreNav() {
        this.$refs.addStoreItemNav.toggle();
      },
      addTag (newTag) {
        this.newItem.tags.push(newTag)
      },
    }
  }
</script>
