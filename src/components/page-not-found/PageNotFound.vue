<template>
  <div class="page-not-found">
    <div class="container">
      <div class="text-center">
        <sc-text tag="h1" :field="fields.Title" />
        <sc-text tag="p" :field="fields.Description" />
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'PageNotFound',
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
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.page-not-found {
  padding: 90px 0;

  h1 {
    font-weight: 700;
  }
}
</style>
