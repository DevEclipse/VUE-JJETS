<template>
  <display v-if="!allStores.length" message="No Stores Yet"/>
  <div v-else>
    <cards :list="stores" :default="allStores">
      <template scope="props">
        <md-card-header>
          <div class="md-title" style="flex: 1">
            {{props.data.name}}
          </div>
          <div class="md-subhead" style="flex: 1">
            {{props.data['.key']}}
          </div>
          <router-link :to="{name: 'store',params: {store: props.data['.key']}}"
                       class="md-button md-fab md-fab-top-right md-mini">
            <md-icon>info</md-icon>
            <md-tooltip direction="bottom">View this Store</md-tooltip>
          </router-link>
        </md-card-header>
        <md-card-media>
          <img :src="props.data.image_url || `//placehold.it/1920x1080`">
        </md-card-media>
        <md-card-content>
          <div class="md-title" align="center">
            Total
          </div>
          <div class="row center-xs">
            <div class="col-xs">
              <div class="md-title">
                {{props.data.transactions | count}}
              </div>
              <div class="md-subhead">
                Transactions
              </div>
            </div>
            <div class="col-xs">
              <div class="md-title">
                {{props.data.items | toArray | count}}
              </div>
              <div class="md-subhead">
                Items
              </div>
            </div>
          </div>
        </md-card-content>
      </template>
    </cards>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'stores',
    props: ['stores'],
    computed: {
      ...mapGetters([
        'allStores',
        'authUser'
      ])
    },
  }
</script>
