<template>
  <div id="app" v-md-theme="'default'">
    <transition enter-active-class="animated zoomInUp" leave-active-class="animated zoomOutUp">
     <router-view></router-view>
    </transition>
  </div>
</template>

<script>
    export default {

    }
</script>

<style>
    @import url('//cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
    @import url('//cdnjs.cloudflare.com/ajax/libs/flexboxgrid/6.3.1/flexboxgrid.min.css');
</style>
