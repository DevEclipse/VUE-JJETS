<template>
    <div class="row middle-xs center-xs" style="height: 100vh;
    background: url('http://pos.dsoftbd.com/wp-content/uploads/2014/07/b-slide11.jpg?id=558')
    no-repeat center center fixed; background-size: cover; ">
      <div class="col-xs md-display-3" style="color: white; font-weight: bold;">
        {{message}}
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
