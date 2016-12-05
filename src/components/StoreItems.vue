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
              <md-card-actions>
                <md-button class="md-accent">
                  Add To Transaction
                </md-button>
                <span style="flex: 1;"></span>
                <md-button class="md-accent">
                  Edit
                </md-button>
              </md-card-actions>
          </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
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
          'currentStoreItems',
      ]),
    },
    data() {
        return {
          itemSearch: '',
        }
    }
  }
</script>
