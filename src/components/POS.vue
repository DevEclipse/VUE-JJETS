<template>
  <div>
    Hehe
    <div v-if="employeeStore">
    <nav class="nav-wrapper teal">
    <v-container v-if="transaction">
      Total: {{ transaction.total }}
      Amount: {{ transaction.amount }}
      Change: {{ transaction.total - transaction.amount }}
      <!--Tax: {{ newTransaction.total * bstore.tax_rate || 0 }}-->
      <!--Discount: {{ newTransaction.total * bstore.discount_rate  || 0}}-->
      <!--Discounted Total: {{ newTransaction.total - (newTransaction.total * bstore.discount_rate || 0) }}-->
    </v-container>
    </nav>
    <v-row v-if="transaction">
      <v-grid s12 m2 l6>
        <h5> Store Items </h5>
        <v-collection v-if="$store.getters.managerStoreItems.items">
          <v-collection-item v-for="item in $store.getters.managerStoreItems.items">
             <span> Name: </span> {{item.name}}
             <span> Retail Price:</span> {{item.retail_price}}
             <span> On Stock: </span> {{item.quantity}}
             <span> Store Owner: </span> {{item.store}}
            <span slot="secondary" @click="addThisItem(item)"><v-icon>send</v-icon></span>
          </v-collection-item>
        </v-collection>
      </v-grid>
    </v-row>
  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ['transaction'],
    computed: {
      ...mapGetters([
        'currentEmployee',
        'employeeStore'
      ])
    },
    data() {
      return{
        newTransactionItem: {
          name: '',
          retail_price: '',
          quantity: '',
          status: '',
          subtotal: 0,
        },
        nav: {
          edge: 'right',
        },
      }
    },
    methods: {
      addThisItem(item) {
         // this.newTransactionItem.name = item.name;
         // this.$root.addTransactionItem(this.transaction['.key'],this.newTransactionItem,this.store['.key'],item.quantity)
      },
    },

  }
</script>
