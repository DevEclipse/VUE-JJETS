<template>
  <div>
    <div class="md-display-2" align="center" style="padding-bottom: 30px;"> Stores </div>

    <div v-if="manager">
      <md-button class="md-fab md-fab-bottom-right" @click="addStoreSideNav">
        <md-icon>add</md-icon>
        <md-tooltip md-direction="left">Add Store</md-tooltip>
      </md-button>
    </div>
    <div v-if="stores">
      <div class="md-display-4" align="center" v-if="stores.length < 1">
        No Stores Available
      </div>
      <md-card v-else v-for="store in stores">
          {{store}}
      </md-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vue-stores",
    props: ['manager', 'stores'],
    data() {
      return {
        newStore: {
          name: '',
          discount_rate: '',
          tax_rate: '',
          manager: '',
        },
      }
    },
    methods: {
      addStore() {
        this.$emit('addStore', this.newStore)
      }
    }
  }
</script>
