<template>
  <div>
    <sc-placeholder name="find-dealer-content" :rendering="rendering" />
  </div>
</template>

<script>
// import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../components/shared/IsuPlaceholder';

export default {
  name: 'FindDealerPage',
  components: {
    ScPlaceholder: IsuPlaceholder,
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
