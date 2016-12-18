<template>
  <md-card class="md-primary">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title" style="flex: 1;">{{item.name | capitalize}}
          <div class="md-subhead">
            Stock Id: {{stock['.key']}}
          </div>
          <md-icon v-if="isNew">fiber_new</md-icon>
        </div>
      </md-card-header-text>

    </md-card-header>

    <md-card-actions>
      <slot name="buttons">

      </slot>
    </md-card-actions>
    <md-card-header>
      <md-card-header-text>
        <div class="md-toolbar-container row">
          <div class="md-subheading col-xs">
            Retail Price: &#8369; {{stock.retail_price}}
          </div>
          <div class="md-subheading col-xs end-xs" >
            Quantity: {{stock.quantity || 'Out of Stock'}}
          </div>
        </div>
      </md-card-header-text>
    </md-card-header>

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

      <md-card-header>
        <md-card-header-text>
          <div class="md-toolbar-container row">
            <div class="md-subheading col-xs" >
              Tax: + &#8369; {{stock.retail_price * store.tax_rate}}
            </div>
            <div class="md-subheading col-xs end-xs" >
              Discount: - &#8369; {{stock.retail_price * store.discount_rate}}
            </div>
          </div>
        </md-card-header-text>
      </md-card-header>

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
    computed: {
      isNew() {
        let today = new Date();
        let created = new Date(this.stock.created_date);
        return today.toDateString() === created.toDateString();
      },
    }
  }
</script>
