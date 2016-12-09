<template>
  <display v-if="!currentStore" message="Store Not Found"/>
  <div v-else>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
      <span class="md-title" style="flex: 1;">
        {{currentStore.name | capitalize}}
      </span>
        <div class="hidden-xs">
          <router-link tag="md-button" :to="{name: 'store'}">
            <md-icon>info</md-icon> Info
          </router-link>
          <router-link tag="md-button" :to="{name: 'stocks'}">
            <md-icon>store</md-icon> Stocks
          </router-link>
          <span v-if="authEmployee || authManager">
        <router-link
          v-if="authManager['.key'] == currentStore.manager || authEmployee['.key'].manager == currentStore.manager"
          tag="md-button" :to="{name: 'storeTransactions'}">
         <md-icon>timeline</md-icon> Transactions
        </router-link>
          </span>
        </div>
        <div class="visible-xs">
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'store'}">
            <md-icon>info</md-icon>
          </router-link>
          <router-link tag="md-button" class="md-icon-button"  :to="{name: 'stocks'}">
            <md-icon>store</md-icon>
          </router-link>
          <router-link tag="md-button" class="md-icon-button"  :to="{name: 'storeTransactions'}">
            <md-icon>timeline</md-icon>
          </router-link>
        </div>
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
        'authManager',
        'authEmployee'
      ])
    },
  }
</script>
