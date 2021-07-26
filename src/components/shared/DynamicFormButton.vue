<template>
  <div class="form-group col-12 text-center form-group-button">
    <button class="i-btn i-btn__primary--none-active ripple" @click="onSubmit" type="button" :name="this.fields.name">{{this.fields.title}}</button>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'DynamicFormButton',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onSubmit() {
      this.$emit('on:submit');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.form-group-button {
  @include ripple($primary-bgr);
}

</style>
