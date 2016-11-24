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
  accent: 'teal'
})

const store = new Vuex.Store(VuexStore);

const router = new VueRouter({
  mode: 'history',
  routes,
});
Vue.component('user-side-nav',require('./components/UserSideNav.vue'));

sync(store, router);
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
//     signUpUser(credentials) {
//       let errors = [];
//       let self = this;
//       fb.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(function(user) {
//         let {displayName,email,photoURL,uid} = user;
//         let userCredentials = {
//           username: credentials.username,
//           password: credentials.password,
//           email: email,
//           name: displayName,
//           image_url: photoURL,
//           uid: uid,
//         };
//         if(errors.length < 1) {
//           self.addUser(userCredentials);
//           self.toDashboard();
//           Materialize.toast('You are now signed in redirecting to your home page', 3000, 'rounded',() => {self.$router.push(`/user/${credentials.username}`)});
//         }
//       })
//         .catch(function(error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           if (errorCode == 'auth/weak-password') {
//             Materialize.toast('The password is too weak.', 3000, 'rounded');
//           } else {
//             Materialize.toast(errorMessage, 3000, 'rounded');
//           }
//         });
//
//     },
//     signInUser(credentials) {
//       let self = this;
//       fb.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
//         .then(function(user,info,data) {
//           self.toDashboard();
//         })
//         .catch(function(error) {
//           // Handle Errors here.
//           var errorMessage = error.message;
//           // ...
//           Materialize.toast(errorMessage, 3000, 'rounded');
//
//         })
//     },
//     signOut() {
//       let self = this;
//       fb.auth().signOut().then(function() {
//         Materialize.toast('You are now signed out redirecting in 3 seconds', 3000, 'rounded',() => {self.$router.push(`/`)});
//         self.$router.push('/401')
//       }, function(error) {
//         // An error happened.
//       });
//     },
//   },
// };
const app = new Vue({
  router,
  store,
  firebase: {
    users: db.ref('users'),
    items: db.ref('items'),
    stores: db.ref('stores'),
    managers: db.ref('managers'),
    employees: db.ref('employees'),
    customers: db.ref('customers'),
    transactions: db.ref('transactions'),
  },
  render: h => h(App),
  created() {
    this.$store.commit('SET_REFS',this.$firebaseRefs);
    this.$store.dispatch('deleteUser',{['.key']: '-KXIgd1C7L_F5UVZ-oAM'});
  }
}).$mount('#app');


firebase.auth().onAuthStateChanged(function(user) {

  if(!user) return;


});
console.log(app,store);
