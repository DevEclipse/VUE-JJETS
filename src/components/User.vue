<template>
  <display v-if="!currentUser" message="User Not Found"/>
  <div v-else style="margin: 50px;">
    <div class="currentUser['.key'] == authUser['.key']">

    </div>
    <div class="row">
      <div class="col-xs-12 col-md-4">
        <md-card style="margin: 1rem;" md-with-hover>
          <md-card-header>
            <div class="md-display-1" style="flex: 1;">
              {{currentUser['.key'] | capitalize}}
              <md-button class="md-fab md-mini md-fab-top-right">
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
            <div class="md-title">
              {{currentUser.created_date | date}}
            </div>
            <div class="md-subhead">
              Created Date
            </div>
            <div class="md-title">
              {{currentUser.updated_date | date}}
            </div>
            <div class="md-subhead">
              Updated Date
            </div>
          </md-card-content>
        </md-card>
      </div>
      <div class="col-xs-12 col-md">

        <md-card style="margin: 1rem;" md-with-hover>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Manager Profile</div>
              <div class="md-subhead">{{currentUser.profiles.manager ? 'Available' : 'Not Available' }}</div>
              <div v-if="authUser">
                <md-button v-if="!authUser.profiles.manager" @click="addProfile({user: authUser,profile: 'manager'})"
                           class="md-fab md-fab-top-right md-mini">
                  <md-icon>add</md-icon>
                </md-button>
              </div>
              <router-link :to="{name: 'manager', params: {manager: currentUser.profiles.manager}}"
                           v-if="currentUser.profiles.manager" class="md-button md-fab md-primary md-fab-top-right md-mini">
                <md-icon >info</md-icon>
                <md-tooltip>More Info</md-tooltip>
              </router-link>
            </md-card-header-text>
          </md-card-header>
          <md-card-media>
            <img :src="'//placehold.it/1920x1080'"/>
          </md-card-media>
          <md-card-content>
            <div class="md-title">Description:</div>
            <p class="md-body-1">
              User with this profile has the permission to access on managing his own stores,
              and publish on the website without hassle.
              Every store is handled by a single manager with the help of employees.
              The manager can also create their own item and publish it in public to be inherited by other managers to their stores.
            </p>
          </md-card-content>
        </md-card>
        <md-card style="margin: 1rem;" md-with-hover>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Employee Profile</div>
              <div class="md-subhead">{{currentUser.profiles.employee ? 'Available' : 'Not Available' }}</div>
              <div v-if="authUser">
                <md-button v-if="!authUser.profiles.employee" @click="addProfile({user: authUser,profile: 'employee'})"
                           class="md-fab md-fab-top-right md-mini">
                  <md-icon>add</md-icon>
                </md-button>
              </div>
              <router-link :to="{name: 'employee', params: {employee: currentUser.profiles.employee}}"
                           v-if="currentUser.profiles.employee" class="md-button md-fab md-primary md-fab-top-right md-mini">
                <md-icon >info</md-icon>
                <md-tooltip>More Info</md-tooltip>
              </router-link>
            </md-card-header-text>
          </md-card-header>
          <md-card-media>
            <img :src="'//placehold.it/1920x1080'"/>
          </md-card-media>
          <md-card-content>
            <div class="md-title">Description:</div>
            <p class="md-body-1">
              User with this profile has the permission to access stores of their manager,
              but only for creating and validating transactions.
            </p>
          </md-card-content>
        </md-card>

        <md-card style="margin: 1rem;" md-with-hover>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Customer Profile</div>
              <div class="md-subhead">{{currentUser.profiles.customer ? 'Available' : 'Not Available' }}</div>
              <div v-if="authUser">
                <md-button v-if="!authUser.profiles.customer" @click="addProfile({user: authUser,profile: 'customer'})"
                           class="md-fab md-fab-top-right md-mini">
                  <md-icon>add</md-icon>
                </md-button>
              </div>
              <router-link :to="{name: 'customer', params: {customer: currentUser.profiles.customer}}"
                           v-if="currentUser.profiles.customer" class="md-button md-fab md-primary md-fab-top-right md-mini">
                <md-icon >info</md-icon>
                <md-tooltip>More Info</md-tooltip>
              </router-link>
            </md-card-header-text>
          </md-card-header>
          <md-card-media>
            <img :src="'//placehold.it/1920x1080'"/>
          </md-card-media>
          <md-card-content>
            <div class="md-title">Description:</div>
            <p class="md-body-1">
              User with this profile has the permission to buy from the stores and items created by managers.
            </p>
          </md-card-content>
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
        'addProfile',
      ])
    }
  }
</script>
