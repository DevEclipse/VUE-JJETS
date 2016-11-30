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
import VeeValidate from 'vee-validate'
import VueMaterial from 'vue-material';
import MultiSelect from 'vue-multiselect'

import 'vue-material/dist/vue-material.css';
import 'flexboxgrid/dist/flexboxgrid.css';
import 'animate.css/animate.css';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VuexFire);
Vue.use(VueMaterial);

const veeConfig = {
  errorBagName: 'errors', // change if property conflicts.
  delay: 0,
  locale: 'en',
  messages: true,
  strict: true
};


//Vue.use(VeeValidate,veeConfig);

Vue.component('multiselect',MultiSelect);

Vue.material.theme.register('default', {
  primary: 'blue',
  accent: 'teal',
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
  console.log(keys);
  return keys;
});

Vue.filter('toArray',value => {
  return _.map(value, function(value, index) {
    return [value]
  });
});

Vue.filter('count',value => {
  return value ? value.length : 0;
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
    btags: db.ref('tags'),
  },
  render: h => h(App),
  beforeCreate() {
    let self = this;
    this.$store.commit('SET_REFS', this.$firebaseRefs);

  },
  methods: {
    toDashboard() {
      this.$store.dispatch('setAuth');
      this.$router.push({
        name: 'user',
        params: {
          username: this.$store.getters.authUser.username
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
          name: displayName,
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
        })
        .catch(function (error) {
          alert(error.message);
        })
    },
    signOut() {
      let self = this;
      firebase.auth().signOut().then(function () {
        self.$store.commit('SET_UID', null);
        self.$router.push('/')
      }, function (error) {
        alert(error.message);
      });
    },
  }
}).$mount('#app');

firebase.auth().onAuthStateChanged(function (user) {
  if (!user) return;
  if(!store.getters.authUID) {
    store.dispatch('setUID', user.uid);
  if(!store.getters.authUser);
    store.dispatch('setAuth');
  }
});

