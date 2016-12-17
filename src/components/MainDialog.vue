<template>
  <md-dialog ref="dialog" :md-click-outside-to-close="false">

    <md-toolbar>
      <div class="md-title" style="flex: 1;">
        <md-icon>{{type}}</md-icon>
        {{type | capitalize}}
      </div>
    </md-toolbar>

    <md-dialog-content style="padding: 2rem;">

      <slot></slot>

    </md-dialog-content>

    <md-dialog-actions>
      <md-button v-if="valid" class="md-raised md-primary" @click="closeDialog">
        {{getDialogType}}
      </md-button>
      <md-button class="md-raised md-warn" @click="cancelDialog">
        Cancel
      </md-button>
    </md-dialog-actions>

  </md-dialog>

</template>

<script>
  export default {
    name: 'main-dialog',
    props: ['type', 'valid'],
    computed: {
      getDialogType() {
        return this.type == 'edit'
          ? 'Update'
          : (this.type == 'delete' ? 'Delete' : (this.type == 'send' ? 'Send' : 'Create'));
      },
    },
    methods: {
      closeDialog() {
        this.$refs.dialog.close();
        this.$emit('close');
      },
      openDialog() {
        this.$refs.dialog.open();
      },
      cancelDialog() {
        this.$refs.dialog.close();
        this.$emit('cancel');
      },
    }
  }
</script>
