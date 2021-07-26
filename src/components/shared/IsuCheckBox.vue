<template>
  <div class="isu-checkbox">
    <input 
    :type="typeCheckbox"
    :id="idCheckbox" 
    :name="nameCheckbox"
    v-model="valCheckbox"
    @click="onClick()">
    <label :for="idCheckbox">
      {{textVal}}
      <span class="required" v-if="required">*</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'IsuCheckBox',
  components: {},
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    typeCheckbox: {
      type: String,
      required: true,
    },
    idCheckbox: {
      type: String,
      required: true,
    },
    nameCheckbox: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
    required: {
      type: Boolean,
    },
    textVal: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      valCheckbox: true,
    };
  },
  mounted() {
    this.valCheckbox = this.checked;
  },
  methods: {
    onClick() {
      this.$nextTick(() => {
        this.$emit('checkboxClick', {
          value: this.valCheckbox,
          name: this.nameCheckbox,
        });
      });
    },
  },
  watch : {
    checked : function(val){
      this.valCheckbox = val;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.isu-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;

  input {
    opacity: 0;
    width: 14px;
    height: 14px;
    cursor: pointer;

    @include media-breakpoint-up(lg) {
      width: 16px;
      height: 16px;
    }

    &:checked + label:before {
      background-image: url('../../assets/check-icon.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: 70%;
    }
  }

  label {
    margin: 0 8px;
    display: inline-block;
    cursor: pointer;

    &:before {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: #f3f3f3;
      border: 1px solid #919191;
      border-radius: 2px;

      @include media-breakpoint-up(lg) {
        width: 16px;
        height: 16px;
      }
    }
  }

  .required {
    color: #ee3026;
  }
}
</style>
