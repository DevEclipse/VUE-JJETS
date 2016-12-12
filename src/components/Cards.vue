<template>
  <div class="container">
    <div class="row" >
      <div class="col-xs-12 col-md" v-if="filters">
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search
          </label>
          <md-input v-model="search" :disabled="!searchKey"></md-input>
        </md-input-container>
      </div>
      <div class="col-xs-12 col-md-4" style="margin: 1rem;">
        <multiselect v-if="filters" :options="filters"
                     v-model="searchKey"
                     placeholder="Search By"></multiselect>
      </div>
    </div>

    <transition-group style="margin-bottom: 1rem;" v-for="data3 in dataList"
                      class="row"
                      mode="out-in"
                      enter-active-class="animated bounceInRight"
                      leave-active-class="animated bounceOutRight">
      <div class="col-xs-12 col-md-4"
           v-for="data in data3"
           :key="data['.key']">
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
    props: ['list', 'filters'],
    data() {
      return {
        searchKey: '',
        search: '',
      }
    },
    computed: {
      dataList() {
        let items = this.list;
        if (items && this.search && this.searchKey) {
          let regExp = new RegExp(`${this.search}`, 'i');
          items = _.filter(items, item => {
            return regExp.test(item[this.searchKey])
          });
        }
        return _.chunk(items, 3);
      },
    },
    mounted() {
      if (this.filters)
        this.searchKey = this.filters[0];
    }
  }
</script>
