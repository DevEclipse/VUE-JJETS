<template>
  <display v-if="!currentEmployee" message="No Employee Found"></display>
  <div v-else>
    <md-dialog ref="createTransaction">
      <div v-if="store">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title" style="flex: 1;">Transaction</div>
          </div>
        </md-toolbar>
        <md-dialog-content style="margin: 1rem;">
          <md-switch v-model="notRegistered">Not Registered</md-switch>
          <transition enter-class-active="animated bounceInRight" leave-active-class="animated bounceOutRight">
            <md-input-container v-if="notRegistered">
              <label>Customer</label>
              <md-input v-model="customer"></md-input>
            </md-input-container>
            <multiselect v-else :options="allCustomers | keys"
                         v-model="customer"
                         :searchable="true"
                         placeholder="Search Customer">
            </multiselect>
          </transition>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button @click="createTransaction">Create</md-button>
          <md-button @click="$refs.createTransaction.close()">Cancel</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>
    <md-toolbar class="md-accent">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">Employee | {{currentEmployee['.key'] | capitalize}}</div>
        <md-button>Hire</md-button>
      </div>
    </md-toolbar>
    <md-list class="md-triple-line">
      <md-subheader>You're managed by: {{currentEmployee.manager | capitalize }}</md-subheader>
      <md-subheader>Stores</md-subheader>
      <md-list-item v-for="store in currentEmployeeManagerStores">
        <md-avatar>
          <img :src="store.image_url || 'https://placeimg.com/40/40/people/1'" alt="Stores">
        </md-avatar>
        <div class="md-list-text-container">
          <span>{{store.name}}</span>
          <span>{{store['.key']}}</span>
        </div>

        <md-button class="md-icon-button md-list-action" @click="setStoreTransaction(store)">
          <md-icon class="md-primary">work</md-icon>
        </md-button>

        <md-divider class="md-inset"></md-divider>
      </md-list-item>
    </md-list>


  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'authEmployee',
        'currentEmployee',
        'currentEmployeeManagerStores',
        'currentTransaction',
        'allCustomers',
      ])
    },
    data() {
      return {
        transaction: null,
        customer: null,
        notRegistered: true,
        store: null,
      }
    },
    methods: {
      setStoreTransaction(store) {
        this.store = store;
        this.$refs.createTransaction.open();
      },
      async createTransaction() {
        this.transaction = {
          customer: this.customer,
          subtotal: 0,
          tax: 0,
          discount: 0,
          total: 0,
          change: 0,
          status: 'Processing',
          store: this.store['.key'],
          employee: this.authEmployee['.key'],
          updated_by: this.authEmployee['.key'],
        };
        let key = await this.addTransaction(this.transaction);
        this.$router.push({name: 'pos', params: {transaction: key}});
        console.log(this.$router);
      },
      ...mapActions([
        'addTransaction',
      ])
    },
  }
</script>

