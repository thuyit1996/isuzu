<template>
  <div class="form-group col-md-6" :class="this.fields.cssClass">
    <label v-if="this.fields.title" :for="fields.itemId" :class="this.fields.labelCssClass" class="d-block">{{this.fields.title}} <span v-if="fields.required" class="asterisk">*</span></label>
    <input :id="fields.itemId"  type='email' @input="inputChange" v-model='valueInput' :name="fields.name" :placeholder="fields.placeholderText" :class="errorMessages && errorMessages.length ? 'input-error' : ''">
    <!-- // INFO: disable validation logic as sitecore form -->
    <!-- <div class="error-required" v-if="$v.valueInput.$dirty && isRequiredField && !$v.valueInput.required">Input is required</div>
    <div class="error-invalid" v-if="$v.valueInput.$dirty && !$v.valueInput.email">It need to be email</div>
    <div class="error-invalid" v-if="$v.valueInput.$dirty && isMinLengthField && !$v.valueInput.minLength">Input must have more than {{minValue}} characters</div>
    <div class="error-invalid" v-if="$v.valueInput.$dirty && isMaxLengthField && !$v.valueInput.maxLength">Input must have less than {{maxValue}} characters</div> -->
    <div class="error-invalid" :key="index" v-for="(message, index) in errorMessages">{{message}}</div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators';

export default {
  name: 'DynamicFormEmail',
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
      valueInput: this.fields.value ? this.fields.value : '',
      errorMessages: [],
    };
  },
  watch : {
    fields: {
      handler (newValue) {
        this.valueInput = newValue.value ? newValue.value : '';
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
  mounted() {
    this.minValue = this.$v.valueInput.$params.minLength?.min;
    this.maxValue = this.$v.valueInput.$params.maxLength?.max;
    this.$root.$on(`form:touch${this.id}`, () => {
      this.$v.valueInput.$touch();
      this.$emit('on:change', {
        value: this.valueInput,
        id: this.fields.itemId,
        isValid: !this.$v.valueInput.$invalid,
      });
    });
  },
  methods: {
    inputChange (event) {
      this.$v.valueInput.$touch();
      this.$emit('on:change', {
        value: event.target.value,
        id: this.fields.itemId,
        isValid: !this.$v.valueInput.$invalid,
      });
    },
  },
  validations() {
    let valueInput = {
      email,
    };
    if (this.fields.required) {
      valueInput.required = required;
    }
    if (this.fields.minLength) {
      valueInput.minLength = minLength(this.fields.minLength);
    }
    if (this.fields.maxLength) {
      valueInput.maxLength = maxLength(this.fields.maxLength);
    }
    return {
      valueInput,
    };
  },
  computed: {
    isRequiredField: function() {
      return this.$v.valueInput.hasOwnProperty('required');
    },
    isMinLengthField: function() {
      return this.$v.valueInput.hasOwnProperty('minLength');
    },
    isMaxLengthField: function() {
      return this.$v.valueInput.hasOwnProperty('maxLength');
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

input {
  width: 100%;
  height: 40px;
  padding: 6px 10px;

  &:focus {
    outline: none;
  }
}
input.input-error{
  border: 1px solid red !important;
}
</style>