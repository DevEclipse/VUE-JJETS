<template>
  <display v-if="!currentManager" message="No Manager Found"/>
  <div v-else>

    <md-toolbar class="md-accent">
      <div class="md-title" style="flex: 1">
        Manager | {{currentManager.username | capitalize}}
      </div>
      <md-button @click="currentView = 'Items'">Items</md-button>
      <md-button @click="currentView = 'Stores'">Stores</md-button>
      <md-button @click="currentView = 'Employees'">Employees</md-button>
    </md-toolbar>
    <div class="md-display-2 row center-xs" style="margin: 1rem;"> {{currentView}}   </div>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">
        <component :is="currentView"
                   :authManager="authManager"
                   :authCustomer="authCustomer"
                   :employees="currentManagerEmployees"
                   :manager="currentManager"
                   :items="currentManagerItems"
                   :stores="currentManagerStores"
                   :filters="['name']"></component>
    </transition>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  import Stores from './Stores.vue';
  import Items from './Items.vue';
  import Employees from './Employees.vue';
  export default {
    name: 'manager',
    props: ['authManager','authCustomer'],
    components: {
      Stores,
      Items,
      Employees
    },
    data() {
        return {
          currentView: 'Stores',
        }
    },
    computed: {
      ...mapGetters([
        'currentManager',
        'currentManagerStores',
        'currentManagerItems',
        'currentManagerEmployees'
      ])
    },
  }
</script>

