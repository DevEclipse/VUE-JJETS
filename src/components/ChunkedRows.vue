<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md">
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search
          </label>
          <md-input v-model="search"></md-input>
        </md-input-container>
      </div>
    </div>

    <transition-group style="margin-bottom: 1rem;" v-for="data3 in dataList"
                      class="row"
                      mode="out-in"
                      enter-active-class="animated bounceInRight"
                      leave-active-class="animated bounceOutRight">
      <div class="col-xs-12 col-md-4"
           v-for="(data,index) in data3"
           :key="index">
          <slot :data="data"></slot>
      </div>
    </transition-group>
  </div>


</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    name: 'chunked-rows',
    props: ['list', 'searchKey'],
    data() {
      return {
        search: ''
      }
    },
    computed: {
      dataList() {
        let list = this.list;
        let key = this.searchKey;
        if (list && this.search && key) {
          let regExp = new RegExp(`${this.search}`, 'i');
          list = _.filter(list, function(listItem) {
          return regExp.test(listItem[key]);
        })
          ;
        }
        return _.chunk(list, 3);
      }
    }
  }
</script>
