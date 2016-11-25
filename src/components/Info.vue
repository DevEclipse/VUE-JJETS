<template>
    <section>
        <div>
             <md-button v-if="!current_user.profiles.manager" @click="addProfile('manager')">Add A Manager Profile</md-button>
             
<md-card v-else width="300" height="300">
  <md-card-media>
    <img src="http://www.expressandstar.com/wpmvc/wp/wp-content/uploads/2012/11/25465760.jpg" alt="People">
  </md-card-media>

  <md-card-header>
    <div class="md-title">Manager Profile</div>
    <div class="md-subhead">You manage multiple stores</div>
  </md-card-header>

  <md-card-actions>
    <router-link :to="{name: 'manager', params: {manager: current_user.username}}">Go to your Manager Profile</router-link>
  </md-card-actions>

  <md-card-content>
    Blabla
  </md-card-content>
</md-card>
             <md-button v-if="!current_user.profiles.employee" @click="addProfile('employee')">Add An Employee Profile</md-button>
             
             <md-card v-else width="300" height="300">
  <md-card-media>
    <img src="http://www.trackmyfone.com/blog/wp-content/uploads/2015/10/empower-employee-TMF.jpg" alt="People">
  </md-card-media>

  <md-card-header>
    <div class="md-title">Employee Profile</div>
    <div class="md-subhead">You manage a store</div>
  </md-card-header>

  <md-card-actions>
    <router-link :to="{ name: 'employee', params: { employee: current_user.username }}">Go to your Employee Profile</router-link>
  </md-card-actions>

  <md-card-content>
    Blabla
  </md-card-content>
</md-card>
             <md-button v-if="!current_user.profiles.customer" @click="addProfile('customer')">Add A Customer Profile</md-button>
             <md-card v-else width="300" height="300">
  <md-card-media>
    <img src="http://blog.directcapital.com/wp-content/uploads/2014/05/Get-your-customer-what-they-want.jpg" alt="People">
  </md-card-media>

  <md-card-header>
    <div class="md-title">Customer Profile</div>
    <div class="md-subhead">You buy from stores</div>
  </md-card-header>
    
  <md-card-actions>
    <router-link :to="{ name: 'customer', params: { customer: current_user.username }}">Go to your Customer Profile</router-link>
  </md-card-actions>

  <md-card-content>
    Blabla
  </md-card-content>
</md-card>
        </div>
    </section>
</template>

<script>
    export default {
        props: ['current_user'],
        methods: {
            addProfile(profile) {
                console.log(profile)
                this.$store.dispatch('addProfile',{user: this.current_user,profile})
            }
        }
    }
</script>