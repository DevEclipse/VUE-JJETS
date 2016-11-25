<template>
  <div>
    <loading v-if="!currentManager"></loading>
    <div v-if="currentManager">
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

      <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
        <router-view :stores="currentManagerStores" :manager="currentManager" :items="currentManagerItems"></router-view>
      </transition>
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
