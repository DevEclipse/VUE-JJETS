<template>
  <div v-if="!$store.getters.authUID">

    <md-dialog ref="getStarted">
      <md-dialog-content style="padding: 0">
        <md-tabs md-fixed>
          <md-tab id="signIn" md-icon="face"  md-label="Sign In">

            <md-input-container style="margin: 1rem;">
              <label>Email</label>
              <md-input type="email" v-model="signIn.email"></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;">
              <label>Password</label>
              <md-input type="password" v-model="signIn.password"></md-input>
            </md-input-container>
            <md-button  class="md-raised md-accent" style="width: 95%" @click="$root.signIn(signIn)"> Sign In</md-button>

          </md-tab>

          <md-tab id="signUp" md-icon="accessibility" md-label="Sign Up" md-active>

            <md-input-container style="margin: 1rem;">
              <label>Username</label>
              <md-input v-model="signUp.username"></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;">
              <label>Name</label>
              <md-input v-model="signUp.name"></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;">
              <label>Email</label>
              <md-input v-model="signUp.email"></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;">
              <label>Password</label>
              <md-input type="password" v-model="signUp.password"></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;">
              <label>Confirm Password</label>
              <md-input type="password" v-model="confirmPassword"></md-input>
            </md-input-container>
            <md-button class="md-raised md-accent" style="width: 95%" @click="$root.signUp(signUp)"> Sign Up</md-button>

          </md-tab>


        </md-tabs>
      </md-dialog-content>
    </md-dialog>

    <div style="height: 100vh;
    background: url('http://pos.dsoftbd.com/wp-content/uploads/2014/07/b-slide11.jpg?id=558')
    no-repeat center center fixed; background-size: cover;">


      <md-toolbar class="md-transparent">
        <div class="md-toolbar-container">
          <div class="md-title" style="flex: 1; font-weight: bold; color: white;">
            JJETS
          </div>
          <a href="#features" class="md-button md-accent">Features</a>
          <a href="#" class="md-button md-accent">About Us</a>
        </div>
      </md-toolbar>

      <div class="row middle-xs center-xs" style="height: 100%">
        <div class="col-xs" style="color: white; font-size: 15vh; font-weight: bold;">
          <div class="row middle-xs center-xs">JJETS</div>
          <div class="row middle-xs center-xs" style="padding: 5rem;">
          <md-button class="md-accent md-raised" @click="openDialog('getStarted')">
            Get Started
          </md-button>
          </div>
        </div>
      </div>

    </div>

    <div class="row center-xs middle-xs" style="height: 100vh;">

        <div class="md-display-4" style="font-weight: bold;">Features</div>
          <div class="row center-xs" style="height: 100%; margin: 2rem; font-size: 1.5rem; color: grey; ">
            <div class="col-xs-12 col-md">
              <md-card md-with-hover >
                <md-toolbar >
                  <div class="md-toolbar-container">
                    <div class="md-title">
                      <md-icon>alarm</md-icon> Real Time
                    </div>
                  </div>
                </md-toolbar>
                <md-card-content>
                  <div class="md-subheading">
                    Using the real time database technology of Google's Firebase Database
                    we make this possible to receive updates in real time.
                  </div>
                </md-card-content>
              </md-card>
            </div>
            <div class="col-xs-12 col-md">
              <md-card md-with-hover>
                <md-toolbar >
                  <div class="md-toolbar-container">
                    <div class="md-title">
                      <md-icon>autorenew</md-icon>No Reloading
                    </div>
                  </div>
                </md-toolbar>
                <md-card-content>
                  <div class="md-subheading">
                    Using the single page application technology from modern frameworks like vue js
                    we accomplish to make this site easy to use.
                  </div>
                </md-card-content>
              </md-card>
            </div>
            <div class="col-xs-12 col-md">
              <md-card md-with-hover>
                <md-toolbar >
                  <div class="md-toolbar-container">
                    <div class="md-title">
                     <md-icon>face</md-icon> One Account
                    </div>
                  </div>
                </md-toolbar>
                <md-card-content>
                  <div class="md-subheading">
                    Using the single page application technology from modern frameworks like vue js
                    we accomplish to make this site easy to use.
                  </div>
                </md-card-content>
              </md-card>
            </div>
          </div>

    </div>
    <div class="row" style="height: 100vh;">
      <div class="col-xs center-xs">
        <div class="row center-xs middle-xs" style="height: 50%;">
          <md-card md-with-hover>
            <md-card-content>
              <div class="md-display-4" style=" font-weight: bold;">Point of Sales</div>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>

  </div>

  <div v-else class="row">
    <md-list class="col-xs md-triple-line">
      <md-subheader>Other Users you may know</md-subheader>
      <md-list-item v-for="user in allUsers">
        <md-avatar>
          <vue-image :image="user.image_url" alt="User"></vue-image>
        </md-avatar>
        <div class="md-list-text-container">
          <span>{{user.name}}</span>
          <span>{{user['.key']}}</span>
        </div>
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'user', params: {username: user['.key']}}">
            <md-icon>info</md-icon>
          </router-link>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'index',
    computed: {
      ...mapGetters([
        'allUsers',
      ])
    },
    data() {
      return {
        signUp: {
          username: '',
          name: '',
          email: '',
          password: '',
        },
        signIn: {
          email: '',
          password: '',
        },
        confirmPassword: '',
      }
    },
    methods: {
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
    }
  }
</script>
