<template>
  <div class="campaign-listing-component">
    <div class="container">
      <div class="campaign-listing-component__header">
        <!-- <h3 class="campaign-listing-component__header__title">แคมเพจ์นดีๆ จากอีซูซุ</h3> -->
        <sc-text tag="h3" class="campaign-listing-component__header__title" :field="pageTitle" />
        <div class="campaign-listing-component__header__icon">
          <!-- <img src="../../assets/icon-campaign-title.svg" alt="icon"> -->
          <sc-image :media="pageTitleIcon" alt="page-title-icon"/>
        </div>
      </div>
    </div>
    <campaign-listing-filter @tabSelected="tabSelect" :data="campaigntListingFilter && campaigntListingFilter.length && campaigntListingFilter[0]"></campaign-listing-filter>
    <div class="container">
      <div v-if="isLoading">
        <!-- INFO: The number of items for each different page should use the loading size of pagingSize -->
        <campaign-loading v-for="item in pagingSize" :key="item.Id"></campaign-loading>
      </div>
      <div class="campaign-item" v-else :key="item.Id" v-for="(item, index) in campaignData.Campaigns">
        <ul class="campaign-item__tags">
          <li :key="(index)" v-for="(item, index) in item.Tags">{{item}}</li>
        </ul>
        <div class="campaign-item__list">
          <div class="campaign-item__picture">
            <a :href="item.ItemUrl" >
              <!-- <img :src="imageEndPoint(item.Image)" alt /> -->
              <ProgressiveImageItem :ratio="'55.88'" :imageUrl="imageItem(item.Image)"></ProgressiveImageItem>
            </a>
          </div>
          <div class="campaign-item__content">
            <h3 class="campaign-item__content__title" >
              <a class="campaign-item__content__title__link" :href="item.ItemUrl" >{{item.Title}}</a>
            </h3>
            <!-- INFO: this is ShortDescription, DON"T remove this comments -->
            <!-- <div class="campaign-item__content--primary">
              <span>เงื่อนไขไฟแนนซ์ดอกเบี้ยพิเศษ</span>
              <ul>
                <li>
                  <a href="#">ดอกเบี้ย 1.99% หรือ ดาวน์เริ่มต้น 35,400 บาท</a>
                </li>
                <li>
                  <a href="#">อ้างอิงอัตราดอกเบี้ย ณ เดือนพฤศจิกายน – ธันวาคม 2562</a>
                </li>
              </ul>
            </div>
            <div class="campaign-item__content--secondary">
              <span>หมายเหตุ</span>
              <ul>
                <li>
                  <a href="#">อ้างอิงอัตราดอกเบี้ย ณ เดือนพฤศจิกายน – ธันวาคม 2562</a>
                </li>
                <li>
                  <a href="#"> ดาวน์ต่ำ 35,400 บาท คำนวณจากรุ่นไฮแลนเดอร์ L 2 ประตู 1,900 ซีซี เกียร์ธรรมดา สีธรรมดา</a>
                </li>
                <li>
                  <a href="#">เงื่อนไขเป็นไปตามสถาบันการเงินที่ร่วมรายการกับบริษัทฯ กำหนด</a>
                </li>
              </ul>
            </div> -->

            <div v-html="item.ShortDescription"></div>
            <div class="campaign-item__content--read-btn">
              <a :href="item.ItemUrl">ดูรายละเอียด</a>
            </div>
            <div class="campaign-item__button" v-if="item.ButtonLinks">
              <div :key="button.id" v-for="(button, index) in item.ButtonLinks">
                <a :href="button.Url" :target="button.Target" class="campaign-item__button__btn-item" :class="checkButtonLinkValid(button.Url, button.Title) ? '' : 'hidden'">
                  <span>{{button.Title}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="campaign-item__button">
          <div class="campaign-item__button__btn-item" :key="button.id" v-for="(button, index) in buttonLinks" @click="targetRegister(button.fields)">
            <a :href="isRegistration(button.fields) ? 'javascript:void(0)' : button.fields.URL.value.href">{{button.fields.Title.value}}</a>
          </div>
        </div> -->
        <div class="campaign-item__line"></div>
      </div>
    </div>
    <Paging ref="paging" @changePage="changePage" :pagingIndex="pagingIndex" :total="total" :size="pagingSize"></Paging>
  </div>
</template>

<script>
import { Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import CampaignListingFilter from '../campaign/CampaignListingFilter';
import Paging from '../campaign/Paging';
import { GetCampaign } from '../../service/campaignService';
import { GetEndPoint } from '../../service/genericService';
import CampaignLoading from './CampaignLoading';
import $ from 'jquery';
import ProgressiveImageItem from '../shared/ProgressiveImageItem';
import { isMobile } from '../../util/dom';

export default {
  name: 'CampaignListing',
  components: {
    CampaignListingFilter: CampaignListingFilter,
    Paging: Paging,
    CampaignLoading: CampaignLoading,
    ScImage: Image,
    ScText: Text,
    ProgressiveImageItem: ProgressiveImageItem,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      campaignData: {
        Facets: [],
        Campaigns: [],
      },
      buttonLinks: [],
      pagingSize: this.$getConst('CAMPAIGN_LISTING_PAGING_SIZE'),
      nameFisrtTab: this.$getConst('SEARCH_ALL_TAB_TITLE'),
      total: 0,
      pagingIndex: 0,
      currentTab: '',
      tabIndex: 0,
      isLoading: true,
      pageTitle: {},
      pageTitleIcon: {},
      signupFormId: this.$getConst('SIGNUP_FORM_ID'),
      campaigntListingFilter : [],
      deviceType: 3,
      detectMobile: false,
    };
  },
  methods: {
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
    imageItem(url) {
      return {
        value: {
          src: this.imageEndPoint(url),
        },
      };
    },
    tabSelect({ title, index }) {
      this.currentTab = title;
      this.tabIndex = index;
      this.pagingIndex = 0;
      this.findTotalItem(index);
      this.getData(true);
    },
    getData(isResetPaging = false, isFirstTime = false) {
      this.isLoading = true;
      GetCampaign(this.pagingSize, this.pagingIndex, this.currentTab).then((response) => {
        this.isLoading = false;
        this.campaignData = response.data;
        if(isFirstTime){
          this.campaigntListingFilter = response.data.Facets;
          this.addSearchAllTab(response.data.TotalRecord);
          this.total = response.data?.Facets?.[0]?.Detail?.[this.tabIndex]?.Count || 0;
        }
        if (isResetPaging) {
          this.$nextTick(() => {
            this.$refs.paging.updatePaging();
          })
        } else {
          this.$nextTick(() => {
            this.scrollTop();
          })
        }
        // this.calculatePagingLength(totalNumber);
      });
    },

    // calculatePagingLength(total) {
    //   if (total % this.pagingSize === 0) {
    //     this.pagingLength = Math.floor(total / this.pagingSize);
    //   } else {
    //     this.pagingLength = Math.floor(total / this.pagingSize) + 1;
    //   }
    // },

    changePage(param) {
      this.pagingIndex = param;
      this.getData();
      this.$nextTick(() => {
        this.scrollTop();
        this.$refs.paging.updatePaging();
      });
    },


    checkCampingExists(listData, id) {
      return listData.filter((x) => x.id != id).length > 0;
    },
    addSearchAllTab(totalRecord) {
      this.campaigntListingFilter[0].Detail.unshift({
        Count : totalRecord,
        Name : this.nameFisrtTab,
        Id : 'All'
      });
    },
    // targetRegister(target) {
    //   if (this.isRegistration(target)) {
    //     let signupForm = document.querySelector(`#${this.signupFormId}`);
    //     if (signupForm) {
    //       signupForm.scrollIntoView();
    //     }
    //   }
    // },
    isRegistration(button) {
      if (button.IsRegistration && button.IsRegistration.value) return true;
      return false;
    },
    scrollTop() {
      // INFO: use both body, html to solve cross browser issue with animation.
      // INFO: The reason is because the mobile ios doesn’t know what $(‘html,body’)is. Using animate window.scrollTo instead.
      if (this.detectMobile) {
        window.scrollTo(0, 420);
      } else {
        $('body, html').animate({ 
          scrollTop: 420
        }, 100);
      }
    },
    findTotalItem (index){
      let item =  this.campaigntListingFilter[0]?.Detail.find((item,idx) => index === idx) || {};
      this.total = item?.Count || 0;
    },
    checkButtonLinkValid(linkButton, titleButton) {
      return linkButton?.length > 0 && titleButton?.length > 0;
    }
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.buttonLinks = this.$jss.routeData().fields.ButtonLinks;
    this.getData(true,true);
    this.pageTitle = this.$jss.routeData().fields.PageTitle;
    this.pageTitleIcon = this.$jss.routeData().fields.PageTitleIcon;
  },
};
</script>
<style lang="scss">
@import '../../assets/reuse-mixin.scss';

.campaign-listing-component {
  padding-bottom: 35px;

  &__header {
    display: flex;
    align-items: center;
    padding: 50px 0 30px;

    &__title {
      color: #495057;
    }

    &__icon {
      width: 30px;
      height: 25px;
      margin-left: 10px;

      @include media-breakpoint-up(lg) {
        width: 40px;
        height: 35px;
        margin-left: 20px;
      }
    }
  }

  .paging {
    margin-bottom: 0;
  }
}

.campaign-item {
  margin: 50px 0 0;

  @include media-breakpoint-up(lg) {
    margin: 50px 0 35px;
  }

  &__tags {
    li {
      display: inline-block;
      background-color: #f5f5f5;
      padding: 0 6px;
      border-radius: 4px;
      margin-right: 10px;

      &:nth-child(n + 4) {
        display: none;
      }

      @include media-breakpoint-up(lg) {
        padding: 0 10px;
        margin-right: 15px;
      }
    }
  }

  &__list {
    @include media-breakpoint-up(lg) {
      display: flex;
    }

    li {
      position: relative;
      margin-left: 10px;

      &::before {
        position: absolute;
        background-image: url('../../assets/dot-campaign.svg');
        content: '';
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 4px;
        height: 4px;
        top: 8px;
        left: -10px;

        @include media-breakpoint-up(lg) {
          width: 5px;
          height: 5px;
          top: 11px;
        }
      }
    }
  }

  &__picture {
    width: 100%;
    margin-bottom: 10px;

    &:hover {
      img {
        transform: scale(1.1);
      }
    }

    @include media-breakpoint-up(lg) {
      width: 40%;
    }

    img {
      width: 100%;
      cursor: pointer;
      transition: transform 0.5s ease-in-out;
    }
  }

  &__content {
    @include media-breakpoint-up(lg) {
      padding-left: 30px;
      width: 60%;
    }

    &__title {

      @include media-breakpoint-up(lg) {
        margin:-10px 0 10px;
      }

      &__link {
        color: $black;
        text-decoration: none;

        &:hover {
          color: $red-hover-color;
        }
      }
    }

    &--primary {
      a {
        color: $black;
        text-decoration: none;
      }
    }

    &--secondary {
      span {
        font-size: 1.9rem;
        font-weight: bold;
      }

      a {
        color: $black;
        text-decoration: none;
      }
    }

    &--read-btn {
      position: relative;
      margin-top: 10px;
      display: inline-block;
      transition: background .2s ease-in-out;

      @include media-breakpoint-up(md) {
        margin-top: 12px;
      }

      @include media-breakpoint-up(lg) {
        margin-top: 15px;
        font-size: 2.2rem;
      }

      &:hover {
        a {
          color: $red-hover-color;

          &::before,
          &::after {
            background: $red-hover-color;
          }
        }
      }

      a {
        color: $black;
        transition: color .2s ease-in-out;
        padding-right: 15px;
        position: relative;

        @include media-breakpoint-up(lg) {
          padding-right: 22px;
        }

        &::before,
        &::after {
          content: "";
          display: block;
          background: #bcbbbc;
          width: 7px;
          height: 2px;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: 0;
          transform-origin: 6px center;
          transition: all .2s ease-in-out;

          @include media-breakpoint-up(lg) {
            width: 9px;
            transform-origin: 8px center;
            margin-top: -1px;
          }
        }

        &::before {
          transform: rotate(-45deg);
        }

        &::after {
          transform: rotate(45deg);
        }
      }
    }
  }

  &__button {
    margin-top: 30px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    @include media-breakpoint-up(lg) {
      margin-top: 40px;
    }

    &__btn-item {
      border-radius: 50px;
      margin: 0 5px 16px 5px;
      width: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 0;
      text-decoration: none;
      // color: $black;
      // border: 1px solid #dfdfdf;
      background-color: $primary-bgr;
      color: $primary-color;

      @include media-breakpoint-up(xs) {
        margin: 0 8px 16px 8px;
        width: 152px;
      }

      @include media-breakpoint-up(sm) {
        margin: 0 15px 16px 15px;
      }

      @include media-breakpoint-up(md) {
        margin: 0 18px 16px 0px;
        padding: 7px 0;
      }

      @include media-breakpoint-up(xl) {
        width: 175px;
      }

      &:hover {
        background-color: $primary-bgr-activated;
        color: $primary-color-activated;
      }
    }
  }

  &__line {
    border-bottom: 1px solid #cccccc;
    padding: 25px 0 0;

    @include media-breakpoint-up(lg) {
      padding: 40px 0 0;
    }
  }

  ul {
    margin-bottom: 10px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 15px;
    }
  }
}

.hidden {
  display: none;
}
</style>
