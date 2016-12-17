<template>
    <div class="row middle-xs center-xs" style="height: 100vh;">
      <div class="col-xs md-display-3" style="font-weight: bold;">

        {{message}}
        <div class="row center-xs middle-xs">
        <slot></slot>
          <md-spinner v-if="!noloader" :md-size="150" md-indeterminate></md-spinner>
        </div>
      </div>

    </div>

</template>

<script>
  export default {
      name: 'display',
      props: ['message','noloader'],
      mounted() {
        document.querySelector('html').style.overflow = 'hidden';
      },
      destroyed() {
        document.querySelector('html').style = null;
      },
  }
</script>
