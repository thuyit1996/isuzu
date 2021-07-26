<template>
  <div >
    <!-- <subscribe-form></subscribe-form>
    <footer-navigation></footer-navigation> -->
    <sc-placeholder name="footer-content" :rendering="rendering" />
  </div>
</template>

<script>
// import SubscribeForm from '../components/shared/SubscribeForm';
// import FooterNavigation from '../components/footer/FooterNavigation';
// import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
export default {
  name: 'Footer',
  components: {
    // SubscribeForm: SubscribeForm,
    // FooterNavigation: FooterNavigation,
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
    this.$root.$emit('footerModel', this.fields);
  },
}
</script>

