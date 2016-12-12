<template>
  <display v-if="!currentStore" message="Store Not Found"/>
  <div v-else>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
      <span class="md-title" style="flex: 1;">
        {{currentStore.name | capitalize}}
      </span>
        <div class="hidden-xs">
          <router-link tag="md-button" :to="{name: 'store'}">
            <md-icon>info</md-icon> Info
          </router-link>
          <span v-if="authManager">
          <router-link tag="md-button" :to="{name: 'stocks'}" v-if="sameManagerStore">
            <md-icon>store</md-icon> Stocks
          </router-link>
          </span>
          <span v-if="authEmployee">
          <router-link v-if="sameEmployeeManagerStore" tag="md-button" :to="{name: 'transactions'}">
            <md-icon>timeline</md-icon> Transactions
          </router-link>
            </span>
        </div>
        <div class="visible-xs">
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'store'}">
            <md-icon>info</md-icon>
          </router-link>
          <span v-if="authManager">
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'stocks'}" v-if="sameManagerStore">
            <md-icon>store</md-icon>
          </router-link>
          </span>
          <span v-if="authEmployee">
          <router-link class="md-icon-button" v-if="sameEmployeeManagerStore" tag="md-button"
                       :to="{name: 'transactions'}">
            <md-icon>timeline</md-icon>
          </router-link>
          </span>
        </div>
      </div>
    </md-toolbar>
    <transition enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutRight"
                mode="out-in">
      <div class="row" v-if="$route.name == 'store'" style="margin: 1rem;">
        <div class="col-xs">
          <div class="row">
            <div class="col-xs">
              <md-toolbar>
                <div class="md-toolbar-container">
                  <div class="md-title">Store Id</div>
              <span v-if="authManager">
                  <md-button v-if="sameManagerStore" class="md-icon-button">
                    <md-icon>edit</md-icon>
                  </md-button>
              </span>
                </div>
              </md-toolbar>
              <md-card md-with-hover>
                <md-card-media>
                  <vue-image :image="currentStore.image_url" alt="Store"/>
                </md-card-media>
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-title">Description:</div>
                    <div class="md-subhead">{{currentStore.description || 'No Description'}}</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </div>
          </div>
        </div>
        <div class="col-xs">
          <div class="row">
            <div class="col-xs">
              <md-card md-with-hover>
                <md-card-header>
                  <md-card-header-text>
                    <div class="md-title">Total Stocks: {{currentStocks.length || 'No Stocks'}}</div>
                  </md-card-header-text>
                </md-card-header>
              </md-card>
            </div>
          </div>
        </div>
      </div>
      <router-view
        :authManager="authManager"
        :authEmployee="authEmployee"
        :authCustomer="authCustomer">

      </router-view>
    </transition>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'store',
    props: ['authManager', 'authEmployee', 'authCustomer'],
    computed: {
      ...mapGetters([
        'currentStore',
        'currentStocks',
        'sameManagerStore',
        'sameEmployeeManagerStore'
      ])
    },
  }
</script>
