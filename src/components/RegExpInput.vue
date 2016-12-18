<template>
  <md-input-container :class="{'md-input-invalid': !valid}">
    <label>
      <md-icon v-if="icon">{{icon}}</md-icon> {{label}}
    </label>
    <md-input :required="required" :value="value" @change="regExpCheck"></md-input>

    <span v-if="!validRequired && required" class="md-error">
        {{label}} must not be empty
      </span>
    <span v-else-if="!validLength && length" class="md-error">
        {{label}} must be {{length}} characters long
      </span>
    <span v-else-if="!validRegExp" class="md-error">
        {{regExpMessage || 'Invalid input format'}}
      </span>
    <span v-else style="color: teal;">
        {{label}} is valid
      </span>
  </md-input-container>
</template>

<script>
  export default {
    name: 'reg-ex-input',
    props: ['value', 'label', 'regExp', 'length', 'regExpMessage', 'required','icon'],
    computed: {
      valid() {
        return this.validRegExp && this.validLength && this.validRequired;
      }
    },
    data() {
      return {
        validRequired: false,
        validRegExp: false,
        validLength: false
      }
    },
    methods: {
      regExpCheck(event) {
        this.validate(event);
        this.$emit('input', event);
      },
      validate(value) {
        if(!value) return;
        this.validRequired = this.required ? value != '' : true;
        this.validRegExp = this.regExp.test(value);
        this.validLength = this.length != null ? value.length >= this.length : true;
        this.$emit('validated', this.validRegExp && this.validLength && this.validRequired);
      }
    },
    mounted() {
      this.validate(this.value);
    }
  }
</script>
