<template>
  <layout :list="sortByDate" searchKey="name">
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
    <template slot="extra">

      <md-button class="md-fab md-mini md-fab-bottom-left" style="z-index: 1000; position: fixed;"
                 @click="() => { order = order == 'desc' ? 'asc' : 'desc'; sorted = true }">
        <md-icon>sort</md-icon>
      </md-button>


    </template>
  </layout>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import Store from './Store.vue';
  export default {
    name: 'stores',
    props: ['stores', 'editable'],
    components: {
      Store
    },
    computed: {
      sortByDate() {
        let stores = this.stores || this.allStores;

        if (stores && this.order) {
          stores = _.orderBy(stores, ['created_date'], [this.order]);
          if(this.sorted) {
            this.addAlert({message: `Sorted Stores by ${this.order == 'desc' ? 'Newest' : 'Oldest'}`});
            this.sorted = false;
          }
        }

        return stores;
      },
      ...mapGetters([
        'allStores'
      ])
    },
    data() {
      return {
        order: 'desc',
        sorted: false,
      }
    },
    methods: {
      ...mapActions([
        'addAlert'
      ])
    }
  }
</script>
