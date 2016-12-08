<template>
  <display v-if="!allItems.length" message="No Items Yet"/>
  <div v-else>
    <div class="row middle-xs center-xs">
      <div class="col-xs">
        <div class="md-display-3">
          Items
        </div>
      </div>
    </div>

    <cards :list="items" :default="allItems">
      <template scope="props">
          <md-toolbar class="md-accent">
            <div class="md-toolbar-container">
              <div class="md-title">{{props.data.name}}</div>
            </div>
          </md-toolbar>
        <md-card-header>
          <md-card-header-text>
            <div class="md-subhead">
              <span style="font-weight: bold;">Created By:</span>
              {{props.data.created_by | capitalize}}
            </div>

            <md-card-header align="center" style="margin: 2rem;">
              <md-card-header-text>
                <div class="md-title">&#8369;{{props.data.cost_price}}</div>
                <div class="md-subhead">Cost Price</div>
              </md-card-header-text>
            </md-card-header>

          </md-card-header-text>

          <md-card-media md-big>
            <img :src="props.data.image_url || '//placehold.it/250x250'" alt="People">
          </md-card-media>

        </md-card-header>
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

          <router-link class="md-button md-accent"
                       :to="{name: 'item',params: {item: props.data['.key']}}">More Info
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
