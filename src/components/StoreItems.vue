<template>
  <display v-if="!currentStoreItems.length" message="No Store Items Yet"/>
  <div v-else>

    <md-dialog ref="editStoreItem">
      <div v-if="storeItem">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title" style="flex: 1">
              <md-icon>edit</md-icon>
              Edit
            </div>
            <div class="md-subhead">
              Item | {{storeItem.item | capitalize}}
            </div>
          </div>
        </md-toolbar>

          <div style="margin: 1rem;">
            <md-input-container>
              <label>
                <md-icon>timeline</md-icon>
                Retail Price
              </label>
              <md-input v-model="storeItem.retail_price"
                        type="number" step="10.00" min="0"></md-input>
            </md-input-container>
            <md-input-container>
              <label>
                <md-icon>timeline</md-icon>
                Quantity
              </label>

              <md-input v-model="storeItem.quantity"
                        type="number" min="0"></md-input>
            </md-input-container>
            <md-switch v-model="storeItem.taxed">Taxed
            </md-switch>
            <md-switch v-model="storeItem.discounted">
              Discounted
            </md-switch>
          </div>


        <md-dialog-actions>
          <md-button class="md-primary" @click="closeEditItem"> Cancel</md-button>
          <md-button class="md-primary" @click="editStoreItem"> Save</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>

    <cards :list="currentStoreItems" default="currentStoreItems">
      <template scope="props">
        <md-card-header>
          <md-card-header-text>

            <div class="md-title">
              {{props.data.name}}
            </div>
            <div class="md-subhead">
              {{props.data['.key']}}
            </div>


          </md-card-header-text>

          <md-card-media md-big>
            <img :src="props.data.image_url || '//placehold.it/500x500'">
          </md-card-media>

        </md-card-header>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">
              &#8369;{{props.data.retail_price}}
            </div>
            <div class="md-subhead">
              Retail Price
            </div>
          </md-card-header-text>
          <md-card-header-text>
            <div class="md-title">
              {{props.data.quantity}}
            </div>
            <div class="md-subhead">
              Quantity
            </div>
          </md-card-header-text>
          <md-card-header-text>
            <div class="md-title"> {{props.data.taxed ? 'Yes' : 'No'}}</div>
            <div class="md-subhead">Taxed</div>
          </md-card-header-text>
          <md-card-header-text>
            <div class="md-title"> {{props.data.discounted ? 'Yes' : 'No'}}</div>
            <div class="md-subhead">Discounted</div>
          </md-card-header-text>
        </md-card-header>
        <md-card-header>
          <md-card-header-text>
            <div class="md-subhead">
              <span style="font-weight: bold;">Created By: </span>{{props.data.created_by | capitalize}}
            </div>
          </md-card-header-text>
          <md-card-header-text>
            <div class="md-subhead">
              <span style="font-weight: bold">Created:</span>  {{props.data.created_at | moment("from")}}
            </div>
          </md-card-header-text>
          <md-card-header-text>
            <div class="md-subhead">
              <span style="font-weight: bold">Updated:</span>  {{props.data.updated_at | moment("from")}}
            </div>
          </md-card-header-text>
        </md-card-header>
        <md-card-actions>
          <span style="flex: 1;"></span>
          <router-link tag="md-button" :to="{name: 'item',params: {item: props.data['.key']}}">
              More Info
          </router-link>
          <div v-if="authManager">
          <md-button v-if="authManager['.key'] == currentStore.manager"
                     @click="openEditItem(props.data['.key'])">
              Edit
          </md-button>
          </div>
        </md-card-actions>
      </template>
    </cards>


  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'store-items',
    computed: {
      ...mapGetters([
        'currentStore',
        'currentStoreItems',
        'authManager',
        'serverTime',
      ]),
    },
    data() {
      return {
        storeItem: '',
      }
    },
    methods: {
      ...mapActions([
        'updateStoreItem',
      ]),
      openEditItem(item = null) {
        this.$refs.editStoreItem.open();
        this.storeItem = _.clone(this.currentStore.items[item]);
      },
      editStoreItem() {
        this.storeItem.updated_at = this.serverTime;
        this.updateStoreItem(this.storeItem);
      },
      closeEditItem() {
        this.$refs.editStoreItem.close();
        this.storeItem = null;
      },
    },
  }
</script>
