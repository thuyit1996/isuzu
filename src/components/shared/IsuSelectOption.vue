<template>
  <div class="isu-select-option">
    <label v-if="textLable">
      {{textLable}}
      <span class="required" v-if="required">*</span>
    </label>
    <select  @change="onSelect($event)" v-model="selectKey">
      <option :value="''" disabled selected class="d-none">{{placeholder}}</option>
      <option :key="index" v-for="(option, index) in listOptions" :value="option.label">{{option.label}}</option>
    </select>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'IsuSelectOption',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    textLable: String,
    required: Boolean,
    placeholder: '',
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
    defaultValue: '',
  },
  data () {
    return {
      selectKey: '',
    };
  },
  mounted() {

  },
  watch: {
    valSelect(newValue) {
      if (!newValue.id) {
        this.selectKey = this.defaultValue;
      }
    },
  },
  methods: {
    onSelect ($event) {
      let eventLabel = $event.target.value;
      let selectedOption = this.listOptions.find(option => {
        return option.label == eventLabel;
      });
      this.$emit('onChangeSelect', {
        value: selectedOption,
        name: this.nameSelect,
      });
    },
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
</style>
