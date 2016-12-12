<template>
  <div>

    <md-dialog ref="getStarted">
      <md-dialog-content style="padding: 0">
        <md-tabs md-fixed>
          <md-tab id="signIn" md-icon="face"  md-label="Sign In">

            <md-input-container style="margin: 1rem;">
              <label>Email</label>
              <md-input type="email" v-model="signIn.email" required></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;" v-show="accountExist('email',signIn.email)">
              <label>Password</label>
              <md-input  type="password" v-model="signIn.password"></md-input>
            </md-input-container>
            <md-button v-show="signIn.password.length > 6 && accountExist('email',signIn.email)"  class="md-raised md-accent" style="width: 95%" @click="$root.signIn(signIn)"> Sign In</md-button>

          </md-tab>

          <md-tab id="signUp" md-icon="accessibility" md-label="Sign Up" md-active>

            <md-input-container style="margin: 1rem;">
              <label>Username</label>
              <md-input minlength="" maxlength="10" v-model.trim="signUp.username" required></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;" required>
              <label>Name</label>
              <md-input v-model.trim="signUp.name"></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;">
              <label>Email</label>
              <md-input v-model.trim="signUp.email" required></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;">
              <label>Password</label>
              <md-input minlength="6" maxlength="30" type="password" v-model.trim="signUp.password"></md-input>
            </md-input-container>
            <md-input-container style="margin: 1rem;">
              <label>Confirm Password</label>
              <md-input :disabled="signUp.password.length <= 4" type="password" v-model.trim="confirmPassword" required></md-input>
            </md-input-container>
            <md-button
              v-show="!passwordNotMatched
              && signUp.username.length == 10
              && signUp.name.length
              && signUp.email.length
              && !accountExist('username',signUp.username)
              && !accountExist('email',signUp.email)"
              class="md-raised md-accent" style="width: 95%" @click="$root.signUp(signUp)"> Sign Up</md-button>
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
    <div style="height: 100vh;background: url('http://pos.dsoftbd.com/wp-content/uploads/2014/07/b-slide11.jpg?id=558')
    no-repeat center center fixed; background-size: cover;" >
    <md-toolbar class="md-accent" style="width: 100%; height: 20%;">
      <div class="md-toolbar-container">
        <div class="md-display-4" style="height: 50%; padding: 3rem;font-weight: bold; color: white;">Features</div>
      </div>
    </md-toolbar>
      <div class="row end-xs middle-xs" style="height: 20%;">
        <div class="col-xs-10">
          <md-card md-with-hover>
            <md-toolbar>
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
      </div>
      <div class="row middle-xs" style="height: 20%;">
        <div class="col-xs-10">
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
      </div>
      <div class="row end-xs middle-xs" style="height: 20%;">
        <div class="col-xs-10">
          <md-card md-with-hover>
            <md-toolbar>
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

      <div class="row middle-xs" style="height: 20%;">
        <div class="col-xs-10">
          <md-card md-with-hover>
            <md-toolbar>
              <div class="md-toolbar-container">
                <div class="md-title">
                  <md-icon>home</md-icon> Multiple Systems
                </div>
              </div>
            </md-toolbar>
            <md-card-content>
              <div class="md-subheading">
                We provide you profiles to use for multiple systems on our site.
              </div>
            </md-card-content>
          </md-card>

        </div>
      </div>

    </div>
    <div class="row" style="height: 100vh;">
      <div class="col-xs center-xs">
        <div class="row center-xs bottom-xs" style="height: 100%;">
          <md-card md-with-hover>
            <md-card-content>
              <div class="md-display-4" style=" font-weight: bold;">Point of Sales</div>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>

  </div>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'index',
    computed: {
      passwordNotMatched() {
        if(!this.signUp.password) return true;
        return this.signUp.password != this.confirmPassword;
      },
      ...mapGetters([
        'allUsers',
        'allStocks',
        'allItems'
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
      accountExist(by,what) {
        return _.find(this.allUsers,[by,what]) != null;
      },
      openDialog(ref) {
        this.$refs[ref].open();
      },
      closeDialog(ref) {
        this.$refs[ref].close();
      },
    }
  }
</script>
