<template>
  <div>
  <transactions :transactions="currentEmployeeManagerStoresTransactions">
    <template slot="buttons" scope="{transaction}">
      <md-button class="md-icon-button md-raised">
        <md-icon>assignment_ind</md-icon>
        <md-tooltip>Evaluate this Order</md-tooltip>
      </md-button>
    </template>
  </transactions>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Transactions from './Transactions.vue';
  export default {
    name: 'employee-orders',
    computed: {
      ...mapGetters([
          'currentEmployeeManagerStoresTransactions'
      ])
    },
    components: {
        Transactions
    }
  }
</script>
