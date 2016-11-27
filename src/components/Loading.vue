<template>
  <div class="row center-xs middle-xs md-display-4" style="font-weight:bold; height: 100vh; width: 101vw; background: #2196F3; color:white;">
    <div class="col-xs-6">
      <div class="box">
        {{message}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: ['message']
  }
</script>

