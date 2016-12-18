<template>
  <div>


  <div class="row">
    <div class="col-xs">

    </div>
  </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'manager-employees',
    computed: {
      ...mapGetters([
        'currentManagerApplicationMessages'
      ])
    }
  }
</script>
