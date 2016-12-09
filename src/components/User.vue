<template>
  <display v-if="!currentUser" message="User Not Found"/>
  <div v-else>
    <div class="row">
      <div class="col-xs">
        <md-card style="margin: 1rem;" md-with-hover>
          <md-toolbar>

            <div class="md-title" style="flex: 1;">
              {{currentUser['.key'] | capitalize}} | {{currentUser.status}}
            </div>
              <md-button v-if="currentUser['.key'] == authUser['.key']" class="md-icon-button">
                <md-icon>edit</md-icon>
              </md-button>

          </md-toolbar>

          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{currentUser.email}}</div>
            </md-card-header-text>
            <md-card-media md-big>
              <img :src="currentUser.image_url || '//placehold.it/600x600'"/>
            </md-card-media>

          </md-card-header>

        </md-card>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md">
        <md-card md-with-hover style="margin: 1rem;">
          <md-toolbar class="md-accent">
            <div class="md-title" style="flex: 1;">
              Manager
            </div>
            <md-button v-if="!authManager" tag="md-button" @click="addManager(authUser['.key'])">
              <md-icon>add</md-icon> Manager
            </md-button>
            <span v-if="currentManager">
            <router-link  tag="md-button" :to="{name: 'manager', params: {username: currentManager['.key']}}">
              Manage
            </router-link>
              </span>
          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media>
              <vue-image :image="'//workforceverification.com/wp-content/uploads/2012/05/Top-Tips-for-Dealing-With-Background-Checks.jpg'" alt="Manager"/>
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <p>Profile that is used for managing stores, items and employees</p>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>

        </md-card>
        </div>
        <div class="col-xs-12 col-md">
        <md-card md-with-hover style="margin: 1rem;">
          <md-toolbar class="md-accent">
            <div class="md-title" style="flex: 1;">
              Employee
            </div>
            <md-button v-if="!authEmployee" tag="md-button" @click="addEmployee(authUser['.key'])">
              <md-icon>add</md-icon> Employee
            </md-button>
            <span v-if="currentEmployee">
            <router-link v-if="currentEmployee" tag="md-button" :to="{name: 'employee', params: {username: currentManager['.key']}}">
              Work
            </router-link>
            </span>
          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media>
              <vue-image :image="'//ww.backgroundchecksservice.com/wp-content/uploads/2013/08/banner1.png'" alt="Employee"/>
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <p>Profile that is used for working on your manager's stores which
                  you as an employee creates and validates the transactions</p>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
        </div>
        <div class="col-xs-12 col-md">
        <md-card md-with-hover style="margin: 1rem;">

          <md-toolbar class="md-accent">
            <div class="md-title" style="flex: 1;">
              Customer
            </div>
            <md-button v-if="!authCustomer" tag="md-button" @click="addCustomer(authUser['.key'])">
              <md-icon>add</md-icon> Customer
            </md-button>
            <span v-if="currentCustomer">
            <router-link v-if="currentCustomer" tag="md-button" :to="{name: 'customer', params: {username: currentManager['.key']}}">
              Shop
            </router-link>
            </span>
          </md-toolbar>

          <md-card-media-cover md-solid>
            <md-card-media>
              <vue-image :image="'//us.123rf.com/450wm/montego/montego1511/montego151100021/48560437-shopping-basket-with-sale-discount-boxes-3d-illustration-isolated-on-white-background.jpg?ver=6'" alt="Customer"/>
            </md-card-media>

            <md-card-area>
              <md-card-header>
                <p>Profile that is used for shopping items from different stores that are made from managers</p>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>

        </md-card>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'allUsers',
        'currentUser',
        'currentEmployee',
        'currentManager',
        'currentCustomer',
        'authUser',
        'authManager',
        'authEmployee',
        'authCustomer'
      ])
    },
    data() {
      return {
        user: {
          name: '',
          image_url: '',
        }
      }
    },
    methods: {
      ...mapActions([
        'addManager',
        'addEmployee',
        'addCustomer',
      ])
    }
  }
</script>
