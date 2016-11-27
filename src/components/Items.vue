<template>

    <loading v-if="!items" message="Loading... Items"/>

    <div v-else class="container" style="margin-top: 10px;">

      <div class="row" v-for="(item12,index) in chunkedItems">

        <div class="col-xs-12 col-md-3" v-for="item in item12">

          <item :item="item"></item>

        </div>

      </div>

    </div>

</template>

<script>
  import Item from './Item.vue';
  export default {
    name: 'items',
    props: ['items'],
    components: {
      Item
    },
    computed: {
      chunkedItems() {
        return _.chunk(this.items,4);
      },
    },

  }
</script>
