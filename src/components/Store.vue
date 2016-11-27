<template>
  <div>

    <loading v-if="!currentStore" message="Loading... Stores"></loading>

    <div v-else>
      <md-toolbar>
        <div class="md-title" style="flex: 1;">
         Store | {{currentStore.name}}
        </div>
        <router-link :to="{name: 'manager', params: {manager: currentStore.manager}}" class="md-button">
          Manager
        </router-link>
        <router-link :to="{name: 'storeInfo'}" class="md-button">
          Info
        </router-link>
        <router-link :to="{name: 'storeItems'}" class="md-button">
          Items
        </router-link>
        <router-link :to="{name: 'storeTransactions'}" class="md-button">
          Transactions
        </router-link>
        <router-link :to="{name: 'storeEmployees'}" class="md-button">
          Employees
        </router-link>
      </md-toolbar>
      <transition enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'store',
    computed: {
      ...mapGetters([
        'authUser',
        'currentStore',
        'currentManager'
      ])
    }

  }
</script>
