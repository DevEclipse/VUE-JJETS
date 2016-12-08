<template>
  <display v-if="!allStores.length" message="No Stores Yet"/>
  <div v-else>
    <div class="row middle-xs center-xs">
      <div class="col-xs">
        <div class="md-display-3">
          Stores
        </div>
      </div>
    </div>
    <cards :list="stores" :default="allStores">
      <template scope="props">
        <md-toolbar class="md-accent">
          <div class="md-toolbar-container">
            <div class="md-title"  style="flex: 1">
              {{props.data.name}}
            </div>
            <router-link tag="md-button" :to="{name: 'store',params: {store: props.data['.key']}}"
                         class="md-icon-button">
              <md-icon>info</md-icon>
              <md-tooltip direction="bottom">View this Store</md-tooltip>
            </router-link>
          </div>
        </md-toolbar>
        <md-card-header>
          <md-card-header-text>
          <div class="md-subhead">
            <span style="font-weight: bold;">Store Id: </span>{{props.data['.key']}}
          </div>
            <md-card-header>
              <md-card-header-text>
                <div class="md-subhead">
                  <span style="font-weight: bold;">Created: </span>{{props.data.created_date | moment("from")}}
                </div>
              </md-card-header-text >
            </md-card-header>
            <md-card-header>
              <md-card-header-text>
                <div class="md-subhead">
                  <span style="font-weight: bold;">Updated: </span>{{props.data.updated_date | moment("from")}}
                </div>
              </md-card-header-text >
            </md-card-header>
          </md-card-header-text >
          <md-card-media md-big>
            <img :src="props.data.image_url || `//placehold.it/500x500`">
          </md-card-media>
        </md-card-header>

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
