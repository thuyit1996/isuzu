<template>
  <div>
    <sc-placeholder name="accessory-detail-content" :rendering="rendering" />
  </div>
</template>

<script>
import IsuPlaceholder from '../components/shared/IsuPlaceholder';

export default {
  name: 'AccessoryDetailPage',
  components: {
    ScPlaceholder: IsuPlaceholder,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    rendering: {
      type: Object
    },
  }
}
</script>
