<template>
  <display v-if="!currentStoreItems.length" message="No Store Items Yet"/>
  <div v-else>
    <md-input-container style="margin: 1rem;">
      <label>
        <md-icon>search</md-icon>
        Search Item
      </label>
      <md-input v-model="itemSearch"></md-input>
    </md-input-container>
    <div class="row" v-for="item4 in chunkedStoreItems">
      <div class="col-xs-12 col-md-4" v-for="item in item4">
          <md-card md-with-hover>
            <md-card-header>
              <md-card-header-text>

              <div class="md-title">
                {{item.name}}
              </div>
              <div class="md-subhead">
                {{item['.key']}}
              </div>

                <md-card-header-text style="margin-top: 2.5rem;">
                  <div class="md-title">
                    {{item.created_by | capitalize}}
                  </div>
                  <div class="md-subhead">
                    Created By
                  </div>
                </md-card-header-text>

              </md-card-header-text>

              <md-card-media md-big>
                <img :src="item.image_url || '//placehold.it/500x500'">
              </md-card-media>

            </md-card-header>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">
                    &#8369;{{item.retail_price}}
                  </div>
                  <div class="md-subhead">
                    Retail Price
                  </div>
                </md-card-header-text>
                <md-card-header-text>
                  <div class="md-title">
                   {{item.quantity}}
                  </div>
                  <div class="md-subhead">
                    Quantity
                  </div>
                </md-card-header-text>
                <md-card-header-text>
                <div class="md-title"> {{item.taxed ? 'Yes' : 'No'}}</div>
                <div class="md-subhead">Taxed</div>
                </md-card-header-text>
                <md-card-header-text>
                  <div class="md-title"> {{item.discounted ? 'Yes' : 'No'}}</div>
                  <div class="md-subhead">Discounted</div>
                </md-card-header-text>
              </md-card-header>
            </md-card-header>
            <md-card-header>
              <md-card-header-text>
                <div class="md-subhead">
                  Created At: {{item.created_date | date}}
                </div>
              </md-card-header-text>
              <md-card-header-text>
                <span class="md-subhead">
                  Updated At: {{item.updated_date | date}}
                </span>
              </md-card-header-text>
            </md-card-header>
              <md-card-actions>
                <span style="flex: 1;"></span>
                <md-button v-if="authUser.profiles.manager == currentStore.manager"
                           class="md-fab md-mini"
                           @click="toggleEditStoreItem(item['.key'])">
                  <md-icon>edit</md-icon>
                  <md-tooltip>Edit this Store Item</md-tooltip>
                </md-button>
              </md-card-actions>
          </md-card>
      </div>
    </div>

    <md-sidenav class="md-right" ref="editStoreItem">
      <div v-if="storeItem">
      <md-toolbar>
        <div class="md-title">
          Edit Store Item
          <div class="md-subhead">
            Item | {{currentStore.items[storeItem].item | capitalize}}
          </div>
        </div>
      </md-toolbar>
      <div style="margin: 1rem;">
        <md-input-container >
          <label>
            <md-icon>timeline</md-icon>
            Retail Price
          </label>
          <md-input v-model.lazy="currentStore.items[storeItem].retail_price" @change="updateStore(currentStore)"  type="number" step="10.00" min="0"></md-input>
        </md-input-container>
        <md-input-container >
          <label>
            <md-icon>timeline</md-icon>
            Quantity
          </label>

          <md-input v-model.lazy="currentStore.items[storeItem].quantity" @change="updateStore(currentStore)" type="number" min="0"></md-input>
        </md-input-container>
        <md-switch v-model.lazy="currentStore.items[storeItem].taxed" @change="updateStore(currentStore)">Taxed</md-switch>
        <md-switch v-model.lazy="currentStore.items[storeItem].discounted" @change="updateStore(currentStore)">Discounted</md-switch>
      </div>
      </div>
    </md-sidenav>

  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'store-items',
    computed: {
      chunkedStoreItems() {
        let items = this.currentStoreItems;
        let regExp = new RegExp(this.itemSearch);
        if (this.itemSearch) {
          items = _.filter(items, item => {
            return regExp.test(item['.key']);
          })
        }
        return _.chunk(items,4);
      },
      ...mapGetters([
          'currentStore',
          'currentStoreItems',
          'authUser',
      ]),
    },
    data() {
        return {
          itemSearch: '',
          storeItem: '',
        }
    },
    methods: {
      toggleEditStoreItem(storeItem) {
        this.storeItem = storeItem;
        this.$refs.editStoreItem.toggle();
      },
      ...mapActions([
          'updateStore',
      ])
    },

  }
</script>
