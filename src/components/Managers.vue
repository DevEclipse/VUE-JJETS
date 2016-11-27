<template>
  <div>
    <md-card v-for="manager in $store.state.bmanagers">
      <md-card-header>
        <div class="md-title">
          {{manager['.key']}}
        </div>
      </md-card-header>
    </md-card>
  </div>
</template>

<script>
  export default {

  }
</script>
