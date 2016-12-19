<template>

  <layout :list="sortByDate" searchKey="name">
    <template slot="extra">
      <transition enter-active-class="animated bounceInRight"
                  leave-active-class="animated bounceOutRight" mode="out-in">
        <md-whiteframe align="center" md-elevation="24" style="z-index: 20" v-if="showFilters">

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

      </div>
      </md-whiteframe>
      </transition>
      <md-button class="md-fab md-mini md-fab-bottom-right"
                 style="margin-right: 15rem;z-index: 1000; position: fixed;"
                 @click="showFilters = !showFilters">
        <md-icon>filter_list</md-icon>
        <md-tooltip md-direction="left">{{showFilters ? 'Hide Filters' : 'Show Filters'}}</md-tooltip>
      </md-button>

      <md-button class="md-fab md-mini md-fab-bottom-right"
                 style="margin-right: 12rem;z-index: 1000; position: fixed;"
                 @click="() => {order = order == 'desc' ? 'asc' : 'desc'; sorted = true;}">
        <md-icon>sort</md-icon>
        <md-tooltip md-direction="right">Sort By Newest or Oldest</md-tooltip>
      </md-button>
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
          showFilters: true
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
