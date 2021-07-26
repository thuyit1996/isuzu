<template>
  <div>
    <form class="row campaign-form" :class="formClass">
      <component :id="formSessionId.value" @on:submit="onSubmitHandler" @on:change="onChangeHandler"  v-bind:key="index" v-for="(formElement,index) in formFields.fields" v-bind:is="getElementName(formElement.model.fieldTypeItemId)" :fields="formElement.model" :error="formErrors"></component>
    </form>
    <isu-popup ref="ResultSubmitForm" :isLoading="isLoading" :size="'sm'" :type="typePopup">
      <p class="text-center">{{resultSubmitForm}}</p>
    </isu-popup>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { FieldTypes } from './fieldTypes.js';
import DynamicFormButton from './DynamicFormButton';
import DynamicFormInput from './DynamicFormInput';
import DynamicCheckbox from './DynamicCheckbox';
import DynamicFormEmail from './DynamicFormEmail';
import DynamicMultipleLineText from './DynamicMultipleLineText';
import DynamicFormText from './DynamicFormText';
import DynamicRecapcha from './DynamicRecapcha';
import { submitSitecoreForm } from '../../service/genericService';
import IsuPopup from '../shared/IsuPopup';


export default {
  name: 'SitecoreForm',
  components: {
    ScText: Text,
    DynamicFormInput: DynamicFormInput,
    DynamicFormButton: DynamicFormButton,
    DynamicCheckbox: DynamicCheckbox,
    DynamicFormEmail: DynamicFormEmail,
    DynamicMultipleLineText: DynamicMultipleLineText,
    DynamicFormText: DynamicFormText,
    DynamicRecapcha: DynamicRecapcha,
    IsuPopup: IsuPopup,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    formName : {
      type : String,
      default : '',
    }
  },
  data() {
    return {
      formFields: this.fields,
      formErrors: null,
      htmlPrefix: null,
      formSessionId: {
        value: ''
      },
      formItemId: null,
      pageItemId: null,
      antiForgeryToken: null,
      fieldsMap: null,
      formData: {},
      formValidStatus: {},
      formClass: '',
      resultSubmitForm: '',
      typePopup: '',
      isLoading : false,
      submitFormFailed: this.$getConst('SUBMIT_FORM_FAILED'),
      submitFormSuccess : ''
    };
  },
  mounted () {
    this.submitFormSuccess =  this.formName === 'contactUs' ? this.$getConst('SUBMIT_FORM_CONTACT_US_SUCCESSFUL') :  this.$getConst('SUBMIT_FORM_SUCCESSFUL');
    if (!this.fields?.fields) return;
    this.formClass = this.fields?.metadata?.cssClass;
    let { htmlPrefix, formSessionId, formItemId, pageItemId, antiForgeryToken, fields } = this.fields;
    this.htmlPrefix = htmlPrefix;
    this.formSessionId = formSessionId;
    this.formItemId = formItemId;
    this.pageItemId = pageItemId;
    this.antiForgeryToken = antiForgeryToken;
    fields.forEach(field => {
      if (field.fieldIdField) {
        this.formData[field.indexField.value] = field.model.value;
      }
    }); 

    this.fieldsMap = new Map();
    this.fieldsMap.set(FieldTypes.SingleLineText, 'DynamicFormInput');
    this.fieldsMap.set(FieldTypes.Button, 'DynamicFormButton');
    this.fieldsMap.set(FieldTypes.Checkbox, 'DynamicCheckbox');
    this.fieldsMap.set(FieldTypes.Email, 'DynamicFormEmail');
    this.fieldsMap.set(FieldTypes.MultipleLineText, 'DynamicMultipleLineText');
    this.fieldsMap.set(FieldTypes.TextField, 'DynamicFormText');
    this.fieldsMap.set(FieldTypes.CustomRecapcha, 'DynamicRecapcha');

  },
  computed: {
    getElementName: function() {
      return (elementId) => {
        if (this.fieldsMap) {
          return this.fieldsMap.get(elementId) ? this.fieldsMap.get(elementId) : '';
        }
        return '';
      };
    },
  },

  methods: {
    onChangeHandler (event) {
      this.formData[event.id] = event.value;
      this.formValidStatus[event.id] = event.isValid;
    },
    checkForValidatedForm() {
      this.$root.$emit(`form:touch${this.formSessionId.value}`);
      return this.$nextTick(() => {
        let formValidation = true;
        for (let inputId in this.formValidStatus) {
          if (!this.formValidStatus[inputId]) {
            formValidation = false;
            break;
          }
        }
        // INFO: disable validation logic as sitecore form
        // if (formValidation) {
        //   this.submit();
        // }
        this.submit()
      });
    },
    onSubmitHandler() {
      this.checkForValidatedForm(); 
    },
    submit() {
      let body = [];
      body.push({
        key: `${this.htmlPrefix}.FormSessionId`,
        value: this.formSessionId.value,
      });
      body.push({
        key: `__RequestVerificationToken`,
        value: this.antiForgeryToken.value,
      });
      body.push({
        key: `${this.htmlPrefix}.FormItemId`,
        value: this.formItemId.value,
      });
      body.push({
        key: `${this.htmlPrefix}.PageItemId`,
        value: this.pageItemId.value,
      });
      this.formFields.fields.forEach(field => {
        if (field.buttonField) { // case for button
          body.push({
            key: field.buttonField.name,
            // value: field.buttonField.value, // or it should be field.model.title???
            value: field.model.title,
          });
          body.push({
            key: field.navigationButtonsField.name,
            value: field.navigationButtonsField.value,
          });
          body.push({
            key: field.navigationStepField.name,
            value: field.navigationStepField.value,
          });
        } else if (field.fieldIdField) { // case for input
          body.push({
            key: `${this.htmlPrefix}.Fields.Index`,
            value: field.fieldIdField.value,
          });
          body.push({
            key: `${this.htmlPrefix}.Fields[${field.fieldIdField.value}].ItemId`,
            value: field.fieldIdField.value,
          });
          body.push({
            key: `${this.htmlPrefix}.Fields[${field.fieldIdField.value}].Value`,
            value: this.formData[field.fieldIdField.value],
          });
        }
      });
      this.isLoading = true;
      this.typePopup = 'waiting-popup';
      this.resultSubmitForm = 'Loading...';
      this.$refs.ResultSubmitForm.showModal();
      submitSitecoreForm(
        this.formFields.metadata.itemId,
        this.htmlPrefix,
        this.toUrlEncodedFormData(body)
      ).then((res) => {
        this.isLoading = false;
        if (res.status === 200) {
          this.typePopup = 'successful-popup';
          this.resultSubmitForm = this.submitFormSuccess;
          if (res.data?.nextForm) {
            this.formFields = res.data?.nextForm;
            this.formErrors = res.data?.validationErrors;
          }
        }
      }).catch((error) => {
        this.isLoading = false;
        if (error.response?.status === 400) {
          this.typePopup = 'failed-popup';
          this.resultSubmitForm = this.submitFormFailed;
          if (error.response?.data?.nextForm) {
            this.formFields = error.response?.data?.nextForm;
            this.formErrors = error.response?.data?.validationErrors;
          }
        }
      });
    },
    // INFO: this function is taken from sitecore-jss-react library
    toUrlEncodedFormData(data) {
      return data
        .map((entry) => `${encodeURIComponent(entry.key)}=${encodeURIComponent(entry.value)}`)
        .join('&')
        .replace(/%20/g, '+');
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

// .form-group {
//   padding-bottom: 20px;
// }

>>> .campaign-form {
  &__title {
    width: 100%;
    text-align: center;
    margin-bottom: 30px;

    .dynamic-text {
      display: inline-block;
      position: relative;
      padding: 0 12px;
      max-width: 72%;

      @include media-breakpoint-up(md) {
        padding: 0 20px;
        max-width: 90%;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 25px;
        height: 1px;
        background: #ed2117;

        @include media-breakpoint-up(lg) {
          height: 2px;
          width: 50px;
        }
      }

      &::before {
        left: 100%;
      }

      &::after {
        right: 100%;
      }
    }
  }

  &__content {
    .form-group {
      width: 100%;
      margin-bottom: 10px;

      @include media-breakpoint-up(lg) {
        margin-bottom: 25px;
      }

      .form-label {
        display: block;
      }
    }
  }

  .checkbox-custom {
    position: relative;
    cursor: pointer;
    color: #8f8f8f;
    margin: 0 0 0 25px;
    max-width: 95%;

    input {
      position: absolute;
      top: 3px;
      left: -15px;
      opacity: 0;
      width: 20px;
      cursor: pointer;
      color: #8f8f8f;
      margin: 0 -20px 0 -3px;

      @include media-breakpoint-up(lg) {
        margin: 0;
        top: 6px;
        left: -25px;
      }
    }

    input:checked ~ .checkmark:after {
      display: block;
    }

    .checkmark {
      position: absolute;
      top: 3px;
      left: -20px;
      width: 14px;
      height: 14px;
      background-color: #f3f3f3;
      border: 1px solid #919191;
      border-radius: 2px;

      @include media-breakpoint-up(lg) {
        height: 16px;
        width: 16px;
        top: 6px;
        left: -25px;
      }

      &::after {
        content: '';
        display: none;
        position: absolute;
        width: 14px;
        height: 14px;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background-image: url('../../assets/check-icon.svg');
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: 70%;

        @include media-breakpoint-up(lg) {
          height: 16px;
          width: 16px;
        }
      }
    }
  }

  .form-button {
    padding: 4px 0;
    min-width: 152px;
    color: $white;
    background: $gray-700;
    border-radius: 50px;
    cursor: pointer;
    border: none;

    @include media-breakpoint-up(lg) {
      padding: 10px 0;
      min-width: 175px;
    }
  }
  // .form-button {
  //   font-size: 18px;
  //   padding: 4px 0;
  //   min-width: 152px;
  //   color: $white;
  //   background: $gray-700;
  //   border-radius: 50px;
  //   cursor: pointer;
  //   border: none;

  //   @include media-breakpoint-up(lg) {
  //     font-size: 23px;
  //     padding: 10px 0;
  //     min-width: 175px;
  //   }
  // }

  .form-group-checkbox {
    margin-bottom: 5px;
    padding-bottom: 15px;
  }

  .form-group-button {
    padding-top: 10px;
  }

  .asterisk {
    color: #cd0002;
  }

  .text-center {
    text-align: center;
  }

  .error-required,
  .error-invalid {
    color: red;
  }
}
</style>
