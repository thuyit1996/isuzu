<template>
  <div>
    <!-- <campaign-slider></campaign-slider>
    <campaign-listing></campaign-listing>
    <campaign-loading></campaign-loading>
    <paging></paging>
    <signup-form></signup-form>
    <recent-campaign></recent-campaign> -->
    <sc-placeholder name="campaign-content" :rendering="rendering" />
  </div>
</template>

<script>
// import { Placeholder } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
// import CampaignListing from '../components/campaign/CampaignListing';
// import SignupForm from '../components/campaign/SignupForm';
// import RecentCampaign from '../components/campaign/RecentCampaign';
// import Paging from '../components/campaign/Paging';
// import CampaignSlider from '../components/campaign/CampaignSlider';
// import CampaignLoading from '../components/campaign/CampaignLoading';

export default {
  name: 'CampaignPage',
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
