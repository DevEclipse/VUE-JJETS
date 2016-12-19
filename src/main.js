import lodash from 'lodash';
window._ = lodash;

import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VuexFire from 'vuexfire'
import App from './App.vue';
import VuexStore from './vuex';
import {sync} from 'vuex-router-sync';
import routes from './routes';
import firebase from 'firebase';
import db from './firebase_config';

import VueMaterial from 'vue-material';
import MultiSelect from 'vue-multiselect'
import VueMoment from 'vue-moment';
import 'vue-material/dist/vue-material.css';
import 'flexboxgrid/dist/flexboxgrid.css';
import 'animate.css/animate.css';
import 'flexboxgrid-helpers/dist/flexboxgrid-helpers.min.css';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VuexFire);
Vue.use(VueMaterial);
Vue.use(VueMoment);
Vue.component('transactions',require('./components/Transactions.vue'));
Vue.component('reg-exp-input',require('./components/RegExpInput.vue'));
Vue.component('alert', require('./components/Alert.vue'));
Vue.component('main-dialog', require('./components/MainDialog.vue'));
Vue.component('vue-image', require('./components/VueImage.vue'));
Vue.component('transaction',require('./components/Transaction.vue'));

Vue.component('layout',require('./components/Layout.vue'));
Vue.component('multiselect',MultiSelect);
Vue.component('display',require('./components/Display.vue'));
Vue.component('max-input',require('./components/MaxInput.vue'));

Vue.material.registerTheme('default', {
  primary: 'blue',
  accent: 'teal',
  warn: 'red',
  background: 'grey'
});

Vue.filter('date', value => {
  return new Date(value).toDateString();
});

Vue.filter('capitalize', value => {
  return _.upperFirst(value);
});
Vue.filter('keys', value => {
  let keys = [];
  _.forEach(value,val => {
    keys.push(val['.key']);
  });
  return keys;
});

Vue.filter('toArray',value => {
  return _.values(value);
});
Vue.filter('toIndex',value => {
  return _.map(value, function(value, index) {
    return index;
  });
});
Vue.filter('count',value => {
  return value ? value.length : 0;
});

Vue.filter('estimate', value => {
  return _.round(value,2);
});

Vue.filter('chunkArray',(array, length = 3) => {
  return _.chunk(array,length);
});

Vue.filter('percent',value => {
  return `${_.round(value * 100,2)}%`;
});
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
    refUsers: db.ref('users'),
    refItems: db.ref('items'),
    refStores: db.ref('stores'),
    refManagers: db.ref('managers'),
    refEmployees: db.ref('employees'),
    refCustomers: db.ref('customers'),
    refTransactions: db.ref('transactions'),
    refStocks: db.ref('stocks'),
    refProducts: db.ref('products')
  },
  render: h => h(App),
  beforeCreate() {
    this.$store.commit('SET_REFS', this.$firebaseRefs);
  },
  methods: {
    async toDashboard() {
      await this.$store.dispatch('setAuth');
      this.$router.push({
        name: 'user',
        params: {
          username: await this.$store.getters.authUser.username
        }
      })

    },
    signUp(credentials) {
      let self = this;
      firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(function (user) {
        let {
          displayName,
          email,
          photoURL,
          uid
        } = user;
        let userCredentials = {
          username: credentials.username,
          password: credentials.password,
          email: email,
          name: displayName || credentials.name,
          image_url: photoURL,
          uid: uid,
        };
        self.$store.dispatch('addUser', userCredentials);
        self.toDashboard();
      });
    },
    signIn(credentials) {
      let self = this;
      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(function () {
          self.toDashboard();
          // self.$store.dispatch('setAuthUserStatus','Online');
        })
        .catch(function (error) {
          self.$store.dispatch('addAlert',{message: error.message,important: true});
        })
    },
    signOut() {
      let self = this;
      firebase.auth().signOut().then(function () {
        self.$store.commit('SET_UID', null);
        // self.$store.dispatch('setAuthUserStatus','Offline');
        self.$router.push('/');
      }, function (error) {
        self.addAlert(error.message);
      });
    },
  }
}).$mount('#app');

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) return;
    store.dispatch('setUID', user.uid);
    store.dispatch('setAuth');
});
