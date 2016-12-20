<template>
  <div v-if="authEmployee && storedTransaction">
    <div class="row">
      <div class="col-xs-4">
        <template v-if="storedStore">
          <md-toolbar>
            <div class="md-toolbar-container">
              <div class="md-title" style="flex: 1;">
                Store: {{storedStore.name}}
              </div>
              <div class="md-subhead">
                Stocks ({{storesStocks | count}})
              </div>
              <md-button class="md-icon-button" @click="$refs.storesMenu.close()">
                <md-icon>close</md-icon>
              </md-button>
            </div>
          </md-toolbar>
          <div class="row center-xs">
            <md-button class="col-xs" @click="order = order == 'desc' ? 'asc' : 'desc'">{{order == 'desc' ?  'Oldest Stock' : 'Newest Stock'  }}
            </md-button>
            <md-button class="col-xs" @click="priceOrder = priceOrder == 'desc' ? 'asc' : 'desc'">{{priceOrder == 'desc' ? 'Lowest Price' : 'Highest Price'}}
            </md-button>
          </div>
          <md-input-container style="margin: 1rem;">
            <label>
              <md-icon>search</md-icon>
              Search
            </label>
            <md-input ref="searchInput" v-model="search"></md-input>
          </md-input-container>

          <transition enter-active-class="animated bounceInRight"
                      leave-active-class="animated bounceOutRight">
            <div v-if="search">
              <md-button style="width: 95%" class="md-raised md-warn" @click="search = ''">
                Reset Search
              </md-button>
            </div>
          </transition>
          <md-list>
            <transition mode="out-in"
                        enter-active-class="animated bounceInRight"
                        leave-active-class="animated bounceOutRight">
              <transition-group v-if="storesStocks.length" name="stores"
                                enter-active-class="animated bounceInRight"
                                leave-active-class="animated bounceOutRight">

                <md-list-item class="md-triple-line"
                              v-for="{stock,store,item} in sortByPrice"
                              :key="stock['.key']">
                  <md-avatar>
                    <vue-image :image="item.image_url" alt="Item"/>
                  </md-avatar>

                  <div class="md-list-text-container">
                    <span>{{item.name | capitalize }}</span>
                    <span>&#8369;{{stock.retail_price}}
                          <span style="color: red;" v-if="stock.taxed">(+{{stock.retail_price * storedStore.tax_rate | estimate}})</span>
                          <span style="color: teal;" v-if="stock.discounted">(-{{stock.retail_price * storedStore.discount_rate | estimate}} )</span>
                    </span>
                    <span>
                      {{stock.created_date | moment('from')}}
                    </span>
                  </div>

                  <md-button @click="addProductToTransaction({stock,store,item})" v-if="!(stock.quantity <= 0)"
                             class="md-icon-button md-list-action">
                    <md-icon>send</md-icon>
                  </md-button>
                  <span v-else>
                    Out of Stock
                  </span>

                </md-list-item>

              </transition-group>

              <md-list-item v-else class="md-title row middle-xs center-xs">No Stocks</md-list-item>



            </transition>

          </md-list>
        </template>
      </div>
      <div class="col-xs">
        <div class="row">
            <div class="col-xs md-subhead">
              Sub Total: {{storedTransaction.subtotal}}
            </div>
            <div class="col-xs md-subhead">
              Tax: {{storedTransaction.tax}}
            </div>
            <div class="col-xs md-subhead">
              Discount: {{storedTransaction.discount}}
            </div>
            <div class="col-xs md-subhead">
              Total: {{storedTransaction.total}}
            </div>
          <div class="col-xs">
            <md-button @click="pay">Pay</md-button>
          </div>
        </div>
        <md-table v-if="storedTransaction">
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
            <transaction-product
              v-for="({product,stock,item}, index) in storedTransactionProducts"
              :stock="stock"
              :product="product"
              :item="item"
              :store="storedStore"
              @updateTransaction="computeTransaction"
              :key="index">

            </transaction-product>
          </md-table-body>
        </md-table>
      </div>
    </div>

  </div>
  <display v-else message="No Transaction" :noloader="true"></display>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import TransactionProduct from './TransactionProduct.vue'
  export default {
    name: 'pos',
    components: {
      TransactionProduct
    },
    computed: {
      storesStocks() {
        let items = this.storedStoreStocksItems;
        let regExp;
        if (items && this.search) {
          regExp = new RegExp('^[A-Za-z0-9 -]*$','i');
          if(!regExp.test(this.search)) {
            this.addAlert({message: `Search input must not contain symbols`});
            this.search = '';
            this.$refs.searchInput.$el.value = '';
            return items;
          }
          regExp = new RegExp(`${this.search}`, 'i');
          items = _.filter(items, ({item}) => {
            return regExp.test(_.get(item, 'name'));
          })
        }
        return items;
      },
      sortByDate() {
        let items = this.storesStocks;

        if (items && this.order) {
          items = _.orderBy(items, ({stock}) => {
            return stock['created_date'];
          }, [this.order]);
        }

        return items;
      },
      sortByPrice() {
        let items = this.sortByDate;

        if (items && this.priceOrder) {
          items = _.orderBy(items, ({stock}) => {
            return stock['retail_price'];
          }, [this.priceOrder]);
        }

        return items;
      },
      ...mapGetters([
        'storedTransaction',
        'authEmployee',
        'storedStoreStocksItems',
        'storedTransactionProducts',
        'storedStore'
      ]),
    },
    data() {
      return {
        search: '',
        store: null,
        order: 'desc',
        priceOrder: 'desc',
      }
    },
    methods: {
      pay() {
        this.payTransaction(_.clone({
            products: this.storedTransactionProducts,
          store: this.storedStore,
          transaction: this.storedTransaction}));
        this.$router.push({name: 'employee', params: {username: this.authEmployee.username}});
        this.resetEverything();
      },
      productSubTotal(product,stock) {
        return product.quantity * stock.retail_price;
      },
      productUnitTax(stock,store) {
        return stock.taxed
          ? _.round(stock.retail_price
            * store.tax_rate)
          : 0;
      },
      productUnitDiscount(stock,store) {
        return stock.discounted
          ? _.round(stock.retail_price
            * store.discount_rate)
          : 0;
      },
      productTax(product) {
        return _.round(product.quantity * this.productUnitTax);
      },
      productDiscount(product) {
        return _.round(product.quantity * this.productUnitDiscount);
      },
      productTotal(stock) {
        return _.round((this.productSubTotal
          + (this.stock.taxed ? this.productTax : 0))
          - (this.stock.discounted ? this.productDiscount : 0))
      },
      computeTransaction() {
          this.storedTransaction.subtotal = _.sumBy(this.storedTransactionProducts,({stock,item,product}) => {
              return stock.retail_price * product.quantity;
          });
        this.storedTransaction.tax = _.sumBy(this.storedTransactionProducts,({stock,item,product}) => {
          return _.round(stock.taxed ? stock.retail_price * this.storedStore.tax_rate : 0);
        });
        this.storedTransaction.discount = _.sumBy(this.storedTransactionProducts,({stock,item,product}) => {
          return _.round(stock.discounted ? stock.retail_price * this.storedStore.discount_rate : 0);
        });
        this.storedTransaction.total =
          (this.storedTransaction.subtotal
          + this.storedTransaction.tax)
          - this.storedTransaction.discount;
      },
      ...mapActions([
        'updateTransaction',
        'addTransaction',
        'storeTransaction',
        'addAlert',
        'addProductToTransaction',
        'payTransaction',
        'resetEverything'
      ])
    }
  }
</script>
