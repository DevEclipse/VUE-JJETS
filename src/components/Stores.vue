<template>
  <display v-if="!allStores.length" message="No Stores Yet"/>
  <div v-else style="margin-top: 2rem;">
    <div class="row middle-xs" style="margin: 1rem;">
      <div class="col-xs">
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search
          </label>
          <md-input v-model="itemSearch"></md-input>
        </md-input-container>
      </div>
    </div>
    <hr/>
    <div class="row" v-for="store3 in chunkedStores">
      <div class="col-xs-12 col-md-4" v-for="store in store3">
        <transition-group tag="div" enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
          <md-whiteframe md-elevation="3" style="margin: 5px;" :key="store['.key']">
            <md-card md-with-hover>
              <md-card-header>
                <div class="md-title" style="flex: 1">
                  {{store.name}}
                </div>
                <div class="md-subhead" style="flex: 1">
                  {{store['.key']}}
                </div>
                <router-link :to="{name: 'store',params: {store: store['.key']}}"
                             class="md-button md-fab md-fab-top-right md-mini">
                  <md-icon>info</md-icon>
                  <md-tooltip direction="bottom">View this Store</md-tooltip>
                </router-link>
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
        </transition-group>
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
        let stores = this.allStores;
        let regExp = new RegExp(this.itemSearch);
        console.log(regExp);
        if (this.itemSearch) {
          stores = _.filter(stores, item => {
            return regExp.test(item['.key']);
          })
        }
        return _.chunk(stores, 3);
      },
      ...mapGetters([
        'allStores',
        'authUser',
      ]),
    },
    data() {
      return {
        itemSearch: '',
      }
    }
  }
</script>
