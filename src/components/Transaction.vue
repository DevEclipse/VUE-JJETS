<template>
  <display v-if="!currentTransaction" message="Create a Transaction"/>
  <div v-else>
    <md-dialog ref="checkOutDialog">
      <md-dialog-content style="padding: 0;">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title">Check Out</div>
          </div>
        </md-toolbar>
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
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">Transaction: {{currentTransaction['.key']}}</div>
        <md-button  v-if="currentTransaction.status == 'Processing'"  @click="checkOutAmount">
          <md-icon>payment</md-icon>
          Check Out
        </md-button>
        <router-link tag="md-button" :to="{name: 'receipt', params: {transaction: currentTransaction['.key']}}" v-else>
          <md-icon>receipt</md-icon> Receipt
        </router-link>
      </div>
    </md-toolbar>

    <div class="row" v-if="authEmployee">
      <div v-if="currentTransactionStocks && currentTransaction.status == 'Processing' || currentTransaction.status == 'Returning'" class="col-xs-12 col-md-4">
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
      </div>
      <div class="col-xs-12 col-md">
        <md-toolbar class="md-accent md-large">
          <div class="md-toolbar-container">
            <div class="md-subhead" style="flex: 1;">
             Employee: {{(currentTransaction.employee || 'No Employee') | capitalize}}
            </div>
            <div class="md-subhead" style="flex: 1;">
             Customer: {{(currentTransaction.customer || 'Anonymous') | capitalize}}
          </div>
            <md-input-container>
              <label>Decrement By</label>
              <md-select v-model="decrementBy">
                <md-option :value="n" v-if="n % 10 == 0" v-for="n in 50">{{n}}</md-option>
              </md-select>
            </md-input-container>
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
                  <md-table-head v-if="currentTransaction.status == 'Processing' || currentTransaction.status == 'Returning'">Configuration</md-table-head>
                </md-table-row>
              </md-table-header>
              <md-table-body v-if="currentTransaction.items">
                <md-table-row v-for="item in currentTransaction.items">
                  <md-table-cell>

                    {{item.name | capitalize}}

                  </md-table-cell>
                  <md-table-cell>
                    &#8369;{{item.retail_price}}
                  </md-table-cell>
                  <md-table-cell>
                    {{item.quantity}}
                  </md-table-cell>
                  <md-table-cell>
                    &#8369;{{item.retail_price * item.quantity}}
                  </md-table-cell>
                  <md-table-cell v-if="currentTransaction.status == 'Processing' || currentTransaction.status == 'Returning'">
                    <md-button v-if="item.quantity > decrementBy" class="md-icon-button" @click="deductQuantity(item)">
                      <md-icon>remove</md-icon>
                    </md-button>
                    <md-button class="md-icon-button" @click="removeItem(item)">
                      <md-icon>delete</md-icon>
                    </md-button>
                  </md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell></md-table-cell>
                  <md-table-cell></md-table-cell>
                  <md-table-cell>Sub Total: </md-table-cell>
                  <md-table-cell>&#8369;{{currentTransaction.subtotal}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell></md-table-cell>
                  <md-table-cell></md-table-cell>
                  <md-table-cell>Tax: </md-table-cell>
                  <md-table-cell>&#8369;{{currentTransaction.tax}}</md-table-cell>
                </md-table-row>
                <md-table-row>
                  <md-table-cell></md-table-cell>
                  <md-table-cell></md-table-cell>
                  <md-table-cell>Discount: </md-table-cell>
                  <md-table-cell>&#8369;{{currentTransaction.discount}}</md-table-cell>
                </md-table-row>
              </md-table-body>
            </md-table>
          </md-table-card>
          <md-card-media-actions>
          <span>Total: &#8369;{{currentTransaction.total}}</span>
          <span>Amount: &#8369;{{currentTransaction.amount}}</span>
          <span>Change: &#8369;{{currentTransaction.change}}</span>
          </md-card-media-actions>
        </md-card>

      </div>
    </div>
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
        'serverTime'
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
          this.currentTransaction.items[item['.key']].quantity += 1;
        }
        this.reUpdateTransaction();
        this.updateStock(item);
      },
      deductQuantity(item) {
        let stock = this.findStock(item.stock);
        item.quantity -= this.decrementBy || 1;
        stock.quantity += this.decrementBy || 1;
        this.reUpdateTransaction();
        this.updateStock(stock);
      },
      ...mapActions([
        'updateTransaction',
        'updateStore',
        'updateStock',
      ]),
      removeItem(item) {
        let stock = this.findStock(item.stock);
        stock.quantity += item.quantity;
        this.updateStock(stock);
        delete this.currentTransaction.items[item.stock];
        this.reUpdateTransaction();
      },
      reUpdateTransaction(){
        let subTotal = 0;
        _.forEach(this.currentTransaction.items, item => {
          subTotal += item.retail_price * parseInt(item.quantity);
        });
        let taxedItems = _.filter(this.currentTransaction.items, item => {
          console.log(item);
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
        this.currentTransaction.status = 'Processed';
        this.currentTransaction.expiration_date = this.serverTime.addDays(7);
        this.reUpdateTransaction();
        this.$refs.checkOutDialog.close();
      }
    }
  }
</script>
