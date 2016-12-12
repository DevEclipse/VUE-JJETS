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
Vue.config.debug = true;

Vue.component('vue-image', require('./components/VueImage.vue'));
Vue.component('employees',require('./components/Employees.vue'));
Vue.component('transaction',require('./components/Transaction.vue'));
Vue.component('transaction',require('./components/Transaction.vue'));
Vue.component('transactions',require('./components/Transactions.vue'));
Vue.component('cards',require('./components/Cards.vue'));
Vue.component('multiselect',MultiSelect);
Vue.component('display',require('./components/Display.vue'));

Vue.material.theme.registerAll({
  default: {
    primary: 'blue',
    accent: 'teal',
    warn: 'red'
  },
});

Vue.filter('date', value => {
  return new Date(value).toDateString();
});

Vue.filter('capitalize', value => {
  return value.charAt(0).toUpperCase() + value.slice(1);
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
    busers: db.ref('users'),
    bitems: db.ref('items'),
    bstores: db.ref('stores'),
    bmanagers: db.ref('managers'),
    bemployees: db.ref('employees'),
    bcustomers: db.ref('customers'),
    btransactions: db.ref('transactions'),
    bstocks: db.ref('stocks'),
  },
  render: h => h(App),
  beforeCreate() {
    let self = this;
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
          alert(error.message);
        })
    },
    signOut() {
      let self = this;
      firebase.auth().signOut().then(function () {
        self.$store.commit('SET_UID', null);
        // self.$store.dispatch('setAuthUserStatus','Offline');
        self.$router.push('/');
      }, function (error) {
        alert(error.message);
      });
    },
    speakMessage(message) {
      let msg = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(msg);
    },
  }
}).$mount('#app');

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) return;
    store.dispatch('setUID', user.uid);
    store.dispatch('setAuth');
});

console.log(app);
