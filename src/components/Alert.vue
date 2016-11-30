<template>
  <div class="md-card alert">
    <slot>
      {{message}}
    </slot>
  </div>
</template>

<script>
  export default {
      props: ['message'],

      mounted() {
        setTimeout(() => {
          this.$destroy();
        },3000).bind(this);
      },
  }
</script>

<style scoped>
  .alert {
    position: fixed;
    top: 0;
    right: 0;
  }
</style>
