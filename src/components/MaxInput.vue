<template>
  <md-input-container>
    <label v-if="label">
      {{label}}
      <slot></slot>
    </label>
    <md-input type="number" min="0" :max="max" :step="step || 1" :value="value"
              @input.native="sendMaxInput">
    </md-input>
  </md-input-container>
</template>

<script>

  export default {
    name: 'max-input',
    props: ['value', 'max', 'label', 'float', 'step'],
    computed: {
      maxInput() {
        return this.input ? (this.input >= this.max ? this.max : this.input) : 0;
      },
    },
    data() {
      return {
        input: 0,
      }
    },
    methods: {
      sendMaxInput(event) {
        this.input = this.float ? parseFloat(event.target.value) : parseInt(event.target.value);
        this.$emit('input', event.target.value = this.maxInput);
      },
    },
    watch: {
      'value': function (val, old) {
        let delta = val - old;
        this.$emit('delta',delta);
      },
    }
  }

</script>
