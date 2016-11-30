<template>
  <div v-if="authUser">

    <div class="row middle-xs" style="margin: 5px;">
      <div class="col-xs md-display-1">
        Items
      </div>
      <div class="col-xs">
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search
          </label>
          <md-input v-model="itemSearch"></md-input>
        </md-input-container>


      </div>
    </div>
    <hr/>
    <div v-if="chunkedItems">

      <div class="row" v-for="item3 in chunkedItems">
        <div class="col-xs-12 col-md-4" v-for="item in item3">

          <md-card md-with-hover style="margin-bottom: 5px;">
            <md-card-header>

              <md-card-header-text>
                <div class="md-title">{{item.name}}</div>
                <div class="md-subhead">Created By: {{item.created_by | capitalize}}</div>


                <md-card-header align="center">
                  <md-card-header-text>
                    <div class="md-title">${{item.cost_price}}</div>
                    <div class="md-subhead">Cost Price</div>
                  </md-card-header-text>
                </md-card-header>

              </md-card-header-text>

              <md-card-media md-big>
                <img src="//placehold.it/250x250" alt="People">
              </md-card-media>

            </md-card-header>

            <md-card-actions>
              <router-link class="md-button md-accent"
                           :to="{name: 'item',params: {item: item['.key']}}">More Info</router-link>
            </md-card-actions>

          </md-card>

        </div>
      </div>
    </div>
    <div v-else class="row middle-xs center-xs">
      <div class="col-xs md-display-4">
        No Items
      </div>
    </div>
  </div>
  </div>
  <div v-else class="row middle-xs center-xs" style="height: 100vh;">
    <div class="col-xs md-display-2">
      Loading... Items
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'items',
    computed: {
      chunkedItems() {
        return _.chunk(this.allItems,3);
      },
      ...mapGetters([
        'allItems',
        'authUser',
      ]),
    },
    data() {
        return {
            itemSearch: '',

        }
    }
  }
</script>
