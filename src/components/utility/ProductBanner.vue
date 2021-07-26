<template>
  <div class="product-banner">
    <div class="video-wrapper__modal" v-if="isShow" :class="{'is-show-modal': isShow}">
      <div class="video-wrapper__modal__overlay"></div>
      <div class="video-wrapper__modal__content">
        <div class="close-btn" @click="hideVideoOverlay">
          <svg viewBox="0 0 32 32">
            <polygon points="32,1.5 30.6,0.1 16,14.6 1.5,0.1 0,1.5 14.6,16 0,30.6 1.5,32 16,17.5 30.6,32 32,30.6 17.4,16 "></polygon>
          </svg>
        </div>
        <div class="video-container">
          <iframe frameborder="0" muted="muted"  :src="viewVideoUrl+'?autoplay=1'" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>
    <picture class="product-banner__bg" v-if="dataFields.BackgroundVideo && dataFields.BackgroundVideo.value.href == ''">
      <!-- // TODO: use <source> element -->
      <sc-image v-if="!isEditing" class="product-banner__picture d-md-none" width="100%" :media="fields['Image-sm']" />
      <sc-image v-if="!isEditing" class="product-banner__picture d-none d-md-block d-1366-none" width="100%" :media="dataFields.ImageMedium" />
      <sc-image class="product-banner__picture d-none d-1366-block" width="100%" :media="dataFields.Image" />
    </picture>
    <div class="video-wrapper__background__video" v-else>
      <progressive-video-item :image="dataFields.FallbackMobileImage" :video="dataFields.SmallBackgroundVideo" class="d-md-none"></progressive-video-item>
      <progressive-video-item :image="dataFields.FallbackImage" :video="dataFields.BackgroundVideo" class="d-none d-md-block"></progressive-video-item>
    </div>

    <div class="product-banner__content">
      <div class="container">
        <div class="product-banner__content__wrap">
          <!-- <div class="product-banner__content__title">
            <sc-image :media="dataFields.ImageTitle" />
          </div> -->
          <div class="product-banner__content__btn-play animated fadeInUp delay-500" v-if="dataFields.BackgroundVideo && dataFields.BackgroundVideo.value.href !== ''">
            <div class="product-banner__content__logo">
              <sc-image :media="dataFields.ImageIcon" />
            </div>
            <div class="btn-play__wrap-icon" @click="showVideoOverlay(dataFields.PopupVideo)">
              <div class="btn-play__bgr">
                <div class="btn-play__icon btn-play__icon--default" >
                  <sc-image :media="dataFields.PlayButtonIcon" />
                </div>
                <div class="btn-play__icon btn-play__icon--hover">
                  <sc-image :media="dataFields.PlayButtonIconHover" />
                </div>
              </div>
              <sc-text class="btn-play__text" tag="span"  :field="dataFields.PlayButtonTitle" />
            </div>
          </div>
          <div class="product-banner__content__feature">
            <sc-text class="feature__title" tag="h5" :field="dataFields.Title" />
            <sc-text class="feature__desc" tag="h3" :field="dataFields.Description" />
          </div>
          <a href="#" class="product-banner__content__btn-scroll text-center" @click.prevent="targetScroll">
            <sc-image class="icon-scroll-nomal" :media="dataFields.DeactiveScrollIcon" />
            <sc-image class="icon-scroll-hover" :media="dataFields.ActiveScrollIcon" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile, isTablet } from '../../util/dom';
import { Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import ProgressiveVideoItem from '../shared/ProgressiveVideoItem';
import $ from 'jquery';
import {unLockScroll, lockScroll} from '../../service/lockPopupService';

export default {
  name: 'ProductBanner',
  components: {
    ProgressiveVideoItem: ProgressiveVideoItem,
    ScImage: Image,
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      detectMobile: undefined,
      detectTablet: undefined,
      isShow: false,
      viewVideoUrl: '',
      targetClass: '',
      targetScrollName: this.fields.TargetScroll && this.fields.TargetScroll.fields.Name.value,
      targetScrollIndex: this.fields.TargetScrollIndex && this.fields.TargetScrollIndex.value,
      dataFields: this.fields,
      isEditing: false,
    };
  },
  methods: {
    showVideoOverlay(linkUrl) {
      this.isShow = true;
      this.viewVideoUrl = linkUrl.value.href;
      lockScroll();
    },
    hideVideoOverlay() {
      this.isShow = false;
      unLockScroll();
    },
    targetScroll() {
      this.targetClass = '.' + this.targetScrollName;
      let getClassTarget = $(this.targetClass);
      let parseIntScrollIndex = parseInt(this.targetScrollIndex);
      if (
        !parseIntScrollIndex ||
        parseIntScrollIndex < 1 ||
        parseIntScrollIndex > getClassTarget.length
      ) {
        parseIntScrollIndex = 1;
      }
      let hash = getClassTarget[parseIntScrollIndex - 1];
      // $('html, body').animate(
      //   {
      //     scrollTop: $(hash).offset().top - 60, //60 is Height of MainNavigation
      //   },
      //   0
      // );
      window.scroll({ top: $(hash).offset().top - 60, left: 0, behavior: 'smooth' });
    },
  },
  mounted() {
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.detectTablet = isTablet(this.deviceType);
  },
  watch: {
    fields: function(newFields) {
      this.dataFields = Object.assign({}, this.dataFields, newFields);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.product-banner {
  position: relative;
  overflow: hidden;
  height: calc(100vh - 164px);
  min-height: 480px;
  max-height: 572px;
  overflow: hidden;
  // height: 0;
  // padding-bottom: percentage(632/375); //INFO: Reference to the original page ratio of the customer.

  @include media-breakpoint-up(sm) {
    // padding-bottom: percentage(767/1903);
    height: calc(100vh - 174px);
    max-height: inherit;
  }

  // @media only screen and (min-width: 1024px) {
  //   height: 0;
  //   padding-bottom: 95%;
  // }

  // @media only screen and (min-width: 1366px) {
  //   padding-bottom: 45%;
  // }

  // @include media-breakpoint-up(xl) {
  //   height: calc(100vh - 174px);
  //   padding-bottom: 0;
  // }

  &__bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    >>> img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;

    .container {
      height: 100%;
      position: relative;
    }

    &__wrap {
      padding-top: 20px;
      display: flex;
      flex-direction: column;

      @include media-breakpoint-up(md) {
        padding-top: 75px;
      }

      @include media-breakpoint-up(lg) {
        padding-top: 95px;
      }

      @include media-breakpoint-up(xl) {
        padding-top: 200px;
      }
    }

    &__title {
      margin-bottom: 9px;

      @include media-breakpoint-up(lg) {
        margin-bottom: 16px;
      }

      img {
        width: 175px;
        height: 52px;

        @include media-breakpoint-up(lg) {
          width: 270px;
          height: 93px;
        }
      }
    }

    &__btn-play {
      display: flex;
      align-items: center;
      flex-direction: column;
      position: absolute;
      width: calc(100% - 30px);
      height: calc(100% - 57px); //INFO: Followed customer's website (57 is height + bottom of scroll button)
      top: 0;
      justify-content: center;

      @include media-breakpoint-up(lg) {
        height: calc(100% - 67px); //INFO: Followed customer's website (67 is height + bottom of scroll button)
        top: 0;
        justify-content: center;
      }

      span {
        display: block;
      }
    }

    .btn-play {
      &__wrap-icon {
        display: flex;
        align-items: center;

        &:hover {
          .btn-play {
            &__bgr {
              cursor: pointer;

              &::before {
                transform: scale(1.2);
                opacity: 0;
              }

              &::after {
                transform: scale(1);
              }
            }

            &__icon {
              &--default {
                display: none;
              }

              &--hover {
                display: flex;
              }
            }
          }
        }
      }

      &__bgr {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        position: relative;
        transform: all 0.5s;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 2px solid #fff;
          border-radius: 50%;
          opacity: 1;
          transition: all 0.3s;
        }

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #fff;
          transform: scale(0);
          transition: all 0.3s;
        }
      }

      &__icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;

        &--hover {
          display: none;
        }

        & > img {
          margin-left: 4px;
        }
      }

      &__text {
        color: $white;
        font-family: $font-family-eurothai;
        font-size: 2.1rem; // INFO: Follow customer's current site.
        padding-left: 15px;
      }
    }

    &__feature {
      color: $white;

      @include media-breakpoint-up(md) {
        color: $black;
        order: -1;
        margin-bottom: 20px;
      }

      .feature__title {
        margin-bottom: 0;
        letter-spacing: 5px;

        @include media-breakpoint-down(lg) {
          font-size: 14.5px;     //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
          letter-spacing: 2.5px;
        }
      }

      .feature__desc {
        letter-spacing: 8px;

        @include media-breakpoint-down(lg) {
          font-size: 24px;     //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
          letter-spacing: 3.5px;
        }
      }
    }

    &__btn-scroll {
      position: absolute;
      display: block;
      cursor: pointer;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;

      &:hover {
        @include hover-desktop {
          .icon-scroll-nomal {
            display: none;
          }

          .icon-scroll-hover {
            display: block;
          }
        }
      }

      @include media-breakpoint-up(lg) {
        bottom: 30px;
      }

      .icon-scroll-nomal {
        display: block;
      }

      .icon-scroll-hover {
        display: none;
      }
    }

    &__logo {
      margin-bottom: 22px;

      >>> img {
        height: 100%;
        width: 197px;

        @include media-breakpoint-up(md) {
          height: 90px;
          width: auto;
        }

        @include media-breakpoint-up(lg) {
          height: 68px;
        }  

        @include media-breakpoint-up(xl) {
          height: 105px;
        }  
      }
    }
  }

  .video-wrapper {
    &__background {
      &__video {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        div {
          height: 100%;
        }

        >>> .slider-video {
          width: 100%;
          height: 100%;
          object-fit: cover;

          // fix for Edge browser
          @supports (-ms-ime-align:auto) {
            height: auto;
          }
        }
      }
    }

    &__modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 11111;
      padding: 160px 0;
      overflow: hidden;
      display: none;

      @include media-breakpoint-up(sm) {
        padding: 295px 0;
      }

      @include media-breakpoint-up(lg) {
        padding: 90px 110px;
      }

      &__overlay {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: saturate(180%) blur(20px);
        background-color: rgba(0,0,0,.7);
      }

      &__content {
        width: 100%;
        max-width: 1200px;
        height: 100%;
        margin: 0 auto;
        position: relative;
      }

      .video-container {
        width: 100%;
        height: 100%;

        iframe {
          width: 100%;
          height: 100%;
        }
      }

      .close-btn {
        position: fixed;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        background: none;
        top: 25px;
        right: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        @include media-breakpoint-up(sm) {
          width: 50px;
          height: 50px;
        }

        @include media-breakpoint-up(lg) {
          width: 60px;
          height: 60px;
        }

        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          top: 0;
          background-color: #000;
          border-radius: 50%;
          transform: translateZ(0) scale(1);
          transition: background-color .3s cubic-bezier(.4,0,0,1),-webkit-transform .45s cubic-bezier(.17,.67,.3,1.33);
          transition: background-color .3s cubic-bezier(.4,0,0,1),transform .45s cubic-bezier(.17,.67,.3,1.33);
          transition: background-color .3s cubic-bezier(.4,0,0,1),transform .45s cubic-bezier(.17,.67,.3,1.33),-webkit-transform .45s cubic-bezier(.17,.67,.3,1.33);
          box-shadow: 0 5px 10px 2px rgba(0,0,0,.04);
        }
        &:hover {
          &::before {
            background-color: #fff;
          }
          svg {
            fill: #000;
          }
        }
        svg {
          display: block;
          position: relative;
          z-index: 1;
          width: 14px;
          height: 14px;
          fill: #fff;
          transition: fill .3s cubic-bezier(.4,0,0,1);

          @include media-breakpoint-up(sm) {
            width: 18px;
            height: 18px;
          }

          @include media-breakpoint-up(lg) {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    &__media {
      position: relative;
      overflow: hidden;
      height: 668px;
      width: 100%;

      &__content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;

        .container {
          height: 100%;
        }
      }

      &__video {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
      }
    }
  }

  .is-show-modal {
    display: block !important;  //INFO: Use !important to display the modal
  }

  .d-1366-none {
    @media only screen and (min-width: 1366px) {
      display: none !important;
    }
  }

  .d-1366-block {
    @media only screen and (min-width: 1366px) {
      display: block !important;
    }
  }
}
</style>
