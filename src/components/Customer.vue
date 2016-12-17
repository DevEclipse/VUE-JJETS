<template>
  <div v-if="authCustomer">
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">
          {{authCustomer.username | capitalize}}
        </div>
        <span class="hidden-xs">
          <router-link tag="md-button" :to="{name: 'items'}">
            <md-icon>shop</md-icon>
            Items
          </router-link>
          <router-link tag="md-button" :to="{name: 'stores'}">
            <md-icon>store</md-icon>
            Stores
          </router-link>
          <md-button @click="$refs.cartItems.toggle()">
            <md-icon>receipt</md-icon>
            Cart Stores ({{storedCart.length}})
          </md-button>
        </span>
        <span class="visible-xs">
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'items'}">
            <md-icon>shop</md-icon>
          </router-link>
          <router-link tag="md-button" class="md-icon-button" :to="{name: 'stores'}">
            <md-icon>store</md-icon>
          </router-link>
          <md-button @click="$refs.cartItems.toggle()" class="md-icon-button">
            <md-icon>receipt</md-icon> ({{storedCart.length}})
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

          <md-button class="md-icon-button" @click="fullCartCheckOut">
            <md-icon>reply</md-icon>
          </md-button>

          <md-button class="md-icon-button" @click="$refs.cartItems.close()">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </md-toolbar>
      <md-list>

        <transition mode="out-in"
                    enter-active-class="animated bounceInRight"
                    leave-active-class="animated bounceOutRight">


          <transition-group v-if="storedCart.length" mode="out-in"
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
                    <span style="flex: 1;"></span>
                    Total: (&#8369;{{totalPrice(cartItems)}})
                  </md-list-item>
                  <transition-group mode="out-in"
                                    enter-active-class="animated bounceInRight"
                                    leave-active-class="animated bounceOutRight">
                    <md-list-item v-for="({item,stock,product},stockIndex) in cartItems" :key="stock['.key']">

                      <md-avatar>
                        <vue-image :image="item.image_url" alt="Item"/>
                      </md-avatar>
                      <div class="md-list-text-container">
                      <span>{{item.name | capitalize }}
                        ({{stock.quantity}})
                      </span>
                        <span>&#8369;{{stock.retail_price}} </span>
                        <span>Item Total: ({{product.quantity}}) &#8369;{{product.quantity * stock.retail_price}}</span>
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
                      <md-button class="md-icon-button md-list-action" @click="removeCartItem({storeIndex,stockIndex})">
                        <md-icon>delete</md-icon>
                      </md-button>
                    </md-list-item>
                  </transition-group>
                </md-list>
              </md-list-expand>
            </md-list-item>

          </transition-group>

          </md-list-item>

          </span>

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
      cartTotalPrice() {
        let sum = 0;
        _.forEach(this.storedCart, ({cartItems}) => {
          sum += this.totalPrice(cartItems)
        });
        return sum;
      },
      ...mapGetters([
        'storedCart',
      ])
    },
    data() {
      return {
        selectedStore: null,
      }
    },
    methods: {
      totalPrice(cartItems) {
        return _.sumBy(cartItems, ({stock, product}) => {
          return stock.retail_price * product.quantity;
        })
      },
      checkOut(cartStore) {

      },
      ...mapActions([
        'removeToCart',
        'increaseCartItem',
        'decreaseCartItem',
        'removeCartItem',
        'fullCartCheckOut',
        'checkOutCart'
      ])
    }
  }
</script>

