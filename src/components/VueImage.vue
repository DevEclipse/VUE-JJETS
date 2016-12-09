<template>
  <img :src="image" @error="replaceImage" :alt="alt"/>
</template>

<script>
  export default {
    name: 'vue-image',
    props: ['image', 'alt'],
    methods: {
      replaceImage(event) {
        event.target.src = `//dummyimage.com/600x400/adadad/ffffff&text=No+${this.alt}+Image`;
      }
    }
  }
</script>
