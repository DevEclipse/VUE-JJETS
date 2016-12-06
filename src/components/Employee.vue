<template>
  <display v-if="!currentEmployee" message="No Employee Found"></display>
  <div v-else>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">Employee | {{currentEmployee['.key']}}</div>
        <md-button>Hire</md-button>
      </div>
    </md-toolbar>
    <md-list  class="md-triple-line">
      <md-subheader>Your Manager: {{currentEmployee['.key'] | capitalize }} Stores</md-subheader>
      <md-list-item v-for="store in currentEmployeeManagerStores">
        <md-avatar>
          <img :src="store.image_url || 'https://placeimg.com/40/40/people/1'" alt="Stores">
        </md-avatar>
        <div class="md-list-text-container">
          <span>{{store.name}}</span>
          <span>{{store['.key']}}</span>
        </div>

        <router-link :to="{name: 'pos', params: {store: store['.key']}}" tag="md-button" class="md-icon-button md-list-action">
          <md-icon class="md-primary">send</md-icon>
        </router-link>

        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'currentEmployee',
        'currentEmployeeManagerStores',
        'authUser'
      ])
    },
    methods: {
      ...mapActions([
        'addStore',
      ])
    }
  }
</script>

