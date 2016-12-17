<template>
  <layout :list="stores || allStores" searchKey="name">
    <template scope="props">
      <store v-for="store in props" :store="store">
        <template slot="buttons">
          <slot name="buttons" :store="store">

          </slot>
        </template>
        <template>
          <slot :store="store">

          </slot>
        </template>
      </store>
    </template>
  </layout>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex';
  import Store from './Store.vue';
  export default {
    name: 'stores',
    props: ['stores','editable'],
    components: {
      Store
    },
    computed: {
      ...mapGetters([
        'allStores'
      ])
    },
    methods: {
        editStore(store) {
            this.$emit('editStore',store);
        }
    }
  }
</script>
