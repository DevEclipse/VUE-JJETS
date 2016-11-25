<template>

  <div style="height: 100vh;">
    <div style="font-size: 20vh;font-weight: bold; ">
      404 Not Found Redirect in {{ seconds }}
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
