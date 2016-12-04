<template>
  <display v-if="!currentManager" message="No Manager Found"/>
  <div v-else>

    <md-toolbar class="md-accent hidden-xs">
      <div class="md-title" style="flex: 1">
        Manager | {{currentManager['.key'] | capitalize}}
      </div>
      <router-link :to="{name: 'manager'}" class="md-button">
        Info
      </router-link>
      <router-link :to="{name: 'managerItems'}" class="md-button">
        Items
      </router-link>
      <router-link :to="{name: 'managerStores'}" class="md-button">
        Stores
      </router-link>
      <router-link :to="{name: 'managerEmployees'}" class="md-button">
        Employees
      </router-link>
      <router-link :to="{name: 'user', params: {username: currentManager['.key']}}" class="md-button">
        Go To User Profile
      </router-link>
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
        'currentManager',
        'authUser'
      ])
    },
  }
</script>

