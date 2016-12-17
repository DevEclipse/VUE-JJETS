<template>

  <layout v-if="stocks" :list="stocks" searchKey="item.name">
    <template scope="props">
      <stock v-for="{stock,item,store} in props" :stock="stock" :item="item" :store="store">
        <template slot="buttons">
          <slot name="buttons" :stock="stock" :item="item" :store="store">

          </slot>
        </template>
      </stock>
    </template>
  </layout>
  <display v-else message="No Stocks Found"/>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import Stock from './Stock.vue';
  export default {
    name: 'stocks',
    props: ['stocks','list'],
    components: {
      Stock
    }
  }
</script>
