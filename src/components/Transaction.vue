<template>
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
    <tbody>
    <tr v-for="fields in transaction">
      <td> {{ fields['.key'] }}</td>
      <td> {{ fields.customer}}</td>
      <td> {{ fields.employee}}</td>
      <td> {{ fields.store}}</td>
      <td> {{ fields.amount}}</td>
      <td> {{ fields.tax}}</td>
      <td> {{ fields.discount}}</td>
      <td> {{ fields.change}} </td>
      <td> {{ fields.total}} </td>
      <td> {{ fields.items ? fields.items.length : 0}} : <router-link>Items</router-link></td>
      <td> <v-badge :new="transaction.status == 'New'" slot="secondary"></v-badge></td>
      <td> <router-link :to="`/user/${$route.params.user}/stores/${transaction.store}/pos/${transaction['.key']}`">Point of Sale</router-link></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {

  }
</script>
