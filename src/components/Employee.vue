<template>
  <div v-if="currentEmployee">

    <md-dialog ref="transactionCreateDialog">
      <template v-if="storedTransaction">
      <md-toolbar>
        <div class="md-toolbar-content">
          <div class="md-title">Point of Sale</div>
        </div>
      </md-toolbar>

      <md-dialog-content align="center" style="padding: 2rem">
        <div class="md-title">
          Create Transaction: ({{currentEmployee.username | capitalize}})
        </div>
        <div class="md-title" align="center" style="padding: 1rem;">
          Store
        </div>
        <multiselect :options="authEmployeeStores"
                     v-model="store"
                     :searchable="true"
                     label="name"
                     name="name"
                     placeholder="Select A Store">

        </multiselect>
        <div class="md-title" align="center" style="padding: 2rem">
          Customer
        </div>
        <md-checkbox v-model="anonCustomer">Anonymous Customer</md-checkbox>
        <multiselect v-if="!anonCustomer" :options="allCustomers"
                     v-model="customer"
                     :searchable="true"
                     label="username"
                     name="username"
                     placeholder="Select A Customer">

        </multiselect>

      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-accent md-raised" v-if="store">
          Create
        </md-button>
        <md-button class="md-warn md-raised" >
          Cancel
        </md-button>
      </md-dialog-actions>
      </template>
    </md-dialog>

    <md-toolbar class="md-accent">
      <div class="md-title" style="flex: 1">
        Employee | {{currentEmployee.username | capitalize}}
      </div>
      <template v-if="$route.name != 'pos'">
        <div class="md-title" v-if="currentEmployee.manager">
          Manager: {{currentEmployee.manager | capitalize}}
        </div>
        <template v-else>
          <span class="md-title">Unemployed</span>
          <md-button @click="$refs.hireCodeManager.open()">
            Apply Using Code
          </md-button>
        </template>

        <md-button v-if="currentEmployee.manager" @click="resignEmployee">
          Resign
        </md-button>
        <md-button @click="createTransaction">
          <md-icon>receipt</md-icon>
          Point of Sales
        </md-button>
      </template>
    </md-toolbar>
    <transition v-if="sameEmployee && currentEmployee.manager" enter-active-class="animated bounceInRight"
                leave-active-class="animated bounceOutRight" mode="out-in">
      <router-view></router-view>
    </transition>
    <div v-else-if="sameEmployee">
      <md-dialog ref="hireCodeManager">

        <md-toolbar style="margin-bottom: 1rem;">
          <div class="md-toolbar-container">
            <div class="md-title">
              Apply By Hire Code
            </div>
          </div>
        </md-toolbar>
        <md-dialog-content style="padding-top: 3rem; padding-bottom: 3rem;">
          <div class="md-title">
            Found Manager: {{(foundManagerByHireCode ? foundManagerByHireCode.username : 'No Manager') | capitalize}}
          </div>
          <reg-exp-input label="Hire Code (Optional)"
                         icon="content_paste"
                         v-model="hireCode"
                         :regExp="/^[A-Za-z0-9 -]*$/"
                         regExpMessage="Hire code doesn't contain symbols"></reg-exp-input>

        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-raised md-primary" v-if="foundManagerByHireCode" @click="findManagerAndApply"> Work
          </md-button>
          <md-button class="md-raised md-warn" @click="$refs.hireCodeManager.close()"> Cancel</md-button>
        </md-dialog-actions>

      </md-dialog>
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
          <md-dialog-content style="padding: 2rem;">
            <p>Application Letter for Manager: {{selectedManager.username}}</p>
            <md-input-container>
              <label>Application Message</label>
              <md-textarea v-model="application.message" maxlength="50"></md-textarea>
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
      <md-whiteframe md-elevation="24" style="z-index: 20;">
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
            <md-checkbox v-model="byStoresOrder">{{byStoresOrder ? 'By Stores Order' : 'By Employee Order'}}
            </md-checkbox>
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
      </md-whiteframe>
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
      foundManagerByHireCode() {
        return _.find(this.allManagers, ['hire_code', this.hireCode]);
      },
      filteredManagers() {
        let managers = this.authManager ? _.reject(this.allManagersAssets, ({manager}) => {
            return manager.username == this.authManager.username;
          }) : this.allManagersAssets;
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
        'allManagers',
        'getGeneratedId',
        'serverTime',
        'storedTransaction',
        'authEmployeeStores',
        'allCustomers'
      ])
    },
    data() {
      return {
        search: '',
        storesOrder: 'desc',
        employeesOrder: 'desc',
        byStoresOrder: true,
        customer: '',
        application: {
          message: '',
          employee: '',
        },
        selectedManager: null,
        hireCode: '',
        store: null,
        anonCustomer: true,
      }
    },
    methods: {
      createTransaction() {
        this.storeTransaction();
        this.$refs.transactionCreateDialog.open();
      },
      resignEmployee() {
        this.addAlert({message: `You have resigned from the management of ${this.authEmployee.manager}`});
        this.authEmployee.manager = '';
        this.authEmployee.resign_date = this.serverTime;
        this.updateEmployee(this.authEmployee);

      },
      findManagerAndApply() {
        this.authEmployee.manager = this.foundManagerByHireCode.username;
        this.authEmployee.hired_date = this.serverTime;
        this.updateEmployee(this.authEmployee);
        this.$refs.hireCodeManager.close();
        this.addAlert({
          message: `You are now managed by ${this.foundManagerByHireCode.username}`, callback: () => {
            let manager = this.foundManagerByHireCode;
            this.generateId();
            manager.hire_code = _.shuffle(this.getGeneratedId.split('')).reverse().join('');
            this.updateManager(manager);
          }
        });
      },
      sendApplicationLetter() {
        if (!this.selectedManager.app_messages) {
          this.selectedManager.app_messages = [];
        }
        this.application.employee = this.authEmployee.username;
        this.selectedManager.app_messages.push(_.clone(this.application));
        this.updateManager(this.selectedManager);
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
        'updateManager',
        'generateId',
        'storeTransaction'
      ])
    }
  }
</script>

<style>
  .managers-move {
    transition: all 1s;
  }
</style>
