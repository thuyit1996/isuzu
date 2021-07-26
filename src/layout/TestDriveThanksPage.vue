<template>
  <div>
    <sc-placeholder name="test-drive-thanks-content" :rendering="rendering" />
  </div>
</template>

<script>
import IsuPlaceholder from '../components/shared/IsuPlaceholder';

export default {
  name: 'TestDriveThanksPage',
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
