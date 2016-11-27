<template>
  <div>
    <md-card md-with-hover style="margin-bottom: 10px;">

      <md-toolbar>

        <div class="md-title" style="flex: 1">
          {{item.name}}
        </div>
        <md-button class="md-fab md-mini"  @click="addStoreItem(item)">
          <md-icon>add</md-icon>
        </md-button>
      </md-toolbar>

      <md-card-media>
        <img :src="item.image_url || `http://loremflickr.com/g/320/240/paris,girl/all`"
             alt="People"
             onerror="this.onerror=null;this.src=`http://loremflickr.com/g/320/240/paris,girl/all`;">
      </md-card-media>
      <md-card-media-actions>

        <div class="md-subheading">
          Stores
          <div class="md-title" align="center">
            0
          </div>
        </div>


        <div class="md-subheading">
          Cost Price
          <div class="md-title" align="center">
            {{item.cost_price}}
          </div>
        </div>

      </md-card-media-actions>

      <md-card-expand>
        <md-card-actions>
          <md-card-header>More Info</md-card-header>
          <span style="flex: 1"></span>
          <md-button class="md-icon-button" md-expand-trigger>
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-actions>

        <md-card-content>
          <div class="md-subheading">Description:</div>
          <p>{{item.description || 'No Description'}}</p>
        </md-card-content>
      </md-card-expand>
    </md-card>
  </div>
</template>

<script>
  export default {
    name: 'item',
    props: ['item'],
    methods: {
      addStoreItem(item) {
          this.$emit('addStoreItem',item);
      }
    }
  }
</script>
