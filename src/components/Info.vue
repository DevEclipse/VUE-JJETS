<template>
  <div>
    <md-tabs md-fixed  style="display: flex;">
      <md-tab md-label="Info" md-icon="ondemand_video">

      </md-tab>

      <md-tab md-label="Profiles" md-icon="music_note" >
        <div class="row">
          <div class="col-xs">
          <md-button v-if="!current_user.profiles.manager" @click="addProfile('manager')"> Add Manager Profile </md-button>
          <md-card v-else>
            <md-card-area md-inset>


              <md-card-header>
                <h2 class="md-title">Manager : {{current_user.username}}</h2>
                <div class="md-subhead">

                  <span>Manager</span>
                </div>
              </md-card-header>
              <md-card-media md-ratio="16:9">
                <img src="http://placehold.it/1920x1080" alt="Manager">
              </md-card-media>
              <md-card-content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
              </md-card-content>
              <md-card-actions>
                <router-link class="md-button" :to="{name: 'manager', params: {manager: current_user.username}}">Go To Manager Profile</router-link>
              </md-card-actions>
            </md-card-area>

          </md-card>
          </div>
          <div class="col-xs">
        <md-button v-if="!current_user.profiles.employee" @click="addProfile('employee')"> Add Employee Profile </md-button>
        <md-card v-else>
            <md-card-area md-inset>


              <md-card-header>
                <h2 class="md-title">Employee : {{current_user.username}}</h2>
                <div class="md-subhead">

                  <span>Employee</span>
                </div>
              </md-card-header>
              <md-card-media md-ratio="16:9">
                <img src="http://placehold.it/1920x1080" alt="Employee">
              </md-card-media>
              <md-card-content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
              </md-card-content>
              <md-card-actions>
                <router-link class="md-button" :to="{name: 'employee', params: {employee: current_user.username}}">Go To Employee Profile</router-link>
              </md-card-actions>
            </md-card-area>
          </md-card>
        </div>
        <div style="display: inline-block; width: 33%;">
        <md-button v-if="!current_user.profiles.customer" @click="addProfile('customer')"> Add Customer Profile </md-button>
        <md-card v-else>
            <md-card-area md-inset>


              <md-card-header>
                <h2 class="md-title">Customer : {{current_user.username}}</h2>
                <div class="md-subhead">

                  <span>Customer</span>
                </div>
              </md-card-header>
              <md-card-media md-ratio="16:9">
                <img src="http://placehold.it/1920x1080" alt="Customer">
              </md-card-media>
              <md-card-content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
              </md-card-content>
              <md-card-actions>
                <router-link class="md-button" :to="{name: 'customer', params: {customer: current_user.username}}">Go To Customer Profile</router-link>
              </md-card-actions>
            </md-card-area>
          </md-card>
        </div>
        </div>
      </md-tab>

    </md-tabs>

  </div>
</template>

<script>
  export default {
    props: ['current_user'],
    methods: {
      addProfile(profile) {
        console.log(profile)
        this.$store.dispatch('addProfile', {
          user: this.current_user,
          profile
        })
      }
    }
  }
</script>
