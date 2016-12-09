<template>
  <display v-if="!transactions" message="No Transactions Yet"/>
  <div v-else>
    <cards :list="transactions" :filters="['customer','employee']">
      <template scope="props">
        <md-toolbar class="md-accent">
          <div class="md-toolbar-container">
            <div class="md-title" style="flex: 1;">{{props.data.status}}</div>
            <div v-if="authEmployee">
              <router-link :to="{name: 'pos', params: {transaction: props.data['.key']}}" tag="md-button" v-if="props.data.employee == authEmployee['.key']" class="md-icon-button">
                <md-icon>edit</md-icon>
              </router-link>
            </div>
          </div>
        </md-toolbar>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{props.data['.key']}}</div>
            <div class="md-subhead">Transaction Id</div>
          </md-card-header-text>

        </md-card-header>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{props.data.employee | capitalize}}</div>
            <div class="md-subhead">Assigned Employee</div>
          </md-card-header-text>
        </md-card-header>
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
