<template>
  <div>
    <sc-placeholder name="register-iframe-content" :rendering="rendering" />
  </div>
</template>

<script>
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
export default {
  name: 'RegisterIframePage',
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
