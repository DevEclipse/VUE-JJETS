<template>
  <div>
    <employees :employees="currentManagerEmployees"/>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'manager-employees',
    computed: {
      ...mapGetters([
          'currentManagerEmployees',
      ])
    },
    methods: {
      ...mapActions([
          'updateManager',
      ])
    }
  }
</script>
