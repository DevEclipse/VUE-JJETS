<template>
  <display v-if="!currentUser" message="Loading... User"></display>
  <div v-else style="margin: 1rem;">

    <md-dialog ref="editUser">
      <span v-if="user">

      <md-toolbar style="margin-bottom: 1rem;">
        <div class="md-toolbar-container">
          <div class="md-title">
            {{user.name | capitalize}}
          </div>
        </div>
      </md-toolbar>
      <md-dialog-content>
        <md-input-container>
          <label>Name</label>
          <md-input v-model="user.name"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Image Url</label>
          <md-input type="url" v-model="user.image_url"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="() => {updateUser(user); $refs.editUser.close();}"> Update </md-button>
        <md-button class="md-raised md-warn" @click="$refs.editUser.close()"> Cancel </md-button>
      </md-dialog-actions>
        </span>
    </md-dialog>
    <md-button v-if="sameUser" class="md-fab md-mini md-fab-bottom-right"
               style="position: fixed; z-index: 3;" @click="editUser">
      <md-icon>edit</md-icon>
    </md-button>
    <md-button v-if="sameUser" class="md-fab md-mini md-fab-bottom-left"
               style="position: fixed; z-index: 3;" @click="$refs.otherUsersMenu.toggle()">
      <md-icon>info</md-icon>
    </md-button>
    <md-sidenav class="md-fixed md-right" ref="otherUsersMenu">
      <md-list class="md-triple-line">
        <md-subheader>Other Users you may know</md-subheader>
        <md-list-item v-for="user in allUsers">
          <md-avatar>
            <vue-image :image="user.image_url" alt="User"></vue-image>
          </md-avatar>
          <div class="md-list-text-container">
            <span>{{user.name}}</span>
            <span>{{user['.key']}}</span>
          </div>
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'user', params: {username: user['.key']}}">
            <md-icon>info</md-icon>
          </router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
    <div class="row">
      <div class="col-xs-12 col-md">
        <md-card>
          <md-toolbar class="md-accent">
            <div class="md-toolbar-container">
              <div class="md-title">{{currentUser.username | capitalize}}</div>
            </div>
          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media md-ratio="4:3">
              <vue-image :image="currentUser.image_url"></vue-image>
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">Email:</div>
                  <div class="md-subhead">{{currentUser.email}}</div>
                </md-card-header-text>
                <md-card-header-text>
                  <div class="md-title">Name:</div>
                  <div class="md-subhead">{{currentUser.name}}</div>
                </md-card-header-text>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>

      <div class="col-xs-12 col-md">
        <md-card>
          <md-toolbar class="md-accent">
            <div class="md-toolbar-container">
              <span class="md-title" style="flex: 1;"> Manager Profile </span>
              <router-link :to="{name: 'manager'}" tag="md-button" class="md-icon-button">
                <md-icon>info</md-icon>
              </router-link>
            </div>

          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media>
              <vue-image :image="'//placehold.it/1920x1080'"></vue-image>
            </md-card-media>
            <md-card-area>
            <md-card-header>
              <md-card-header-text>
                <div class="md-title">
                  Description:
                </div>
                <div class="md-subhead">
                  This profile is used for making stores and items, as a manager you are required to hire
                  employees to create and validate transactions for you.
                </div>
              </md-card-header-text>
            </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
        <md-card>
          <md-toolbar class="md-accent">
            <div class="md-toolbar-container">
              <span class="md-title" style="flex: 1;"> Employee Profile </span>
              <md-button v-if="!authEmployee" class="md-icon-button">
                <md-icon>+</md-icon>
              </md-button>
              <router-link v-if="currentEmployee" :to="{name: 'employee'}" tag="md-button" class="md-icon-button">
                <md-icon>info</md-icon>
              </router-link>
            </div>

          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media>
              <vue-image :image="'//placehold.it/1920x1080'"></vue-image>
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">
                    Description:
                  </div>
                  <div class="md-subhead">
                    This profile is used for making stores and items, as a manager you are required to hire
                    employees to create and validate transactions for you.
                  </div>
                </md-card-header-text>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
        <md-card>
          <md-toolbar class="md-accent">
            <div class="md-toolbar-container">
              <span class="md-title" style="flex: 1;"> Customer Profile </span>
              <router-link :to="{name: 'customer'}" tag="md-button" class="md-icon-button">
                <md-icon>info</md-icon>
              </router-link>
            </div>

          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media>
              <vue-image :image="'//placehold.it/1920x1080'"></vue-image>
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">
                    Description:
                  </div>
                  <div class="md-subhead">
                    This profile is used for making stores and items, as a manager you are required to hire
                    employees to create and validate transactions for you.
                  </div>
                </md-card-header-text>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'user',
    data() {
      return {
        user: null,
        search: '',
      }
    },
    computed: {
      filterUsers() {
        let users = this.allUsers;
        if(users && this.search) {
          let regExp = new RegExp(`${this.search}`,'i');
          users = _.filter(users, user => {
            return regExp.test(user['username'])
          });
        }
        return users;
      },
      ...mapGetters([
        'currentUser',
        'currentEmployee',
        'currentManager',
        'currentCustomer',
        'authUser',
        'authEmployee',
        'authManager',
        'authCustomer',
        'sameUser',
        'allUsers'
      ])
    },
    methods: {
      editUser() {
        this.user = _.clone(this.currentUser);
        this.$refs.editUser.open();
      },
      ...mapActions([
        'addManager',
        'addEmployee',
        'addCustomer',
        'updateUser',
      ])
    }
  }
</script>
