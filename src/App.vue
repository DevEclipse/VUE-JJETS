<template>
  <div id="app" v-md-theme="'default'">

    <dashboard v-if="$route.name != 'index' "></dashboard>
    <transition enter-active-class="animated zoomInUp" leave-active-class="animated zoomOutUp">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Dashboard from './components/Dashboard.vue'
  export default {
    name: 'app',
    components: {
        Dashboard
    }
  }
</script>

<style>
  @import url('//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic');
  @import url('//fonts.googleapis.com/icon?family=Material+Icons');
  * {
    overflow-x: hidden;
  }
</style>
