<template>
  <div>
  <div v-if="!currentUser" class="teal white-text" style="height: 100vh;">
    <div class="valign-wrapper "style="height: 100vh;">
      <div class="valign center-block">
        <h1 >Loading...</h1>
      </div>
    </div>
  </div>

  <div v-if="currentUser">
      <div class="fixed-action-btn toolbar">
        <a class="btn-floating btn-large teal">
          <i class="large material-icons">mode_edit</i>
        </a>
        <ul>
          <li class="waves-effect waves-light">
            <router-link :to="`/user/${currentUser.username}/manager`">
              <i class="material-icons">stores</i>
              Stores
            </router-link >
          </li>
          <li class="waves-effect waves-light">
            <router-link :to="`/user/${currentUser.username}/manager/transactions`">
              <i class="material-icons">insert_chart</i>
              Manager Transactions
            </router-link >
          </li>
          <li class="waves-effect waves-light">
            <router-link :to="`/user/${currentUser.username}/employee/store`">
              <i class="material-icons">insert_chart</i>
              Employee Store
            </router-link >
          </li>
          <li class="waves-effect waves-light">
            <router-link :to="`/user/${currentUser.username}/employee`">
              <i class="material-icons">insert_chart</i>
              Employee Transactions
            </router-link >
          </li>
        </ul>
      </div>
      <main>
        <router-view></router-view>
      </main>
  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'user',
    computed: {
      ...mapGetters([
        'currentUser',
      ])
    },
    data() {
      return {
        nav: {
          menuWidth: 60, // Default is 240
          draggable: true // Choose whether you can drag to open on touch screens
        }
      }
    },
  }
</script>
