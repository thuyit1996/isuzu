<template>
  <div>
  </div>
</template>

<script>

export default {
  name: 'LastSearchDealer',
  components: {
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.$root.$emit('lastSearchDealerTitle', this.fields.Title);
  },
}
</script>
