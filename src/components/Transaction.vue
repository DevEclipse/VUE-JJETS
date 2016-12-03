<template>
  <display v-if="false" message="Test"/>
  <div v-else>
    <div class="row">
      <div class="col-xs">
    <table>
      <thead align="center">
        <tr>
          <th> Item </th>
          <th> Retail Price </th>
          <th> Quantity </th>
          <th> Tax </th>
          <th> Discount </th>
          <th> Total Tax</th>
          <th> Total Discount</th>
          <th> Sub Total </th>
        </tr>
      </thead>
      <tbody align="center">
        <tr v-for="item in transactionItems">
          <td >{{item.name}}</td>
          <td>&#8369;{{item.retail_price}}</td>
          <td>{{item.quantity}}</td>
          <td>{{perItemTax(item) | estimate}}</td>
          <td>{{perItemDiscount(item) | estimate}}</td>
          <td>{{ itemTotalTax(item) | estimate}}</td>
          <td>{{ itemTotalDiscount(item) | estimate}}</td>
          <td>{{ itemTotal(item) | estimate}}</td>
          <td>&#8369;</td>
        </tr>
      </tbody>
    </table>
      </div>
      <div class="col-xs">
       <div> Sub Total {{transaction.sub_total | estimate}}</div>
        <div>Tax {{transaction.tax | estimate}}</div>
        <div>Discount {{transaction.discount | estimate}}</div>
        <div> Total {{transaction.total | estimate}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      perItemTax(item) {
        return item.taxed ? item.retail_price * 0.065 : 0;
      },
      perItemDiscount(item) {
        return item.discounted ? item.retail_price * 0.012 : 0;
      },
      itemTotalTax(item) {
        let tax = this.perItemTax(item) * item.quantity;
        this.transaction.tax += tax;
        return tax;
      },
      itemTotalDiscount(item) {
        let discount = this.perItemDiscount(item) * item.quantity;
        this.transaction.discount += discount;
        return discount;
      },
      itemTotal(item) {
        let total = item.retail_price * item.quantity;
        this.transaction.sub_total += total;
        return total;
      },
    },
    data() {
        return {
            transaction: {
              total: 0,
              tax: 0,
              discount: 0,
              sub_total: 0,
            },
            transactionItems: [
              {
                  name: 'donat',
                  quantity: 10,
                  retail_price: 5,
                  discounted: false,
                  taxed: true,
              },
              {
                name: 'burger',
                quantity: 5,
                retail_price: 25,
                discounted: true,
                taxed: false,
              },
              {
                name: 'cheese stick',
                quantity: 20,
                retail_price: 2,
                discounted: true,
                taxed: true,
              },
              {
                name: 'hotdog',
                quantity: 15,
                retail_price: 11,
                discounted: true,
                taxed: true,
              },
              {
                name: 'egg',
                quantity: 2,
                retail_price: 6,
                discounted: true,
                taxed: true,
              },
            ]
        }
    }
  }
</script>
