<template>
  <div id="app" v-md-theme="'default'">
    <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
     <router-view></router-view>
    </transition>
  </div>
</template>

<script>

   export default {

   }
</script>

<style>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
</style>
