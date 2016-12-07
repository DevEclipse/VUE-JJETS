<template>
  <display v-if="!transaction" message="Create a Transaction"/>
  <div v-else>
    <md-table v-once>
      <md-table-header>
        <md-table-row>
          <md-table-head> Item </md-table-head>
          <md-table-head md-numeric>Retail Price</md-table-head>
          <md-table-head md-numeric>Quantity </md-table-head>
          <md-table-head md-numeric>Taxed</md-table-head>
          <md-table-head md-numeric>Discounted</md-table-head>
          <md-table-head md-numeric>Subtotal</md-table-head>
          <md-table-head md-numeric>Tax</md-table-head>
          <md-table-head md-numeric>Discount</md-table-head>
          <md-table-head md-numeric>Total</md-table-head>
        </md-table-row>
      </md-table-header>

      <md-table-body v-if="transaction.items">
        <md-table-row v-for="item in transaction.items" :key="item['.key']">
          <md-table-cell>{{item.item}}</md-table-cell>
          <md-table-cell>{{item.retail_price}}</md-table-cell>
          <md-table-cell>{{item.quantity}}</md-table-cell>
          <md-table-cell>{{item.taxed}}</md-table-cell>
          <md-table-cell>{{item.discounted}}</md-table-cell>
          <md-table-cell>{{item.retail_price * item.quantity}}</md-table-cell>

        </md-table-row>
      </md-table-body>
    </md-table>
  </div>
</template>

<script>
  export default {
    name: 'transaction',
    props: ['transaction'],
  }
</script>
