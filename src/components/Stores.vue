<template>
  <div>

    <loading v-if="!currentManager" message="Loading... Stores"></loading>
<div v-else>
    <md-sidenav  class="md-right md-fixed" ref="addStoreNav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title" style="flex: 1">Manager:{{newStore.manager}}</h3>

          <h4 class="md-subhead">Status: {{newStore.status}}</h4>
        </div>
      </md-toolbar>

      <md-input-container style="margin: 20px;">
        <label>Store Name</label>
        <md-input v-model.lazy.trim="newStore.name" type="text" required></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;">
        <label>Tax Rate</label>
        <md-input type="number" max="1" step="0.01" v-model.number="newStore.tax_rate" required></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;">
        <label>Discount Rate</label>
        <md-input type="number" max="1" step="0.01" v-model.number="newStore.discount_rate" required></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;">
        <label>Image Url</label>
        <md-input v-model.lazy.trim="newStore.image_url" type="text"></md-input>
      </md-input-container>

      <md-input-container style="margin: 20px;">
        <label>Description</label>
        <md-textarea v-model="newStore.description" maxlength="70"></md-textarea>
      </md-input-container>

      <multi-select :options="dataTagKeys" v-model="newStore.tags" :selected="newStore.tags" :multiple="true"
                    :searchable="true" @tag="addTag"
                    :taggable="true">
        <span slot="noResult">
        Oops! No Tags Create one!
        </span>
      </multi-select>

      <md-button class="md-raised md-accent" @click="addStore">Add Store</md-button>
    </md-sidenav>

    <div v-if="currentManagerStores">

        <md-toolbar>
          <h2 class="md-title" style="flex: 1">{{currentManager['.key']}} | Stores </h2>
          <md-button v-if="currentManager['.key'] == authUser.username" style="z-index: 10;" class="md-fab md-mini" @click="toggleAddStoreNav">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="left">Add Store</md-tooltip>
          </md-button>
        </md-toolbar>
      <div class="md-display-4" align="center" v-if="currentManagerStores.length < 1">
        No Stores Available
      </div>
      <div v-else class="row" v-for="store3 in chunkedStores">

        <div v-for="store in store3" class="col-xs">
          <md-card md-with-hover style="margin: 10px;">
            <md-toolbar>
              <md-card-header style="flex: 1">
                <div class="md-title">Store : {{store.name}}</div>
                <div class="md-subhead">Manager : {{store.manager}}</div>
              </md-card-header>
              <div v-if="currentManager['.key'] == authUser.username">
                <router-link :to="{name: 'store', params: {store: store['.key']}}" class="md-fab md-button md-mini">
                  <md-icon>edit</md-icon>
                </router-link>
                <md-button class="md-fab md-mini md-warn">
                  <md-icon>delete</md-icon>
                </md-button>
              </div>
              <div v-else>
                <md-button class="md-fab md-mini">
                  <md-icon>apply</md-icon>
                </md-button>
              </div>
            </md-toolbar>



            <md-card-media>
              <img :src="store.image_url || 'http://placehold.it/1920x1080'"
                   alt="People"
                   onerror="this.onerror=null;this.src='http://placehold.it/1920x1080';">
            </md-card-media>

            <md-card-expand>
              <md-card-media-actions>
                <div class="md-subheading">
                  Total Items: <div class="md-title" align="center"> {{ store.items | toArray | count }}</div>
                </div>
                <div class="md-subheading">
                  Total Employees: <div class="md-title" align="center"> {{ store.employees | toArray | count }}</div>
                </div>
                <div class="md-subheading">
                  Total Transactions: <div class="md-title" align="center"> {{ store.transactions | toArray | count }}</div>
                </div>
              </md-card-media-actions>
              <md-card-actions>
                <md-card-header>More Info</md-card-header>
                <span style="flex: 1"></span>
                <md-button class="md-icon-button" md-expand-trigger>
                  <md-icon>keyboard_arrow_down</md-icon>
                </md-button>
              </md-card-actions>

              <md-card-content>
                <div class="md-title">Description:</div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
              </md-card-content>
            </md-card-expand>
            <md-card-content>
              <div v-if="store.tags">
                Tags: <span v-for="tag in store.tags"> <router-link :to="{name: 'tag',params: {tag}}"> {{tag}} </router-link>  </span>
              </div>
              <div v-else>
                No Tags
              </div>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
</div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'stores',
    computed: {
      chunkedStores() {
        return _.chunk(this.currentManagerStores,3);
      },
      ...mapGetters([
        'authUser',
        'dataTagKeys',
        'currentManager',
        'currentManagerStores',
      ])
    },
    data() {
      return {
        newStore: {
          name: '',
          discount_rate: '',
          tax_rate: '',
          image_url: '',
          description: '',
          status: 'New',
          tags: ['store','new'],
          manager: '',
        },
      }
    },
    methods: {
      addStore() {
        this.newStore.manager = this.currentManager['.key'];
        this.$store.dispatch('addStore',this.newStore);
        _.forEach(this.newStore.tags,tag => {
            this.$store.dispatch('addTag', {
                name: tag,
                category: 'stores',
                category_value: `${this.newStore.manager}_${this.newStore.name}`,
                tagger: this.newStore.manager
            });
        });
      },
      toggleAddStoreNav() {
        this.$refs.addStoreNav.toggle();
      },
      addTag (newTag) {
        this.newStore.tags.push(newTag)
      },

    }
  }
</script>
