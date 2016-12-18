<template>
  <div v-if="authCustomer">
    <main-dialog ref="mainDialog"
                 :type="dialogType"
                 :valid="true"
                 @close="closeDialog"
                 @cancel="cancelDialog">

      <template v-if="storeCart">
        <div>
          Are you sure that you wanted to Check out from {{storeCart.store.name}}?
          <div class="md-title">
            Checkout Data:
          </div>
          <md-list class="md-triple-line">
            <md-list-item v-for="{stock,product,item} in storeCart.cartItems" :key="stock['.key']">
              <md-avatar>
                <vue-image :image="item.image_url" alt="Item"/>
              </md-avatar>
              <div class="md-list-text-container">
                      <span>{{item.name | capitalize }}
                         (QTY: {{product.quantity}})
                      </span>
                <span>&#8369;{{stock.retail_price}} </span>
                <span>Item Total: &#8369;{{product.quantity * stock.retail_price}}</span>
                <span style="color: red;" v-if="stock.taxed">(+{{product.quantity * stock.retail_price * storeCart.store.tax_rate | estimate}})</span>
                <span style="color: teal;" v-if="stock.discounted">(-{{product.quantity * stock.retail_price * storeCart.store.discount_rate | estimate}} )</span>
              </div>
            </md-list-item>
          </md-list>
          <div class="md-subheader">
            Sub Total: {{storeCartSubTotal}}
          </div>
          <div class="md-subheader">
            Tax: {{storeCartTax}}
          </div>
          <div class="md-subheader">
            Discount {{storeCartDiscount}}
          </div>
          <div class="md-subheader">
            Total: ({{storeCartSubTotal}} + {{storeCartTax}}) - {{storeCartDiscount}} = {{storeCartTotal}}
          </div>
        </div>
      </template>
    </main-dialog>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">
          {{authCustomer.username | capitalize}}
        </div>
        <span class="hidden-xs">
          <router-link tag="md-button" :to="{name: 'items'}">
            <md-icon>shop</md-icon>
            Items ({{allItems | count}})
          </router-link>
          <router-link tag="md-button" :to="{name: 'stores'}">
            <md-icon>store</md-icon>
            Stores ({{allStores | count}})
          </router-link>
          <router-link tag="md-button" :to="{name: 'transactions'}">
            <md-icon>receipt</md-icon>
            Transactions ({{currentCustomerTransactions | count}})
          </router-link>
          <md-button @click="$refs.cartItems.toggle()">
            <md-icon>shopping_cart</md-icon>
            Cart Stores ({{storedCart.length}})
          </md-button>
        </span>
        <span class="visible-xs">
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'items'}">
            <md-icon>shop</md-icon>
          </router-link>
          ({{allItems | count}})
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'stores'}">
            <md-icon>store</md-icon>
          </router-link>
           ({{allStores | count}})
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'transactions'}">
            <md-icon>receipt</md-icon>
          </router-link>
          ({{currentCustomerTransactions | count}})
          <md-button @click="$refs.cartItems.toggle()" class="md-icon-button">
            <md-icon>shopping_cart</md-icon> ({{storedCart.length}})
          </md-button>

        </span>
      </div>
    </md-toolbar>
    <md-sidenav class="md-fixed md-left" ref="cartItems">
      <md-toolbar>
        <div class="md-toolbar-container">
          <div class="md-subhead" style="flex: 1;">
            Cart Stores
            <div class="md-subhead">
              (&#8369;{{cartTotalPrice}})
            </div>
          </div>

          <md-button class="md-icon-button" @click="$refs.cartItems.close()">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </md-toolbar>
      <md-list>

        <transition mode="out-in"
                    enter-active-class="animated bounceInRight"
                    leave-active-class="animated bounceOutRight">

            <transition-group v-if="storedCart.length" name="cart"
                              enter-active-class="animated bounceInRight"
                              leave-active-class="animated bounceOutRight">

              <md-list-item v-for="({store,cartItems},storeIndex) in storedCart" :key="store['.key']">

                <md-icon>store</md-icon>
                <div class="md-list-text-container">
                  <span>{{store.name}} ({{cartItems | count}})</span>
                  <span>{{store['.key']}}</span>

                </div>
                <md-list-expand>
                  <md-list>
                    <md-subheader>Store Items</md-subheader>
                    <md-list-item>
                      Check Out ({{cartItems | count}})
                      <md-button @click="openDialog('payment',{store,cartItems})" class="md-icon-button">
                      <md-icon>payment</md-icon>
                    </md-button>
                      <span style="flex: 1;"></span>
                      Total: (&#8369;{{totalPrice(cartItems)}})
                    </md-list-item>
                    <transition-group mode="out-in" name="cart-items"
                                      enter-active-class="animated bounceInRight"
                                      leave-active-class="animated bounceOutRight">
                      <md-list-item class="md-triple-line"
                                    v-for="({item,stock,product},stockIndex) in cartItems"
                                    :key="stock['.key']">

                        <md-avatar>
                          <vue-image :image="item.image_url" alt="Item"/>
                        </md-avatar>
                        <div class="md-list-text-container">
                      <span>{{item.name | capitalize }}
                        (QTY: {{stock.quantity}})
                      </span>
                          <span>&#8369;{{stock.retail_price}} </span>
                          <span>Item Total: ({{product.quantity}}) &#8369;{{product.quantity * stock.retail_price}}</span>
                          <span style="color: red;" v-if="stock.taxed">(+{{product.quantity * stock.retail_price * store.tax_rate | estimate}})</span>
                          <span style="color: teal;" v-if="stock.discounted">(-{{product.quantity * stock.retail_price * store.discount_rate | estimate}} )</span>
                        </div>

                        <md-button v-if="stock.quantity"
                                   @click="increaseCartItem({storeIndex,stockIndex})"
                                   class="md-icon-button md-list-action">
                          <md-icon>add</md-icon>
                        </md-button>
                        <md-button v-if="product.quantity"
                                   @click="decreaseCartItem({storeIndex,stockIndex})"
                                   class="md-icon-button md-list-action">
                          <md-icon>remove</md-icon>
                        </md-button>
                        <md-button class="md-icon-button md-list-action"
                                   @click="removeCartItem({storeIndex,stockIndex})">
                          <md-icon>delete</md-icon>
                        </md-button>
                      </md-list-item>
                    </transition-group>
                  </md-list>
                </md-list-expand>
              </md-list-item>

            </transition-group>

            </md-list-item>



          <md-list-item v-else>
            <span class="md-title" align="center">
              No Cart Stores
            </span>
          </md-list-item>
        </transition>

      </md-list>
    </md-sidenav>
    <transition enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutRight" mode="out-in">
      <router-view></router-view>
    </transition>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'customer',
    props: ['authCustomer'],
    computed: {
      storeCartTotal() {
        return (this.storeCartSubTotal + this.storeCartTax) - this.storeCartDiscount;
      },
      storeCartSubTotal() {
       return _.sumBy(this.storeCart.cartItems, ({stock, product}) => {

         return _.round(stock.retail_price * product.quantity);

        });
      },
      storeCartTax() {
        return _.sumBy(this.storeCart.cartItems, ({stock, product}) => {

          return stock.taxed ? _.round(stock.retail_price * product.quantity * this.storeCart.store.tax_rate,2) : 0;

        }) || 0;
      },
      storeCartDiscount() {
        return _.sumBy(this.storeCart.cartItems, ({stock, product}) => {

          return stock.discounted ? _.round(stock.retail_price * product.quantity * this.storeCart.store.discounted,2) : 0;

        }) || 0;
      },
      cartTotalPrice() {
        let sum = 0;
        _.forEach(this.storedCart, ({cartItems}) => {
          sum += this.totalPrice(cartItems)
        });
        return sum;
      },
      ...mapGetters([
        'storedCart',
        'allItems',
        'allStores',
        'currentCustomerTransactions'
      ])
    },
    data() {
      return {
        selectedStore: null,
        storeCart: null,
        dialogType: 'payment'
      }
    },
    methods: {
      totalPrice(cartItems) {
        return _.sumBy(cartItems, ({stock, product}) => {
          return stock.retail_price * product.quantity;
        })
      },
      openDialog(action,{store,cartItems}) {
        this.dialogType = action;
        this.storeCart = {store,cartItems};
        this.$refs.mainDialog.openDialog();
        this.addAlert({message: `Checking Out Cart... ${store.name}`})
      },
      closeDialog() {
        if (this.dialogType == 'payment') {
          this.checkOutCart(this.storeCart);
          this.addAlert({message: ` ${this.storeCart.store.name} Cart Items Checked Out`})
        }
      },
      cancelDialog() {
        this.addAlert({message: `Checkout Cancelled`});;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
        this.storeCart = null;
      },
      ...mapActions([
        'removeToCart',
        'increaseCartItem',
        'decreaseCartItem',
        'removeCartItem',
        'checkOutCart',
        'addAlert'
      ])
    },
    mounted() {
      if(this.authCustomer)
      this.$router.push({name: 'customer',params: {username: this.authCustomer.username}});
    },
  }
</script>

<style>
  .cart-move {
    transition: all 1s;
  }
  .cart-items-move {
    transition: all 1s;
  }
</style>
