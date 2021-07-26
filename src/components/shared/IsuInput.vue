<template>
  <div class="isu-input">
    <label :for="nameInput" v-if="lable"> {{textLable}}
      <span class="required" v-if="requiredInput">*</span>
    </label>
    <input
    :type="typeInput"
    class="input-control"
    :disabled="disabled"
    v-model="valueInput"
    :placeholder="placeholderInput"
    :name="nameInput"
    :id="nameInput"
    @blur="onChange"
    @input="onKeyUp"
    @keydown="onKeyDown"
    :class="
      (submitted && !$v.valueInput.required && required) ||  
      (submitted && !$v.valueInput.email  && pattern == 'email') || 
      (submitted && !$v.valueInput.phone  && pattern == 'phone') ? 'input-error' : ''"
    >
    <span v-if="submitted && !$v.valueInput.required && required" :class='"form-error form-error-"+formGroupName'>กรุณาระบุ{{formControlName}}</span>
    <span v-if="submitted && !$v.valueInput.email  && pattern == 'email'" :class='"form-error form-error-"+formGroupName'>กรุณาระบุอีเมลที่ถูกต้อง</span>
    <span v-if="submitted && !$v.valueInput.phone  && pattern == 'phone'" :class='"form-error form-error-"+formGroupName'>กรุณาระบุเบอร์โทรศัพท์ที่ถูกต้อง (10ตัว)</span>
  </div>
</template>

<script>
import { required, minLength, between, email , helpers  } from 'vuelidate/lib/validators';
function reverseString(str) {
  return str.split("").reverse().join("");
}
export function addSemiColon(value) {
  let sanitizeValue = value.toString();
  if (value[0] === '-') {
    sanitizeValue = value.split('-')[1];
  }
  let decimal = sanitizeValue.split('.')[0];
  let floatNum = sanitizeValue.split('.')[1];
  let newDecimal = '';
  if (decimal && decimal.length > 3) {
    decimal = decimal.split(',').join('');
    for (let index = decimal.length; index -- ; index > -1) {
      newDecimal += decimal[index];
      if ((decimal.length - index)%3 === 0 && 0 !== index) {
        newDecimal += ",";
      }
    }
    let returnString = '';
    returnString = reverseString(newDecimal);
    if (floatNum !== undefined) {
      returnString += '.' + floatNum.toString();
    }
    if (value[0] === '-') {
      returnString = '-' + returnString;
    }
    return returnString;
  }
  return value;
}
function sanitizeNumber(number) {
  return parseFloat(number.toString().split(',').join(''));
}

export default {
  name: 'IsuInput',
  components: {},
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    textLable: String,
    required: Boolean,
    disabled: Boolean,
    placeholder: String,
    typeInput: {
      type: String,
      required: true,
    },
    valInput: {
      type: String,
      required: true,
    },
    nameInput: {
      type: String,
      required: true,
    },
    pattern: {
      pattern: String,
    },
    formGroupName: {
      type: String,
    },
    formControlName: {
      type: String,
    },
    isNumber: false,
    maxValue: {
      type: Number,
    }
  },
  data() {
    return {
      valueInput: '',
      requiredInput: false,
      lable: false,
      placeholderInput: '',
      submitted: false,
    };
  },
  watch: {
    valInput() {
      if (this.isNumber) {
        this.valueInput = addSemiColon(this.valInput);
      } else {
        this.valueInput = this.valInput;
      }
    },
  },
  validations: {
    valueInput: {
      required,
      email,
      phone: helpers.regex('alpha', /^0([0-9]){8,9}$/),
    },
  },
  mounted() {
    this.$root.$on('submitForm', (form) => {
      if (this.formGroupName == form) {
        this.submitted = true;
      }
    });
    if (this.textLable) {
      if (this.textLable.length > 0) this.lable = true;
      else this.lable = false;
    } else {
      this.lable = false;
    }

    if (this.placeholder) this.placeholderInput = this.placeholder;
    else this.placeholderInput = '';

    if (this.required) this.requiredInput = true;
    else this.requiredInput = false;

    if (this.isNumber) {
      this.valueInput = addSemiColon(this.valInput);
    } else {
      this.valueInput = this.valInput;
    }
    this.$root.$on('setFlagSubmitForm',() => {
      this.submitted = false;
    })
  },
  methods: {
    onChange(e) {
      this.$nextTick(() => {
        this.$emit('inputChange', {
          data: this.valueInput,
          name: this.nameInput,
          valid: this.pattern ? this.$v.valueInput[`${this.pattern}`] : true,
        });
      });
    },
    onKeyUp(event){
      if (!this.isNumber) return;
      // INFO : check if user input number [0.1 => 1]
      if (event.target.value[0] == '0') {
        if(event.target.value.length >= 2 && event.target.value[1] != '.'){
          this.valueInput = event.target.value.slice(1);
        }
      }
      if(this.maxValue){
        if(sanitizeNumber(this.valueInput) > this.maxValue && this.maxValue.toString().length <= 3){
          this.valueInput = this.maxValue.toString();
        }else if(sanitizeNumber(this.valueInput) > this.maxValue){
          event.target.value =  this.maxValue.toString();
          this.transformValueInput(event);
        }
      }else{
        this.transformValueInput(event); 
      }
    },
    transformValueInput(event){
      let decimal = event.target.value.split('.')[0];
      let floatNum = event.target.value.split('.')[1];
      let newDecimal = '';
      if (decimal && decimal.length > 3) {
        decimal = decimal.split(',').join('');
        for (let index = decimal.length; index -- ; index > -1) {
          newDecimal += decimal[index];
          if ((decimal.length - index)%3 === 0 && 0 !== index) {
            newDecimal += ",";
          }
        }
        let returnString = '';
        returnString = reverseString(newDecimal);
        if (floatNum !== undefined) {
          returnString += '.' + floatNum.toString();
        }
        this.valueInput = returnString;
      }
    },
    onKeyDown(event) {
      if (!this.isNumber) return;

      let keyCode = event.keyCode;
      if (event.shiftKey) {
        event.preventDefault();
        return;
      }
      // INFO: only allow left/right/backspace/comna 1 time and number
      if ((keyCode !== 9 &&  keyCode !== 8 && keyCode !== 37 && keyCode !== 39 && keyCode !== 190 && keyCode !== 110) && (48 > keyCode || 57 < keyCode) && (105 < keyCode || 96 > keyCode) ) {
        event.preventDefault();
        return;
      }

      if ((keyCode === 190 || keyCode === 110) && event.target.value.indexOf('.') >= 0) {
        event.preventDefault();
        return;
      }


      if (event.target.value.split('.')[1]?.length > 1 && ((48 <= keyCode && 57 >= keyCode) || (96 <= keyCode && 105 >= keyCode))) {
        event.preventDefault();
        return;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
input {
  outline: none;
  border: 1px solid #b7b7b7;
}

.isu-input {
  display: flex;
  flex-direction: column;
  line-height: 1.8rem; //INFO: Line-height follow as the design
  margin-bottom: 18px;

  @include media-breakpoint-up(lg) {
    line-height: 2.4rem; //INFO: Line-height follow as the design
  }

  label {
    margin-bottom: 8px;
  }

  .input-control {
    padding: 8px 10px;
    color: $gray-700;
  }

  .required {
    color: #ee3026;
  }
}

.form-error {
  color: red;
  text-align: left
}

.input-error{
  border: 1px solid red;
}
</style>
