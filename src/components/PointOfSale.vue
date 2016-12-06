<template>
  <display v-if="!authEmployee" message="Loading... Point of Sale"/>
  <div v-else>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container" style="flex: 1;">
        <div class="md-title">Point of Sale | {{authEmployee['.key']}}</div>
        <div v-if="!transaction">
          <md-button>Create Transaction</md-button>
        </div>
      </div>
    </md-toolbar>
    <transaction :transaction="transaction"/>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'point-of-sale',
    data() {
      return {
        transaction: null,
      }
    },
    computed: {
      ...mapGetters([

        'authEmployee',
        'authEmployeeStores',
        'currentStore',
      ])
    },
  }
</script>
