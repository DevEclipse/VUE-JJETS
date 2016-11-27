<template>
  <div class="row center-xs middle-xs" style="height: 80vh;">
    <div class="md-display-4">
        {{message}}
    </div>
  </div>
</template>

<script>
  export default {
      name: 'vue-section-display',
      props: ['message']
  }
</script>
