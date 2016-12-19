<template>
  <md-table-row>
    <md-table-cell>{{stock['.key']}}</md-table-cell>
    <md-table-cell>{{item.name}}</md-table-cell>
    <md-table-cell>
      {{stock.retail_price}}
      <span v-if="stock.taxed" style="color: red;">
              (+{{(stock.retail_price * storedTransaction.store.tax_rate) | estimate}})
            </span>
      <span v-if="stock.discount" style="color: teal;">
              (+{{(stock.retail_price * storedTransaction.store.discount_rate) | estimate}})
            </span>
    </md-table-cell>
    <md-table-cell>
      {{product.quantity}}
    </md-table-cell>
    <md-table-cell>
      {{(stock.retail_price * product.quantity) | estimate}}
      <span v-if="stock.taxed" style="color: red;">
              (+{{(stock.retail_price * storedTransaction.store.tax_rate * product.quantity) | estimate}})
            </span>
      <span v-if="stock.discount" style="color: teal;">
              (+{{(stock.retail_price * storedTransaction.store.discount_rate * product.quantity) | estimate}})
            </span>
    </md-table-cell>
    <md-table-cell>
      {{(stock.retail_price * product.quantity) | estimate}}
      <span v-if="stock.taxed" style="color: red;">
              (+{{(stock.retail_price * storedTransaction.store.tax_rate * product.quantity) | estimate}})
            </span>
      <span v-if="stock.discount" style="color: teal;">
              (+{{(stock.retail_price * storedTransaction.store.discount_rate * product.quantity) | estimate}})
            </span>
    </md-table-cell>

  </md-table-row>
</template>

<script>
  export default {
    name: 'transaction-product',
    props: ['stock','item','product','store'],
    computed: {
      productSubTotal() {
        return this.product.quantity * this.stock.retail_price;
      },
      productUnitTax() {
        return this.product.quantity * this.stock.retail_price;
      },
      productUnitDiscount() {
        return this.product.quantity * this.stock.retail_price;
      },
      productTax() {
        return this.product.quantity * this.stock.retail_price;
      },
      productDiscount() {
        return this.product.quantity * this.stock.retail_price;
      },
    }
  }
</script>
