<template>
  <display v-if="!currentTransaction" message="No Transaction In Process"/>
  <div v-else>
    <md-dialog ref="checkOutDialog">
      <md-dialog-content style="padding: 0;">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title">Check Out</div>
          </div>
        </md-toolbar>
        <div style="padding: 1rem;">
          <multiselect :options="allCustomers | keys"
                       v-model="currentTransaction.customer"
                       :searchable="true"
                       :hide-selected="true"
                       placeholder="Search Customer"></multiselect>
        </div>
        <div style="padding: 1rem;">
          <md-input-container>
            <label>Amount</label>
            <md-input v-model="amount" type="number" :min="currentTransaction.total"></md-input>
          </md-input-container>
        </div>
      </md-dialog-content>
      <md-dialog-actions>

        <md-button class="md-raised md-primary" v-show="amount >= currentTransaction.total" @click="checkOut">
          <md-icon>edit</md-icon>
          Check Out
        </md-button>
        <md-button class="md-raised md-warn" @click="$refs.checkOutDialog.close();">
          <md-icon>block</md-icon>
          Cancel
        </md-button>
      </md-dialog-actions>
    </md-dialog>
    <md-dialog ref="stockInfo">
      <template v-if="storedStock">
      <md-toolbar>
        <div class="md-toolbar-container">
          <div class="md-title">Stock {{storedStockItem.name | capitalize}}</div>
        </div>
      </md-toolbar>
      </template>
      <md-dialog-content>

      </md-dialog-content>
    </md-dialog>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">Transaction: <span class="md-caption">
          {{currentTransaction['.key']}}
        </span></div>
        <md-button v-if="currentTransaction.items && (currentTransaction.status == 'Processing' || currentTransaction.status == 'Editing')" @click="checkOutAmount">
          <md-icon>payment</md-icon>
          Check Out
        </md-button>
        <md-button v-if="!currentTransaction.items" @click="deleteTransaction(currentTransaction)">
          <md-icon>block</md-icon> Cancel Transaction
        </md-button>
        <router-link tag="md-button" :to="{name: 'receipt', params: {transaction: currentTransaction['.key']}}" v-else>
          <md-icon>receipt</md-icon>
          Receipt
        </router-link>
      </div>
    </md-toolbar>
    <md-button  v-if="currentTransactionStocks && (currentTransaction.status == 'Processing' || currentTransaction.status == 'Editing')" class="md-fab md-mini md-fab-bottom-right"
               style="position: fixed; z-index: 3;"
               @click="$refs.storeStocksMenu.toggle()">
      <md-icon>add</md-icon>
    </md-button>
    <md-sidenav class="md-fixed md-right" ref="storeStocksMenu">

        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title">
              {{currentTransactionStore.name | capitalize}} Stocks
            </div>
          </div>
        </md-toolbar>
        <md-input-container>
          <label>
            <md-icon>search</md-icon>
            Search Store Item
          </label>
          <md-input v-model="search"></md-input>
        </md-input-container>
        <md-list>

          <div v-if="filterStocks">
            <transition-group enter-active-class="animated bounceInRight"
                              leave-active-class="animated bounceOutRight">

              <md-list-item v-for="stock in filterStocks" :key="stock['.key']">
                <md-avatar>
                  <vue-image :image="findItem(stock.item).image_url" alt="No Stock Image"/>
                </md-avatar>
                <div class="md-list-text-container">
                          <span>
                            Item: {{findItem(stock.item).name | capitalize }}
                          </span>
                  <span>
                            Retail Price: &#8369;{{stock.retail_price}}
                          </span>
                  <span>
                            Stock: {{stock.quantity || 'Out of Stock' }}
                          </span>
                </div>

                <md-button v-if="stock.quantity" class="md-icon-button md-list-action"
                           @click="addTransactionItem(stock)">
                  <md-icon>add</md-icon>
                </md-button>

                <md-button v-if="stock.quantity" class="md-icon-button md-list-action"
                           @click="addTransactionItem(stock,true)">
                  <md-icon>send</md-icon>
                </md-button>

              </md-list-item>

            </transition-group>
          </div>

          <div v-else>
            <md-list-item>
              No Items
            </md-list-item>
          </div>
        </md-list>

    </md-sidenav>
    <div v-if="authEmployee">


        <md-toolbar class="md-accent md-large">
          <div class="md-toolbar-container">
            <div class="md-subhead" style="flex: 1;">
              Store: {{currentTransactionStore.name | capitalize}}
            </div>
            <div class="md-subhead" style="flex: 1;">
              Employee: {{(currentTransaction.employee || 'No Employee') | capitalize}}
            </div>
            <div class="md-subhead">
              Customer: {{(currentTransaction.customer || 'Anonymous') | capitalize}}
            </div>
          </div>
          <div class="md-toolbar-container">
            <div class="md-subhead" style="flex: 1;">
              Status: {{currentTransaction.status}}
            </div>
            <div class="md-subhead" style="flex: 1;">
              Created: {{currentTransaction.created_date | moment("from")}}
            </div>
            <div class="md-subhead">
              Updated: {{currentTransaction.updated_date | moment("from")}}
            </div>
          </div>
        </md-toolbar>
        <md-card md-with-hover>
          <md-table-card>
            <md-table>
              <md-table-header>
                <md-table-row>
                  <md-table-head>Item</md-table-head>
                  <md-table-head>Retail Price</md-table-head>
                  <md-table-head>Quantity</md-table-head>
                  <md-table-head>Item Total</md-table-head>
                  <md-table-head>
                    Configuration
                  </md-table-head>
                </md-table-row>
              </md-table-header>
              <md-table-body v-if="currentTransaction.items && currentTransactionStocks">
                <md-table-row v-for="item in currentTransaction.items">
                  <md-table-cell>

                    {{item.name | capitalize}}

                  </md-table-cell>
                  <md-table-cell>
                    &#8369;{{item.retail_price}}
                  </md-table-cell>
                  <md-table-cell>
                    <md-input-container v-if="currentTransaction.status == 'Processing'
                                        || currentTransaction.status == 'Editing'">
                      <md-input :value="item.quantity" min="0" @blur.native="quantityChange(item,$event.target)"
                                type="number"></md-input>
                    </md-input-container>
                    <span v-else>
                      {{item.quantity}}
                    </span>
                  </md-table-cell>
                  <md-table-cell>
                    &#8369;{{item.retail_price * item.quantity}}
                  </md-table-cell>
                  <md-table-cell>
                    <md-button v-if="currentTransaction.status == 'Processing' || currentTransaction.status == 'Editing'" class="md-icon-button" @click="removeItem(item)">
                      <md-icon>delete</md-icon>
                    </md-button>
                    <md-button class="md-icon-button" @click="() => {storeStock(findStock(item.stock))}">
                      <md-icon>info</md-icon>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell></md-table-cell>
                  <md-table-cell></md-table-cell>
                  <md-table-cell>Sub Total:</md-table-cell>
                  <md-table-cell>&#8369;{{currentTransaction.subtotal}}</md-table-cell>
                  <md-table-cell>Total: &#8369;{{currentTransaction.total}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell></md-table-cell>
                  <md-table-cell></md-table-cell>
                  <md-table-cell>Tax:</md-table-cell>
                  <md-table-cell>&#8369;{{currentTransaction.tax}}</md-table-cell>
                  <md-table-cell>Amount: &#8369;{{currentTransaction.amount}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell></md-table-cell>
                  <md-table-cell></md-table-cell>
                  <md-table-cell>Discount:</md-table-cell>
                  <md-table-cell>&#8369;{{currentTransaction.discount}}</md-table-cell>
                  <md-table-cell>Change: &#8369;{{currentTransaction.change}}</md-table-cell>
                </md-table-row>
              </md-table-body>
            </md-table>
          </md-table-card>
        </md-card>

    </div>
  </div>

