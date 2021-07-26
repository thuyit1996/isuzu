<template>
  <div>
    <sc-placeholder name="campaign-thanks-content" :rendering="rendering" />
  </div>
</template>

<script>
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
export default {
  name: 'CampaignThanksPage',
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
