<template>
  <div>

    <v-btn-link v-side-nav:addStore="{edge: 'right'}" large style="display: block">New Store</v-btn-link>

    <v-side-nav id="addStore">
      <v-container>
        <h4> New Store </h4>
        <div class="input-field">
          <v-text-input v-model.trim="newStore.name" length="30"/>
          <label>Store Name</label>
        </div>
        <div class="input-field">
          <v-text-input v-model="newStore.tax_rate" type="number" step="0.01"  length="4"/>
          <label>Tax Rate</label>
        </div>
        <div class="input-field">
          <v-text-input v-model="newStore.discount_rate" type="number" step="0.01" length="4" />
          <label>Discount Rate</label>
        </div>
        <div class="input-field">
          <v-text-input v-model="newStore.image_url"/>
          <label>Image Url </label>
        </div>
        <button class="btn large" @click="addStore"> Create </button>
      </v-container>
    </v-side-nav>
    <div v-if="stores">
    <v-row v-for="store3 in stores">
    <v-grid v-for="store in store3" s12 m4>
      <v-card large class="teal lighten-2">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" :src="store.image_url || 'http://placehold.it/300x300'" width="300" height="300" alt="No Image">
        </div>
        <div class="card-content">
          <span class="card-title activator white-text">Store Name:
            <span class="yellow-text">{{ store.name }}</span>
          </span>
          <p> {{store.manager}}</p>
          <p>  Store Item Count: {{ store.items ? store.items.length : 0 }} </p>
        </div>
        <div class="card-action">
          <router-link :to="store['.key']" append> More Info </router-link>
        </div>
      </v-card>
    </v-grid>
    </v-row>
    </div>
  </div>

</template>

<script>
  export default {
    name: "vue-stores",
    props: ['manager','stores','user'],
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
            this.$emit('addStore',this.newStore)
        }
    }
  }
</script>
