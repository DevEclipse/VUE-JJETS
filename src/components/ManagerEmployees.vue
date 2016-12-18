<template>
  <div>
  <div class="row">
  <div class="col-xs-12 col-md">
      <md-list class="md-triple-line">
        <md-subheader>Application Messages ({{currentManagerApplicationMessages | count}})</md-subheader>
        <transition-group  v-if="currentManagerApplicationMessages" name="items"
                           enter-active-class="animated bounceInRight"
                           leave-active-class="animated bounceOutRight">
        <md-list-item v-for="({message,employee,user},index) in currentManagerApplicationMessages" :key="index">
          <md-avatar>
            <vue-image :image="user.image_url" alt="User"></vue-image>
          </md-avatar>
          <md-button class="md-icon-button md-list-action" @click="disapproveMessage({employee,index},true)">
            <md-icon>close</md-icon>
          </md-button>
          <div class="md-list-text-container">
            <span>Employee: {{employee.username | capitalize }}</span>
            <span>Created: {{employee.created_date | moment('from')}}</span>
          </div>

          <md-list-expand>
            <md-list>
              <md-subheader>Message</md-subheader>
              <md-list-item>
                <div class="md-list-text-container">
                  <p>
                    {{message}}
                  </p>
                </div>
                <md-button class="md-icon-button md-list-action" @click="hireEmployee(employee)">
                  <md-icon>check</md-icon>
                </md-button>
                <md-button class="md-icon-button md-list-action" @click="disapproveMessage({employee,index})">
                  <md-icon>close</md-icon>
                </md-button>
              </md-list-item>
            </md-list>
          </md-list-expand>
        </md-list-item>
        </transition-group>
      </md-list>
  </div>
      <div  class="col-xs-12 col-md">
      <md-list class="md-triple-line">
        <md-subheader>Employees ({{currentManagerEmployeesUsers | count}})</md-subheader>
        <transition-group  v-if="currentManagerEmployeesUsers" name="items"
                           enter-active-class="animated bounceInRight"
                           leave-active-class="animated bounceOutRight">
        <md-list-item v-for="({employee,user},index) in currentManagerEmployeesUsers" :key="index">
          <md-avatar>
            <vue-image :image="user.image_url" alt="User"></vue-image>
          </md-avatar>

          <div class="md-list-text-container">
            <span>Employee: {{employee.username | capitalize }}</span>
            <span>Created: {{employee.created_date | moment('from')}}</span>
            <span v-if="employee.hired_date">Hired: {{employee.hired_date | moment('from')}}</span>
            <span v-if="employee.terminated_date">Terminated: {{employee.terminated_date | moment('from')}}</span>
            <span v-if="employee.resigned_date">Resigned: {{employee.resigned_date | moment('from')}}</span>
            <span  v-if="employee.updated_date">Updated: {{employee.updated_date | moment('from')}}</span>
          </div>
          <span style="flex: 1;"></span>
          <md-button class="md-icon-button md-list-action" @click="terminateEmployee(employee)">
            <md-icon>close</md-icon>
          </md-button>
        </md-list-item>
        </transition-group>
      </md-list>
      </div>

  </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: 'manager-employees',
    computed: {
      ...mapGetters([
        'currentManagerApplicationMessages',
        'currentManagerEmployeesUsers',
        'serverTime',
        'authManager'
      ])
    },
    methods: {
      terminateEmployee(employee) {
        employee.manager = '';
        employee.terminated_date = this.serverTime;
        this.updateEmployee(employee);
        this.addAlert({message: `${employee.username} is terminated from your management`});
      },
      hireEmployee(employee) {
        _.remove(this.authManager.app_messages,msg => {
          return msg.employee == employee.username;
        });
        employee.manager = this.authManager.username;
        employee.hired_date = this.serverTime;
        this.updateEmployee(employee);

        this.updateManager(this.authManager);
        this.addAlert({message: `${employee.username} is now hired`});
      },
      disapproveMessage({employee,index},all) {
        if(all) {
          _.remove(this.authManager.app_messages,msg => {
            return msg.employee == employee.username;
          });
          this.addAlert({message: `You have disapproved ${employee.username}'s application messages`});
        } else {
          this.authManager.app_messages.splice(index, 1);
          this.addAlert({message: `You have disapproved ${employee.username}'s application message`});
        }
        this.updateManager(this.authManager);

      },
      ...mapActions([
          'updateManager',
          'updateEmployee',
          'addAlert'
      ])
    }
  }
</script>
