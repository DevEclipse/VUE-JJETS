<template>
  <div>
    <loading v-if="!currentEmployee" message="Loading... Employee"></loading>
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
    name: 'employee',
    computed: {
      ...mapGetters([
        'currentEmployee',
        'authUser'
      ])
    },
  }
</script>
