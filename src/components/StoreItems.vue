<template>
  <div class="container" style="margin-top:1rem;">
    <div v-if="currentStore">

      <div v-if="currentStore.manager == authUser.username">

        <md-sidenav class="md-right md-fixed" ref="editStoreItemNav">


          <md-input-container style="margin: 20px;">
            <label>Retail Price</label>
            <md-input type="number" max="1" step="10.01" v-model.number="storeItem.retail_price" required></md-input>
          </md-input-container>

          <md-input-container style="margin: 20px;">
            <label>Quantity</label>
            <md-input type="number" min="1" v-model.number="storeItem.quantity" required></md-input>
          </md-input-container>

          <md-button class="md-raised md-accent" @click="editStoreItem">Save</md-button>
        </md-sidenav>

      </div>

      <div class="row" v-for="item12 in chunkedItems">

        <div class="col-xs-12 col-md-3" v-for="item in item12" :key="'.key'">

          <md-card md-with-hover style="margin-bottom: 10px;">

            <md-toolbar>

              <div class="md-title" style="flex: 1">
                {{item.name}}
              </div>
              <md-button class="md-icon-button" @click="toggleEditStoreItemNav(item)">
                <md-icon>edit</md-icon>
              </md-button>

              <md-button class="md-icon-button" @click="deleteStoreItem(item)">
                <md-icon>delete</md-icon>
              </md-button>
            </md-toolbar>

            <md-card-media>
              <img :src="item.image_url || 'http://placehold.it/1920x1080'"
                   alt="People"
                   onerror="this.onerror=null;this.src='http://placehold.it/1920x1080';">
            </md-card-media>
            <md-card-media-actions>

              <div class="md-subheading">
                Quantity
                <div class="md-title" align="center">
                  {{item.quantity}}
                </div>
              </div>

              <div class="md-subheading">
                Cost
                <div class="md-title" align="center">
                  {{item.cost_price}}
                </div>
              </div>

              <div class="md-subheading">
                Retail
                <div class="md-title" align="center">
                  {{item.retail_price}}
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
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'store-items',
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

      }
    },
    methods: {
      editStoreItem(storeItem) {
        this.$store.dispatch('updateStoreItem',storeItem);
      },
      deleteStoreItem(storeItem) {
        this.$store.dispatch('deleteStoreItem',storeItem);
      },
      toggleEditStoreItemNav(storeItem) {
        this.$refs.editStoreItemNav.toggle();
        this.$set(this.$data,'editStoreItem',storeItem);
      },
    },
  }
</script>
