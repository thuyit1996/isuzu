<template>
  <div class="accessory-list">
    <div class="container">
      <div class="accessory-list__tab">
        <sc-text tag="span" v-for="(accessoryType, index) in accessoryTypeList" :key="accessoryType.id" class="accessory-list__tab__item" :field="accessoryType.fields.Name" @click="selectExterial($event, index)"/>
      </div>
      <div class="text-center">
        <sc-rich-text tag="div" class="accessory-list__title isu-title" :field="accessoryTypeSelect.fields && accessoryTypeSelect.fields.Title"/>
      </div>
      <div class="accessory-list__row">
        <div class="accessory-list__col" v-for="(accessory, index) in accessoriesListing" :key="index">
          <accessory-item :accessory="accessory" :pageData="pageData"></accessory-item>
        </div>
      </div>
      <div class="accessory-list__load-more">
        <sc-text v-if="!isHiddenLoadMore" tag="span" class="accessory-list__load-more__button i-btn i-btn__primary--none-active ripple" :field="pageData.LoadMoreLable" @click="loadMoreAccessories"/>
        <sc-text v-if="isHiddenLoadMore" tag="span" class="accessory-list__load-more__button i-btn i-btn__primary--none-active ripple" :field="pageData.BackToTopOfListing" @click="scrollTopMoreAccessories"/>
      </div>
    </div>
    <div class="over-lay" v-if="isShowOverLay">
      <span class="loading-icon"></span>
    </div>
  </div>
</template>

<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import AccessoryItem from './AccessoryItem';
import { GetAccessoriesListing } from '../../service/accessoriesService';
import { isMobile } from '../../util/dom';

const ACCESSORY_TYPE_DEFAULT_INDEX = 0;
const PAGE_DEFAULT_INDEX = 0;
const PADDING_TOP = 52;

export default {
  name: 'AccessoriesListing',
  components: {
    ScText: Text,
    AccessoryItem: AccessoryItem,
    ScRichText: RichText,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isExterior: true,
      accessoryTypeList: this.fields?.items,
      accessoryTypeSelect: {},
      carTypeId: '',
      pageSizeDesk: this.$getConst('ACCESSORIES_LISTING_PAGING_SIZE_DESKTOP'),
      pageSizeMobi: this.$getConst('ACCESSORIES_LISTING_PAGING_SIZE_MOBILE'),
      pageIndex: PAGE_DEFAULT_INDEX,
      accessoriesListing: [],
      isHiddenLoadMore: true,
      isShowOverLay: true,
      deviceType: 3,
      detectMobile: false,
      pageData: {},
    };
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.getDefaultAccessoryTypeSelect();
    this.$root.$on('IdCarTypeSelect', (id) => {
      if (id) {
        this.carTypeId = id;
      }
      this.resetAccessoriesListing();
      this.getDefaultAccessoryTypeSelect();
      this.getAccessoriesListingData(this.pageIndex);
    });
    this.$root.$on('AccessoriesPageData', (data) => {
      this.pageData = data;
    });
  },
  methods: {
    selectExterial(event, index) {
      let accessoriesTab = this.$el.querySelectorAll('.accessory-list .accessory-list__tab__item');
      accessoriesTab.forEach((item) => {
        item.classList.remove('active');
      });
      event.currentTarget.classList.add('active');
      this.getAccessoryTypeSelect(index);
      this.isShowOverLay = true;
      this.resetAccessoriesListing();
      this.getAccessoriesListingData(this.pageIndex);
    },
    getAccessoryTypeSelect(index) {
      this.accessoryTypeSelect = this.fields?.items?.[index] || {};
    },
    getAccessoriesListingData(pageIndex) {
      GetAccessoriesListing(
        this.carTypeId,
        this.accessoryTypeSelect.id,
        this.detectMobile ? this.pageSizeMobi : this.pageSizeDesk,
        pageIndex
      )
        .then((response) => {
          if (response.data.IsSuccess) {
            setTimeout(() => {
              this.isShowOverLay = false;
            }, 200);
            response.data.Accessories.forEach((item) => {
              this.accessoriesListing.push(item)
            });
            this.checkShowLoadMore(this.accessoriesListing, response.data)
          }
        })
        .catch((err) => {});
    },
    checkShowLoadMore(accessoriesListing, accessories) {
      if (
        accessoriesListing?.length == 0 ||
        accessories.TotalRecord == 0 ||
        accessoriesListing?.length == accessories.TotalRecord
      ) {
        this.isHiddenLoadMore = true;
      } else {
        this.isHiddenLoadMore = false;
      }
    },
    loadMoreAccessories() {
      this.isShowOverLay = true;
      this.pageIndex++;
      this.getAccessoriesListingData(this.pageIndex);
    },
    resetAccessoriesListing() {
      this.accessoriesListing = [];
      this.pageIndex = PAGE_DEFAULT_INDEX;
    },
    getDefaultAccessoryTypeSelect() {
      let accessoriesTab = this.$el.querySelectorAll('.accessory-list .accessory-list__tab__item');
      accessoriesTab.forEach((item) => {
        item.classList.remove('active');
      });
      accessoriesTab[ACCESSORY_TYPE_DEFAULT_INDEX].classList.add('active');
      this.getAccessoryTypeSelect(ACCESSORY_TYPE_DEFAULT_INDEX);
    },
    scrollTopMoreAccessories() {
      let targetComponent = this.$el;
      let offsetTop = targetComponent.offsetTop - PADDING_TOP;
      window.scroll({ top: offsetTop, left: 0, behavior: 'smooth' });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.accessory-list {
  position: relative;

  &__tab {
    text-align: center;
    padding-top: 40px;
    margin-bottom: 30px;
    font-family: $font-family-eurothai;

    @include media-breakpoint-up(lg) {
      padding-top: 50px;
    }

    &__item {
      width: 135px;
      display: inline-block;
      border: solid 1px $black;
      padding: 5px 10px;
      cursor: pointer;
      font-size: 2.1rem;

      @include media-breakpoint-up(xs) {
        width: 150px;
      }

      &:first-child {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      &:last-child {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }

    .active {
      color: $white;
      background: $black;
      pointer-events: none;
    }
  }

  &__title {
    margin-bottom: 30px;

    @include span-break();
  }

  &__row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -12px;
    min-height: 330px;

    @include media-breakpoint-up(md) {
      margin: 0 -15px;
      min-height: 430px;
    }
  }

  &__col {
    width: 50%;
    padding: 0 12px;

    @include media-breakpoint-up(md) {
      width: 25%;
      padding: 0 15px;
    }
  }

  &__load-more {
    text-align: center;

    @include ripple($primary-bgr);
  }

  .over-lay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.8;
    transition: 0.5s;

    .loading-icon {
      @include loading-icon();
    }
  }

  .disable-load-more {
    visibility: hidden;
  }
}
</style>
