<template>
  <div v-if="authEmployee && authEmployeeStores">
    <div class="md-title">Select Store to Create Transaction</div>
    <multiselect :options="authEmployeeStores"
                 v-model="storedItem.category"
                 :searchable="true"
                 placeholder="Select A Store">

    </multiselect>

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
        'authEmployeeStores'
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
