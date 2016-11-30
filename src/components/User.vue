<template>
  <div v-if="!currentUser">
    Loading... User
  </div>
  <div v-else style="margin: 50px;">
    <div class="row middle-xs center-xs">
      <div class="col-xs">
        <md-card v-if="currentUser.profiles.manager">
          <md-card-header>
            <div class="md-title">{{currentUser.profiles.manager | capitalize}}</div>
            <div class="md-subhead">Manager</div>
          </md-card-header>
          <md-card-media md-ratio="16:9">
            <img src="//placehold.it/600x600"/>
          </md-card-media>
          <md-card-content>
            <div class="row center-xs" style="margin: 30px;">
              <div class="col-xs md-display-1">
                Stats
              </div>
            </div>
            <div class="row middle-xs center-xs">
              <div class="col-xs md-title">
                Total Stores
              </div>
              <div class="col-xs md-title">
                Total Items
              </div>
              <div class="col-xs md-title">
                Total Employees
              </div>
            </div>
            <div class="row middle-xs center-xs">
              <div class="col-xs">
                0
              </div>
              <div class="col-xs">
                0
              </div>
              <div class="col-xs">
                0
              </div>
            </div>
          </md-card-content>
        </md-card>
        <div v-else class="row middle-xs center-xs md-display-4">
          No Manager Profile
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
        'authUser',
      ])
    },
  }
</script>
