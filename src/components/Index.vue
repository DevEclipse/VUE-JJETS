<template>
  <div>
      <user-side-nav></user-side-nav>
      <main>
        <router-view></router-view>
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

