<template>

  <md-list-item>

    <md-icon>store</md-icon>
    <span>Games</span>

    <md-list-expand>
      <md-list>
        <md-list-item class="md-inset">Console</md-list-item>
        <md-list-item class="md-inset">PC</md-list-item>
        <md-list-item class="md-inset">Phone</md-list-item>
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
          let cartItems = _.filter(this.getCart.items)
      }
    }
  }
</script>
