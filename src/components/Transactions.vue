<template>
  <div>

  </div>

</template>

<script>
  export default {
    name: 'vue-transactions',
    props: ['transactions'],
    data() {
      return {
        selectedData: [],
        sort: {},
        page: {}
      }
    },
    methods: {
      onSelect(data) {
        this.selectedData = data;
        this.$forceUpdate();
      },
      onSort(sort) {
        this.sort = sort;
      },
      onPagination(page) {
        this.page = page;
      }
    }
  }
</script>
