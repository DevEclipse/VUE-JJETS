<template>
  <div>
    <loading v-if="!currentUser"></loading>
    <div v-else>
      <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
        <router-view></router-view>
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
        'currentUser',
        'currentManagerStores',
        'currentManagerItems',
        'authUser'
      ])
    },
  }
</script>
