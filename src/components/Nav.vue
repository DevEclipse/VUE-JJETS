<template>
  <div v-if="currentUser">

    <md-toolbar class="md-dense">
      <md-button class="md-icon-button" @click="toggleUserNav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title">{{currentUser.username}}</h2>


    </md-toolbar>

    <md-sidenav class="md-left" ref="userNav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">{{currentUser.username}}</h3>
        </div>
        <md-list>
          <!--News-->
          <md-list-item>
            <md-icon>whatshot</md-icon>
            <span>News</span>
            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">Top Items</md-list-item>
                <md-list-item class="md-inset">Top Stores</md-list-item>
                <md-list-item class="md-inset">New Items</md-list-item>
                <md-list-item class="md-inset">New Stores</md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
          <!--Manager-->
          <md-list-item v-if="!authUser.profiles.manager">
            <md-list-item @click="addProfile('manager')">
              Add Manager Profile
            </md-list-item>
          </md-list-item>
          <md-list-item v-else>
            <md-icon>videogame_asset</md-icon>
            <span>Manager Profile</span>

            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">
                  <router-link :to="{name: 'manager'}">Info</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link :to="{name: 'managerStores'}">Stores</router-link>
                </md-list-item>
                <md-list-item class="md-inset">
                  <router-link :to="{name: 'managerItems'}">Items</router-link>
                </md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
          <!--Employee-->
          <md-list-item v-if="!authUser.profiles.employee">
            <md-list-item @click="addProfile('employee')">
              Add Employee Profile
            </md-list-item>
          </md-list-item>
          <md-list-item v-else>
            <md-icon>video_library</md-icon>
            <span>Employee Profile</span>

            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">Info</md-list-item>
                <md-list-item class="md-inset">Store</md-list-item>
                <md-list-item class="md-inset">Transactions</md-list-item>
                <md-list-item class="md-inset">Point of Sale</md-list-item>
              </md-list>
            </md-list-expand>

          </md-list-item>

          <!--Customer-->
          <md-list-item v-if="!authUser.profiles.customer">
            <md-list-item @click="addProfile('customer')">
              Add Customer Profile
            </md-list-item>
          </md-list-item>
          <md-list-item v-else>
            <md-icon>video_library</md-icon>
            <span>Customer Profile</span>

            <md-list-expand>
              <md-list>
                <md-list-item class="md-inset">Info</md-list-item>
                <md-list-item class="md-inset">Transactions</md-list-item>
                <md-list-item class="md-inset">Cart</md-list-item>
              </md-list>
            </md-list-expand>
          </md-list-item>
        </md-list>
      </md-toolbar>
    </md-sidenav>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'vue-nav',
    computed: {
      ...mapGetters([
        'authUser',
        'currentUser',
      ])
    },
    methods: {
        toggleUserNav() {
            this.$refs.userNav.toggle();
        },
      addProfile(profile) {
        this.$store.dispatch('addProfile', {
          user: this.currentUser,
          profile
        })
      }
    }
  }
</script>
