<template>
  <div>
    <sc-placeholder name="iframe-content" :rendering="rendering" />
  </div>
</template>

<script>
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
export default {
  name: 'IframePage',
  components: {
    ScPlaceholder: IsuPlaceholder,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
