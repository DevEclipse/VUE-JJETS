<template>
  <div>
    <div class="row" v-if="filters">
      <div class="col-xs-12 col-md">
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search
          </label>
          <md-input v-model="search" :disabled="!searchKey"></md-input>
        </md-input-container>
      </div>
      <div class="col-xs-12 col-md-4" style="margin: 1rem;">
        <multiselect :options="filters"
                     v-model="searchKey"
                     placeholder="Search Customer"></multiselect>
      </div>
    </div>

    <span v-if="routeQuery.searchKey" hidden>
      {{search = routeQuery.searchKey}}
    </span>

    <transition-group v-for="data3 in dataList"
                      class="row"
                      enter-active-class="animated bounceInRight"
                      leave-active-class="animated bounceOutRight">

      <div class="col-xs-12 col-md-4" v-for="data in data3" :key="data['.key']">
        <md-card md-with-hover>
          <slot :data="data"></slot>
        </md-card>
      </div>

    </transition-group>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'cards',
    props: ['list', 'defaultList', 'filters'],
    data() {
      return {
          search: '',
          searchKey: '',
      }
    },
    computed: {
      dataList() {
        let items = this.list || this.defaultList;
        if(items && this.search && this.searchKey) {
          let regExp = new RegExp(`${this.search}`,'i');
          console.log(regExp);
          items = _.filter(items, item => {
              console.log(regExp.test(item[this.searchKey]),item[this.searchKey])
             return regExp.test(item[this.searchKey])
          });
        }
        return _.chunk(items, 3);
      },
      ...mapGetters([
          'routeQuery',
      ])
    }
  }
</script>
