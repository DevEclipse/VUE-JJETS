<template>
  <div v-if="authUser && $route.name != 'home'">

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

        <md-button class="md-icon-button" @click="toggleDashboard">
          <md-icon>dashboard</md-icon>
          <md-tooltip direction="bottom">Dashboard</md-tooltip>
        </md-button>
      </div>
    </md-toolbar>

    <md-sidenav class="md-fixed md-left" ref="dashboardMenu">
      <md-toolbar class="md-account-header">
        <md-list class="md-transparent">
          <md-list-item class="md-avatar-list">
            <md-avatar class="md-large">
              <img :src="authUser.image_url || 'https://placeimg.com/64/64/people/8'" alt="People">
            </md-avatar>
          </md-list-item>

          <md-list-item>
            <div class="md-list-text-container">

              <span>{{authUser.name | capitalize}}</span>
              <span>{{authUser.email}}</span>
            </div>
            <router-link :to="{name: 'user', params: {username: authUser.username}}" tag="md-button"
                         class="md-icon-button md-list-action">
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
          <md-icon>cancel</md-icon>
          <span @click="$refs.signOut.open()">Sign Out</span>
        </md-list-item>
        <md-subheader>Profiles</md-subheader>
        <md-list-item v-if="authManager">
          <md-icon>store</md-icon>
          <router-link tag="span" :to="{name: 'manager', params: {username: authManager.username}}">
            Manager
          </router-link>
        </md-list-item>
        <md-list-item v-if="authEmployee">
          <md-icon>store</md-icon>
          <router-link tag="span" :to="{name: 'employee', params: {username: authEmployee.username}}">
            Employee
          </router-link>
        </md-list-item>
        <md-list-item v-if="authCustomer">
          <md-icon>store</md-icon>
          <router-link tag="span" :to="{name: 'customer', params: {username: authCustomer.username}}">
            Customer
          </router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <slot></slot>

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
