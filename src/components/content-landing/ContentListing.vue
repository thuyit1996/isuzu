<template>
  <div class="content-listing">
    <div class="container">
      <sc-text tag="h3" class="content-listing__title" :field="pageTitle" />
    </div>
    <campaign-listing-filter @tabSelected="tabSelect" :data="contentListingFilter && contentListingFilter.length && contentListingFilter[0]"></campaign-listing-filter>
    <sc-placeholder name="high-light-content" :rendering="rendering" />
    <div v-if="isLoading">
      <content-loading></content-loading>
    </div>
    <div v-else>
      <news-activities-list :data="listContentListing"></news-activities-list>
    </div>
    <Paging ref="paging" @changePage="changePage" :pagingIndex="pagingIndex" :total="total" :size="pagingSize"></Paging>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../shared/IsuPlaceholder';
import NewsActivitiesList from './NewsActivitiesList';
import CampaignListingFilter from '../campaign/CampaignListingFilter';
import { getContentLanding } from '../../service/contentLandingService';
import ContentLoading from './ContentLoading';
import Paging from '../campaign/Paging';
import $ from 'jquery';
import { mapActions } from 'vuex';
export default {
  name: 'ContentListing',
  components: {
    ScText: Text,
    NewsActivitiesList: NewsActivitiesList,
    CampaignListingFilter: CampaignListingFilter,
    Paging: Paging,
    ScPlaceholder: IsuPlaceholder,
    ContentLoading: ContentLoading
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
  data() {
    return {
      pagingSize: this.$getConst('CONTENT_LISTING_PAGING_SIZE'),
      nameFisrtTab: this.$getConst('SEARCH_ALL_TAB_TITLE'),
      pagingIndex: 0,
      listContentListing: [],
      contentListingFilter: [],
      pageTitle: '',
      currentTab: 'All',
      tabIndex: 0,
      total: 0,
      isLoading: false,
    }
  },
  mounted() {
    this.pageTitle = this.$jss.routeData().fields.PageTitle;
    this.getData(true, true);
  },
  methods : {
    ...mapActions('recentcontent', ['getHighLightContent']),
    addSearchAllTab(totalRecord) {
      this.contentListingFilter[0].Detail.unshift({
        Count : totalRecord,
        Name : this.nameFisrtTab,
        Id : 'All'
      });
    },
    getData(isResetPaging = false, isFirstTime = false){
      this.isLoading = true;
      getContentLanding(this.pagingSize, this.pagingIndex, this.currentTab).then((response) => {
        this.isLoading = false;
        this.listContentListing = response.data.Contents;
        if(isFirstTime){
          this.contentListingFilter = response.data.Facets;
          this.addSearchAllTab(response.data.TotalRecord);
          this.total = response.data?.Facets?.[0]?.Detail?.[this.tabIndex]?.Count || 0;
        }
        if (isResetPaging) {
          this.$nextTick(() => {
            this.$refs.paging.updatePaging();
          })
        } else {
          this.scrollTop();
        }
      }, (error) => {
        this.isLoading = false;
      });
    },
    tabSelect({ title, index }) {
      this.currentTab = title;
      this.tabIndex = index;
      this.pagingIndex = 0;
      this.findTotalItem(index);
      this.getData(true);
      this.getHighLightContent(this.currentTab);
    },
    changePage(param) {
      this.pagingIndex = param;
      this.getData();
      this.$nextTick(() => {
        this.$refs.paging.updatePaging();
      });
    },
    scrollTop() {
      // INFO: use both body, html to solve cross browser issue with animation.
      $('body, html').animate({ scrollTop: 420 }, 100);
    },
    findTotalItem (index){
      let item =  this.contentListingFilter[0]?.Detail.find((item,idx) => index === idx) || {};
      this.total = item?.Count || 0;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
.content-listing {
  &__title {
    font-size: $h3-font-size-mobile;
    margin: 50px 0 30px 0;
    @include media-breakpoint-up(md) {
      font-size: $h3-font-size;
    }
  }

  .paging {
    margin: 30px auto;
  }
}
</style>
