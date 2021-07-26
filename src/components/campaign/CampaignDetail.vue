<template>
  <div class="campaign-detail">
    <div class="campaign-detail__top-padding"></div>
    <div class="container">
      <div class="campaign-detail__wrap">
        <article-detail-header :publishMonth="publishMonth" :publishYear="publishYear"></article-detail-header>
        <ul class="campaign-detail__tags" v-if=" pageData.Tags && pageData.Tags.length">
          <li :key="item.id" v-for="(item, index) in pageData.Tags">{{item.fields.Name.value}}</li>
        </ul>
        <div class="campaign-detail__list">
          <!-- <div class="campaign-detail__date">
            <img src="../../assets/campaign-date.png" alt />
            <span>{{publishMonth | formatMonth}}</span>
            <p>{{publishYear}}</p>
          </div> -->
          <sc-text tag="h3" class="campaign-detail__content__title--mobile" :field="pageData.PageTitle" />
          <div class="campaign-detail__image" v-if="(!detectMobile && checkHasSrcProperty('FeatureImage') || detectMobile && checkHasSrcProperty('FeatureImage-sm') )">
            <div v-if="isEditing">
              <sc-image v-if="checkHasSrcProperty('FeatureImage')" :media="pageData.FeatureImage" />
            </div>
            <div v-else>
              <ProgressiveImageItem v-if="detectMobile === false && checkHasSrcProperty('FeatureImage')" :ratio="'133.41'" :imageUrl="pageData.FeatureImage"></ProgressiveImageItem>
              <ProgressiveImageItem v-else-if="detectMobile === true && checkHasSrcProperty('FeatureImage-sm')" :ratio="'133.41'" :imageUrl="pageData['FeatureImage-sm']"></ProgressiveImageItem>
            </div>
            <div class="btn-zoom" @click="clickShowModal" v-if="detectMobile && checkHasSrcProperty('FeatureImage-sm')">
              <img
                src="../../assets/button-zoon-campaign-detail.svg"
                alt="button zoom image"
                class="btn-zoom__icon btn-zoom--nomal"
              />
              <img
                src="../../assets/button-zoon-campaign-detail-hover.svg"
                alt="button zoom image"
                class="btn-zoom__icon btn-zoom--hover"
              />
            </div>
            <div class="btn-zoom" @click="clickShowModal" v-if="!detectMobile && checkHasSrcProperty('FeatureImage')">
              <img
                src="../../assets/button-zoon-campaign-detail.svg"
                alt="button zoom image"
                class="btn-zoom__icon btn-zoom--nomal"
              />
              <img
                src="../../assets/button-zoon-campaign-detail-hover.svg"
                alt="button zoom image"
                class="btn-zoom__icon btn-zoom--hover"
              />
            </div>
          </div>
          <div class="campaign-detail__image" v-if="!detectMobile && !checkHasSrcProperty('FeatureImage')">
            <img class="d-none d-sm-block"  src="../../assets/default-img-campaign-desktop.jpg" alt="default image">
            <img class="d-sm-none" src="../../assets/default-img-campaign-mobile.jpg" alt="default image">
          </div>
          <div class="campaign-detail__image" v-if="detectMobile && !checkHasSrcProperty('FeatureImage-sm')">
            <img class="d-none d-sm-block"  src="../../assets/default-img-campaign-desktop.jpg" alt="default image">
            <img class="d-sm-none" src="../../assets/default-img-campaign-mobile.jpg" alt="default image">
          </div>
          <div class="campaign-detail__content">
            <sc-text tag="h3" class="campaign-detail__content__title--desktop" :field="pageData.PageTitle" />
            <sc-rich-text tag="div" :field="pageData.Description" />
          </div>
        </div>
      </div>
      <div class="campaign-detail__button" v-if="buttonLinks.length">
        <div :key="button.id" v-for="(button, index) in buttonLinks" @click="onClickButtonLink">
          <div v-if="button.fields.URL && button.fields.URL.value && button.fields.URL.value.href">
            <sc-link :field="button.fields.URL" class="campaign-detail__button__btn-item" v-if="button.fields.Title.value">
              <sc-text :field="button.fields.Title" />
            </sc-link>
          </div>
          <div class="" v-else>
            <a v-if="fields.registerUrl" :href="getUrlNavigateTo()" class="campaign-detail__button__btn-item 2">
              <sc-text :field="button.fields.Title" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <isu-popup ref="imageDetailModal" :picturePopup="true" :size="'lg'">
      <div class="image-detail">
        <ProgressiveImageItem v-if="detectMobile === true" :ratio="'133.41'" :imageUrl="pageData['FeatureImage-sm']"></ProgressiveImageItem>
        <ProgressiveImageItem v-if="detectMobile === false" :ratio="'133.41'" :imageUrl="pageData.FeatureImage"></ProgressiveImageItem>
      </div>
    </isu-popup>
  </div>
