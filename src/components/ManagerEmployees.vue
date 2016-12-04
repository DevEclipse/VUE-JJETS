<template>
  <div>
    <md-list>
      <md-input-container style="margin: 1rem;">
        <label>
          <md-icon>search</md-icon>
          Search Employee
        </label>
        <md-input></md-input>
      </md-input-container>
      <md-subheader>
            <span style="flex: 1">
              Employees | {{currentManagerEmployees | count}}
            </span>
        <md-button class="md-icon-button md-accent">
          <md-icon>search</md-icon>
        </md-button>
      </md-subheader>

      <div v-if="currentManagerEmployees.length">
        <md-list-item v-for="store in currentManagerEmployees">
          <md-avatar>
            <img src="https://placeimg.com/40/40/people/5" alt="People">
          </md-avatar>

          <span>Abbey Christansen</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>
      </div>
      <md-list-item v-else>
        No Employees
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  export default {

  }
</script>
