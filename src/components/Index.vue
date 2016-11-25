<template>
  <div>
    <md-sidenav class="md-right" ref="signUpNav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Sign Up</h3>
        </div>
      </md-toolbar>

      <md-input-container style="margin: 20px;" :class="{'md-input-invalid': !validation.username}">
        <label>Username</label>
        <md-input v-model.lazy.trim="credentials.username" required></md-input>
        <span v-if="!validation.username" class="md-error">Username is already used</span>
      </md-input-container>

      <md-input-container style="margin: 20px;" :class="{'md-input-invalid': !validation.email}">
        <label>Email</label>
        <md-input v-model.lazy.trim="credentials.email" type="email" required></md-input>
        <span v-if="!validation.email" class="md-error">Email is already used</span>
      </md-input-container>

      <md-input-container style="margin: 20px;">
        <label>Name</label>
        <md-input v-model.lazy.trim="credentials.name" required></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;" md-has-password>
        <label>Password</label>
        <md-input type="password" v-model="credentials.password" required></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;" md-has-password :class="{'md-input-invalid': !validation.confirmPassword}">
        <label>Confirm Password</label>
        <md-input type="password" v-model="confirmPassword" required></md-input>
        <span v-if="!validation.confirmPassword" class="md-error">Password not matched</span>
      </md-input-container>

      <md-button class="md-raised md-accent" @click="signUp">Sign Up</md-button>
    </md-sidenav>
    <md-sidenav class="md-right" ref="signInNav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Sign In</h3>
        </div>
      </md-toolbar>

      <md-input-container style="margin: 20px;">
        <label>Email</label>
        <md-input v-model.lazy.trim="credentials.email" type="email" required></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;" md-has-password>
        <label>Password</label>
        <md-input type="password" v-model="credentials.password" required></md-input>
      </md-input-container>

      <md-button class="md-raised md-accent" @click="signIn">Sign In</md-button>
    </md-sidenav>
    <header>
      <nav>
    <md-toolbar class="md-dense">

      <h2 class="md-title" style="flex: auto">JJETS</h2>

      <md-button class="md-icon-button" style="display: block" @click="toggleSignUpNavnav">
        <md-icon>accessibility</md-icon>
      </md-button>
      <md-button class="md-icon-button" style="display: block" @click="toggleSignInNavnav">
        <md-icon>face</md-icon>
      </md-button>
      <md-button v-if="!$store.state.uid" class="md-icon-button" style="display: block" @click="$root.toDashboard">
        <md-icon>dashboard</md-icon>
      </md-button>
    </md-toolbar>
      </nav>
    </header>
    <main>
      <div class="md-display-2">
        <md-tabs md-fixed>
          <md-tab md-label="Systems" md-icon="ondemand_video">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
          </md-tab>

          <md-tab md-label="Features" md-icon="music_note">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
          </md-tab>

          <md-tab md-label="About Us" md-icon="books">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas.</p>
          </md-tab>
        </md-tabs>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        credentials: {
          username: '',
          name: '',
          email: '',
          password: '',
        },
        confirmPassword: '',
        validationMessage: '',
      }
    },
    computed: {
      validation() {
        return {
          username: _.find(this.$store.state.busers,['username',this.credentials.username]) == null ,
          email: _.find(this.$store.state.busers,['email',this.credentials.email]) == null,
          confirmPassword: this.credentials.password == this.confirmPassword
        }
      },
    },
    methods: {
      toggleSignUpNavnav() {
        this.$refs.signUpNav.toggle();
      },
      toggleSignInNavnav() {
        this.$refs.signInNav.toggle();
      },
      signUp() {
        if(!(this.validation.username && this.validation.email && this.validation.confirmPassword)) return;

          this.$root.signUpUser(this.credentials);
          this.confirmPassword =
            this.credentials.name =
              this.credentials.password =
                this.credentials.username =
                  this.credentials.email = '';
          this.toggleSignUpNavnav();

      },
      signIn() {
        if(!(this.credentials.email != '')) return;
        this.$root.signInUser(this.credentials);
      }
    }
  }
</script>

