<template>
  <display v-if="!currentStore" message="Store Not Found"/>
  <div v-else>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
      <span class="md-title" style="flex: 1;">
        {{currentStore.name | capitalize}}
      </span>
        <router-link tag="md-button" :to="{name: 'store'}">
          Info
        </router-link>
        <router-link tag="md-button" :to="{name: 'storeItems'}">
          Items
        </router-link>
        <router-link tag="md-button" :to="{name: 'storeTransactions'}">
          Transactions
        </router-link>
      </div>
    </md-toolbar>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'store',
    computed: {
      ...mapGetters([
        'currentStore',
      ])
    },
  }
</script>
