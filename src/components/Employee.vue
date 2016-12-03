<template>

</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    data() {
      return {
        item: {
          name: '',
          cost_price: '',
          image_url: '',
          description: '',
          created_by: '',
        },
        store: {
          manager: '',
          name: '',
          image_url: '',
          description: '',
          tax_rate: '',
          discount_rate: '',
        }
      }
    },
    computed: {
      ...mapGetters([
        'currentEmployee',
        'authUser'
      ])
    },
    methods: {
      ...mapActions([
        'addStore',
      ])
    }
  }
</script>

