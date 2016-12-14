<template>
  <img :src="image" @error="replaceImage" :alt="alt"/>
</template>

<script>
  export default {
    name: 'vue-image',
    props: ['image', 'alt'],
    methods: {
      replaceImage(event) {
       // `//dummyimage.com/600x400/adadad/ffffff&text=No+${this.alt}+Image`;
        event.target.src = 'http://bento.cdn.pbs.org/hostedbento-prod/filer_public/_bento_media/img/no-image-available.jpg';
      }
    }
  }
</script>
