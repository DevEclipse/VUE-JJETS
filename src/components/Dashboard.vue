<template>
  <display v-if="!authUser" :message="$store.getters.authUID ? 'Loading... Your Account' : 'Heading back home'"/>
  <div v-else>

    <md-dialog ref="signOut">
      <md-toolbar>
        <div class="md-title">Sign Out</div>
      </md-toolbar>

      <md-dialog-content style="margin: 2rem;">Are you sure you want to sign out?</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click="$root.signOut">Sign Out</md-button>
        <md-button class="md-primary" @click="$refs.signOut.close()">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-toolbar class="md-dense">
      <div class="md-toolbar-container">
      <div class="md-title" style="flex: 1">
        JJETS | <span v-if="$route.name">{{$route.name | capitalize}}</span>
      </div>
      <div class="hidden-xs">
        <router-link class="md-button md-icon-button" :to="{name: 'home'}">
          <md-icon>home</md-icon>
          <md-tooltip>Home</md-tooltip>
        </router-link>
        <router-link class="md-button md-icon-button" :to="{name: 'items'}">
          <md-icon>shopping basket</md-icon>
          <md-tooltip>Items</md-tooltip>
        </router-link>

        <router-link class="md-button md-icon-button" :to="{name: 'stores'}">
          <md-icon>store</md-icon>
          <md-tooltip>Stores</md-tooltip>
        </router-link>
        <router-link class="md-avatar" :to="{name: 'user', params: {username: authUser['.key']}}">
          <img src="//placeimg.com/40/40/people/1" alt="People">
          <md-tooltip>{{authUser.username | capitalize}}</md-tooltip>
        </router-link>
        <md-button class="md-icon-button"  @click="$refs.signOut.open()">
          <md-icon>close</md-icon>
          <md-tooltip>Sign Out</md-tooltip>
        </md-button>
      </div>
      <div class="visible-xs">
        <md-button class="md-icon-button" @click="toggleDashboard">
          <md-icon>dashboard</md-icon>
          <md-tooltip direction="bottom">Dashboard</md-tooltip>
        </md-button>
      </div>
      </div>
    </md-toolbar>

    <md-sidenav class="md-fixed md-left" ref="dashboardMenu">
        <md-toolbar class="md-account-header">
          <md-list class="md-transparent">
            <md-list-item class="md-avatar-list" >
              <md-avatar class="md-large">
                <img :src="authUser.image_url || 'https://placeimg.com/64/64/people/8'" alt="People">
              </md-avatar>
            </md-list-item>

            <md-list-item>
              <div class="md-list-text-container">

                <span>{{authUser.name | capitalize}}</span>
                <span>{{authUser.email}}</span>
              </div>

              <router-link :to="{name: 'user',params: {username: authUser['.key']}}" tag="md-button" class="md-icon-button md-list-action">
                <md-icon>send</md-icon>
              </router-link>
            </md-list-item>
          </md-list>
        </md-toolbar>

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
          <router-link tag="span" :to="{name: 'user', params: {username: authUser['.key']}}"> Your Account </router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>face</md-icon>
          <span @click="$refs.signOut.open()">Sign Out</span>
        </md-list-item>
        <md-subheader>Profiles</md-subheader>
        <md-list-item v-if="authManager">
          <md-icon>store</md-icon>
          <router-link tag="span" :to="{name: 'manager', params: {manager: authManager['.key']}}">
            Manager
          </router-link>
        </md-list-item>
        <md-list-item v-if="authEmployee">
          <md-icon>store</md-icon>
          <router-link tag="span" :to="{name: 'employee', params: {employee: authEmployee['.key']}}">
            Employee
          </router-link>
        </md-list-item>
        <md-list-item v-if="authCustomer">
          <md-icon>store</md-icon>
          <router-link tag="span" :to="{name: 'customer', params: {customer: authCustomer['.key']}}">
            Customer
          </router-link>
        </md-list-item>
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
        'authManager',
        'authEmployee',
        'authCustomer',
      ])
    },
    methods: {
      toggleDashboard() {
        this.$refs.dashboardMenu.toggle();
      },
    },
  }
</script>
