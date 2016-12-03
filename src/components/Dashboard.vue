<template>
    <display v-if="!authUser" :message="$store.getters.authUID ? 'Loading... Your Account' : 'Heading back home'"/>
  <div v-else>
    <md-toolbar>
      <div class="md-title" style="flex: 1">
        JJETS | {{$route.name | capitalize}}
      </div>
      <div class="hidden-xs">
        <router-link tag="button" class="md-button" :to="{name: 'home'}"> Home </router-link>
        <router-link tag="button" class="md-button" :to="{name: 'items'}"> Items </router-link>
        <router-link tag="button" class="md-button" :to="{name: 'stores'}"> Stores </router-link>
        <router-link tag="button" class="md-button" :to="{name: 'user', params: {username: authUser.username}}"> Profiles </router-link>
        <md-button @click="$root.signOut">Sign Out</md-button>
      </div>
      <div class="visible-xs">

        <md-button class="md-icon-button md-raised" @click="toggleDashboard">
          <md-icon>menu</md-icon>
          <md-tooltip direction="bottom"> Dashboard </md-tooltip>
        </md-button>
      </div>
    </md-toolbar>

    <md-sidenav class="md-left" ref="dashboardMenu">
      <md-card>
        <md-toolbar>
          <div class="md-title">
            {{authUser.username | capitalize}}
          </div>
        </md-toolbar>
        <md-card-media>
          <img :src="authUser.image_url ||'//placeimg.com/900/900/people/1'">
        </md-card-media>
      </md-card>
      <md-list >
        <md-subheader>Navigation</md-subheader>
        <md-list-item>
          <md-icon>home</md-icon>
          <router-link tag="span" :to="{name: 'home'}"> Home </router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>add</md-icon>
          <router-link tag="span" :to="{name: 'items'}"> Items </router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>store</md-icon>
          <router-link tag="span" :to="{name: 'stores'}"> Stores </router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>face</md-icon>
          <router-link tag="span" :to="{name: 'user', params: {username: authUser.username}}"> Profiles </router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>face</md-icon>
          <span @click="$root.signOut">Sign Out</span>
        </md-list-item>

      </md-list>
    </md-sidenav>
  </div>

</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'authUser',
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
