<template>
  <div>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'manager',
    computed: {
      ...mapGetters([
        'currentManager',
      ])
    },

    methods: {
        addStore(store) {
            store.manager = this.currentUser.username;
            this.$root.addStore(store);
        },
      addItem(newStoreItem,newItem) {
        this.$root.addStoreItem(newStoreItem,newItem);
      },
      updateItem(item) {

        this.$root.updateStoreItem(item);
      },
      deleteItem(item) {
        this.$root.deleteStoreItem(item);
      },
    }
  }
</script>
