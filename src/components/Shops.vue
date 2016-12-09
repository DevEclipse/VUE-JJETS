<template>
  <display v-if="!allStores.length" message="No Stores Yet"/>
  <div v-else>
    <cards :list="stores" :defaultList="allStores" :filters="['name']">
      <template scope="props">
        <md-toolbar class="md-accent md-large">
          <div class="md-toolbar-container">
            <div class="md-title"  style="flex: 1">
              {{props.data.name}}
            </div>

            <router-link tag="md-button" :to="{name: 'manager', params: {username: props.data.manager}}">
              Manager: {{props.data.manager | capitalize}}
            </router-link>

            <router-link tag="md-button" :to="{name: 'store',params: {store: props.data['.key']}}"
                         class="md-icon-button">
              <md-icon>info</md-icon>
            </router-link>
          </div>
          <div class="md-toolbar-container">
           <div class="md-title"> Location: {{props.data.location || 'Unknown Location'}} </div>
          </div>
        </md-toolbar>
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="16:9">
            <vue-image :image="props.data.image_url" alt="Store"></vue-image>
          </md-card-media>

          <md-card-area>
            <md-card-header>
              <div class="md-body-2">
                Description:
                <p>{{props.data.description || 'No Description'}}</p>
              </div>
            </md-card-header>

          </md-card-area>
        </md-card-media-cover>
        <md-card-media-actions>
          <div class="md-subheading">Tax Rate:
            <span class="md-caption">
            {{props.data.tax_rate | percent}}</span></div>
          <div class="md-subheading">Discount Rate:
            <span class="md-caption">
            {{props.data.discount_rate | percent}}</span></div>
        </md-card-media-actions>
        <md-card-media-actions>
          <div class="md-subheading">Created:
            <span class="md-caption">
            {{props.data.created_date | moment("from")}}</span></div>
          <div class="md-subheading">Updated:
            <span class="md-caption">
            {{props.data.updated_date | moment("from")}}</span></div>
        </md-card-media-actions>
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
