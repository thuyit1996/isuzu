<template>
  <div>
    <sc-placeholder name="test-drive-content" :rendering="rendering" />
  </div>
</template>

<script>
// import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: 'TestDrivePage',
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
    let thankUrlMapping = this.fields.DataMapping;
    this.updateThankUrlList(thankUrlMapping);
  },
  methods: {
    ...mapActions('testdrive', ['updateThankUrlList']),
  }
}
</script>
