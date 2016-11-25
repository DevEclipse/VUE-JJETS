import lodash from 'lodash';
window._ = lodash;
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VuexFire from 'vuexfire'
import App from './App.vue';
import VuexStore from './vuex';
import { sync } from 'vuex-router-sync';
import routes from './routes';
import firebase from 'firebase';
import db from './firebase_config';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VuexFire);
Vue.use(VueMaterial)

Vue.material.theme.register('default', {
  primary: 'blue',
  accent: 'teal',
})

const store = new Vuex.Store(VuexStore);

const router = new VueRouter({
  mode: 'history',
  routes,
});

sync(store, router);

const app = new Vue({
  router,
  store,
  firebase: {
    busers: db.ref('users'),
    bitems: db.ref('items'),
    bstores: db.ref('stores'),
    bmanagers: db.ref('managers'),
    bemployees: db.ref('employees'),
    bcustomers: db.ref('customers'),
    btransactions: db.ref('transactions'),
  },
  render: h => h(App),
  beforeCreate() {
    let self = this;
    this.$store.commit('SET_REFS',this.$firebaseRefs);
  },
  methods: {
    toDashboard() {
      let user = this.$store.getters.getAuthUser;
      this.$router.push({ name: 'user', params: { username: user.username }})
    },
    signUpUser(credentials) {
      let errors = [];
      let self = this;
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(function(user) {
        let {displayName,email,photoURL,uid} = user;
        let userCredentials = {
          username: credentials.username,
          password: credentials.password,
          email: email,
          name: displayName,
          image_url: photoURL,
          uid: uid,
        };
        self.$store.dispatch('addUser',userCredentials);
        //credentials.username = credentials.password = credentials.email = credentials.name = '';
      });
    },
    signInUser(credentials) {
      let self = this;
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(function(){
          self.toDashboard();
        })
        .catch(function(error){
            alert(error.message);
        })
    },
    signOut() {
      let self = this;
      firebase.auth().signOut().then(function() {
        self.$store.commit('SET_UID',null);
        self.$router.push('/')
      }, function(error) {
        alert(error.message);
      });
    },
  }
}).$mount('#app');

firebase.auth().onAuthStateChanged(function(user) {
  if(!user) return;
  if(!app.$store.state.uid)
  app.$store.commit('SET_UID',user.uid);
});

// const methods = {
//   methods: {
//     updateRoutes() {
//       this.$set(this.$data,'authUser',this.$store.getters.authUser);
//       this.$store.state.auth = this.authUser;
//       if(this.$store.state.auth == null) {
//         this.$router.push('/401')
//       }
//     },
//     toDashboard() {
//       this.updateRoutes();
//       this.$router.push(`user/${ this.$store.state.auth.username}`)
//     },
//
//     addManager(user) {
//       this.$firebaseRefs.managers.child(user.username.toLowerCase()).set({valid: true});
//     },
//     addEmployee(user) {
//       this.$firebaseRefs.employees.child(user.username.toLowerCase()).set({assigned_store: 'unemployed'})
//     },
//     addCustomer(user) {
//       this.$firebaseRefs.customers.child(user.username.toLowerCase()).set({valid: true,transactions: ['null']})
//     },
//     applyToStore(employee,store) {
//       this.$firebaseRefs.employees.child(employee['.key']).child({assigned_store: store['.key']});
//       this.$firebaseRefs.stores.child(store['.key']).child('employees').set({[employee['.key']]: true});
//     },
//     addStore(store) {
//       let key = `${store.manager}${this.$store.getters.managerStoresCount}`;
//       console.log(key,this.$store.getters.managerStoresCount);
//       this.$firebaseRefs.stores.child(key).set(store);
//       this.$firebaseRefs.managers.child(store.manager.toLowerCase()).child('stores').update( {[key]: true});
//     },
//     addTransaction(transaction) {
//       let key = this.$firebaseRefs.transactions.push().key;
//       this.$firebaseRefs.transactions.child(key).set(transaction);
//       this.$firebaseRefs.stores.child(transaction.store).set('transactions').set({[key]: true});
//     },
//     addTransactionItem(transactionKey,item,storeKey,quantity) {
//       this.$firebaseRefs.transaction_items.child(transactionKey).child('items').set(item);
//     },
//     addStoreItem(storeItem,item) {
//       this.$firebaseRefs.stores.child(this.$store.getters.currentStore['.key']).child(`items/${item.name.toLowerCase()}`).set(storeItem);
//       this.addItem(item,this.$store.getters.currentStore['.key']);
//     },
//     addItem(item,key) {
//       this.$firebaseRefs.items.child(item.name.toLowerCase()).set(item);
//       this.$firebaseRefs.items.child(item.name.toLowerCase()).child('stores').set({[key]: true});
//     },
//     // End Add Methods
//     updateStoreItem(item) {
//       let {quantity,retail_price,store} = item;
//       console.log(item);
//       this.$firebaseRefs.stores.child(item.store).child('items').child(item['.key']).update({quantity,retail_price,store});
//       Materialize.toast(`Item: ${item.name} on Store: ${item.store} has updated`, 2000, 'rounded');
//     },
//
//     deleteStore(store) {
//       this.$firebaseRefs.stores.child(store['.key']).remove();
//       this.$firebaseRefs.managers.child(store.manager).child('stores').child(store.name).remove();
//     },
//     deleteStoreItem(item) {
//       console.log(item);
//       this.$firebaseRefs.items.child(item['.key']).remove();
//       this.$firebaseRefs.stores.child(item.store).child('items').child(item['.key']).remove();
//     },
//     //End Delete Methods
//
//     //Update Methods
//     updateUser(user) {
//       this.$firebaseRefs.users.child(user.username.toLowerCase()).update(user);
//     },
//     //End Update Methods



//   },
// };
