<template>
  <div>
    <loading v-if="!currentUser"/>
    <div v-if="currentUser">

      <header >


        <md-toolbar>


          <h2 class="md-title" style="flex: auto">
            {{ currentUser != authUser ? `You are viewing ${currentUser.username}'s profile` : `Your Profile ${currentUser.username}` }}
          </h2>

          <md-avatar >
            <img src="//placeimg.com/64/64/people/2" alt="People">
          </md-avatar>
          <router-link class="md-icon-button md-button"
                       v-if="currentUser != authUser"
                       :to="{name: 'user', params: { username: authUser.username}}">
            <md-icon>undo</md-icon>
          </router-link>
          <router-link class="md-button" to="/news">News</router-link>
        </md-toolbar>
      </header>
      <!--<img :src="`https://www.barcodesinc.com/generator/image.php?code=${barcode}&style=197&type=C128B&width=150&height=50&xres=1&font=4`"-->
           <!--alt="the barcode printer: free barcode generator" border="0">-->
      <main>
        <user-info :current_user="currentUser"/>
      </main>
    </div>



  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'user',
    computed: {
      ...mapGetters([
        'currentUser',
        'authUser'
      ])
    },
    data() {
      return {
          barcode: '',
      }
    },
    methods: {
      generateBarcode() {
        let barcode = '';
        for(let i = 1;i < 13; i++) {
          barcode += _.random(9).toString();
        }
        this.barcode = barcode;
        console.log(this.barcode);

      }
    },
    mounted() {
      this.generateBarcode();
    }

  }
</script>
