<template>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'store',
    props: ['authManager', 'authEmployee', 'authCustomer'],
    computed: {
      ...mapGetters([
        'currentStore',
        'currentStocks',
        'sameManagerStore',
        'sameEmployeeManagerStore'

      ])
    },
  }
</script>
