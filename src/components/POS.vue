<template>
  <div>

    <loading v-if="!currentEmployee" message="Loading... Employee"/>

    <div v-else>
      <md-toolbar>
        <div class="md-title" style="flex: 1">
          Point of Sales : {{currentEmployee['.key']}}
        </div>
        <md-button class="md-fab md-mini">
          <md-icon>add</md-icon>
        </md-button>
      </md-toolbar>
      <div class="row">
        <div class="col-xs">
          <md-list class="md-dense">

            <md-list-item v-for="item in items">
              <md-avatar>
                <img :src="item.image_url || 'http://placehold.it/200x200'" alt="People">
              </md-avatar>

              <span>{{item.item}}</span>
              <span>{{item.retail_price}}</span>
              <span>{{item.quantity}}</span>
              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">send</md-icon>
              </md-button>
            </md-list-item>

          </md-list>
        </div>
      <div class="col-xs-6" v-if="!transaction">
        <transaction :transaction="transaction"></transaction>
      </div>
      <div v-else>
        <vue-section-display message="No Transaction"/>
      </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Transaction from './Transaction.vue'
  export default {
    computed: {
      ...mapGetters([
        'currentEmployee',
        'currentTransaction',
      ])
    },
    components: {
      Transaction
    },
    data() {
        return {
            transaction: null,
              ['.key']: 'transaction0',
              amount: 0,
              total: 0,
              change: 0,
              tax: 0,
              discount: 0,
              employee: '',
              store: '',
              customer: '',
              items: [],
        }
    }
  }
</script>
