<template>
  <display v-if="!transactions" message="No Transactions Yet"/>
  <div v-else>
    <md-button class="md-fab md-mini md-fab-bottom-right" style="position: fixed; z-index: 3;" @click="createTransaction">
      <md-icon>add</md-icon>
    </md-button>
    <cards :list="transactions" :filters="['customer','employee']">
      <template scope="props">

        <md-toolbar class="md-accent">
          <div class="md-toolbar-container">
            <div class="md-title" style="flex: 1;">{{props.data.status}}</div>
            <div v-if="authEmployee">
              <router-link tag="md-button" :to="{name: 'pos', params: {transaction: props.data['.key']}}" class="md-icon-button">
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
      </template>
    </cards>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'transactions',
    props: ['transactions','authEmployee'],
    computed: {
      ...mapGetters([
        'storedTransaction',
      ])
    },
    methods: {
      ...mapActions([
        'addTransaction',
        'storeTransaction'
      ]),
      createTransaction() {
        this.storeTransaction();
        this.addTransaction(this.storedTransaction);
      },
    },
  }
</script>
