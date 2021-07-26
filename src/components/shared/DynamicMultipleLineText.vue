<template>
  <div class="form-group col-12">
    <label v-if="this.fields.title" :for="fields.itemId" :class="this.fields.labelCssClass" class="d-block">{{this.fields.title}} <span v-if="fields.required" class="asterisk">*</span></label>
    <textarea :maxlength="fields.maxLength" :rows="fields.rows" @input="inputChange" :id="fields.itemId" v-model='valueInput' :placeholder="fields.placeholderText" 
    :class="errorMessages && errorMessages.length ? 'textarea-error '+this.fields.cssClass : this.fields.cssClass">
    </textarea>
    <div class="error-invalid" :key="index" v-for="(message, index) in errorMessages">{{message}}</div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'DynamicMultipleLineText',
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    error: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    inputChange (event) {
      // this.$v.valueInput.$touch();
      this.$emit('on:change', {
        value: event.target.value,
        id: this.fields.itemId,
        // isValid: !this.$v.valueInput.$invalid,
        isValid: true,
      });
    },
  },
  data () {
    return {
      valueInput: this.fields.value ? this.fields.value : '',
    }
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
}
</script>
<style lang="scss" scoped>
textarea {
  width: 100%;
}
textarea.textarea-error{
  border: 1px solid red;
}
</style>