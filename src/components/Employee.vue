<template>
  <div v-if="currentEmployee">
    <md-toolbar class="md-accent">
      <div class="md-title" style="flex: 1">
        Employee | {{currentEmployee.username | capitalize}}
      </div>
      <div class="md-title" v-if="currentEmployee.manager">
        Manager: {{currentEmployee.manager | capitalize}}
      </div>
      <div class="md-title" v-else>
        Unemployed
      </div>
      <md-button v-if="selfEmployed">
        Self Employed
      </md-button>

      <md-button v-else-if="currentEmployee.manager"
                 @click="() => { currentEmployee.manager = ''; updateEmployee(currentEmployee);}">
        Resign
      </md-button>
      <router-link v-if="currentEmployee.manager" :to="{name: 'pos'}">Point of Sales</router-link>
    </md-toolbar>
    <transition v-if="sameEmployee && currentEmployee.manager" enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutRight" mode="out-in">
      <router-view></router-view>
    </transition>
    <div v-else-if="sameEmployee">
      <md-dialog ref="sendApplicationDialog">
        <template v-if="selectedManager">
          <md-toolbar>
            <div class="md-toolbar-container">
              <div class="md-title">
                <md-icon>send</md-icon>
                Send Application Letter
              </div>
            </div>
          </md-toolbar>
          <md-dialog-content>
            <p>Application Letter for Manager: {{selectedManager.username}}</p>
            <md-input-container>
              <label>Application Message</label>
              <md-textarea v-model="application.message" maxlength="150"></md-textarea>
            </md-input-container>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-raised md-primary" @click="sendApplicationLetter">
              <md-icon>send</md-icon>
              Send
            </md-button>
            <md-button class="md-raised md-warn"
                       @click="() => {$refs.sendApplicationDialog.close(); selectedManager = null}">
              Cancel
            </md-button>
          </md-dialog-actions>
        </template>
      </md-dialog>
      <div class="row center-xs middle-xs">
        <div class="col-xs-8">
          <md-input-container style="margin: 1rem;">
            <label>
              <md-icon>search</md-icon>
              Search
            </label>
            <md-input ref="searchInput" v-model="search"></md-input>
          </md-input-container>
        </div>
        <div class="col-xs">
          <md-checkbox v-model="byStoresOrder">{{byStoresOrder ? 'By Stores Order' : 'By Employee Order'}}</md-checkbox>
        </div>
        <div class="col-xs" v-if="!byStoresOrder">
          <md-button class="md-raised md-accent" @click="employeesOrder = employeesOrder == 'desc' ? 'asc' : 'desc'">
            {{employeesOrder == 'desc' ? 'Lowest Employee Count' : 'Highest Employee Count'}}
          </md-button>
        </div>
        <div class="col-xs" v-else>
          <md-button class="md-raised md-accent" @click="storesOrder = storesOrder == 'desc' ? 'asc' : 'desc'">
            {{storesOrder == 'desc' ? 'Highest Store Count' : 'Lowest Store Count'}}
          </md-button>
        </div>
      </div>

      <md-list class="md-triple-line">

        <md-subheader>Send applications to these managers</md-subheader>
        <transition-group v-if="filteredManagers.length" name="managers"
                          enter-active-class="animated bounceInRight"
                          leave-active-class="animated bounceOutRight">
          <md-list-item
            v-for="{user,manager,employeeCount,storeCount} in (byStoresOrder ? sortByStores : sortByEmployees)"
            :key="manager['.key']">
            <md-avatar>
              <vue-image :image="user.image_url" alt="Manager"></vue-image>
            </md-avatar>
            <div class="md-list-text-container">
              <span>Manager: {{manager.username | capitalize}}</span>
              <span>Employees: {{employeeCount}}</span>
              <span>Stores: {{storeCount}}</span>
            </div>
            <md-button @click="openApplicationLetterDialog(manager)"
                       class="md-icon-button md-list-action">
              <md-icon>send</md-icon>
            </md-button>
          </md-list-item>
        </transition-group>

      </md-list>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'employee',
    props: ['authEmployee', 'authUser', 'authManager'],
    computed: {
      filteredManagers() {
        let managers = this.allManagersAssets;
        let regExp;
        if (managers && this.search != '') {
          regExp = new RegExp('^[A-Za-z0-9 -]*$', 'i');
          if (!regExp.test(this.search)) {
            this.addAlert({message: `Search input must not contain symbols`});
            this.search = '';
            this.$refs.searchInput.$el.value = '';
            return managers;
          }
          regExp = new RegExp(`${this.search}`, 'i');
          managers = _.filter(managers, ({manager}) => {
            return regExp.test(_.get(manager, 'username'));
          })
        }
        return managers;
      },
      sortByEmployees() {
        let managers = this.filteredManagers;

        if (managers && this.employeesOrder) {
          managers = _.orderBy(managers, ['employeeCount'], [this.employeesOrder]);
        }

        return managers;
      },
      sortByStores() {
        let managers = this.filteredManagers;

        if (managers && this.storesOrder) {
          managers = _.orderBy(managers, ['storeCount'], [this.storesOrder]);
        }

        return managers;
      },
      ...mapGetters([
        'sameEmployee',
        'currentEmployee',
        'selfEmployed',
        'allManagersAssets',
      ])
    },
    data() {
      return {
        search: '',
        storesOrder: 'desc',
        employeesOrder: 'desc',
        byStoresOrder: true,
        application: {
          message: '',
          employee: '',
        },
        selectedManager: null
      }
    },
    methods: {
      sendApplicationLetter() {
        if (!this.selectedManager.app_messages) {
          this.selectedManager.app_messages = [];
        }
        this.application.employee = this.authEmployee.username;
        this.selectedManager.app_messages.push(_.clone(this.application));
        this.updateManager(_.clone(this.selectedManager));
        this.application.message = '';
        this.application.employee = '';
        this.$refs.sendApplicationDialog.close();
        this.addAlert({message: `Application Message Sent to ${this.selectedManager.username}`});
        this.selectedManager = null;
      },
      openApplicationLetterDialog(manager) {
        this.selectedManager = manager;
        this.$refs.sendApplicationDialog.open();
      },
      ...mapActions([
        'updateEmployee',
        'addAlert',
        'updateManager'
      ])
    }
  }
</script>

<style>
  .managers-move {
    transition: all 1s;
  }
</style>
