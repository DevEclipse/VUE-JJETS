<template>
  <div>
    <div class="row">
      <div class="col-xs">
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search
          </label>
          <md-input v-model="search"></md-input>
        </md-input-container>
      </div>
      <div class="col-xs-3" style="margin: 1rem;" v-if="filters">
        <multiselect :options="filters"
                     v-model="searchKey"
                     placeholder="Search Customer"></multiselect>
      </div>
    </div>
    <span v-if="routeQuery.searchKey" hidden>
      {{search = routeQuery.searchKey}}
    </span>
    <transition-group tag="div" class="row" v-for="list3 in chunkedList" enter-active-class="animated bounceInRight"
                      leave-active-class="animated bounceOutRight">

      <md-card md-with-hover class="col-xs-12 col-md-4" v-for="data in list3" :key="data['.key']">
        <slot :data="data"></slot>
      </md-card>

    </transition-group>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'cards',
    props: ['list', 'default', 'filters'],
    data() {
      return {
        search: '',
        searchKey: '.key',
      }
    },
    computed: {
      chunkedList() {
        let items = this.list || this.default;
        let regExp = new RegExp(this.search.toLowerCase());
        if(!items) return;
        if (this.search) {
          items = _.filter(items, item => {
            return regExp.test(item[this.searchKey]);
          })
        }
        return _.chunk(items, 3);
      },
      ...mapGetters([
          'routeQuery',
      ])
    },
  }
</script>
