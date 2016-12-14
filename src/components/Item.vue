<template>
  <md-card md-with-hover>
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">{{item.name | capitalize}}</div>

        <md-button class="md-icon-button" @click="$emit('edit',item)">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button v-if="customer" class="md-icon-button" @click="$emit('buy',item)">
          <md-icon>shop</md-icon>
        </md-button>
      </div>
      <div class="md-toolbar-container">
        <div class="md-subheading" style="flex: 1;">
          Cost Price: &#8369;{{item.cost_price}}
        </div>
        <router-link tag="md-button" class="md-icon-button"
                     :to="{name: 'manager', params: {username: item.created_by}}">
          <md-icon>face</md-icon>
        </router-link>
      </div>
    </md-toolbar>
    <md-card-media-cover md-solid>
      <md-card-media>
        <vue-image :image="item.image_url" alt="Image"/>
      </md-card-media>
      <md-card-area>
        <md-card-header>
          <div class="md-subheading">
            Description
          </div>
          <div class="md-subhead">
            {{item.description || 'No Description'}}
          </div>
          <md-card-media-actions>
            <div class="md-subhead">
              Created: {{item.created_date | moment("from")}}
            </div>
            <div class="md-subhead">
              Updated: {{item.updated_date | moment("from")}}
            </div>
          </md-card-media-actions>
        </md-card-header>
      </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'stock-item',
    props: ['item','customer'],
  }
</script>
