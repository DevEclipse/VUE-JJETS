<template>
  <div id="app" v-md-theme="'default'" >

    <dashboard>
      <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">
        <router-view :authUser="authUser"
                     :authManager="authManager"
                     :authEmployee="authEmployee"
                     :authCustomer="authCustomer">
        </router-view>
      </transition>
    </dashboard>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">
      <router-view name="index"></router-view>
    </transition>
  </div>
</template>
"
<script>
  import Dashboard from './components/Dashboard.vue';
  import {mapGetters, mapActions} from 'vuex';
export default {
    name: 'app',
    components: {
        Dashboard
    },
    computed: {
      ...mapGetters([
        'authUser',
        'authManager',
        'authEmployee',
        'authCustomer',
      ])
    },
  }
</script>

<style>
  @import url('//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic');
  @import url('//fonts.googleapis.com/icon?family=Material+Icons');
  html,body {
    overflow-x: hidden;
  }
  .h-100 {
    height: 100%;
  }
  .w-100 {
    width: 100%;
  }
</style>
