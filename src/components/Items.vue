<template>

  <layout :list="sortByDate" searchKey="name">
    <template slot="extra">
      <md-whiteframe md-elevation="24" style="z-index: 20">
        <div class="md-display-1" align="center" style="padding: 1rem;">
          Filters
        </div>
      <div class="row center-xs middle-xs">
        <div class="col-xs">
          <multiselect  :options="itemCategories"
                        v-model="category"
                        :searchable="true"
                        placeholder="Select A Category"></multiselect>
        </div>
        <div class="col-xs-2">
          <md-button class="md-raised md-accent" @click="category = ''">
            <md-icon>clear_all</md-icon> All
          </md-button>
        </div>

          <md-button class="md-fab md-mini md-fab-bottom-left" style="z-index: 1000; position: fixed;"
                     @click="() => {order = order == 'desc' ? 'asc' : 'desc'; sorted = true;}">
            <md-icon>sort</md-icon>
          </md-button>

      </div>
      </md-whiteframe>

    </template>
    <template scope="props">
      <item v-for="item in props" :item="item">
        <template slot="buttons">
          <slot name="buttons" :item="item">

          </slot>
        </template>
      </item>
    </template>
  </layout>

</template>

<script>

  import {mapGetters, mapActions} from 'vuex';
  import Item from './Item.vue';

  export default {
    name: 'items',
    props: ['items'],
    components: {
      Item
    },
    data() {
      return {
          category: '',
          order: 'desc',
          sorted: false,
      }
    },
    computed: {
      sortByDate() {
        let items = this.filterItems;

        if (items && this.order) {
          items = _.orderBy(items, ['created_date'], [this.order]);
          if(this.sorted) {
            this.addAlert({message: `Sorted Items by ${this.order == 'desc' ? 'Newest' : 'Oldest'}`});
            this.sorted = false;
          }
        }

        return items;
      },
      filterItems() {
        let items =  this.items || this.allItems;
        if(items && this.category) {
            items = _.filter(items,['category',this.category]);
        }
        return items;
      },
      ...mapGetters([
        'allItems',
        'itemCategories',
      ]),
    },
    methods: {
      ...mapActions([
        'addAlert'
      ])
    }
  }
</script>
