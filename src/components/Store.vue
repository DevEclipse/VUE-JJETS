<template>
  <md-card>
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <div class="md-title">{{store.name | capitalize}}
          <md-icon v-if="isNew" style="font-size: 2rem;">fiber_new</md-icon>
          <div class="md-subhead">
            {{store['.key']}}
          </div>
        </div>

      </div>
      <div class="md-toolbar-container">
        <span style="flex: 1;"></span>
        <slot name="buttons"></slot>
      </div>
    </md-toolbar>
      <md-card-media>
        <vue-image :image="store.image_url" alt="Image"/>
      </md-card-media>

    <md-card-content>
      <div class="md-subheading">
        Description
      </div>
      <div class="md-subheader">
        {{store.description || 'No Description'}}
      </div>
      <slot></slot>
      <md-card-media-actions>
        <div class="md-subheading">
          Created: {{store.created_date | moment("from")}}
        </div>
        <div class="md-subheading">
          Updated: {{store.updated_date | moment("from")}}
        </div>
      </md-card-media-actions>
    </md-card-content>
    <md-card-actions>
      <div class="md-subheading">
        Location: {{store.location}}
      </div>
      <span style="flex: 1;"></span>
      <router-link tag="md-button" class="md-raised md-accent" :to="{name: 'user', params: {username: store.manager}}">
        {{store.manager}}
      </router-link>
    </md-card-actions>
  </md-card>
</template>

<script>
  export default {
    name: 'store',
    props: ['store'],
    computed: {
      isNew() {
        let today = new Date();
        let created = new Date(this.store.created_date);
        return today.toDateString() === created.toDateString();
      },
    }
  }
</script>
