<template>
    <div class="row middle-xs center-xs" style="height: 85vh;">
      <div class="col-xs md-display-4">
        {{message}}
      </div>
    </div>
</template>

<script>
  export default {
      name: 'display',
      props: ['message'],
  }
</script>
