<template>

  <div v-if="authUser">
    <md-toolbar>
      <div class="md-title" style="flex: 1">
        JJETS | {{$route.name | capitalize}}
      </div>

      <md-avatar class="md-raised">
        <img src="//placeimg.com/40/40/people/1" alt="People">
        <md-tooltip direction="bottom"> {{authUser.username | capitalize}} </md-tooltip>
      </md-avatar>
      <md-button class="md-icon-button md-raised" @click="toggleDashboard">
        <md-icon>dashboard</md-icon>
        <md-tooltip direction="bottom"> Dashboard </md-tooltip>
      </md-button>
      <md-button class="md-icon-button md-raised md-warn">
        <md-icon>close</md-icon>
        <md-tooltip direction="bottom"> Sign Out </md-tooltip>
      </md-button>
    </md-toolbar>

  <md-sidenav class="md-left" ref="dashboardMenu">
    <md-card>
      <md-toolbar>
        <div class="md-title">
          {{authUser.username | capitalize}}
        </div>
      </md-toolbar>
      <md-card-media>
        <img :src="authUser.image_url ||'//placehold.it/1920x1080'">
      </md-card-media>
    </md-card>
    <md-list >
      <md-list-item>
        <router-link :to="{name: 'items'}">Items</router-link>
      </md-list-item>
      <md-list-item>
        <router-link :to="{name: 'stores'}">Stores</router-link>
      </md-list-item>
      <md-list-item v-if="!authUser.profiles.manager" @click="addProfile({user: authUser,profile: 'manager'})">
        <md-icon>add</md-icon> Add Manager Profile
      </md-list-item>
      <md-list-item v-else>
        <md-icon>videogame_asset</md-icon>
        <span>Manager</span>
        <md-list-expand>
          <md-list>

          </md-list>
        </md-list-expand>
      </md-list-item>
      <md-list-item v-if="!authUser.profiles.employee" @click="addProfile({user: authUser,profile: 'employee'})">
        <md-icon>add</md-icon> Add Employee Profile
      </md-list-item>
      <md-list-item v-else>
        <md-icon>videogame_asset</md-icon>
        <span>Employee</span>
        <md-list-expand>

        </md-list-expand>
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
