<template>
  <div>
asdsad
  </div>
</template>

<script>
  export default {
      props:['items'],
      methods: {
          deleteItem(item) {
              this.$emit('deleteItem',item);
          },
          updateItem(item) {
              this.$emit('updateItem',item);
          }
      }
  }
</script>
