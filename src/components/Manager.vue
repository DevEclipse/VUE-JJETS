<template>
  <display v-if="!currentManager" message="No Manager Found"/>
  <div v-else>

    <md-toolbar class="md-accent">
      <div class="md-title" style="flex: 1">
        Manager | {{currentManager['.key'] | capitalize}}
      </div>
    </md-toolbar>

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'authManager',
        'currentManager',
      ])
    },
  }
</script>

