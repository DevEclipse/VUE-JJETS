<template>
  <div>
    <md-card md-with-hover style="margin-bottom: 10px;">

      <md-toolbar>

        <div class="md-title" style="flex: 1">
          {{item.name}}
        </div>
        <md-button class="md-fab md-mini" @click="editItem(item)">
          <md-icon>edit</md-icon>
        </md-button>

        <md-button class="md-fab md-mini md-warn" @click="deleteItem(item)">
          <md-icon>delete</md-icon>
        </md-button>
      </md-toolbar>

      <md-card-media>
        <img :src="item.image_url || 'http://placehold.it/200x200'"
             alt="People"
             onerror="this.onerror=null;this.src='http://placehold.it/200x200';">
      </md-card-media>
      <md-card-media-actions>

        <div class="md-subheading">
          Quantity
          <div class="md-title" align="center">
            {{item.quantity}}
          </div>
        </div>

        <div class="md-subheading">
          Cost
          <div class="md-title" align="center">
            {{item.cost_price}}
          </div>
        </div>

        <div class="md-subheading">
          Retail
          <div class="md-title" align="center">
            {{item.retail_price}}
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
    name: 'store-item',
    props: ['item'],
    methods: {
        deleteItem(item) {
            this.$emit('deleteItem',item);
        },
        editItem(item) {
            this.$emit('editItem',item);
        }
    }
  }
</script>
