<template>
    <div>
      {{currentTag}}
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
      computed: {
        ...mapGetters([
            'currentTag'
        ])
      }
  }
</script>
