<template>
  <div>
    <table>
      <thead>
      <tr>
        <th> Key </th>
        <th> Name </th>
        <th> Store </th>
        <th> Cost Price </th>
        <th> Retail Price </th>
        <th> Quantity </th>
        <th> Created By </th>
        <th> Configuration </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items">
        <td> {{item['.key']}} </td>
        <td> {{item.name}}</td>
        <td> {{item.store}}</td>
        <td> {{item.cost_price}}</td>
        <td> <v-text-input v-model="item.retail_price" id="key" type="number" step="10.01"/></td>
        <td> <v-text-input v-model="item.quantity" id="key" type="number" /></td>
        <td> {{item.created_by}}</td>
        <td>
          <button class="waves-effect waves-light btn large green lighten-2" @click="updateItem(item)"> Save </button>
          <button class="waves-effect waves-light btn large red lighten-2" @click="deleteItem(item)"> Delete </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
      props:['items'],
      methods: {
          deleteItem(item) {
              this.$emit('deleteItem',item);
          },
        updateItem(item) {
              this.$emit('updateItem',item);
          }
      }
  }
</script>
