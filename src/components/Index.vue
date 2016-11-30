<template>
  <div>

    <md-toolbar>
      <div class="md-title" style="flex: 1">
        JJETS
      </div>
      <div v-if="$store.getters.authUID">
      <md-button class="md-icon-button md-raised" @click="$root.toDashboard">
        <md-icon>dashboard</md-icon>
        <md-tooltip direction="bottom"> Dashboard </md-tooltip>
      </md-button>
      </div>
      <div v-else>
      <md-button class="md-icon-button md-raised" @click="toggleSignInDrawer">
        <md-icon>accessibility</md-icon>
        <md-tooltip direction="bottom"> Sign In </md-tooltip>
      </md-button>
      <md-button class="md-icon-button md-raised" @click="toggleSignUpDrawer">
        <md-icon>face</md-icon>
        <md-tooltip direction="bottom"> Sign Up </md-tooltip>
      </md-button>
      </div>
    </md-toolbar>

    <md-sidenav class="md-right" ref="signInDrawer" >
      <md-toolbar>
        <div class="md-title">
          Sign In
        </div>
      </md-toolbar>
      <md-input-container style="margin: 10px;">
        <label>Email</label>
        <md-input type="email" v-model="credentials.email"></md-input>
      </md-input-container>
      <md-input-container style="margin: 10px;" >
        <label>Password</label>
        <md-input type="password"  v-model="credentials.password"></md-input>
      </md-input-container>
      <md-button @click="signIn" class="md-raised md-accent" style="width: 95%"> Sign In </md-button>
    </md-sidenav>

    <md-sidenav class="md-right" ref="signUpDrawer" >
      <md-toolbar>
        <div class="md-title">
          Sign Up
        </div>
      </md-toolbar>
      <md-input-container style="margin: 10px;" >
        <label>Username</label>
        <md-input v-model="credentials.username"></md-input>
      </md-input-container>
      <md-input-container style="margin: 10px;" >
        <label>Name</label>
        <md-input  v-model="credentials.name"></md-input>
      </md-input-container>
      <md-input-container style="margin: 10px;">
        <label>Email</label>
        <md-input v-model="credentials.email" ></md-input>
      </md-input-container>
      <md-input-container style="margin: 10px;">
        <label>Password</label>
        <md-input type="password" v-model="credentials.password" ></md-input>
      </md-input-container>
      <md-input-container style="margin: 10px;">
        <label>Confirm Password</label>
        <md-input type="password" v-model="confirmPassword" ></md-input>
      </md-input-container>
      <md-button @click="signUp" class="md-raised md-accent" style="width: 95%"> Sign Up </md-button>
    </md-sidenav>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'allUsers',
      ])
    },
    data() {
      return {
        credentials: {
          username: '',
          name: '',
          email: '',
          password: '',
        },
        confirmPassword: '',
      }
    },
    methods: {
      toggleSignInDrawer() {
        this.$refs.signInDrawer.toggle();
      },
      toggleSignUpDrawer() {
        this.$refs.signUpDrawer.toggle();
      },
      signUp() {
        this.$root.signUp(this.credentials);
        this.toggleSignUpDrawer();
      },
      signIn() {
        this.$root.signIn(this.credentials);
        this.toggleSignInDrawer();
      }
    }
  }
</script>
