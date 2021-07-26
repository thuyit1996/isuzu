<template>
<div class="col-12 form-group form-group-checkbox" :class="this.fields.cssClass">
  <label class="checkbox-custom" :for="fields.itemId">{{this.fields.title}} <span v-if="fields.required" :class="this.fields.labelCssClass" class="asterisk">*</span>
    <input :id="fields.itemId" type="checkbox" v-model="valueInput" @change="checkboxChange">
    <span class="checkmark"></span>
  </label>
  <!-- // INFO: disable validation logic as sitecore form -->
  <!-- TODO: I don't know why $v.valueInput.required is NOT working with this case, I have to use !valueInput instead -->
  <!-- <div class="error-required" v-if="$v.valueInput.$dirty && isRequiredField && !valueInput">Checkbox is required</div> -->
  <div class="error-invalid" :key="index" v-for="(message, index) in errorMessages">{{message}}</div>
</div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { required, minLength, between, email } from 'vuelidate/lib/validators';
export default {
  name: 'DynamicCheckbox',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    id: '',
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      valueInput: this.fields.value,
      errorMessages: [],
    }
  },
  methods: {
    checkboxChange(event) {
      this.$v.valueInput.$touch();
      this.$emit('on:change', {
        value: event.target.checked,
        id: this.fields.itemId,
        // INFO: I don't know why $invalid is NOT working for this case
        // isValid: !this.$v.valueInput.$invalid,
        isValid: event.target.checked,
      });
    },
  },
  watch : {
    fields: {
      handler (newValue) {
        this.valueInput = newValue.value;
      },
      deep: true,
    },
    error: function(newValidations) {
      this.errorMessages = [];
      for (let validationItem in newValidations) {
        if (validationItem.includes(this.fields.itemId)) {
          this.errorMessages = newValidations[validationItem];
        }
      }
    }
  },
  validations() {
    let valueInput = {};
    if (this.fields.required) {
      valueInput.required = required;
    }
    return {
      valueInput,
    };
  },
  computed: {
    isRequiredField: function() {
      return this.$v.valueInput.hasOwnProperty('required');
    }
  },
  mounted() {
    this.$root.$on(`form:touch${this.id}`, () => {
      this.$v.valueInput.$touch();
      this.$emit('on:change', {
        value: this.valueInput,
        id: this.fields.itemId,
        // INFO: I don't know why $invalid is NOT working for this case
        // isValid: !this.$v.valueInput.$invalid,
        isValid: this.valueInput || !this.fields.required,
      });
    });
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

input {
  margin-right: 10px;
}
</style>