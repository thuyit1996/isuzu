<template>
  <div class="isu-select-option-mux">
    <label v-if="textLable" :class="lableClass">
      {{textLable}}
      <span class="required" v-if="required">*</span>
    </label>
    <select  
      @change="onSelect($event)" 
      v-model="selectKey" 
      :class="(submitted && errorRequired && required) ? 'select-error' : ''"
    >
      <option :value="''" disabled selected class="d-none">{{placeholder}}</option>  
      <option :key="index" v-for="(option, index) in listOptions" :value="option.id">{{option.label}}</option>
    </select>
    <span v-if="submitted && errorRequired && required" :class='"form-error form-error-"+formGroupName'>กรุณาเลือก{{formControlName}}</span>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'IsuSelectOptionMux',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    textLable: {
      type: String,
    },
    required: {
      type: Boolean,
    },
    placeholder: {
      type: String,
      default: '',
    },
    valSelect: {
      type: Object,
      required: true,
    },
    nameSelect: {
      type: String,
      required: true,
    },
    listOptions: {
      type: Array,
      required: true,
    },
    defaultValue: {
      type: String,
      default: '',
    },
    classLable: {
      type: String,
    },
    formGroupName: {
      type: String,
    },
    formControlName: {
      type: String,
    },
  },
  data () {
    return {
      selectKey: '',
      lableClass: '',
      submitted: false,
      errorRequired: false,
    };
  },
  mounted() {
    if (this.classLable) this.lableClass = this.classLable;
    else this.lableClass = '';
    this.submitForm();
  },
  watch: {
    valSelect: {
      handler: function(newValue) {
        if (newValue.id) {
          this.selectKey = newValue.id;
        } else {
          this.selectKey = '';
        }
      },
      immediate: true,
    },
  },
  methods: {
    onSelect ($event) {
      let eventValue = $event.target.value;
      if (eventValue) {
        this.errorRequired = false;
      }
      let selectedOption = this.listOptions.find(option => {
        return option.id == eventValue;
      });
      this.$emit('onChangeSelect', {
        value: selectedOption,
        name: this.nameSelect,
      });
    },

    submitForm() {
      this.$root.$on('submitForm', (form) => {
        if (form === this.formGroupName) {
          this.submitted = true;
          if(this.selectKey) {
            this.errorRequired = false;
          } else {
            this.errorRequired = true;
          }
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
select {
  width: 100%;
  height: 39px;
  padding: 0 10px;
  border: 1px solid #cdcdcd;
  background: url('../../assets/arrow-select.svg') no-repeat, #fff;
  background-position-x: calc(100% - 15px);
  background-position-y: 50%;
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
  }
}

select {
  /* for Firefox */
  -moz-appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
}

/* For IE10 */
select::-ms-expand {
  display: none;
}

.form-error {
  color: red;
  text-align: left;
}

.select-error {
  border: 1px solid red !important;
}

.required {
  color: #ee3026;
}
</style>
