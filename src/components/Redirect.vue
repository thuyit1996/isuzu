<template>
  <div class="catalog-tag">
    <sc-image v-if="checkImage(fields.RedirectUrl)" :media="fields.RedirectUrl.value" class="catalog-tag__img"></sc-image>
  </div>
</template>

<script>
import { Text, Image } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'Redirect',
  components: {
    ScText: Text,
    ScImage: Image,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    checkImage(img) {
      return img?.value;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/app.scss';
.catalog-tag {
  &__img {
    display: block;
    margin: 0 auto;
    margin-top: -$mobile-header-height;
    height: auto;
    width: 100%;
  }
}
</style>