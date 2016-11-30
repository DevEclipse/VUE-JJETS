<template>
  <div v-if="!chunkedStores">
    Loading... Stores
  </div>
  <div v-else style="margin-top: 20px;">

    <div class="row" v-for="store3 in chunkedStores">
      <div class="col-xs-12 col-md-4" v-for="store in store3">
        <md-whiteframe md-elevation="3" style="margin: 5px;">
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title" style="flex: 1">
                {{store.name}}
              </div>
              <div class="md-subhead" style="flex: 1">
                {{store['.key']}}
              </div>
              <router-link :to="{name: 'store',params: {store: store['.key']}}" style="margin-right: 50px;" class="md-button md-fab md-fab-top-right md-mini" >
                <md-icon>remove red eye</md-icon>
                <md-tooltip direction="bottom">View this Store</md-tooltip>
              </router-link>
              <md-button class="md-fab md-mini md-warn md-fab-top-right" @click="$emit('deleteStore',store)">
                <md-icon>delete</md-icon>
                <md-tooltip direction="bottom">Delete Store</md-tooltip>
              </md-button>
            </md-card-header>
            <md-card-media>
              <img :src="store.image_url || `//placehold.it/1920x1080`">
            </md-card-media>
            <md-card-content>
              <div class="md-title" align="center">
                Total
              </div>
              <div class="row center-xs">
                <div class="col-xs">
                  <div class="md-title">
                    {{store.transactions | count}}
                  </div>
                  <div class="md-subhead">
                    Transactions
                  </div>
                </div>
                <div class="col-xs">
                  <div class="md-title">
                    {{store.transactions | count}}
                  </div>
                  <div class="md-subhead">
                    Items
                  </div>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </md-whiteframe>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'stores',
    computed: {
      chunkedStores() {
        return _.chunk(this.allStores,3);
      },
      ...mapGetters([
         'allStores',
         'authUser',
      ]),
    },
  }
</script>
