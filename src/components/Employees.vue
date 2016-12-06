<template>
  <div>

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    props: ['employees'],
    computed: {
      ...mapGetters([
        'allEmployees'
      ])
    },
  }
</script>
