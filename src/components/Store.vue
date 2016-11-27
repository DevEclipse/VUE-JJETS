<template>
  <div>

    <loading v-if="!currentStore" message="Loading... Stores"></loading>

    <div v-else>
      <md-toolbar>
        <div class="md-title" style="flex: 1;">
          Store | {{currentStore.name}}
        </div>
        <div v-if="authUser.profiles.manager == currentStore.manager">
          <router-link :to="{name: 'managerStoreInfo'}" class="md-button">
            Info
          </router-link>
          <router-link :to="{name: 'managerStoreItems'}" class="md-button">
            Items
          </router-link>
          <router-link :to="{name: 'managerStoreTransactions'}" class="md-button">
            Transactions
          </router-link>
        </div>
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
