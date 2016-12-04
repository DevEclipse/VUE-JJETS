<template>
  <div>
    {{currentTag['.key']}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
         'currentTag',
      ]),
    }
  }
</script>
