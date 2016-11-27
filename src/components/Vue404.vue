<template>

  <div class="row center-xs middle-xs md-display-4" style="font-weight:bold; height: 100vh; width: 101vw; background: #2196F3; color:white;">
    <div class="col-xs-6">
      <div class="box">
        404 Not Found {{seconds}}
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
          seconds: 3,
          timer: ''
      }
    },
    methods: {
        countdown() {
          if(this.seconds--) return;
          clearInterval(this.timer);
          if(this.$store.authenticated) {
              this.$root.toDashboard();
          }
          this.$router.push('/');
          this.seconds = 3;
        },
    },
    mounted() {
      this.timer = setInterval(this.countdown,1000)
    }
  }
</script>
