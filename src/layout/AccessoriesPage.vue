<template>
  <div>
    <sc-placeholder name="accessories-content" :rendering="rendering" />
  </div>
</template>

<script>
import IsuPlaceholder from '../components/shared/IsuPlaceholder';

export default {
  name: 'AccessoriesPage',
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
    this.$root.$emit('AccessoriesPageData', this.fields);
  }
}
</script>
