<template>
  <div>
    <v-side-nav id="signUp">
      <v-container>
        <h5> Sign Up </h5>
        <div class="input-field">
          <v-text-input v-model="signUp.username"/>
          <label>Username</label>
        </div>
        <div class="input-field">
          <v-text-input v-model="signUp.email" type="email"/>
          <label>Email</label>
        </div>
        <div class="input-field">
          <v-text-input v-model="signUp.password" type="password"/>
          <label>Password</label>
        </div>
        <div class="input-field">
          <v-text-input v-model="confirmPassword" type="password"/>
          <label>Confirm Password</label>
        </div>

        <div class="input-field">
          <button class="btn large" @click="signUpUser" style="display: block;"> Sign Up </button>
        </div>
      </v-container>
    </v-side-nav>
    <v-side-nav id="signIn">
      <v-container>
        <h5> Sign In </h5>
        <div class="input-field">
          <v-text-input v-model="signIn.email" type="email"/>
          <label>Email</label>
        </div>
        <div class="input-field">
          <v-text-input v-model="signIn.password" type="password"/>
          <label>Password</label>
        </div>
        <v-switch checked
                  on="Remember"
                  off="Dont Remember"
                  v-model="signIn.remember"
        ></v-switch>

        <div class="input-field">
          <button class="btn large" @click="signInUser" style="display: block;"> Sign In </button>
        </div>
      </v-container>
    </v-side-nav>
    <header>
      <nav>
        <div class="nav-wrapper">
          <v-btn-link v-if="!$store.state.uid"  v-side-nav:signUp="{edge: 'right'}" large style="display: block">Sign Up</v-btn-link>

          <v-btn-link v-if="!$store.state.uid" v-side-nav:signIn="{edge: 'right'}" large style="display: block">Sign In</v-btn-link>

          <button v-if="$store.state.uid" @click="$root.signOut" class="btn">Log Out </button>
          <button v-if="$store.state.uid" @click="$root.toDashboard" class="btn">Dashboard </button>
        </div>
      </nav>
    </header>
    <main>
      <div class="teal lighten-3" style="height: 100vh;">
        <h1> JJETS POS</h1>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        confirmPassword: '',
        signUp: {
          username: '',
          email: '',
          password: '',
        },
        signIn: {
          email: '',
          password: '',
          remember: false,
        }
      }
    },
    methods: {
      matchPassword() {
        return this.signUp.password == this.confirmPassword;
      },
      userExist() {
        let temp = this.signUp.username;
        return this.$store.state.users.find(function(user) { return user.username == temp});
      },
      emailExist() {
        let temp = this.signUp.email;
        return this.$store.state.users.find(function(user) { return user.email == temp});
      },
      signUpUser() {
        if (this.userExist()) {
          Materialize.toast('Username is already existing please pick another one',3000,'rounded')
          return;
        }
        if (this.emailExist()) {
          Materialize.toast('Email is already existing please pick another one',3000,'rounded')
          return;
        }
        if (!this.matchPassword()) {
          Materialize.toast("Password Not Matched",3000,'rounded');
          this.confirmPassword = '';
          this.signUp.password = '';
          return;
        }
        this.$root.signUpUser(this.signUp);


      },
      signInUser() {
        this.$root.signInUser(this.signIn);

      }
    }
  }
</script>

