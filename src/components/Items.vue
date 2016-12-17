<template>

  <layout :list="filterItems" searchKey="name">
    <template slot="extra">
      <div class="row center-xs middle-xs">
        <div class="col-xs">
          <multiselect  :options="itemCategories"
                        v-model="category"
                        :searchable="true"
                        placeholder="Select A Category"></multiselect>
        </div>
        <div class="col-xs-2">
          <md-button class="md-raised md-accent" @click="category = ''">
            <md-icon>undo</md-icon> All
          </md-button>
        </div>
      </div>


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
      }
    },
    computed: {
      filterItems() {
        let items =  this.items || this.allItems;
        if(items && this.category) {
            items = _.filter(items,['category',this.category]);
        }
        return items;
      },
      ...mapGetters([
        'allItems',
        'itemCategories'
      ]),
    },
  }
</script>
