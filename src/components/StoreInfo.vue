<template>
  <div>

    <div class="row" style="height: 100vh;">

      <div class="col-xs-12 col-md">

      </div>
      <div class="col-xs-12 col-md">

      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'currentStore',
      ]),
    }
  }
</script>
