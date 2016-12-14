<template>
  <transition mode="out-in"
              enter-active-class="animated bounceInRight"
              leave-active-class="animated bounceOutRight">
  <md-table-row >
    <md-table-cell>
      {{transactionKey}}
    </md-table-cell>
    <md-table-cell>
      {{transactionItem.stock}}
    </md-table-cell>
    <md-table-cell>
      <md-avatar>
        <vue-image :image="item.image_url" alt="Item"/>
      </md-avatar>
      {{item.name | capitalize}}
    </md-table-cell>
    <md-table-cell>
      &#8369;{{stock.retail_price}}
    </md-table-cell>
    <md-table-cell>
      {{transactionItem.quantity}}
      <md-button class="md-icon-button" v-show="this.stock.quantity" @click="incrementQuantity">
        <md-icon>add</md-icon>
      </md-button>

      <md-button class="md-icon-button" v-show="transactionItem.quantity" @click="decrementQuantity">
        <md-icon>remove</md-icon>
      </md-button>
      <span>
        Stocks: ({{stock.quantity}})
      </span>
    </md-table-cell>
    <md-table-cell>
      &#8369;{{transactionItem.subtotal}}
      <span v-if="stock.taxed">
         (+{{transactionItem.tax}})
      </span>
      <span v-if="stock.discounted">
         (-{{transactionItem.discount }})
      </span>
    </md-table-cell>
    <md-table-cell>
      <md-button class="md-icon-button" @click="buyAll" v-if="stock.quantity">
        <md-icon>reply</md-icon>
      </md-button>
      <md-button class="md-icon-button" @click="removeItem">
        <md-icon>delete</md-icon>
      </md-button>
    </md-table-cell>
  </md-table-row>
  </transition>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'transaction-item',
    props: ['transactionItem', 'item', 'stock', 'transactionKey', 'transaction','store'],
    methods: {
        removeItem() {
          this.stock.quantity += this.transactionItem.quantity;
          _.unset(this.transaction.items,this.transactionKey);
          this.recomputeTransaction();
        },
      ...mapActions([
          'updateTransaction',
          'updateStock',
      ]),
      keyPress() {
        console.log(event);
      },
      recomputeTransaction() {
        this.transactionItem.subtotal = _.round(this.transactionItem.quantity * this.stock.retail_price);
        this.transactionItem.tax = this.stock.taxed
          ? _.round(this.transactionItem.subtotal * this.store.tax_rate)
          : 0;
        this.transactionItem.discount = this.stock.discounted
          ? _.round(this.transactionItem.subtotal * this.store.discount_rate)
          : 0;
        this.updateStock(this.stock);
        this.$emit('reUpdateTransaction');
      },
      incrementQuantity() {
        this.transactionItem.quantity++;
        this.stock.quantity--;
        this.recomputeTransaction();
      },
      decrementQuantity() {
        this.transactionItem.quantity--;
        this.stock.quantity++;
        this.recomputeTransaction();
        if(this.transactionItem.quantity == 0) {
            this.removeItem();
        }
      },
      buyAll() {
        this.transactionItem.quantity = this.stock.quantity;
        this.stock.quantity = 0;
        this.recomputeTransaction();

      }
    },
  }
</script>
