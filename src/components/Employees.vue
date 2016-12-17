<template>

  <layout :list="employees || allEmployees" searchKey="name">

  </layout>

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
