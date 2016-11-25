<template>
  <div>

    <div v-if="currentUser">

      <header>


        <md-toolbar>


          <h2 class="md-title" style="flex: auto">
            {{ currentUser != authUser ? `You are viewing ${currentUser.username}'s profile` : `Your Profile ${currentUser.username}` }}
          </h2>

          <md-avatar >
            <img src="//placeimg.com/64/64/people/2" alt="People">
          </md-avatar>
          <router-link class="md-icon-button md-button"
                       v-if="currentUser != authUser"
                       :to="{name: 'user', params: { username: authUser.username}}">
            <md-icon>undo</md-icon>
          </router-link>
          <router-link class="md-button" to="/news">News</router-link>
        </md-toolbar>
      </header>

      <main>
        <router-view :current_user="currentUser"></router-view>
      </main>
    </div>

    <div v-if="!currentUser" style="height: 100vh; font-size: 20vh;">
        Loading
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'user',
    computed: {
      ...mapGetters([
        'currentUser',
        'authUser'
      ])
    },

  }
</script>
