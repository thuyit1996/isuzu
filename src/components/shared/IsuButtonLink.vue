<template>
  <div  v-bind:class="isShowButton() ? 'show' : 'hidden'">
    <slot></slot>
  </div>
</template>

<script>
import { Link } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'IsuButtonLink',
  components: {
    ScLink: Link,
  },
  props: {
    field: {
      type: Object,
    },
  },
  methods : {
    isShowButton() {
      return this.field?.value?.href?.length > 0;
    }
  },
}
</script>
<style lang="scss" scoped>
.show {
  display: block;
}

.hidden {
  display: none;
}
</style>




