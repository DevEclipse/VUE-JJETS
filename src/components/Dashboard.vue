<template>
  <div v-if="authUser && $route.name != 'home'">

    <md-dialog ref="signOut">
      <md-toolbar>
        <div class="md-title">
         <md-icon>power_settings_new</md-icon> Sign Out
        </div>
      </md-toolbar>

      <md-dialog-content style="margin: 2rem;">Are you sure you want to sign out?</md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="signOutUser">Sign Out</md-button>
        <md-button class="md-raised md-warn" @click="$refs.signOut.close()">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-toolbar>
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1">
          JJETS | <span v-if="$route.name">{{$route.name | capitalize}}</span>
        </div>
        <span class="visible-xs">

        <md-button class="md-icon-button" @click="$router.back()">
          <md-icon>arrow_back</md-icon>
        </md-button>

        <md-button class="md-icon-button" @click="toggleDashboard">
          <md-icon>dashboard</md-icon>
        </md-button>

         </span>

        <span class="hidden-xs">
          <md-button @click="$router.back()">
          <md-icon>arrow_back</md-icon> Back
        </md-button>


        <md-menu md-direction="bottom left" md-offset-y="20" md-align-trigger>
          <md-button md-menu-trigger>
            <md-icon>contacts</md-icon> Profiles
          </md-button>

          <md-menu-content>
            <md-menu-item>
            <router-link tag="span" :to="{name: 'user', params: {username: authUser.username}}">
              <md-avatar>
                <vue-image :image="authUser.image_url" alt="User"/>
              </md-avatar>

              {{authUser.username | capitalize}}


            </router-link>
            </md-menu-item>
            <md-subheader>Profiles</md-subheader>
            <md-menu-item v-if="authCustomer"
                          @click="navigateToRoute({name: 'customer', params: {username: authCustomer.username}},true)">
              <md-icon>shopping_cart</md-icon>
                Customer
            </md-menu-item>
            <md-menu-item v-if="authManager"
                          @click="navigateToRoute({name: 'manager', params: {username: authManager.username}},true)">
              <md-icon>supervisor_account</md-icon>

                Manager
            </md-menu-item>
            <md-menu-item v-if="authEmployee"
                          @click="navigateToRoute({name: 'employee', params: {username: authEmployee.username}},true)">
              <md-icon>work</md-icon>
                Employee
            </md-menu-item>

            <md-menu-item @click="signingOut">
              <md-icon>power_settings_new</md-icon> Sign Out
            </md-menu-item>
            <md-subheader><md-icon>settings</md-icon> Settings</md-subheader>
            <md-menu-item @click="enableSpeech(speechEnabled ? false : true)">
               {{speechEnabled ? 'Turn Off Speech' : 'Turn On Speech'}}
            </md-menu-item>
          </md-menu-content>
        </md-menu>
        </span>
      </div>
    </md-toolbar>

    <md-sidenav class="md-fixed md-left" ref="dashboardMenu">

      <md-toolbar class="md-account-header">
        <md-list class="md-transparent">
          <md-list-item class="md-avatar-list">
            <md-avatar class="md-large">
              <img :src="authUser.image_url || 'https://placeimg.com/64/64/people/8'" alt="People">
            </md-avatar>
            <span style="flex: 1;"></span>
            <md-button @click="toggleDashboard" class="md-icon-button">
              <md-icon>close</md-icon>
            </md-button>
          </md-list-item>
          <md-list-item>
            <div class="md-list-text-container">
              <span>{{authUser.username | capitalize}}</span>
              <span>{{authUser.email}}</span>
            </div>
          </md-list-item>
        </md-list>

      </md-toolbar>

      <md-list>
        <md-subheader>Navigation</md-subheader>
        <md-list-item>
          <md-icon>face</md-icon>
          <span @click="navigateToRoute({name: 'user', params: {username: authUser.username}})">
            {{authUser.username | capitalize}}
          </span>
        </md-list-item>
        <md-list-item>
          <md-icon>cancel</md-icon>
          <span @click="signingOut">Sign Out</span>
        </md-list-item>
        <md-subheader>Profiles</md-subheader>
        <md-list-item v-if="authManager">
          <md-icon>assignment ind</md-icon>
          <span @click="navigateToRoute({name: 'manager', params: {username: authManager.username}})">
            Manager
          </span>
        </md-list-item>
        <md-list-item v-if="authEmployee">
          <md-icon>work</md-icon>
          <span @click="navigateToRoute({name: 'employee', params: {username: authEmployee.username}})">
            Employee
          </span>
        </md-list-item>
        <md-list-item v-if="authCustomer">
          <md-icon>shopping cart</md-icon>
          <span @click="navigateToRoute({name: 'customer', params: {username: authCustomer.username}})">
            Customer
          </span>
        </md-list-item>
        <md-subheader>Settings</md-subheader>
        <md-list-item @click="enableSpeech(speechEnabled ? false : true)">{{speechEnabled ? 'Turn Off Speech' : 'Turn On Speech'}}</md-list-item>
      </md-list>
    </md-sidenav>
    <slot></slot>

  </div>
  <transition v-else-if="$route.name != 'home'" enter-active-class="animated bounceInRight"
              leave-active-class="animated bounceOutRight" mode="out-in">
    <display :message="`Loading... ${capitalizedRouteName}`"/>
  </transition>
</template>

<script>



  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'dashboard',
    computed: {
      capitalizedRouteName() {
        return _.upperFirst(this.$route.name);
      },
      ...mapGetters([
        'authUser',
        'authManager',
        'authEmployee',
        'authCustomer',
        'speechEnabled',
      ])
    },
    methods: {
      toggleDashboard() {
        this.$refs.dashboardMenu.toggle();
      },
      navigateToRoute(route, dontToggle) {
        if (!dontToggle) {
          this.toggleDashboard();
        }
        this.addAlert({
          message: `Going to ${_.upperFirst(route.name)} Profile`, callback: () => {
            this.$router.push(route);
          }
        });
      },
      signingOut() {
        this.$refs.signOut.open();
        this.$refs.dashboardMenu.close();
        this.addAlert({message: `${this.authUser.username} you want to sign out?`});
      },
      signOutUser() {
        this.addAlert({message: `Ok Goodbye, ${this.authUser.username}`});
        this.$root.signOut();
      },
      ...mapActions([
        'speakMessage',
        'addAlert',
        'enableSpeech',
      ])
    },
  }
</script>