</template>

<script>
import IsuPopup from '../shared/IsuPopup';
import { Image, Text, Link, RichText } from '@sitecore-jss/sitecore-jss-vue';
import { GetCampaignButtons } from '../../service/campaignService';
import { isMobile } from '../../util/dom';
import { mapActions } from 'vuex';
import { transformDate } from '../../util/customDate';
import ProgressiveImageItem from '../shared/ProgressiveImageItem';
import ArticleDetailHeader from '../shared/ArticleDetailHeader';

// const monthThaiLandLanguageData = [
//   // 'ม.ค.',
//   // 'ก.พ.',
//   // 'มี.ค.',
//   // 'เม.ย.',
//   // 'พ.ค.',
//   // 'มิ.ย.',
//   // 'ก.ค.',
//   // 'ส.ค.',
//   // 'ก.ย.',
//   // 'ต.ค.',
//   // 'พ.ย.',
//   // 'ธ.ค.',
// ];
export default {
  name: 'CampaignDetail',
  components: {
    ScImage: Image,
    ScText: Text,
    IsuPopup: IsuPopup,
    ScLink: Link,
    ProgressiveImageItem: ProgressiveImageItem,
    ArticleDetailHeader: ArticleDetailHeader,
    ScRichText: RichText,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions('recentcampaign', ['addCampaign']),
    clickShowModal() {
      this.$refs.imageDetailModal.showModal();
    },
    formatDate(date) {
      let { month, year } = transformDate(date);
      this.publishMonth = month;
      this.publishYear = year;
    },
    checkHasSrcProperty(property) {
      return (
        this.pageData[property] &&
        this.pageData[property].value &&
        this.pageData[property].value.src
      );
    },
    customDataToStore() {
      let campaign = {
        Id: this.$jss?.routeData()?.itemId || '',
        ItemUrl: window.location.pathname,
        Title: this.pageData?.PageTitle?.value?.length ? this.pageData.PageTitle.value : '',
        Image: this.pageData.PreviewImage?.value?.src?.length
          ? this.pageData.PreviewImage.value.src
          : '../../assets/default-recent-campaign.jpg',
        ShortDescription: this.pageData?.ShortDescription?.value || '',
      };
      this.addCampaign(campaign);
    },
    // targetRegister(button) {
    //   if (this.isRegistration(button)) {
    //     let signupForm = document.querySelector(`#${this.signupFormId}`);
    //     if (signupForm) {
    //       signupForm.scrollIntoView();
    //     }
    //   }
    // },
    isRegistration(button) {
      if (button.IsRegistration) return true;
      return false;
    },
    getUrlNavigateTo() {
      let thanksUrl = '';
      let pathName = window.location.pathname.split('/');
      if (pathName.length && this.fields.registerUrl) {
        thanksUrl = this.fields.registerUrl.split('/');
        pathName.push(thanksUrl);
      }
      pathName = pathName.filter((item) => {
        return item !== "";
      });
      pathName = pathName.join('/');
      return window.location.origin + "/" + pathName;
    },
  },
  data() {
    return {
      pageData: {
        Description: {},
        Image: {},
        Title: '',
        PublishDateCustom: {},
      },
      buttonLinks: [],
      publishYear: '',
      publishMonth: '',
      detectMobile: undefined,
      deviceType: 3,
      signupFormId: this.$getConst('SIGNUP_FORM_ID'),
      isEditing: false,
    };
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.pageData = this.$jss.routeData().fields;
    this.buttonLinks = this.pageData.ButtonLinks?.fields?.Items;
    this.customDataToStore();
    this.formatDate(this.pageData.PushlishDate.value);
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
  },
  // filters: {
  //   formatMonth: function(monthNumber) {
  //     // INFO: subtract one because month start from 0
  //     return monthThaiLandLanguageData[monthNumber - 1] ? monthThaiLandLanguageData[monthNumber - 1] : '';
  //   },
  // },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.campaign-detail {
  &__top-padding {
    height: 30px;
    width: 100%;
    background: #f5f5f5;
    box-shadow: inset 0px 5px 10px #ebebeb, inset 0px -5px 10px #ebebeb;

    @include media-breakpoint-up(lg) {
      height: 40px;
    }
  }

  &__wrap {
    position: relative;
  }

  &__tags {
    padding-top: 30px;
    @include media-breakpoint-up(lg) {
      padding-top: 35px;
    }

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
    display: block;
    padding-top: 10px;

    @include media-breakpoint-up(lg) {
      display: flex;
      padding-top: 15px;
    }
  }

  &__date {
    background-position: center;
    background-repeat: no-repeat;
    right: 0;
    top: 0;
    position: absolute;
    text-align: center;
    height: 73px;
    width: 53px;

    @include media-breakpoint-up(lg) {
      height: 90px;
      width: 65px;
    }

    img {
      position: relative;
    }

    span {
      font-size: 3rem;
      position: absolute;
      top: 5px;
      left: 0;
      color: $white;
      display: block;
      width: 100%;
      text-align: center;

      @include media-breakpoint-up(lg) {
        font-size: 36px;
      }
    }

    p {
      font-size: $font-size-mobile;
      color: $white;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;

      @include media-breakpoint-up(lg) {
        font-size: 24px;
      }
    }

    &::after {
      position: absolute;
      background-image: url('../../assets/campaign-line.png');
      content: '';
      background-position: center;
      background-repeat: no-repeat;
      height: 2px;
      width: 40px;
      left: 5px;
      top: 35px;

      @include media-breakpoint-up(lg) {
        font-size: 2.4rem;
        left: 14px;
        width: 50px;
        left: 7px;
        top: 45px;
      }
    }
  }

  &__image {
    width: 100%;
    position: relative;
    height: fit-content;

    @include media-breakpoint-up(lg) {
      width: 50%;
    }

    .progressive-image {
      min-height: 400px;
      height: auto;
      padding-bottom: 0 !important;

      >>> picture {
        position: static;
        width: 100%;
        height: auto;
      }
    }

    .btn-zoom {
      position: absolute;
      bottom: 15px;
      right: 15px;
      width: 29px;
      cursor: pointer;
      transition: 0.25s ease;

      @include media-breakpoint-up(md) {
        bottom: 20px;
        right: 35px;
        width: 57px;
      }

      &:hover {
        @include hover-desktop() {
          .btn-zoom--nomal {
            display: none;
          }

          .btn-zoom--hover {
            display: block;
          }
        }
      }

      &--nomal {
        display: block;
      }

      &--hover {
        display: none;
      }
    }
  }

  &__content {
    width: 100%;
    padding: 25px 0 15px;

    @include media-breakpoint-up(lg) {
      width: 50%;
      padding: 0 0 0 30px;
    }

    >>> ul li {
      list-style: inside;
    }

    &__title--desktop {
      display: none;

      @include media-breakpoint-up(lg) {
        margin-bottom: 25px;
        color: #cd0002;
        display: block;
      }
    }

    &__title--mobile {
      color: #cd0002;
      margin-bottom: 25px;
      display: block;
      padding-right: 65px;

      @include media-breakpoint-up(lg) {
        display: none;
      }
    }

    &__primary {
      margin-bottom: 30px;

      @include media-breakpoint-up(lg) {
        margin-bottom: 45px;
      }

      p {
        margin: 0;

        @include media-breakpoint-up(lg) {
          margin-bottom: 10px;
        }
      }
    }

    &__secondary {
      span {
        font-size: $font-size-mobile;

        @include media-breakpoint-up(lg) {
          font-size: 2.4rem;
        }
      }
    }

    &__detail {
      font-size: $font-size-small;

      @include media-breakpoint-up(lg) {
        font-size: 1.9rem;
        margin-top: 6px;
      }
    }
  }

  &__button {
    margin-top: 15px;
    margin-bottom: 15px;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @include media-breakpoint-up(lg) {
      margin-top: 50px;
    }

    &__btn-item {
      border-radius: 50px;
      margin: 0 5px 16px 5px;
      width: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px 0;
      // color: $black;
      // border: 1px solid #dfdfdf;
      text-decoration: none;
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
        margin: 0 8px 16px 8px;
        padding: 7px 0;
      }

      @include media-breakpoint-up(lg) {
        width: 175px;
      }

      &:hover {
        background-color: $primary-bgr-activated;
        color: $primary-color-activated;
      }
    }
  }
}
</style>
