<template>
  <div v-clickoutside="onClickout" class="isu-select-custom" :data-name="nameSelect" :id="nameSelect">
    <label v-if="textLable" :class="lableClass">
      {{textLable}}
      <span class="required" v-if="required">*</span>
    </label>
    <div class="isu-select__custom"
    >
      <div :class="['isu-select__dropdown-toggle']" @click="showSelectOptions()">
        <div :class="['isu-select__items', {'open' : openDropdown}]" :id='"isu-select__items-"+nameSelect'>
          <div class="item d-none" :value="''" disabled selected>{{ placeholder }}</div>
          <div :class="['item', {activated : option.id === valSelectData.id}]" :key="index" v-for="(option, index) in listOptions" :value="option.id" @click="selecteOption(option.id, option.label)">{{option.label}}</div>
        </div>
        <div class="isu-select__selected-options" >
          <span class="isu-select__selected" :value="valSelectData.id">{{valSelectData.label}}</span>
          <div class="isu-select__actions">
            <i>
              <svg class="isu-select__open-indicator"></svg>
            </i>
          </div>
        </div>
      </div>
    </div>
    <span v-if="submitted && errorRequired && required" :class='"form-error form-error-"+formGroupName'>กรุณาเลือก{{formControlName}}</span>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name: 'IsuSelectCustom',
  components: {},
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    textLable: {
      type: String,
    },
    placeholder: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
    },
    listOptions: {
      type: Array,
      required: true,
    },
    valSelect: {
      type: Object,
      required: true,
    },
    nameSelect: {
      type: String,
      required: true,
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
  data() {
    return {
      submitted: false,
      errorRequired: false,
      openDropdown: false,
      valSelectData: this.valSelect,
      previouslySelectedValue: this.valSelect.id,
    };
  },
  mounted() {
    if (this.classLable) this.lableClass = this.classLable;
    else this.lableClass = '';
    this.submitForm();
  },
  methods: {
    showSelectOptions() {
      let idTag = '#isu-select__items-' + this.nameSelect;
      let optionsScrollHeight = this.$el.querySelector(idTag).scrollHeight;
      let optionsClientHeight = this.$el.querySelector(idTag).clientHeight;
      if (optionsClientHeight > 0) {
        this.$el.querySelector(idTag).style.height = 0;
        this.openDropdown = false;
      } else {
        this.$el.querySelector(idTag).style.height = optionsScrollHeight + 'px';
        if (optionsScrollHeight > 350) {
          this.$el.querySelector(idTag).style.overflowY = 'scroll';
        }
        this.openDropdown = true;
      }

      if (this.openDropdown) {
        $(this.$el)
          .find('.isu-select__open-indicator')
          .addClass('up');
      } else {
        $(this.$el)
          .find('.isu-select__open-indicator')
          .removeClass('up');
      }
    },
    selecteOption(selectId, selecteLabel) {
      $(this.$el)
        .find('.isu-select__items .item')
        .addClass('no-hover');
      this.valSelectData = {
        id: selectId,
        label: selecteLabel,
      };
      setTimeout(() => {
        $(this.$el)
          .find('.isu-select__items .item')
          .removeClass('no-hover');
      }, 500);

      // INFO: when selecting the same options, don't emit the event ( similar to isuSelect )
      if (this.valSelectData.id === this.previouslySelectedValue) return;
      this.previouslySelectedValue = this.valSelectData.id;
      this.$emit('onChangeSelect', {
        value: this.valSelectData,
        name: this.nameSelect,
      });
    },
    submitForm() {
      this.$root.$on('submitForm', (form) => {
        if (form === this.formGroupName) {
          this.submitted = true;
          if (this.valSelectData) {
            this.errorRequired = false;
          } else {
            this.errorRequired = true;
          }
        }
      });
    },
    onClickout() {
      if (this.openDropdown) {
        this.showSelectOptions();
      }
    },
  },
  watch: {
    valSelect: function(newVal) {
      this.valSelectData = newVal;
      this.previouslySelectedValue = newVal.id;
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
.isu-select__open-indicator {
  background: url('../../assets/select-car-compare-mobile.svg');
  background-size: 14px;
  background-repeat: no-repeat;
  height: 10px;
  width: 17px;

  @include media-breakpoint-up(lg) {
    background: url('../../assets/select-car-compare.svg');
    background-size: 17px;
    background-repeat: no-repeat;
    width: 17px;
    height: 10px;
  }
}
.isu-select__dropdown-toggle {
  border-bottom: solid 1px #ccc;
  padding: 0 10px 12px 5px;

  @include media-breakpoint-up(lg) {
    padding: 10px 10px 10px 5px;
  }
}
.isu-select-custom {
  margin-bottom: 20px;
  width: 100%;
  
  label {
    margin-bottom: 8px;
  }

  .required {
    color: #ee3026;
  }

  .form-error {
    color: red;
    text-align: left;
  }
  .isu-select__items {
    background-color: #ffffff;
  }
  .isu-select__custom {
    .isu-select__dropdown-toggle {
      overflow: hidden;
      cursor: pointer;
      .isu-select__items {
        height: 0;
        transition: height 0.5s ease;
        overflow: hidden;
        position: absolute;
        left: 0;
        width: 100%;
        bottom: calc(100% - 1px);
        z-index: 2;
        .item:not(.no-hover):hover,
        .activated {
          color: #fff;
          background-color: #a1a1a1;
        }
        .item {
          text-align: left;
          width: 100%;
          padding: 12px 30px 12px 18px;
          border-bottom: 1px solid #e3e3e3;
          cursor: pointer;
        }
      }
      .isu-select__selected-options {
        text-align: left;
        width: 100%;
        padding: 5px 12px 5px 12px;
        border: none;
        overflow: hidden;
        flex-wrap: nowrap;
        .isu-select__actions {
          display: inline-block;
          position: relative;
          padding: 0px 5px 0 3px;
          float: right;
          .isu-select__open-indicator.up {
            transform: rotate(180deg);
            transition: transform 150ms cubic-bezier(1, -0.115, 0.975, 0.855);
          }
          .isu-select__open-indicator {
            transition: transform 150ms cubic-bezier(1, -0.115, 0.975, 0.855);
          }
        }
      }
      .open {
        max-height: 350px;
        border: 1px solid #e3e3e3;
      }
    }
  }
}
</style>