<template>
    <div>
      <router-view :user="currentUser"
                   :store="currentStore"
                   :items="managerStoreItems"
                   :stores="chunkedBy3Stores"
                   :manager="currentUser"
                   @addStore="addStore"
                   @addItem="addItem"
                   @updateItem="updateItem"
                   @deleteItem="deleteItem"
      ></router-view>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'manager',
    computed: {
      ...mapGetters([
        'currentUser',
        'chunkedBy3Stores',
        'currentStore',
        'managerStoreItems',
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
