<template>
  <div>
    <div v-if="!currentUser" style="height: 100vh; font-size: 20vh;">
        <div style="height: 100%;">
          Loading...
        </div>
    </div>

    
    <div v-if="currentUser">
    <header>
      
    
    <md-toolbar>


      <h2 class="md-title" style="flex: auto">Hello {{currentUser.username}}</h2>

      <md-avatar >
  <img src="//placeimg.com/64/64/people/2" alt="People">
</md-avatar>
    <md-button @click="toggleUserSideNav">
      Dashboard
    </md-button>
    </md-toolbar>
    </header>
    <md-sidenav class="md-right" ref="userSidenav" >
        <md-toolbar class="md-large">
    <div class="md-toolbar-container">
      <h3 class="md-title">Your Dashboard</h3>
    </div>
  </md-toolbar>
    <md-list>
  <md-list-item>
    <md-icon>move_to_inbox</md-icon> <router-link tag="span" :to="{ name: 'news'}">News</router-link>
  </md-list-item>
  <md-list-item>
    <md-icon>move_to_inbox</md-icon> <router-link tag="span" :to="{ name: 'info'}">Info</router-link>
  </md-list-item>

  <md-list-item>
    <md-icon>send</md-icon> <span>Edit Account</span>
  </md-list-item>

  <md-list-item @click="$root.signOut">
    <md-icon>error</md-icon> <span>Log Out</span>
  </md-list-item>
  </md-list>
    </md-sidenav>
    <main>
      <router-view :current_user="currentUser"></router-view>
    </main>
  </div>
  </div>
</template>

<script>
  import {
    mapGetters
  }
  from 'vuex'
  export default {
    name: 'user',
    computed: {
      ...mapGetters([
        'currentUser',
      ])
    },
    methods: {
      toggleUserSideNav() {
        this.$refs.userSidenav.toggle();
      },
    }
  }
</script>
