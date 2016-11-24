<template>
  <div id="app" v-md-theme="'default'">
    <ul>
      <li v-for="user in $store.state.users">
        {{user}}
      </li>
    </ul>
    <md-toolbar>
      <div class="md-title">JJETS</div>

    </md-toolbar>


    <router-view></router-view>
  </div>

</template>

<script>

//  import Items from './jjets/components/Items.vue'
//
//  Vue.component('vue-items',require('./jjets/components/Items.vue'));
//  Vue.component('vue-stores',require('./jjets/components/Stores.vue'));
//  Vue.component('vue-modal',require('./jjets/components/Modal.vue'));
//  Vue.component('vue-store-items',require('./jjets/components/StoreItems.vue'));
//  Vue.component('vue-transactions',require('./jjets/components/Transactions.vue'));

   export default {

   }
</script>
