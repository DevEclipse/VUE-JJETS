<template>
  <div>

  <div v-if="transactions">

    <table class="centered responsive-table">
      <thead>
      <tr>
        <th> Transaction Key </th>
        <th> Customer </th>
        <th> Employee </th>
        <th> Store </th>
        <th> Amount </th>
        <th> Tax </th>
        <th> Discount </th>
        <th> Change </th>
        <th> Total </th>
        <th> Total Items </th>
        <th> Status </th>
        <th> Transaction Items </th>
      </tr>
      </thead>
      <tbody v-if="transactions.length > 0">
      <tr v-for="(transaction,key) in transactions">
        <td> {{ transaction['.key'] }}</td>
        <td> {{ transaction.customer}}</td>
        <td> {{ transaction.employee}}</td>
        <td> {{ transaction.store}}</td>
        <td> {{ transaction.amount}}</td>
        <td> {{ transaction.tax}}</td>
        <td> {{ transaction.discount}}</td>
        <td> {{ transaction.change}}</td>
        <td> {{ transaction.total}}</td>
        <td> {{ transaction.items ? transaction.items.length : 0}}</td>
        <td> <v-badge :new="transaction.status == 'New'" slot="secondary"></v-badge></td>
        <td> <router-link :to="transaction['.key']">Point of Sale</router-link></td>
      </tr>
      </tbody>
      <tbody v-else>
      <tr>
        <td colspan="10"> <h1>Transactions are only created by Employees and Customers</h1> </td>
      </tr>
      </tbody>
    </table>

  </div>

  </div>
</template>

<script>
  export default {
    name: 'vue-transactions',
    props: ['transactions'],


  }
</script>
