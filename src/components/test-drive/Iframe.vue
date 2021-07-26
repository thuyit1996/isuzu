<template>
  <div>
    <iframe :src="fields.Url.value"></iframe>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'Iframe',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      url: String,
    };
  },
  mounted() {
    this.url = this.fields.Url?.value || '';
  },
}
</script>
<style lang="scss" scoped>
iframe {
  width: 100%;
  height: calc(100vh - 48px);
}
</style>