<template>
  <md-card>
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <div class="md-title">{{item.name | capitalize}}
          <md-icon v-if="isNew" style="font-size: 2rem;">fiber_new</md-icon>
          <div class="md-subhead">
            {{item['.key']}}
          </div>
        </div>

      </div>
      <div class="md-toolbar-container">
        <div class="md-subheading">
          Cost Price: &#8369;{{item.cost_price}}
          <div class="md-subhead">
            Category: {{item.category}}
          </div>
        </div>
        <span style="flex: 1;"></span>
        <slot name="buttons"></slot>
      </div>
    </md-toolbar>

    <md-card-media-cover md-solid>
      <md-card-media>
        <vue-image :image="item.image_url" alt="Item"/>
      </md-card-media>

    </md-card-media-cover>
    <md-card-header>
      {{item.description || 'No Description'}}
    </md-card-header>

    <md-card-content>
      <md-card-media-actions>
        <div class="md-subheading">
          Created: <span class="md-subheader"> {{item.created_date | moment("from")}} </span>
        </div>
        <div class="md-subheading">
          Updated: <span class="md-subheader"> {{item.updated_date | moment("from")}} </span>
        </div>
      </md-card-media-actions>

    </md-card-content>
    <md-card-actions>
      <router-link tag="md-button" class="md-raised md-accent"
                   :to="{name: 'user', params: {username: item.created_by}}">
        {{item.created_by}}
        <md-tooltip>Go to this Manager Account</md-tooltip>
      </router-link>
    </md-card-actions>
  </md-card>
</template>

<script>
  export default {
    name: 'item',
    props: ['item', 'editable'],
    computed: {
      isNew() {
        let today = new Date();
        let created = new Date(this.item.created_date);
        return today.toDateString() === created.toDateString();
      }
    }
  }
</script>
