<template>
  <display v-if="!transaction" message="No Transaction"/>
  <div v-else>
    <table>
      <thead>
      <tr>
        <th>Item</th>
        <th>Retail Price</th>
        <th>Quantity</th>
      </tr>
      </thead>
      <tbody v-if="transaction.items">
      <tr v-for="storeItem in transaction.items">
        <td>storeItem.item</td>
        <td>storeItem.retail_price</td>
        <td>
          <md-input-container>
            <label>Quantity</label>
            <md-input v-model="storeItem.quantity"/>
          </md-input-container>
        </td>
      </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3">No Items Yet</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'transaction',
    props: ['transaction'],
  }
</script>
