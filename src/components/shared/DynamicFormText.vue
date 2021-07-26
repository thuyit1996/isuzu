<template>
  <div :class="fields.cssClass">
    <dynamic-text class="dynamic-text" :tag="fields.htmlTag">{{fields.text}}</dynamic-text>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'DynamicFormText',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
