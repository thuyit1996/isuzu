<template>
  <div class="home-page">
    <sc-placeholder name="home-content" :rendering="rendering" />
  </div>
</template>

<script>
// import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
export default {
  name: 'HomePage',
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
<style lang="scss" scoped>
.home-page {
  .title {
    font-size: 24px;
    font-weight: 700;
    margin-top: 60px;
  }
}
</style>
