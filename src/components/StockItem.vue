<template>
  <md-card md-with-hover>
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">{{item.name | capitalize}}</div>
        <md-button class="md-icon-button" @click="$emit('edit',stock)">
          <md-icon>edit</md-icon>
        </md-button>
      </div>
      <div class="md-toolbar-container row">
        <div class="md-subheading col-xs" style="flex: 1;">
          Retail Price: &#8369;{{stock.retail_price}}
          <span v-if="stock.taxed">
            (+{{stock.retail_price * store.tax_rate}})
          </span>
          <span v-if="stock.discounted">
            (-{{stock.retail_price * store.discount_rate}})
          </span>
        </div>
        <div class="md-subheading col-xs end-xs" style="flex: 1;">
          Quantity: {{stock.quantity || 'Out of Stock'}}
        </div>
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
        </md-card-header>
      </md-card-area>
    </md-card-media-cover>
  </md-card>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'stock-item',
    props: ['stock','item','store'],
  }
</script>
