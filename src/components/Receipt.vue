<template>
  <div v-if="currentTransaction" style="margin: 1rem; border: 2px solid">
    <div class="row center-xs">
    <div class="md-display-3" style="padding: 1rem;">{{currentTransactionStore.name | capitalize}}</div>
    </div>
    <div class="row center-xs">
      <div class="md-display-2" >{{currentTransactionStore.location | capitalize}}</div>
    </div>
    <div class="row center-xs">
      <div class="md-display-1" style="padding: 1rem;">({{currentTransactionStore.manager | capitalize}})</div>
    </div>
    <hr/>
    <div class="row center-xs">
      <div class="md-display-1" style="padding: 2rem;">Employee: {{currentTransaction.employee | capitalize}}</div>
    </div>
    <hr/>
    <md-card md-with-hover>
      <md-card-header>
        <div class="md-title">Invoice Id: {{currentTransaction['.key']}}</div>
      </md-card-header>
      <md-table-card>
        <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>Item</md-table-head>
              <md-table-head>Retail Price</md-table-head>
              <md-table-head>Quantity</md-table-head>
              <md-table-head>Item Total</md-table-head>
            </md-table-row>
          </md-table-header>
          <md-table-body v-if="currentTransaction.items">
            <md-table-row v-for="item in currentTransaction.items">
              <md-table-cell>

                {{item.name | capitalize}}

              </md-table-cell>
              <md-table-cell>
                &#8369;{{item.retail_price}}
              </md-table-cell>
              <md-table-cell>
                {{item.quantity}}
              </md-table-cell>
              <md-table-cell>
                &#8369;{{item.retail_price * item.quantity}}
              </md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell></md-table-cell>
              <md-table-cell></md-table-cell>
              <md-table-cell>Sub Total: </md-table-cell>
              <md-table-cell>&#8369;{{currentTransaction.subtotal}}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell></md-table-cell>
              <md-table-cell></md-table-cell>
              <md-table-cell>Tax: </md-table-cell>
              <md-table-cell>&#8369;{{currentTransaction.tax}}</md-table-cell>
            </md-table-row>
            <md-table-row>
              <md-table-cell></md-table-cell>
              <md-table-cell></md-table-cell>
              <md-table-cell>Discount: </md-table-cell>
              <md-table-cell>&#8369;{{currentTransaction.discount}}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-table-card>
      <md-card-media-actions>
        <span>Total: &#8369;{{currentTransaction.total}}</span>
        <span>Amount: &#8369;{{currentTransaction.amount}}</span>
        <span>Change: &#8369;{{currentTransaction.change}}</span>
      </md-card-media-actions>
    </md-card>
    <hr/>
    <div class="row center-xs">
      <div class="md-subheading" style="padding: 2rem;">Created: {{ currentTransaction.created_date | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</div>
      <div class="md-subheading" style="padding: 2rem;">Expires: {{ currentTransaction.expiration_date | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'currentTransaction',
        'currentTransactionStore',
        'currentTransactionStocks',
      ])
    }
  }
</script>
