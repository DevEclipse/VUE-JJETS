<template>
  <div v-if="authEmployee">


    <md-table v-if="storedTransaction">
      <md-table-header>
        <md-table-row>
          <md-table-head>Item</md-table-head>
          <md-table-head>Calories (g)</md-table-head>
          <md-table-head>Fat (g)</md-table-head>
          <md-table-head>Carbs (g)</md-table-head>
          <md-table-head>Protein (g)</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body>
        <md-table-row v-for="(row, index) in storedTransactionProducts" :key="index">

        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'pos',
    computed: {
      ...mapGetters([
        'storedTransaction',

        'authEmployee'
      ])
    },
    data() {
      return {
        search: '',
        store: null,
      }
    },
    methods: {
      ...mapActions([
        'updateTransaction',
        'addTransaction',
        'storeTransaction'
      ])
    }

  }
</script>
