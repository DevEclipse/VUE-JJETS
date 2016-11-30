<template>
  <div v-if="!currentStore">
    Loading... Store
  </div>
  <div v-else>

    <div class="row">
      <div class="col-xs-12 col-md center-xs middle-xs">
        <md-whiteframe md-elevation="3" style="margin: 5px;">
          <md-card style="height: 92vh;">
            <md-card-area md-inset>
              <md-card-header>

                <div class="col-xs md-title">
                  {{currentStore.name | capitalize}} | {{$route.name | capitalize}}
                </div>
              </md-card-header>

              <md-card-actions>
                <router-link class="col-xs md-button md-accent" :to="{name: 'store'}">
                  Info
                </router-link>
                <router-link class="col-xs md-button md-accent" :to="{name: 'storeItems'}">
                  Items
                </router-link>
                <router-link class="col-xs md-button md-accent" :to="{name: 'storeItems'}">
                  Transactions
                </router-link>
              </md-card-actions>

              <md-card-media>
                <img :src="currentStore.image_url || `//placehold.it/1920x1080`">
              </md-card-media>
              <md-card-content>
                <div class="md-title">
                  Description
                </div>
                <p>
                  {{currentStore.description || 'No Description'}}
                </p>
              </md-card-content>
            </md-card-area>
            <md-card-content>
              <md-card-header>
                <div class="md-title">
                  {{currentStore.transactions | count}}
                </div>
                <div class="md-subhead">
                  Transactions
                </div>
              </md-card-header>
              <md-card-header>
                <div class="md-title">
                  {{currentStore.transactions | count}}
                </div>
                <div class="md-subhead">
                  Items
                </div>
              </md-card-header>
            </md-card-content>
            <md-card-content style="position: absolute; bottom: 0;">
              &copy;
              <router-link :to="{name: 'manager', params: {manager: currentStore.manager}}">
                {{currentStore.manager}}
              </router-link>
            </md-card-content>
          </md-card>
        </md-whiteframe>
      </div>
      <div class="col-xs-12 col-md-8">
        <md-whiteframe md-elevation="3" style="margin: 5px;">
          <router-view :storeItems="chunkedItems"></router-view>
        </md-whiteframe>

      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';

  export default {
    name: 'store',
    computed: {
      chunkedItems() {
        return _.chunk(this.currentStoreItems,4);
      },
      ...mapGetters([
        'authUser',
        'currentStore',
        'currentStoreItems'
      ])
    },
  }
</script>
