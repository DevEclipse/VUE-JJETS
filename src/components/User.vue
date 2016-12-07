<template>
  <display v-if="!currentUser" message="User Not Found"/>
  <div v-else style="margin: 50px;">
    <div class="row">
      <div class="col-xs-12 col-md-4">
        <md-card style="margin: 1rem;" md-with-hover>
          <md-card-header>
            <div class="md-display-1" style="flex: 1;">
              {{currentUser['.key'] | capitalize}}
              <md-button v-if="currentUser['.key'] == authUser['.key']" class="md-fab md-mini md-fab-top-right">
                <md-icon>edit</md-icon>
              </md-button>
            </div>
            <div class="md-subhead">
              <span style="color: teal" v-if="currentUser.status == 'Online'">
                {{currentUser.status}}
              </span>
              <span v-else>
              {{currentUser.status}}
              </span>
            </div>
          </md-card-header>
          <md-card-media>
            <img :src="currentUser.image_url || '//placehold.it/1920x1080'"/>
          </md-card-media>
          <md-card-content>
            <div class="md-title">
              {{currentUser.email}}
            </div>
            <div class="md-subhead">
              Email
            </div>
            <div class="md-title">
              {{currentUser.name}}
            </div>
            <div class="md-subhead">
              Name
            </div>
            <div class="md-subhead">
            <span style="font-weight: bold;">Created: </span> {{currentUser.created_date | moment("from")}}
            </div>
            <div class="md-subhead">
              <span style="font-weight: bold;">Updated: </span> {{currentUser.updated_date | moment("from")}}
            </div>
          </md-card-content>
          <md-card-actions>
            <md-button v-if="!authManager" tag="md-button" @click="addManager(authUser['.key'])">
              <md-icon>add</md-icon> Manager
            </md-button>
            <router-link v-else tag="md-button" :to="{name: 'manager', params: {manager: authManager['.key']}}">
              Manager
            </router-link>
            <md-button v-if="!authEmployee" tag="md-button" @click="addEmployee(authUser['.key'])">
              <md-icon>add</md-icon> Employee
            </md-button>
            <router-link v-else tag="md-button" :to="{name: 'employee', params: {employee: authEmployee['.key']}}">
              Employee
            </router-link>
            <md-button v-if="!authCustomer" tag="md-button" @click="addCustomer(authUser['.key'])">
              <md-icon>add</md-icon> Customer
            </md-button>
            <router-link v-else tag="md-button" :to="{name: 'customer', params: {customer: authCustomer['.key']}}">
              Customer
            </router-link>

          </md-card-actions>
        </md-card>
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
