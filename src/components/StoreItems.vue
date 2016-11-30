<template>
  <div v-if="storeItems">
    <div class="row" v-for="item4 in storeItems">
      <div class="col-xs-12 col-md-4" v-for="item in item4">
          {{item}}
      </div>
    </div>
  </div>
  <div v-else class="row middle-xs center-xs">
    <div class="col-xs md-display-4">
      No Items
    </div>
  </div>
</template>

<script>
  export default {
    name: 'store-items',
    props: ['storeItems'],
  }
</script>
