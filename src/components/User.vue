<template>
  <div>
    <loading v-if="!currentUser" message="Loading... User"/>
    <div v-if="currentUser">
      <main>
        <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
          <router-view></router-view>
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'user',
    computed: {
      ...mapGetters([
        'currentUser',
      ])
    },
  }
</script>
