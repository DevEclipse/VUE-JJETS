<template>
  <div>
    <div class="md-display-1">
      Total
    </div>

    <div class="row middle-xs center-xs">

      <md-card>
        <md-card-header>
          <div class="md-title">{{currentStore.items | toArray | count}}</div>
          <div class="md-subheading">Items</div>
        </md-card-header>
      </md-card>
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
