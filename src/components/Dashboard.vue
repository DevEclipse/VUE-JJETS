<template>
  <display v-if="!authUser" :message="$store.getters.authUID ? 'Loading... Your Account' : 'Heading back home'"/>
  <div v-else>
    <md-toolbar>
      <div class="md-title" style="flex: 1">
        JJETS | <span v-if="$route.name">{{$route.name | capitalize}}</span>
      </div>
      <div class="hidden-xs">
        <router-link class="md-button md-icon-button md-raised" :to="{name: 'home'}">
          <md-icon>home</md-icon>
          <md-tooltip>Home</md-tooltip>
        </router-link>
        <router-link class="md-button md-icon-button md-raised" :to="{name: 'items'}">
          <md-icon>shopping basket</md-icon>
          <md-tooltip>Items</md-tooltip>
        </router-link>
        <router-link class="md-button md-icon-button md-raised" :to="{name: 'stores'}">
          <md-icon>store</md-icon>
          <md-tooltip>Stores</md-tooltip>
        </router-link>
        <router-link class="md-avatar" :to="{name: 'user', params: {username: authUser['.key']}}">
          <img src="//placeimg.com/40/40/people/1" alt="People">
          <md-tooltip>{{authUser.username | capitalize}}</md-tooltip>
        </router-link>
        <md-button class="md-icon-button md-raised md-warn" @click="$root.signOut">
          <md-icon>close</md-icon>
          <md-tooltip>Sign Out</md-tooltip>
        </md-button>
      </div>
      <div class="visible-xs">
        <md-button class="md-icon-button md-raised" @click="toggleDashboard">
          <md-icon>menu</md-icon>
          <md-tooltip direction="bottom"> Dashboard</md-tooltip>
        </md-button>
      </div>
    </md-toolbar>

    <md-sidenav class="md-fixed md-left" ref="dashboardMenu">
      <md-card>
        <md-toolbar>
          <div class="md-title">
            {{authUser['.key'] | capitalize}}
          </div>
        </md-toolbar>
        <md-card-media>
          <img :src="authUser.image_url ||'//placeimg.com/900/900/people/1'">
        </md-card-media>
      </md-card>
      <md-list>
        <md-subheader>Navigation</md-subheader>
        <md-list-item>
          <md-icon>home</md-icon>
          <router-link tag="span" :to="{name: 'home'}"> Home</router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>add</md-icon>
          <router-link tag="span" :to="{name: 'items'}"> Items</router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>store</md-icon>
          <router-link tag="span" :to="{name: 'stores'}"> Stores</router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>face</md-icon>
          <router-link tag="span" :to="{name: 'user', params: {username: authUser['.key']}}"> Your Account</router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>face</md-icon>
          <span @click="$root.signOut">Sign Out</span>
        </md-list-item>
        <md-list v-if="currentManager" class="visible-xs">
          <md-subheader>Manager</md-subheader>
          <md-list-item>
            <md-icon>home</md-icon>
            <router-link tag="span" :to="{name: 'manager'}"> Info</router-link>
          </md-list-item>
          <md-list-item>
            <md-icon>add</md-icon>
            <router-link tag="span" :to="{name: 'managerItems'}"> Items</router-link>
          </md-list-item>
          <md-list-item>
            <md-icon>store</md-icon>
            <router-link tag="span" :to="{name: 'managerStores'}"> Stores</router-link>
          </md-list-item>
          <md-list-item>
            <md-icon>store</md-icon>
            <router-link tag="span" :to="{name: 'managerEmployees'}"> Employees</router-link>
          </md-list-item>
        </md-list>
        <md-list v-if="currentStore" class="visible-xs">
          <md-subheader>Store</md-subheader>
          <md-list-item>
            <md-icon>home</md-icon>
            <router-link tag="span"  class="col-xs" :to="{name: 'store'}">
              Info
            </router-link>
          </md-list-item>
          <md-list-item>
            <md-icon>add</md-icon>
            <router-link tag="span"  class="col-xs" :to="{name: 'storeItems'}">
              Items
            </router-link>
          </md-list-item>
          <md-list-item>
            <md-icon>store</md-icon>

            <router-link  tag="span"  class="col-xs" :to="{name: 'storeTransactions'}">
              Transactions
            </router-link>
          </md-list-item>


        </md-list>
      </md-list>
    </md-sidenav>
  </div>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'authUser',
        'currentManager',
        'currentStore',
      ])
    },
    methods: {
      ...mapActions([
        'addProfile',
      ]),
      toggleDashboard() {
        this.$refs.dashboardMenu.toggle();
      }
    },
  }
</script>
