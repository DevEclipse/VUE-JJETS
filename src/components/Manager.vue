<template>
  <div>
    <div v-if="!currentManager" style="height: 100vh; font-size: 20vh;">
      <div style="height: 100%;">
        Loading...
      </div>
    </div>
    <md-toolbar>
      <h2 class="md-title" style="flex: auto">
        Manager : {{currentManager['.key']}}
      </h2>
      <router-link v-if="authUser.username == currentManager['.key']" class="md-button" :to="{name: 'user', params: { username: currentManager['.key']}}">
        Go Back to User Profile
      </router-link>
      <router-link v-else class="md-button" :to="{name: 'user', params: { username: authUser.username}}">
        Go Back to Your Profile
      </router-link>

      <router-link class="md-button" :to="{name: 'managerStores'}">
        Stores
      </router-link>
      <router-link class="md-button" :to="{name: 'managerItems'}">
        Items
      </router-link>
    </md-toolbar>
    <div v-if="currentManager">
      <router-view :stores="currentManagerStores" :manager="currentManager" :items="currentManagerItems"></router-view>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  }
    from 'vuex'
  export default {
    name: 'manager',
    computed: {
      ...mapGetters([
        'currentManager',
        'currentManagerStores',
        'currentManagerItems',
        'authUser'
      ])
    },
  }
</script>
