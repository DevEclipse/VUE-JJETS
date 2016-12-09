<template>
  <display v-if="!allItems.length" message="No Items Yet"/>
  <div v-else>

    <cards :list="items" :defaultList="allItems" :filters="['name','created_by']">
      <template scope="props">
          <md-toolbar class="md-accent md-large">
            <div class="md-toolbar-container">
              <div class="md-title" style="flex: 1;">{{props.data.name}}</div>
              <router-link tag="md-button" class="md-icon-button"
                           :to="{name: 'item',params: {item: props.data['.key']}}">
                <md-icon>info</md-icon>
              </router-link>
            </div>
            <div class="md-toolbar-container">
              <div class="md-title">Cost Price: &#8369;{{props.data.cost_price}}</div>
            </div>
          </md-toolbar>
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="16:9">
            <vue-image :image="props.data.image_url" alt="Item"></vue-image>
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
        <md-card-header>
          <md-card-header-text>
          <span class="md-subhead">
            <span style="font-weight: bold">Created:</span>{{props.data.created_date | moment("from")}}
          </span>
            <span class="md-subhead">
            <span style="font-weight: bold">Updated:</span>{{props.data.updated_date | moment("from")}}
          </span>
          </md-card-header-text>
        </md-card-header>
        <md-card-actions>
          Tags:
          <span v-for="tag in props.data.tags">
                <router-link :to="{name: 'tag',params: {tag: tag}}">{{tag}}</router-link>
              </span>

          <span style="flex: 1"></span>
          Created By: <router-link :to="{name: 'manager', params: {username: props.data.created_by}}">
          {{props.data.created_by | capitalize}}
        </router-link>

        </md-card-actions>
      </template>
    </cards>
  </div>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'items',
    props: ['items'],
    computed: {
      ...mapGetters([
        'allItems',
      ]),
    },
  }
</script>
