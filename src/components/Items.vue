<template>
  <display v-if="!allItems.length" message="No Items Yet"/>
  <div v-else>
    <div class="row middle-xs" style="margin: 5px;">
      <div class="col-xs-4">
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
    <div class="row" v-for="item3 in chunkedItems">
      <div class="col-xs-12 col-md-4" v-for="item in item3">

        <transition-group tag="div" enter-active-class="animated lightSpeedIn"
                          leave-active-class="animated lightSpeedOut">
          <md-card md-with-hover style="margin-bottom: 5px;" :key="item['.key']">
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
              Tags:
              <span v-for="tag in item.tags">
                <router-link :to="{name: 'tag',params: {tag: tag}}">{{tag}}</router-link>
              </span>

              <span style="flex: 1"></span>

              <router-link class="md-button md-accent"
                           :to="{name: 'item',params: {item: item['.key']}}">More Info
              </router-link>

            </md-card-actions>

          </md-card>
        </transition-group>
      </div>
    </div>
  </div>


</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'items',
    computed: {
      chunkedItems() {
        let items = this.allItems;
        let regExp = new RegExp(this.itemSearch);
        console.log(regExp);
        if (this.itemSearch) {
          items = _.filter(items, item => {
            return regExp.test(item['.key']);
          })
        }
        return _.chunk(items, 3);
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
