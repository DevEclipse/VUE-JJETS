<template>
  <display v-if="!transactions" message="No Transactions Yet"/>
  <div v-else>
    <cards :list="transactions" :filters="['.key','employee']">
      <template scope="props">

        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{props.data['.key']}}</div>
            <div class="md-subhead">Transaction Id</div>
          </md-card-header-text>


          <div v-if="authEmployee">
            <router-link :to="{name: 'pos', params: {transaction: props.data['.key']}}" tag="md-button" v-if="props.data.employee == authEmployee['.key']" class="md-fab md-mini md-fab-top-right">
              <md-icon>edit</md-icon>
            </router-link>
          </div>

          <md-button v-else-if="!props.data.status == 'Processing'" class="md-fab md-mini md-fab-top-right">
            <md-icon>info</md-icon>
          </md-button>

        </md-card-header>
        <md-card-content>
          <div class="md-title">{{props.data.status}}</div>
          <div class="md-subhead">Status</div>
          <div v-if="props.data.status == 'Processing'">
            {{props.data.employee | capitalize}} is processing the transaction
          </div>
          <div v-else>
            hehe
          </div>
        </md-card-content>
      </template>
    </cards>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'transactions',
    props: ['transactions'],
    computed: {
      ...mapGetters([
        'authEmployee',
      ])
    },
  }
</script>
