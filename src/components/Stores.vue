<template>
  <div>

    <loading v-if="!stores"></loading>

    <div class="md-display-2" align="center" style="padding-bottom: 30px;">
      Stores
      <div v-if="manager['.key'] == authUser.username">
        <md-button class="md-fab" @click="toggleAddStoreNav">
          <md-icon>add</md-icon>
          <md-tooltip md-direction="left">Add Store</md-tooltip>
        </md-button>
      </div>
    </div>

    <md-sidenav class="md-right" ref="addStoreNav">
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

      <multi-select :options="dataTagKeys" v-model="newStore.tags" :multiple="true"
                    :searchable="true" @tag="addTag"
                    :taggable="true">
        <span slot="noResult">
        Oops! No Tags Create one!
        </span>
      </multi-select>

      <md-button class="md-raised md-accent" @click="addStore">Add Store</md-button>
    </md-sidenav>

    <div v-if="stores">
      <div class="md-display-4" align="center" v-if="stores.length < 1">
        No Stores Available
      </div>
      <div v-else class="row" v-for="store3 in chunkedStores">
        <div v-for="store in store3" class="col-xs">
          <md-card md-with-hover style="margin: 10px;">
              <md-card-header style="background: #2196F3;color: white;">
                <div class="md-title">Store : {{store.name}}</div>
                <div class="md-subhead">Manager : {{store.manager}}</div>
              </md-card-header>

              <md-card-media>
                <img :src="store.image_url || 'http://placehold.it/1920x1080'" alt="People">
              </md-card-media>

              <md-card-content>
                <p> {{store.description || 'No Description' }}</p>
              </md-card-content>

              <md-card-actions>
                <router-link class="md-button"
                             :to="{name: 'managerStore', params: {store: store.name}}">
                  Go to Store
                </router-link>
              </md-card-actions>
            <md-card-content>
              <h2 class="md-title">Created At: </h2>
              <div class="md-subhead">
                {{store.created_date | date}}
              </div>
              <h2 class="md-title">Updated At: </h2>
              <div class="md-subhead">
                {{store.updated_date | date}}
              </div>
            </md-card-content>
              <md-card-content>
                <h3 class="md-subheading">Status : {{store.status || 'No Status'}}</h3>
              </md-card-content>
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
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'stores',
    computed: {
      chunkedStores() {
        return _.chunk(this.stores,3);
      },
      ...mapGetters([
        'authUser',
        'dataTagKeys'
      ])
    },
    props: ['manager', 'stores'],
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
          manager: this.manager['.key'],
        },
      }
    },
    methods: {
      addStore() {
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
