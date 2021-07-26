<template>
  <div >
    <sc-placeholder name="campaign-register-content" :rendering="rendering" />
  </div>
</template>

<script>
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
export default {
  name: 'CampaignRegisterPage',
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
  mounted() {
    this.$root.$emit('CampaignRegisterPageData', this.fields);
  }
}
</script>
