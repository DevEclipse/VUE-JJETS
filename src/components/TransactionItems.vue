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
        <td> {{item.retail_price }}</td>
        <td> Left on Stock: {{item.quantity}}</td>
        <td> Items Bought: {{item.bought}}</td>
        <td> {{item.created_by}}</td>
        <td>
          <button class="waves-effect waves-light btn large green lighten-2" @click="editItem(item)"> Return </button>
          <button class="waves-effect waves-light btn large red lighten-2" @click="deleteItem(item)"> Void </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
      props: ['items','transaction'],
  }
</script>