</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'transaction',
    computed: {
      filterStocks() {
        let stocks = this.currentTransactionStocks;
        if (stocks && this.search) {
          let regExp = new RegExp(this.search, 'i');
          stocks = _.filter(stocks, stock => {

            let item = this.findItem(stock.item);
            return regExp.test(item.name);
          })
        }
        return stocks;
      },
      ...mapGetters([
        'currentTransaction',
        'currentTransactionStore',
        'currentTransactionStocks',
        'authEmployee',
        'authUser',
        'allItems',
        'allCustomers',
        'storedStockItem',
        'storedStock'
      ])
    },
    data() {
      return {
        search: '',
        lastValue: '',
        decrementBy: '',
        amount: 0,
      }
    },
    methods: {
      findItem(item) {
        return _.find(this.allItems, ['.key', item]);
      },
      findStock(stock) {
        return _.find(this.currentTransactionStocks, ['.key', stock]);
      },
      addTransactionItem(item, all) {
        if (!this.currentTransaction.items) {
          this.currentTransaction.items = {};
        }
        if (!this.currentTransaction.items[item['.key']]) {
          this.currentTransaction.items[item['.key']] = {
            quantity: 0,
            stock: item['.key'],
            retail_price: item.retail_price,
            name: this.findItem(item.item).name
          }
        }
        if (all) {
          this.currentTransaction.items[item['.key']].quantity += item.quantity;
          item.quantity = 0;
        } else {
          item.quantity -= 1;
          this.currentTransaction.items[item['.key']].quantity++;
        }
        this.reUpdateTransaction();
        this.updateStock(item);
      },
      ...mapActions([
        'updateTransaction',
        'updateStore',
        'updateStock',
        'deleteTransaction',
        'storeStock'
      ]),
      removeItem(item) {
        let stock = this.findStock(item.stock);
        stock.quantity += item.quantity;
        this.updateStock(stock);
        delete this.currentTransaction.items[item.stock];
        this.reUpdateTransaction();
      },
      quantityChange(item, target) {
        let quantity = parseInt(target.value);
        let stock = this.findStock(item.stock);
        let oldStockQuantity = stock.quantity;
        stock.quantity += item.quantity - quantity;
        console.log(oldStockQuantity,stock.quantity);
        if(stock.quantity < 0) {
          target.value = quantity = item.quantity + oldStockQuantity;
          stock.quantity = 0;
        }
        item.quantity = quantity;
        this.reUpdateTransaction();
        this.updateStock(stock);
      },
      reUpdateTransaction(){
        let subTotal = 0;
        _.forEach(this.currentTransaction.items, item => {
          subTotal += item.retail_price * parseInt(item.quantity);
        });
        let taxedItems = _.filter(this.currentTransaction.items, item => {
          return this.findStock(item.stock).taxed;
        });
        this.currentTransaction.tax = _.round(_.sumBy(taxedItems, item => {
            return item.retail_price * parseInt(item.quantity);
          }) * this.currentTransactionStore.tax_rate, 2);
        let discountedItems = _.filter(this.currentTransaction.items, item => {
          return this.findStock(item.stock).discounted;
        });
        this.currentTransaction.discount = _.round(_.sumBy(discountedItems, item => {
            return item.retail_price * parseInt(item.quantity);
          }) * this.currentTransactionStore.discount_rate, 2);
        this.currentTransaction.subtotal = _.round(subTotal, 2);
        this.currentTransaction.amount = this.amount;
        this.currentTransaction.change = this.currentTransaction.amount - this.currentTransaction.total < 0 ? 0 : this.currentTransaction.amount - this.currentTransaction.total;
        this.currentTransaction.total = (this.currentTransaction.subtotal + this.currentTransaction.tax) - this.currentTransaction.discount;
        this.updateTransaction(this.currentTransaction);
      },
      checkOutAmount() {
        this.amount = _.clone(this.currentTransaction.amount);
        this.$refs.checkOutDialog.open();
      },
      checkOut() {
        if(!this.currentTransaction.expiration_date) {
          let date = new Date(this.currentTransaction.created_date);
          date.setDate(date.getDate() + 1);
          this.currentTransaction.expiration_date = date;
        }
        this.currentTransaction.assigned = this.authEmployee['.key'];
        this.currentTransaction.status = this.currentTransaction.status == 'Processing' ? 'Processed' : 'Edited';
        this.reUpdateTransaction();
        this.$refs.checkOutDialog.close();
      }
    },
  }
</script>
