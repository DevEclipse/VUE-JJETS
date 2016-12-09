<template>
  <display v-if="!currentManager" message="No Manager Found"/>
  <div v-else>

    <md-toolbar class="md-accent">
      <div class="md-title" style="flex: 1">
        Manager | {{currentManager['.key'] | capitalize}}
      </div>
      <div class="hidden-xs">
      <router-link :to="{name: 'manager'}" tag="md-button">
        <md-icon>info</md-icon> Info
      </router-link>
      <router-link :to="{name: 'managerItems'}" tag="md-button">
        <md-icon>shop</md-icon> Items
      </router-link>
      <router-link :to="{name: 'managerStores'}" tag="md-button">
        <md-icon>store</md-icon> Stores
      </router-link>
      <router-link :to="{name: 'managerEmployees'}" tag="md-button">
        <md-icon>face</md-icon> Employees
      </router-link>
      </div>
      <div class="visible-xs">
        <router-link :to="{name: 'manager'}" class="md-icon-button" tag="md-button">
          <md-icon>info</md-icon>
        </router-link>
        <router-link :to="{name: 'managerItems'}" class="md-icon-button" tag="md-button">
          <md-icon>shop</md-icon>
        </router-link>
        <router-link :to="{name: 'managerStores'}" class="md-icon-button" tag="md-button">
          <md-icon>store</md-icon>
        </router-link>
        <router-link :to="{name: 'managerEmployees'}" class="md-icon-button" tag="md-button">
          <md-icon>face</md-icon>
        </router-link>
      </div>
    </md-toolbar>

    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'authManager',
        'currentManager',
      ])
    },
  }
</script>

