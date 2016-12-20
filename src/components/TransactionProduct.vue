<template>
  <md-table-row>
    <md-table-cell>{{stock['.key']}}</md-table-cell>
    <md-table-cell>{{item.name}}</md-table-cell>
    <md-table-cell>
      {{stock.retail_price}}
      <span v-if="stock.taxed" style="color: teal;">
              (+{{productUnitTax}})
            </span>
      <span v-if="stock.discount" style="color: red;">
              (-{{productUnitDiscount}})
            </span>
    </md-table-cell>
    <md-table-cell>
      {{product.quantity}}
    </md-table-cell>
    <md-table-cell>
      {{productTotal}} = {{productSubTotal}}
      <span style="color: teal">
              (+{{productTax}})
            </span>
      <span style="color: red;">
              (-{{productDiscount}})
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
        return this.stock.taxed 
        ? _.round(this.stock.retail_price
        * this.store.tax_rate) 
        : 0;
      },
      productUnitDiscount() {
        return this.stock.discounted 
        ? _.round(this.stock.retail_price 
        * this.store.discount_rate)
        : 0;
      },
      productTax() {
        return _.round(this.product.quantity * this.productUnitTax);
      },
      productDiscount() {
        return _.round(this.product.quantity * this.productUnitDiscount);
      },
      productTotal() {
        return _.round((this.productSubTotal
        + (this.stock.taxed ? this.productTax : 0)) 
        - (this.stock.discounted ? this.productDiscount : 0))
      }
    }
  }
</script>
