<template>
    <div class="row middle-xs center-xs" style="height: 100vh;">
      <div class="col-xs md-display-3" style="font-weight: bold;">
        {{message}}
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
      name: 'display',
      props: ['message'],
      mounted() {
        document.querySelector('html').style.overflow = 'hidden';
      },
      destroyed() {
        document.querySelector('html').style = null;
      },
  }
</script>
