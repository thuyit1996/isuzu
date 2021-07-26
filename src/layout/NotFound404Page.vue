<template>
  <div>
    <sc-placeholder name="page-not-found-content" :rendering="rendering" />
  </div>
</template>

<script>
import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'NotFound404Page',
  components: {
    ScPlaceholder: Placeholder,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    rendering: {
      type: Object,
    },
  },
}
</script>
