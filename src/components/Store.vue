<template>
  <md-card md-with-hover class="md-primary">
    <md-toolbar class="md-large">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">{{store.name | capitalize}}
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
      Manager:
      <router-link tag="md-button" :to="{name: 'user', params: {username: store.manager}}">
        {{store.manager}}
      </router-link>
    </md-card-actions>
  </md-card>
</template>

<script>
  export default {
    name: 'store',
    props: ['store'],
  }
</script>
