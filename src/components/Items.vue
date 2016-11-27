<template>
  <loading v-if="!currentManager" message="Loading... Manager"/>
  <div v-else class="container" style="margin-top: 10px;">
    <div v-if="currentUser.username == authUser.username">

      <md-button style="z-index: 10;" class="md-fab md-fab-top-right md-mini" @click="toggleAddItemNav">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="left">Add Item</md-tooltip>
      </md-button>

      <md-sidenav class="md-right md-fixed" ref="addStoreItemNav">

        <md-toolbar>
          <div class="md-toolbar-container">
            <h3 class="md-title" style="flex: 1">Item: {{storeItem.item}}</h3>
          </div>
        </md-toolbar>

        <md-input-container style="margin: 20px;">
          <label>Retail Price</label>
          <md-input type="number" min="1" step="10.01" v-model.number="storeItem.cost_price" required></md-input>
        </md-input-container>

        <md-input-container style="margin: 20px;">
          <label>Quantity</label>
          <md-input type="number" min="0" v-model.number="storeItem.quantity" required></md-input>
        </md-input-container>

        <multi-select :options="storeKeys" v-model="storeItem.stores" :selected="storeItem.stores" :multiple="true" :searchable="true">
        <span slot="noResult">
        Oops! No Tags Create one!
        </span>
        </multi-select>

        <md-button class="md-raised md-accent" @click="addToStores">Add To Stores</md-button>
      </md-sidenav>

    <md-button style="z-index: 10;" class="md-fab md-fab-top-right md-mini" @click="toggleAddItemNav">
      <md-icon>add</md-icon>
      <md-tooltip md-direction="left">Add Item</md-tooltip>
    </md-button>

    <md-sidenav class="md-right md-fixed" ref="addItemNav">

      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title" style="flex: 1">New Item</h3>
        </div>
      </md-toolbar>

      <md-input-container style="margin: 20px;">

        <label>Item Name</label>
        <md-input v-model.lazy.trim="item.name" type="text" maxlength="20" required></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;">
        <label>Cost Price</label>
        <md-input type="number" min="1" step="10.01" v-model.number="item.cost_price" required></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;">
        <label>Image Url</label>
        <md-input v-model.lazy.trim="item.image_url" type="text"></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;">
        <label>Description</label>
        <md-textarea v-model="item.description" maxlength="70"></md-textarea>
      </md-input-container>

      <div class="container">
      <multi-select :options="dataTagKeys" v-model="item.tags" :selected="item.tags" :multiple="true"
                    :searchable="true" @tag="addTag"
                    :taggable="true">
        <span slot="noResult">
        Oops! No Tags Create one!
        </span>
      </multi-select>
      </div>
      <md-button class="md-raised md-accent" @click="addItem">Add Item</md-button>
    </md-sidenav>
    </div>

    <div class="row" v-for="(item12,index) in chunkedItems">

      <div class="col-xs-12 col-md-3" v-for="item in item12">

        <md-card md-with-hover style="margin-bottom: 10px;">

          <md-toolbar>

            <div class="md-title" style="flex: 1">
              {{item.name}}
            </div>
            <md-button class="md-fab md-mini"  @click="toggleAddStoreItemNav(item)">
              <md-icon>add</md-icon>
            </md-button>
          </md-toolbar>

          <md-card-media>
            <img :src="item.image_url || `http://loremflickr.com/g/320/240/paris,girl/all`"
                 alt="People"
                 onerror="this.onerror=null;this.src=`http://loremflickr.com/g/320/240/paris,girl/all`;">
          </md-card-media>
          <md-card-media-actions>

            <div class="md-subheading">
              Stores
              <div class="md-title" align="center">
                0
              </div>
            </div>


            <div class="md-subheading">
              Cost Price
              <div class="md-title" align="center">
                {{item.cost_price}}
              </div>
            </div>



          </md-card-media-actions>

          <md-card-expand>
            <md-card-actions>
              <md-card-header>More Info</md-card-header>
              <span style="flex: 1"></span>
              <md-button class="md-icon-button" md-expand-trigger>
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-actions>

            <md-card-content>
              <div class="md-subheading">Description:</div>
              <p>{{item.description || 'No Description'}}</p>
            </md-card-content>
          </md-card-expand>
        </md-card>

      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'items',
    computed: {
      chunkedItems() {
        return _.chunk(this.currentManagerItems,4);
      },
      storeKeys() {
        let keys = [];
        _.forEach(this.currentManagerStores,store => {
            keys.push(store['.key']);
        })
        return keys;
      },
      itemExist() {
        return _.find(this.$store.state.bitems,['.key',this.item.name]) != null;
      },
      ...mapGetters([
        'authUser',
        'currentUser',
        'dataTagKeys',
        'currentManagerItems',
        'currentManager',
        'currentManagerStores',
      ])
    },
    data() {
      return {
        storeItem: {
          item: '',
          retail_price: 0,
          quantity: 0,
          stores: [],
        },
        item: {
          name: '',
          cost_price: 0,
          description: '',
          image_url: '',
          created_by: '',
          tags: ['item','new'],
          stores: {['unemployed_store']: true}
        },
      }
    },
    methods: {
      toggleAddItemNav(){
        this.$refs.addItemNav.toggle();
      },
      toggleAddStoreItemNav(item){
        this.$refs.addStoreItemNav.toggle();
        this.storeItem['item'] = item['.key'];
        this.storeItem['retail_price'] = item.cost_price;
      },
      addTag (newTag) {
        this.item.tags.push(newTag);
      },
      addItem() {
          this.item['created_by'] = this.currentManager['.key'];
          this.$store.dispatch('addItem',this.item);
        _.forEach(this.item.tags,tag => {
          this.$store.dispatch('addTag', {
            name: tag,
            category: 'items',
            category_value: this.item.name,
            tagger: this.item.created_by
          });
        });
      },
      addToStores() {
          let self = this;
        _.forEach(this.storeItem.stores,store => {
          let newStoreItem = {
            item: self.storeItem.item,
            retail_price: self.storeItem.retail_price,
            quantity: self.storeItem.quantity,
            store: store,
          };
          self.$store.dispatch('addStoreItem',newStoreItem);
        });
      },
    },
  }
</script>
