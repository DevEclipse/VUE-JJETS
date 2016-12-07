<template>
  <div class="row middle-xs center-xs">
    <div class="col-xs" style="padding: 3rem;">
      <md-card class="md-with-hover">
        <md-card-header>
          <div class="md-title">
            {{currentManager.items | count}}
          </div>
          <div class="md-subhead">
            Item Count
          </div>
        </md-card-header>
      </md-card>
    </div>
    <div class="col-xs" style="padding: 3rem;">
      <md-card class="md-with-hover">
        <md-card-header>
          <div class="md-title">
            {{currentManager.items | count}}
          </div>
          <div class="md-subhead">
            Item Count
          </div>
        </md-card-header>
      </md-card>
    </div>
    <div class="col-xs" style="padding: 3rem;">
      <md-card class="md-with-hover">
        <md-card-header>
          <div class="md-title">
            {{currentManager.items | count}}
          </div>
          <div class="md-subhead">
            Item Count
          </div>
        </md-card-header>
      </md-card>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'currentManager',
      ])
    },
  }
</script>
