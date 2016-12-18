<template>
  <div id="app">


    <transition-group style="position: fixed; z-index: 9999;" enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutRight"
                mode="out-in">
      <alert v-for="alert in getAlerts" :alert="alert" :key="alert.id"></alert>
    </transition-group>

    <dashboard>
      <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight"
                  mode="out-in">
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

    <md-button @click="scrollToTop" class="md-fab md-mini md-fab-bottom-left"
               style="position: fixed;z-index: 999;">
      <md-icon>keyboard_arrow_up</md-icon>
    </md-button>

  </div>
</template>


<script>

  function scrollWindowToTop(scrollDuration) {
    let cosParameter = window.scrollY / 2,
      scrollCount = 0,
      oldTimestamp = performance.now();

    function step(newTimestamp) {
      scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
      if (scrollCount >= Math.PI) window.scrollTo(0, 0);
      if (window.scrollY === 0) return;
      window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  import Dashboard from './components/Dashboard.vue';
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'app',
    components: {
      Dashboard
    },
    data() {
      return {
        alerts: [],
      }
    },
    computed: {
      ...mapGetters([
        'authUser',
        'authManager',
        'authEmployee',
        'authCustomer',
        'getAlerts'
      ])
    },
    methods: {
      scrollToTop() {
        scrollWindowToTop(1000);
      },
      ...mapActions([
        'addAlert',
        'deleteAlert',
      ])
    },
  }
</script>

<style>
  @import url('//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic');


  html, body {
    overflow-x: hidden;
  }

  .h-100 {
    height: 100%;
  }

  .w-100 {
    width: 100%;
  }

</style>
