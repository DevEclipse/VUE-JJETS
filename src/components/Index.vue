<template>
  <div>

    <md-dialog ref="getStarted">
      <md-dialog-content style="padding: 0">
        <md-tabs md-fixed @change="resetIndex">
          <md-tab id="signIn" md-icon="face" md-label="Sign In">
            <md-input-container>
              <label>Username or Email</label>
              <md-input v-model="emailOrUsername" @input="findUserByEmailOrUsername"></md-input>
              <span v-if="foundUser" class="md-caption">(User Found)</span>
            </md-input-container>
            <md-input-container v-if="foundUser" md-has-password>
              <label>Password</label>
              <md-input type="password" v-model="password"></md-input>
            </md-input-container>
            <md-button v-if="foundUser && password.length >= 6" class="md-raised md-accent" style="width: 95%"
                       @click="signInUser"> Sign In
            </md-button>

          </md-tab>

          <md-tab id="signUp" md-icon="accessibility" md-label="Sign Up" md-active>
            <template v-if="storedUser" style="padding: 1rem;">
              <md-input-container
                :class="{'md-input-invalid': (foundByUsername || !storedUsernameValid) && enteredUsername}">
                <label>What's your Username?</label>
                <md-input v-model.trim="storedUser.username"
                          @input="() => {storeUser(storedUser); enteredUsername = true;}"
                          @change="findUserByUsername" required/>

                <template v-if="!enteredUsername"></template>
                <span v-else-if="storedUser.username.length < 5"
                      class="md-error">Username must be 5 characters long</span>
                <span v-else-if="foundByUsername" class="md-error">Username is already used</span>
                <span v-else-if="!storedUsernameValid" class="md-error">Username must not have symbols</span>
              </md-input-container>
              <md-input-container v-if="usernameValid"
                                  :class="{'md-input-invalid': foundByEmail || !storedEmailValid && enteredEmail}">
                <label>Enter Your Email</label>
                <md-input v-model.trim="storedUser.email" @input="() => {storeUser(storedUser); enteredEmail = true;}"
                          @change="findUserByEmail" required/>
                <template v-if="!enteredUsername"></template>
                <span v-else-if="foundByEmail" class="md-error">Email is already used</span>
                <span v-else-if="!storedEmailValid" class="md-error">Email is badly formatted</span>

              </md-input-container>
              <md-input-container v-if="emailValid" md-has-password
                                  :class="{'md-input-invalid': storedUser.password.length < 6 && enteredPassword}">
                <label>Enter Your Password</label>
                <md-input type="password" v-model.trim="storedUser.password"
                          @input="() => {storeUser(storedUser); enteredPassword = true;}"/>
                <template v-if="!enteredUsername"></template>
                <span v-else-if="storedUser.password.length < 6"
                      class="md-error">Password must be 6 characters long</span>

              </md-input-container>
              <md-input-container md-has-password v-if="storedUser.password.length >= 6">
                <label>Confirm Password</label>
                <md-input type="password" v-model.trim="confirmPassword"></md-input>
              </md-input-container>
              <md-button v-if="signUpValid" class="md-raised md-accent" style="width: 95%"
                         @click="$root.signUp(storedUser)">
                Sign Up
              </md-button>
            </template>
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
            <md-button v-if="!$store.getters.authUser" class="md-accent md-raised" @click="openDialog('getStarted')">
              Get Started
            </md-button>
            <md-button v-else class="md-accent md-raised" @click="$root.toDashboard">
              To Your Dashboard
            </md-button>
          </div>
        </div>
      </div>

    </div>
    <div style="height: 100vh;background: url('http://pos.dsoftbd.com/wp-content/uploads/2014/07/b-slide11.jpg?id=558')
    no-repeat center center fixed; background-size: cover;">
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
                  <md-icon>alarm</md-icon>
                  Real Time
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
            <md-toolbar>
              <div class="md-toolbar-container">
                <div class="md-title">
                  <md-icon>autorenew</md-icon>
                  No Reloading
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
                  <md-icon>face</md-icon>
                  One Account
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
                  <md-icon>home</md-icon>
                  Multiple Systems
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
      signUpValid() {
        return this.usernameValid && this.emailValid && this.passwordValid;
      },
      usernameValid() {
        return this.storedUser.username.length >= 5 && !this.foundByUsername &&
          this.storedUsernameValid;
      },
      emailValid() {
        return !this.foundByEmail &&
          this.storedEmailValid;
      },
      passwordValid() {
        return this.storedUser.password.length >= 6 && this.storedUser.password == this.confirmPassword;
      },
      ...mapGetters([
        'storedUser',
        'storedUsernameValid',
        'storedEmailValid',
        'foundUser',
        'foundByUsername',
        'foundByEmail'
      ])
    },
    data() {
      return {
        emailOrUsername: '',
        password: '',
        enteredEmail: false,
        enteredUsername: false,
        enteredPassword: false,
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
      signInUser() {
        this.$root.signIn({email: this.foundUser.email, password: this.password});
      },
      resetIndex(){
        this.resetUserStore();
        this.storeUser();
        this.emailOrUsername = '';
        this.password = '';
        this.enteredEmail = false;
        this.enteredUsername = false;
        this.enteredPassword = false;
        this.confirmPassword = '';
      },
      ...mapActions([
        'addAlert',
        'findUserByEmailOrUsername',
        'findUserByEmail',
        'findUserByUsername',
        'storeUser',
        'resetUserStore'
      ])
    }
  }
</script>
