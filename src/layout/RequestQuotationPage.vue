<template>
  <div>
    <sc-placeholder name="request-quotation-content" :rendering="rendering" />
  </div>
</template>

<script>
// import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
export default {
  name: 'RequestQuotationPage',
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
  data() {
    return {
      isRequestQuotation: true,
    };
  },
  mounted() {
    this.$root.$emit('isRequestQuotation', this.isRequestQuotation);
  }
}
</script>
