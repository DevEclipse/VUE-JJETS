<template>
  <div>
    <md-tabs md-fixed  style="display: flex;">
  <md-tab md-label="Info" md-icon="ondemand_video">
  
  </md-tab>

  <md-tab md-label="Profiles" md-icon="music_note" >

  <md-card>
  <md-card-area md-inset>
    <md-card-media md-ratio="16:9">
      <img src="http://placehold.it/1920x1080" alt="Manager">
        </md-card-media>

          <md-card-header>
            <h2 class="md-title">Manager : {{current_user.username}}</h2>
              <div class="md-subhead">

                <span>Manager</span>
              </div>
    </md-card-header>
  </md-card-area>
  </md-card>
    <md-card>
  <md-card-area md-inset>
    <md-card-media md-ratio="16:9">
      <img src="http://placehold.it/1920x1080" alt="Employee">
        </md-card-media>

          <md-card-header>
            <h2 class="md-title">Employee : {{current_user.username}}</h2>
              <div class="md-subhead">

                <span>Employee</span>
              </div>
    </md-card-header>
  </md-card-area>
  </md-card>
    <md-card>
  <md-card-area md-inset>
    <md-card-media md-ratio="16:9">
      <img src="http://placehold.it/1920x1080" alt="Customer">
        </md-card-media>

          <md-card-header>
            <h2 class="md-title">Customer : {{current_user.username}}</h2>
              <div class="md-subhead">

                <span>Customer</span>
              </div>
    </md-card-header>
  </md-card-area>
  </md-card>

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
