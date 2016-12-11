<template>

  <md-list-item>

    <md-icon>store</md-icon>
    <span>Games</span>

    <md-list-expand>
      <md-list v-for="item in getCart.items">
        {{item}}
      </md-list>
    </md-list-expand>

  </md-list-item>

</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'cart',
    computed: {
      ...mapGetters([
          'getCart',
      ]),
      cartStoreItems() {

      }
    }
  }
</script>
