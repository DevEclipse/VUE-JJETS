<template>
  <div v-if="!$store.getters.authUID">

    <md-dialog ref="getStarted">

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

    </md-dialog>

    <div style="height: 100vh;
    background: url('http://pos.dsoftbd.com/wp-content/uploads/2014/07/b-slide11.jpg?id=558')
    no-repeat center center fixed; background-size: cover;">


      <md-toolbar class="md-transparent">
        <div class="md-toolbar-container">
          <div class="md-title" style="flex: 1; font-weight: bold; color: teal;">
            JJETS
          </div>
          <a href="#features" class="md-button">Features</a>
          <a href="#" class="md-button">About Us</a>
        </div>
      </md-toolbar>

      <div class="row middle-xs center-xs" style="height: 100%">
        <div class="col-xs" style="color: white; font-size: 15vh; font-weight: bold;">
          <div class="row middle-xs center-xs">JJET Systems </div>
          <div class="row middle-xs center-xs" style="padding: 5rem;">
          <md-button class="md-accent md-raised" @click="openDialog('getStarted')">
            Get Started
          </md-button>
          </div>
        </div>
      </div>

    </div>

    <div class="row center-xs middle-xs" style="height: 100vh;background: url('https://cloud--net.com/images/pos/bg2.jpg') no-repeat center center fixed; background-size: cover;">
      <div id="features" class="col-xs-6" style="height: 30vh; background: teal;">

      </div>
    </div>
    <div class="row" style="height: 100vh;background: url('http://cdn2.hubspot.net/hub/164692/file-229125836-jpg/images/mp900442309.jpg') no-repeat center center fixed; background-size: cover;">

    </div>

  </div>
  <div v-else class="row">
    <div class="col-xs">
      People you may know
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
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
