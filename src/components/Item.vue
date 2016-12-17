<template>
  <md-card md-with-hover class="md-primary">
    <md-card-media-actions>
      <md-card-header-text>
      <div class="md-title" style="flex: 1;">
        {{item.name | capitalize}}
      </div>
      <div class="md-subhead">
        {{item['.key']}}
      </div>
      </md-card-header-text>
      <md-card-header-text>
      <div class="md-title" style="flex: 1;">
        {{item.created_by | capitalize}}
      </div>
      <div class="md-subhead">
        Created By
      </div>
      </md-card-header-text>
    </md-card-media-actions>
    <md-card-actions>
      <div class="md-subheading">
        Cost Price: &#8369;{{item.cost_price}}
        <div class="md-subhead">
          Category: {{item.category}}
        </div>
      </div>

      <span style="flex: 1;"></span>
      <slot name="buttons"></slot>
    </md-card-actions>

    <md-card-media>
      <vue-image :image="item.image_url" alt="Item"/>
    </md-card-media>

    <md-card-content class="md-accent">
      {{item.description || 'No Description'}}
    </md-card-content>

    <md-card-media-actions>
      <div class="md-subheading">
        Created: <span class="md-subheader"> {{item.created_date | moment("from")}} </span>
      </div>
      <div class="md-subheading">
        Updated: <span class="md-subheader"> {{item.updated_date | moment("from")}} </span>
      </div>
    </md-card-media-actions>

  </md-card>
</template>

<script>
  export default {
    name: 'item',
    props: ['item', 'editable'],
  }
</script>
