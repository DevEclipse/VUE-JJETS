<template>
  <div>

    <md-input-container>
      <label>
        <md-icon>search</md-icon>
        Search
      </label>
      <md-input v-model="search"></md-input>
    </md-input-container>

    <transition-group tag="div" class="row" v-for="list3 in chunkedList" enter-active-class="animated bounceInRight"
                      leave-active-class="animated bounceOutRight">

      <md-card md-with-hover class="col-xs-12 col-md-4" v-for="data in list3" :key="data['.key']">
        <slot :data="data"></slot>
      </md-card>

    </transition-group>

  </div>
</template>

<script>
  export default {
    name: 'cards',
    props: ['list', 'default'],
    data() {
      return {
        search: '',
      }
    },
    computed: {
      chunkedList() {
        let items = this.list || this.default;
        let regExp = new RegExp(this.search);
        if (this.search) {
          items = _.filter(items, item => {
            return regExp.test(item['.key']);
          })
        }
        return _.chunk(items, 3);
      },
    },

  }
</script>
