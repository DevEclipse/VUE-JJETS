<template>
  <display v-if="!allEmployees.length" message="No Employees Yet"/>
  <div v-else>
    <cards :list="employees" default="allEmployees">
      <template scope="props">
        {{props}}
      </template>
    </cards>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
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
