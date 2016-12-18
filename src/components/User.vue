<template>
  <display v-if="!currentUser" message="Loading... User"></display>
  <div v-else style="margin: 1rem;">

    <md-dialog ref="managerSecretCodesDialog">
      <template v-if="authManager">
        <md-toolbar>
          <div class="md-toolbar-container">
            <div class="md-title">
             {{authManager.username | capitalize}} Secret Info
            </div>
          </div>
        </md-toolbar>
      <md-dialog-content style="padding-top: 3rem; padding-bottom: 3rem;">
       <div style="margin: 2rem">
        <div class="md-title">
          Void Code: {{authManager.void_code}}
        </div>
         <div class="md-subheader">
           This void code is used for deleting transactions from your stores.
         </div>
        <div class="md-subhead" v-if="voidCode">
          Generated Void Code: {{voidCode}}
        </div>
        <md-button class="md-raised md-warn" @click="() => {generateId(); voidCode = getGeneratedId}">Generate Void Code</md-button>
       </div>
        <div style="margin: 2rem">
        <div class="md-title">
          Hire Code: {{authManager.hire_code}}
        </div>
        <div class="md-subheader">
          Give this to an employee and he/she must enter this code to apply on your stores.
        </div>
        <div class="md-subhead" v-if="hireCode">
          Generated Hire Code: {{hireCode}}
        </div>
          <md-button class="md-raised md-warn" @click="() => {generateId(); hireCode = getGeneratedId}">Generate Hire Code</md-button>

        </div>


      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="updateSecretManagerInfo"> Save </md-button>
        <md-button class="md-raised md-warn" @click="closeSecretManagerInfo"> Cancel</md-button>
      </md-dialog-actions>
      </template>
    </md-dialog>

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
        <md-button class="md-raised md-primary" @click="addEmployeeManager"> Work</md-button>
        <md-button class="md-raised md-warn" @click="$refs.hireCodeManager.close()"> Cancel</md-button>
      </md-dialog-actions>

    </md-dialog>
    <md-dialog ref="editUser">
      <span v-if="storedUser">

      <md-toolbar style="margin-bottom: 1rem;">
        <div class="md-toolbar-container">
          <div class="md-title">
            {{storedUser.username | capitalize}}
          </div>
        </div>
      </md-toolbar>
      <md-dialog-content>
        <md-input-container>
          <label>Name</label>
          <md-input v-model="storedUser.name"></md-input>
        </md-input-container>
        <md-input-container>
          <label>Image Url</label>
          <md-input type="url" v-model="storedUser.image_url"></md-input>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised md-primary"
                   @click="userUpdated"> Update </md-button>
        <md-button class="md-raised md-warn" @click="$refs.editUser.close()"> Cancel </md-button>
      </md-dialog-actions>
        </span>
    </md-dialog>
    <div class="row">
      <div class="col-xs">
        <md-card style="margin-bottom: 1rem;">
          <md-toolbar class="md-accent">
            <div class="md-toolbar-container">
              <div class="md-title" style="flex: 1;">{{currentUser.username | capitalize}}</div>
              <md-button v-if="sameUser" @click="editUser" class="md-icon-button">
                <md-icon>edit</md-icon>
                <md-tooltip>Edit your account</md-tooltip>
              </md-button>
            </div>

          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media md-ratio="4:3">
              <img :src="currentUser.image_url || 'https://myspace.com/common/images/user.png'" alt="No Image"/>
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">Email:</div>
                  <div class="md-subhead">{{currentUser.email}}</div>
                </md-card-header-text>
                <md-card-header-text>
                  <div class="md-title">Name:</div>
                  <div class="md-subhead">{{currentUser.name || '(No Name Yet)'}}</div>
                </md-card-header-text>
              </md-card-header>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-subhead">Created: {{currentUser.created_date | moment("from")}}</div>
                </md-card-header-text>
                <md-card-header-text>
                  <div class="md-subhead">Updated:{{currentUser.updated_date | moment("from")}}</div>
                </md-card-header-text>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
        <div class="md-display-1 center-xs middle-xs">
          More Profiles Coming Soon.
        </div>
      </div>
      <div class="col-xs">
        <md-card style="margin-bottom: 1rem;" v-if="sameUser || currentManager">
          <md-toolbar class="md-accent">
            <div class="md-toolbar-container">
              <span class="md-title" style="flex: 1;"> Manager Profile </span>
              <md-button class="md-icon-button" @click="speakMessage(`This profile is used for making stores and items, as a manager you are required to hire
                  employees to create and validate transactions for you.`)">
                <md-icon>help</md-icon>
                <md-tooltip>Help</md-tooltip>
              </md-button>

              <md-button v-if="!authManager"
                         @click="addProfile('manager')">
                <md-icon>add</md-icon>
                Add Manager Profile
              </md-button>

              <router-link v-else-if="sameUser"  :to="{name: 'manager'}" tag="md-button" class="md-icon-button">
                <md-icon>supervisor_account</md-icon>
                <md-tooltip>Start Managing</md-tooltip>
              </router-link>
              <md-button v-if="sameUser" class="md-icon-button" @click="openSecretManagerInfo">
                <md-icon>info</md-icon>
                <md-tooltip>View Secret Info</md-tooltip>
              </md-button>
            </div>
          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media>
              <vue-image
                :image="'http://workforceverification.com/wp-content/uploads/2012/05/Top-Tips-for-Dealing-With-Background-Checks.jpg'"></vue-image>
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">
                    Description:
                  </div>
                  <div class="md-subhead">
                    This profile is used for making stores and items, as a manager you are required to hire
                    employees to create and validate transactions for you.
                  </div>
                </md-card-header-text>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
        <md-card style="margin-bottom: 1rem;" v-if="sameUser || currentEmployee">

          <md-toolbar class="md-accent">
            <div class="md-toolbar-container">
              <span class="md-title" style="flex: 1;"> Employee Profile </span>
              <md-button class="md-icon-button" @click="speakMessage(`This profile is used for working with managers from their stores, your primary role for this profile
                    is to create or validate transactions from customers and stores of your manager.`)">
                <md-icon>help</md-icon>
                <md-tooltip>Help</md-tooltip>
              </md-button>
              <md-button v-if="!authEmployee"
                         @click="addProfile('employee')">
                <md-icon>add</md-icon>
                Add Employee Profile
              </md-button>
              <router-link v-else-if="sameUser" :to="{name: 'employee'}" tag="md-button" class="md-icon-button">
                <md-icon>work</md-icon>
                <md-tooltip>Start Working</md-tooltip>
              </router-link>
            </div>
          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media>
              <vue-image
                :image="'http://ww.backgroundchecksservice.com/wp-content/uploads/2013/08/banner1.png'"></vue-image>
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">
                    Description:
                  </div>
                  <div class="md-subhead">
                    This profile is used for working with managers from their stores, your primary role for this profile
                    is to create or validate transactions from customers and stores of your manager.
                  </div>
                </md-card-header-text>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
        <md-card style="margin-bottom: 1rem;" v-if="sameUser || currentCustomer">
          <md-toolbar class="md-accent">
            <div class="md-toolbar-container">
              <span class="md-title" style="flex: 1;"> Customer Profile </span>
              <md-button class="md-icon-button" @click="speakMessage(`This profile is used for buying items from stores and creating orders to be soon delivered
                    by the store of your choice.`)">
                <md-icon>help</md-icon>
                <md-tooltip>Help</md-tooltip>
              </md-button>
              <md-button v-if="!authCustomer" @click="addProfile('customer')">
                <md-icon>add</md-icon>
                Add Customer Profile
              </md-button>
              <router-link v-else-if="sameUser"  :to="{name: 'customer'}" tag="md-button" class="md-icon-button">
                <md-icon>shopping_cart</md-icon>
                <md-tooltip>Start Shopping</md-tooltip>
              </router-link>
            </div>

          </md-toolbar>
          <md-card-media-cover md-solid>
            <md-card-media>
              <vue-image
                :image="'http://syndication.atlantic-media.us/GEMG/CustomerExperience/CustomerX.jpg'"></vue-image>
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <md-card-header-text>
                  <div class="md-title">
                    Description:
                  </div>
                  <div class="md-subhead">
                    This profile is used for buying items from stores and creating orders to be soon delivered
                    by the store of your choice.
                  </div>
                </md-card-header-text>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  export default {
    name: 'user',
    props: ['authUser', 'authManager', 'authEmployee', 'authCustomer'],
    data() {
      return {
        hireCode: '',
        voidCode: ''
      }
    },
    computed: {
      foundManagerByHireCode() {
        return _.find(this.allManagers, ['hire_code', this.hireCode]);
      },
      filterUsers() {
        let users = this.allUsers;
        if (users && this.search) {
          let regExp = new RegExp(`${this.search}`, 'i');
          users = _.filter(users, user => {
            return regExp.test(user['username'])
          });
        }
        return users;
      },
      ...mapGetters([
        'sameUser',
        'currentUser',
        'currentEmployee',
        'currentManager',
        'currentCustomer',
        'storedUser',
        'allManagers',
        'getGeneratedId'
      ])
    },
    methods: {
      updateSecretManagerInfo() {
        this.addAlert({message: 'You updated your manager profile secret information'});
        this.authManager.void_code = this.voidCode;
        this.authManager.hire_code = this.hireCode;
        this.updateManager(this.authManager);
        this.closeSecretManagerInfo();

      },
      openSecretManagerInfo() {
        this.hireCode = '';
        this.voidCode = '';
        this.$refs.managerSecretCodesDialog.open();
      },
      closeSecretManagerInfo() {
        this.hireCode = '';
        this.voidCode = '';
        this.$refs.managerSecretCodesDialog.close();
      },
      editUser() {
        this.storeUser(this.currentUser);
        this.$refs.editUser.open();
        this.addAlert({message: `Editing Account: ${this.currentUser.username}`});
      },
      userUpdated() {
        this.updateUser(this.storedUser);
        this.$refs.editUser.close();
        this.addAlert({message: `Updated Account: ${this.currentUser.username}`});
      },
      addProfile(profile) {
        switch (profile) {
          case 'manager':
            this.generateId();
            this.addManager({
              username: this.authUser.username,
              void_code: _.shuffle(this.getGeneratedId.split('')).reverse().join(''),
              hire_code: _.shuffle(this.getGeneratedId.split('')).reverse().join('')
            });
            break;
          case 'employee':
            this.$refs.hireCodeManager.open();
            break;
          case 'customer':
            this.addCustomer({username: this.authUser.username, balance: 0});
            break;
        }
        if (!profile == 'employee') {
          this.addAlert({
            message: `Added ${_.upperFirst(profile)} profile to your account`, callback: () => {
              this.$router.push({name: profile, params: {username: this.authUser.username}});
            }
          });
        }
      },
      addEmployeeManager() {
        this.addEmployee({
          username: this.authUser.username,
          manager: this.foundManagerByHireCode
            ? this.foundManagerByHireCode.username
            : (this.authManager ? this.authManager.username : '')
        });
        this.$refs.hireCodeManager.close();
        this.addAlert({
          message: this.foundManagerByHireCode ? `Added Employee profile and assigned to Manager: ${this.foundManagerByHireCode.username}`
            : `Added Employee profile to your account`, callback: () => {
            if (this.foundManagerByHireCode) {
              let manager = this.foundManagerByHireCode;
              this.generateId();
              manager.hire_code =  _.shuffle(this.getGeneratedId.split('')).reverse().join('');

              this.updateManager(manager);
            }
            this.$router.push({name: 'employee', params: {username: this.authUser.username}});
          }
        });
      },
      ...mapActions([
        'addManager',
        'addEmployee',
        'addCustomer',
        'updateUser',
        'updateManager',
        'speakMessage',
        'addAlert',
        'storeUser',
        'generateId'
      ])
    }
  }
</script>
