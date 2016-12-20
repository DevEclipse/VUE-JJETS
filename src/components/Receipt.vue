<template>
    <div v-if="storedTransaction && storedProducts && storedStore">
    <div class="md-display-2">
      
    </div>
    <div class="md-display-1">

    </div>
    <md-table>
          <md-table-header>
            <md-table-row>
              <md-table-head>Stock Id</md-table-head>
              <md-table-head>Item</md-table-head>
              <md-table-head>Retail Price</md-table-head>
              <md-table-head>Quantity</md-table-head>
              <md-table-head>Item Total</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="product in storedProducts">
                <md-table-cell>{{product.stock}}</md-table-cell>
                <md-table-cell>{{product.item}}</md-table-cell>
                <md-table-cell>{{product.price}}</md-table-cell>
                <md-table-cell>{{product.quantity}}</md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table
        </div>
</template>

<script>
    export default {
        name: 'receipt',
        computed: {
            ...mapGetters([
                'storedProducts',
                'storedTransaction',
                'storedStore'
            ])
        }
    }
</script>