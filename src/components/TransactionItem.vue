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
      {{item.name | capitalize}}
    </md-table-cell>
    <md-table-cell>
      &#8369;{{stock.retail_price}}

    </md-table-cell>
    <md-table-cell>
      <md-input-container v-if="transaction.status == 'Processing'
                || transaction.status == 'Editing'">
        <label>({{stock.quantity}})</label>
        <md-input v-model="transactionItem.quantity" min="0"  :key="transactionKey" :maxlength="stock.quantity.length"
                  :max="stock.quantity <= 0 ? transactionItem.quantity - stock.quantity : stock.quantity" @input="quantityChanged"
                  type="number"></md-input>
      </md-input-container>
      <span v-else>
        {{item.quantity}}
       </span>
    </md-table-cell>
    <md-table-cell>
      &#8369;{{(stock.retail_price * transactionItem.quantity) | estimate}}
    </md-table-cell>
    <md-table-cell>
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
    props: ['transactionItem', 'item', 'stock', 'transactionKey', 'transaction'],
    data() {
      return {
          oldQuantity: 0,
          quantity: 0,
      }
    },
    methods: {
        removeItem() {
          _.unset(this.transaction.items,this.transactionKey);
          this.updateTransaction(this.transaction);
        },
      ...mapActions([
          'updateTransaction'
      ]),
      quantityChanged(event) {
          this.oldQuantity =  this.oldQuantity != this.quantity ? event : this.oldQuantity;
          this.quantity = event;
          let delta = this.oldQuantity - this.quantity;
        console.log(this.oldQuantity,this.quantity,delta);
          console.log(delta);
          this.stock.quantity += delta;
      }
    },
    watch: {
      transactionItem(oldVal, newVal,asd) {
        console.log(oldVal.quantity, newVal.quantity,asd);
      }
    }
  }
</script>
