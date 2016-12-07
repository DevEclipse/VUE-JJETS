<template>
  <display v-if="!allEmployees.length" message="No Employees Yet"/>
  <div v-else>
    <div class="row middle-xs center-xs">
      <div class="col-xs">
        <div class="md-display-3">
          Employees
        </div>
      </div>
    </div>
    <cards :list="employees" default="allEmployees"/>
  <div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'employees',
    props: ['employees'],
    computed: {
      ...mapGetters([
        'allEmployees'
      ])
    },
  }
</script>
