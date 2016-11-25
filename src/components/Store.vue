<template>
  <div>
    <loading v-if="!currentStore"></loading>
    <div v-if="currentStore">
      <div class="md-display-2" align="center" style="padding-bottom: 30px;">
        {{currentStore.name}}
        <div v-if="currentStore.manager == authUser.username">
          <md-button class="md-fab">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="left">Add Store Item</md-tooltip>
          </md-button>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'store',
    computed: {
      ...mapGetters([
        'authUser',
        'currentStore'
      ])
    },
  }
</script>
