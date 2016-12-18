<template>
    <div v-if="sameManagerStore || sameEmployeeManagerStore">
    <transactions :transactions="currentStoreTransactions">

    </transactions>
    </div>
    <display v-else message="You are not an employee of this store" :noloader="true">
      <template v-if="authEmployee">
        <router-link tag="md-button" class="md-raised md-accent"
                     :to="{name: 'employee', params: {username: authEmployee.username}}">
          To Your Employee Profile
        </router-link>
      </template>
      <template v-else>
        <router-link tag="md-button" class="md-raised md-accent"
                     :to="{name: 'user', params: {username: authUser.username}}">
          To Your Account
        </router-link>
      </template>
    </display>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'store-transactions',
    props: ['authEmployee','authUser'],
    computed: {
      ...mapGetters([
          'currentStoreTransactions',
          'currentStore',
          'sameManagerStore',
          'sameEmployeeManagerStore'
      ])
    }
  }
</script>
