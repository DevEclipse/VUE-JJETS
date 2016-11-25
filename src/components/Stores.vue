<template>
  <div>
    <div v-for="store in stores" style="width: 33%">
      <md-card>
  <md-card-media>
    <img src="assets/card-image-1.jpg" alt="People">
  </md-card-media>

  <md-card-header>
    <div class="md-title">Title goes here</div>
    <div class="md-subhead">Subtitle here</div>
  </md-card-header>

  <md-card-expand>
    <md-card-actions>
      <md-button>Action</md-button>
      <md-button>Action</md-button>
      <span style="flex: 1"></span>
      <md-button class="md-icon-button" md-expand-trigger>
        <md-icon>keyboard_arrow_down</md-icon>
      </md-button>
    </md-card-actions>

    <md-card-content>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
    </md-card-content>
  </md-card-expand>
</md-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vue-stores",
    props: ['manager', 'stores'],
    data() {
      return {
        newStore: {
          name: '',
          discount_rate: '',
          tax_rate: '',
          manager: '',
        },
      }
    },
    methods: {
      addStore() {
        this.$emit('addStore', this.newStore)
      }
    }
  }
</script>
