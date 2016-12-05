<template>
  <div>

    <div class="md-display-1" align="center" style="margin: 2rem;">
      Total Today
    </div>
    <div class="row center-xs middle-xs">

      <div class="col-xs" >
      <md-card style="padding: 3rem;">
        <md-card-header>
          <div class="md-title">{{currentStore.items | toArray | count}}</div>
          <div class="md-subheading">Items</div>
        </md-card-header>
      </md-card>
      </div>
      <div class="col-xs" >
        <md-card style="padding: 3rem;">
          <md-card-header>
            <div class="md-title">{{currentStore.transactions | toArray | count}}</div>
            <div class="md-subheading">Transactions</div>
          </md-card-header>
        </md-card>
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
