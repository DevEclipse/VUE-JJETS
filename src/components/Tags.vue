<template>
  <div>
    <div v-if="dataTags">

    <div class="row" v-for="tag12 in chunkedTags">
      <div v-for="tag in tag12" class="col-xs-1">
        <md-whiteframe md-elevation="24">
          {{tag['.key']}}
        </md-whiteframe>
      </div>
    </div>
    </div>
    <div v-else>
      No Tags Created
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      chunkedTags() {
        return _.chunk(this.dataTags,12);
      },
      ...mapGetters([
          'dataTags'
      ])
    }
  }
</script>
