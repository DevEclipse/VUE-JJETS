<template>
  <md-card md-with-hover style="margin: 1rem;">
    <md-toolbar style="padding-right: 1rem;" :class="{'md-warn': alert.warn, 'md-accent': !alert.warn}">
      <div class="md-toolbar-container">
        <div class="md-title" style="flex: 1;">
          {{alert.message}}
        </div>
        <md-button v-if="alert.important" class="md-icon-button" @click="deleteAlert(alert)">
          <md-icon>close</md-icon>
        </md-button>
      </div>
    </md-toolbar>
  </md-card>
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    name: 'alert',
    props: ['alert'],
    mounted() {
      if (this.alert.important) return;
      _.delay(() => {
        if (this.alert.callback) {
          this.alert.callback();
        }
        this.deleteAlert(this.alert);
      }, this.alert.duration || 3000);
    },
    methods: {
      ...mapActions([
        'deleteAlert',
      ]),
      dummy() {

      }
    }
  }
</script>
