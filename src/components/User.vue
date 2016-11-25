<template>
  <div>
    <md-toolbar>
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title">{{$route.params.username}}</h2>
    </md-toolbar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'user',
    computed: {
      ...mapGetters([
        'currentUser',
      ])
    },
    data() {
      return {
        nav: {
          menuWidth: 60, // Default is 240
          draggable: true // Choose whether you can drag to open on touch screens
        }
      }
    },
  }
</script>
