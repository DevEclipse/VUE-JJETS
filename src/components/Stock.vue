<template>
  <md-card md-with-hover>
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">{{item.name | capitalize}}
        <div class="md-subhead">
          Stock Id: {{stock['.key']}}
        </div>
        </div>
        <slot name="buttons"></slot>
      </div>
      <div class="md-toolbar-container row">
        <div class="md-subheading col-xs" style="flex: 1;">
          Retail Price: &#8369; {{stock.retail_price}}
        </div>
        <div class="md-subheading col-xs end-xs" style="flex: 1;">
          Quantity: {{stock.quantity || 'Out of Stock'}}
        </div>
      </div>
    </md-toolbar>

    <md-card-media>
      <vue-image :image="item.image_url" alt="Item"/>
    </md-card-media>
    <md-card-content>
      <div class="md-subheading">
        Description
      </div>
      <p class="md-subheader">
        {{stock.description || 'No Description'}}
      </p>


      <md-card-media-actions>
        <div class="md-subheading">
          Created: <span class="md-caption"> {{stock.created_date | moment("from")}} </span>
        </div>
        <div class="md-subheading">
          Updated: <span class="md-caption"> {{stock.updated_date | moment("from")}} </span>
        </div>
      </md-card-media-actions>
    </md-card-content>

  </md-card>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'stock-item',
    props: ['stock','item','store'],
  }
</script>
