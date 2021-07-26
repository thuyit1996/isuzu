<template>
  <div class="isu-select">
    <label v-if="lable" :class="lableClass">
      {{textLable}}
      <span class="required" v-if="requiredSelect">*</span>
    </label>
    <!-- https://vue-select.org/api/props.html#searchable -->
    <v-select
      :options="listOptions"
      :placeholder="placeholderSelect"
      :name="nameSelect"
      :value="valueSelect.label"
      :class="(submitted && errorRequired && required) ? 'select-error' : ''"
      @input="selectChoose"
      :searchable="false"
    >
    <span slot="no-options">กรุณาเลือกตัวเลือกด้านบนก่อน</span>
      <!-- <template slot="selection" scope="data">{{data.ItemId}}</template> -->
    </v-select>
    <span v-if="submitted && errorRequired && required" :class='"form-error form-error-"+formGroupName'>กรุณาเลือก{{formControlName}}</span>
  </div>
</template>

<script>
export default {
  name: 'IsuSelect',
  components: {},
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    textLable: String,
    required: Boolean,
    placeholder: String,
    classLable: String,
    classSelect: String,
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
    formGroupName: {
      type: String,
    },
    formControlName: {
      type: String,
    },
  },
  data() {
    return {
      valueSelect: this.valSelect,
      requiredSelect: false,
      lable: false,
      placeholderSelect: '',
      lableClass: '',
      selectClass: '',
      submitted: false,
      errorRequired: false,
      selectedValue: null,
    };
  },
  mounted() {
    this.$root.$on('submitForm', (form) => {
      if (this.formGroupName == form) {
        this.submitted = true;
        if (this.valueSelect.id) {
          this.errorRequired = false;
        } else {
          this.errorRequired = true;
        }
      }
    });
    if (this.textLable) {
      if (this.textLable.length > 0) this.lable = true;
      else this.lable = false;
    } else {
      this.lable = false;
    }
    if (this.classLable) this.lableClass = this.classLable;
    else this.lableClass = '';

    if (this.classSelect) this.selectClass = this.classSelect;
    else this.selectClass = '';

    if (this.placeholder) this.placeholderSelect = this.placeholder;
    else this.placeholderSelect = '';

    if (this.required) this.requiredSelect = true;
    else this.requiredSelect = false;
  },
  methods: {
    selectChoose(selectValue) {
      this.selectedValue = selectValue;
      this.valueSelect = selectValue;
      this.errorRequired = false;
      this.$nextTick(() => {
        this.$emit('onChangeSelect', {
          value: selectValue,
          name: this.nameSelect,
        });
      });
    },
  },
  watch: {
    valSelect: function(newVal) {
      this.valueSelect = newVal;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.isu-select {
  display: flex;
  flex-direction: column;
  line-height: 1.8rem; //INFO: Line-height follow as the design
  margin-bottom: 20px;

  @include media-breakpoint-up(lg) {
    line-height: 2.4rem; //INFO: Line-height follow as the design
  }

  label {
    margin-bottom: 8px;
  }

  .required {
    color: #ee3026;
  }

  >>> .v-select {
    width: 100%;

    @include media-breakpoint-up(lg) {
      width: 360px;
    }
  }

   >>> .v-select.select-error{
     & >.vs__dropdown-toggle{
       border: 1px solid red;
     }
   }
  
  & >>> .vs__dropdown-toggle {
    border: 1px solid #b7b7b7;
    border-radius: 0;
    cursor: pointer;
    padding: 2px 0 5px 0;
    width: 100%;
  }

  & >>> .vs__selected-options {
    width: 90%;
    overflow: hidden;
    flex-wrap: nowrap;
  }

  & >>> .vs__search {
    cursor: pointer;
    width: 0;
    padding: 0 3px;
  }

  & >>> .vs__actions {
    padding: 4px 15px 0 3px;
    // INFO: remove this because it make the arrow unclickable
    // &::after {
    //   content: '';
    //   width: 15px;
    //   height: 15px;
    //   background: url('../../assets/arrow-select.svg');
    //   background-position: center;
    //   background-repeat: no-repeat;
    //   background-size: 11px;

    //   @include media-breakpoint-up(lg) {
    //     background-size: 13px;
    //   }
    // }
  }

  // TODO: text overflow will break the layout off select, need to do it for other screensize as well
  >>> .vs__selected {
    overflow: hidden;
    white-space: nowrap;
  }

  >>> .vs--open {
    .vs__selected {
      width: 98%;
    }

    .vs__search {
      height: auto;
    }
  }

  & >>> .vs__open-indicator {
    background: url('../../assets/arrow-select.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 11px;

    @include media-breakpoint-up(lg) {
      background-size: 13px;
    }

    * {
      display: none;
    }
  }

  >>> .vs__dropdown-menu{
    padding: 0;
  }

  >>> .vs__dropdown-option{
    padding: 3px 10px;
    border: none;
  }

  >>> .vs__dropdown-option--highlight {
    background-color: $gray-400;
    color: $white;
  }

  & >>> .vs__clear {
    display: none;
  }

  .form-error {
    color: red;
    text-align: left;
  }
}
</style>