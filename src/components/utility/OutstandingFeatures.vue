<template>
  <div class="outstanding-features" :class="classModify">
    <div class="outstanding-features--desktop d-none d-md-block" :style="{ backgroundImage: getBackgroundImage() }">
      <div class="container">
        <div class="outstanding-features__wrap">
          <div class="outstanding-features--desktop__menu">
            <div class="outstanding-features--desktop__menu__item">
              <ul>
                <li :key="item.id" v-for="(item, index) in fields.Features" class="nav-item">
                  <sc-text  class="nav-link" :class="index===navIndex ? 'active' : ''" @click.prevent="navClick(index)" :field="item.fields.Title"/>
                </li>
              </ul>
            </div>
            <div class="outstanding-features--desktop__menu__content">
              <div class="menu__content__item" :key="item.id" v-for="(item, index) in fields.Features" v-show="navIndex === index">
                <outstand-feature-slider :itemId='"item_"+index' v-if="item.fields.Features.length">
                  <div :key="(subIndex)" v-for="(itemChild, subIndex) in item.fields.Features" class="swiper-slide outstanding-features--mobile__slider__item">
                    <div class="outstanding-features--mobile__slider__item__image" @click="activePopup(subIndex, index)">
                      <picture class="outstanding-features-item-picture">
                        <sc-image class="d-none d-sm-block" :media="itemChild.fields.Image"/>
                      </picture>
                      <!-- <sc-image class="d-sm-none" :media="itemChild.fields['Image-sm']"/> -->
                    </div>
                    <div class="outstanding-features--mobile__slider__item__content">
                      <sc-rich-text class="outstanding-features--mobile__slider__item__content__heading" tag="h3" :field="itemChild.fields.Title" />
                      <sc-rich-text class="outstanding-features--mobile__slider__item__content__desc" tag="p" :field="itemChild.fields.ShortDescription" />
                    </div>
                  </div>
                </outstand-feature-slider>
                <div class="outstanding-features__popup" :class="{'show-popup': isShowPopup}">
                  <div class="close-btn" @click="closePopup">
                    <svg viewBox="0 0 32 32">
                      <polygon points="32,1.5 30.6,0.1 16,14.6 1.5,0.1 0,1.5 14.6,16 0,30.6 1.5,32 16,17.5 30.6,32 32,30.6 17.4,16 "></polygon>
                    </svg>
                  </div>
                  <div class="popup-contents container">
                    <outstand-feature-slider ref="popupSwiper" :itemId='"item_0"'  :isMobile='true' :isPopup="true">
                      <div class="swiper-slide popup-contents" :key="(i)" v-for="(itemChild, i) in item.fields.Features">
                        <div class="popup-contents__col popup-contents__img">
                          <sc-image class="d-none d-sm-block" :media="itemChild.fields.Image"/>
                          <!-- <sc-image class="d-sm-none" :media="itemChild.fields['Image-sm']"/> -->
                        </div>
                        <div class="popup-contents__col popup-contents__text">
                          <sc-rich-text class="outstanding-features--mobile__slider__item__content__heading" tag="h3" :field="itemChild.fields.Title" />
                          <sc-rich-text class="outstanding-features--mobile__slider__item__content__desc" tag="p" :field="itemChild.fields.Description" />
                        </div>
                      </div>
                    </outstand-feature-slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="outstanding-features--mobile d-md-none">
      <div class="outstanding-features--mobile__menu" role="tablist">
        <b-card  ref="collapseOutstanding" class="outstanding-features--mobile__menu__item" :key="item.id" v-for="(item, index) in fields.Features">
          <b-card-header header-tag="header" role="tab">
            <div href="#" class="outstanding-features--mobile__menu__item__title" variant="info" @click="collapse(index)">{{item.fields.Title.value}}</div>
          </b-card-header>
          <div  class="isuzu-accordion" accordion="my-accordion" role="tabpanel" v-if="item.fields.Features.length">
            <outstand-feature-slider :itemId='"item_0"'  :isMobile='true' :arrowBtn='false'>
              <div class="swiper-slide outstanding-features--mobile__slider__item" :key="(subIndex)" v-for="(itemChild, subIndex) in item.fields.Features">
                <div class="outstanding-features--mobile__slider__item__image" @click="activePopupMb(item.fields,index,subIndex)">
                  <!-- <sc-image class="d-none d-sm-block" :media="itemChild.fields.Image"/> -->
                  <picture class="outstanding-features-item-picture">
                    <sc-image class="d-sm-none" :media="itemChild.fields['Image-sm']"/>
                  </picture>
                </div>
                <div class="outstanding-features--mobile__slider__item__content">
                  <sc-rich-text class="outstanding-features--mobile__slider__item__content__heading" tag="h3" :field="itemChild.fields.Title" />
                  <sc-rich-text class="outstanding-features--mobile__slider__item__content__desc" tag="p" :field="itemChild.fields.ShortDescription" />
                </div>
              </div>
            </outstand-feature-slider>
                <div class="outstanding-features__popup" :class="{'show-popup': isShowPopUpMobile}">
                <div class="close-btn" @click="closePopupMobile">
                  <svg viewBox="0 0 32 32">
                    <polygon points="32,1.5 30.6,0.1 16,14.6 1.5,0.1 0,1.5 14.6,16 0,30.6 1.5,32 16,17.5 30.6,32 32,30.6 17.4,16 "></polygon>
                  </svg>
                </div>
                <div class="popup-contents" v-if="isShowPopUpMobile">
                  <outstand-feature-slider :itemId='"item_0"' :isMobile='true' :arrowBtn='false' :initialSlide="initialSlide" :isPopup="true">
                    <div class="swiper-slide popup-contents" :key="(i)" v-for="(itemChild, i) in viewMobilePopup.Features">
                      <div class="popup-contents__col popup-contents__img">
                        <!-- <sc-image class="d-none d-sm-block" :media="itemChild.fields.Image"/> -->
                        <sc-image :media="itemChild.fields['Image-sm']"/>
                      </div>
                      <div class="popup-contents__col popup-contents__text">
                        <sc-rich-text class="outstanding-features--mobile__slider__item__content__heading" tag="h3" :field="itemChild.fields.Title" />
                        <sc-rich-text class="outstanding-features--mobile__slider__item__content__desc" tag="p" :field="itemChild.fields.Description" />
                      </div>
                    </div>
                  </outstand-feature-slider>
                </div>
              </div>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { Link, Image, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import $ from 'jquery';
import OutstandFeatureSlider from './OutstandFeatureSlider';
import { isMobile } from '../../util/dom';
import { lockScroll, unLockScroll} from '../../service/lockPopupService';

export default {
  name: 'OutstandingFeatures',
  components: {
    ScLink: Link,
    ScImage: Image,
    OutstandFeatureSlider: OutstandFeatureSlider,
    ScText: Text,
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
      navIndex: 0,
      isShowPopup: false,
      viewMobilePopup: {},
      deviceType: 3,
      detectMobile: false,
      classModify : '',
      isShowPopUpMobile : false,
      initialSlide : 0,
    };
  },
  methods: {
    collapse(index) {
      this.closeAllCollapse(index);
      this.scrollTopCollapse(index);
      this.toggleCollapseHandler(index);
    },
    navClick(index) {
      this.navIndex = index;
    },
    activePopup(subIndex, index) {
      this.isShowPopup = true;
      this.$refs.popupSwiper[index].jumpToSlide(subIndex);
      lockScroll();
    },
    activePopupMb(itemChild, index, subIndex) {
      this.viewMobilePopup = itemChild;
      this.initialSlide = subIndex;
      this.isShowPopUpMobile = true;
      lockScroll();
    },
    closePopup() {
      this.isShowPopup = false;
      unLockScroll();
    },
    closePopupMobile(){
      this.isShowPopUpMobile = false;
      unLockScroll();
    },
    closeAllCollapse(idx){
      let collapseList = this.$refs.collapseOutstanding;
      collapseList.forEach((_, index) => {
        if(idx !== index){
          this.closeCollapseHandler(index);
        }
      })
    },
    isCollapseOpen(index){
      let target = this.targetScroll(index);
      return target.find('.isuzu-accordion').hasClass('collapsed');
    },

    closeCollapseHandler(index){
      let target = this.targetScroll(index);
      target.find('.isuzu-accordion').removeClass('collapsed');
      target.find('.outstanding-features--mobile__menu__item__title').removeClass('collapsed');
    },

    toggleCollapseHandler(index){
      let target = this.targetScroll(index);
      target.find('.isuzu-accordion').toggleClass('collapsed');
      target.find('.outstanding-features--mobile__menu__item__title').toggleClass('collapsed');
    },

    scrollTopCollapse(index){
      if(!this.isCollapseOpen(index)){
        setTimeout(()=>{
          let paddingTop = $('.main-menu').height();
          let target = this.targetScroll(index);
          const topPixel = target.offset().top - paddingTop;
          window.scrollTo({
            top: parseInt(topPixel),
            behavior: 'smooth',
          });
        }, 800);
      }
    },
    targetScroll(index){
      let target = $(this.$refs.collapseOutstanding[index]);
      return target;
    },
    getBackgroundImage() {
      if (this.fields?.BackgroundImage?.value?.src) {
        return `url('${this.fields.BackgroundImage.value.src}')`;
      }
      return '';
    },
  },
  mounted(){
    // this.$root.$on('showOutStanding',()=> this.isShowPopUpMobile = true);
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.classModify = this.$jss?.routeData()?.fields?.CSSClassForCompare?.value || '';
    
    this.$nextTick(() => {
      if(this.$refs.collapseOutstanding?.length){
        this.toggleCollapseHandler(0);
      }
      // INFO: we need to forceUpdate in order to make swiper library run correctly,
      // otherwise we have issue with paging type
      this.$forceUpdate();
    });
  },
  watch: {
    fields: {
      handler (newFields) {
        this.navIndex = 0;
      },
      deep: true,
    },
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

$ratioImageOutstandingFeatures: 76%;
$ratioImageOutstandingFeaturesIphoneX: 50%;

.outstanding-features {
  font-family: $font-family-eurothai;
  font-size: 2.1rem;

  .isuzu-accordion {
    transition: all 0.5s ease-in-out;
    height: 0;
    overflow: hidden;

    &.collapsed {
      height: calc(70vw + 228px);

      @include media-breakpoint-up(xs) {
        height: calc(70vw + 210px);
      }

      @include media-breakpoint-up(md) {
        height: 580px;
      }
    }
  }

  &__wrap {
    @include media-breakpoint-up(xl) {
      padding: 0 40px;
    }
  }

  &--desktop {
    background-image: url('../../assets/bg-outstanding-features-2.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 80px 0 70px;

    @include media-breakpoint-up(sm) {
      padding: 70px 0 0;
    }

    @include media-breakpoint-up(md) {
      padding: 80px 0 20px 0;
    }

    @include media-breakpoint-up(lg) {
      padding: 80px 0 40px;
    }

    @include media-breakpoint-up(xl) {
      padding: 100px 0 89px;
    }

    &__menu {
      display: flex;
      justify-content: space-between;
      padding-left: 65px;

      @include media-breakpoint-up(sm) {
        padding-left: 0;
      }

      // INFO: fix style for desktop, make it align with container
      // @include media-breakpoint-up(xl) {
      //   padding: 0 15px;

      // }

      &__item {
        width: 300px;

        @include media-breakpoint-up(sm) {
          width: 190px;
          padding-right: 25px;
        }

        @include media-breakpoint-up(md) {
          width: 200px;
          padding-right: 15px;
        }

        @include media-breakpoint-up(lg) {
          width: 300px;
          padding-right: 30px;
        }

        @include media-breakpoint-up(xl) {
          padding-right: 45px;
        }
      }

      &__content {
        width: calc(100% - 300px);
        height: 515px;

        @include media-breakpoint-up(sm) {
          width: calc(100% - 165px);
          height: 355px;
        }

        @include media-breakpoint-up(md) {
          width: calc(100% - 200px);
          height: 445px;
        }

        @include media-breakpoint-up(lg) {
          width: calc(100% - 300px);
          height: 515px;
        }
      }

      .menu__content {
        &__item {
          width: 100%;
          height: 500px;
        }
      }
    }

    &__slider {
      padding-bottom: 30px;

      &__item {
        &__image {
          width: 100%;
          cursor: pointer;
          overflow: hidden;

          > * {
            transition: transform .4s ease,-webkit-transform .4s ease;
          }

          &:hover {
            img {
              transform: scale(1.05);
            }
          }
        }

        &__content {
          background: $white;
          padding: 30px 30px 12px;
          height: 210px;

          &__heading {
            display: inline-block;
            padding-bottom: 10px;
            border-bottom: 1px solid $black;
            font-size: 3.2rem;
          }

          &__desc {
            padding-top: 5px;
            color: #222;
          }
        }
      }
    }

    //customize tab
    >>> .nav-tabs {
      margin: 0 30px 0 65px;
      border: none;
    }

    >>> .nav-item {
      width: 100%;
      padding: 9px 0;
      border-top: 1px solid rgba(255,255,255,0.2);  //INFO: Follow customer's website
      cursor: pointer;
      position: relative;

      &:last-child {
        border-bottom: 1px solid rgba(255,255,255,0.2);
      }
    }

    >>> .nav-link {
      border: none;
      border-radius: 0;
      color: rgba(255,255,255,0.5); //INFO: Follow customer's website

      &::before {
        opacity: 0;
        content: "";
        position: absolute;
        transform: translate(-20px,-50%);
        top: 50%;
        bottom: auto;
        right: calc(100% + 15px);
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-left: 7px solid #ed1c24;
        transition: transform .3s cubic-bezier(.4,0,0,1),opacity .15s cubic-bezier(.4,0,0,1),-webkit-transform .3s cubic-bezier(.4,0,0,1);
      }

      @include hover-desktop() {
        &:hover {
          &::before {
            opacity: 1;
            transform: translate(0,-50%);
          }
        }
      }

      a {
        color: #777777;
        text-decoration: none;
      }

      &.active {
        background: transparent;
        color: $white;
        font-weight: bold;

        &::before {
          opacity: 1;
          transform: translate(0,-50%);
        }
      }
    }

    >>> .tab-content {
      width: 730px;
    }
  }

  &--mobile {
    background: #eeeeee;
    width: 100%;
    padding: 50px 0 40px;

    &__menu {
      &__item {
        &.card {
          &:last-child {
            .isuzu-accordion {
              &.collapsed {
                border-bottom: 1px solid #929292;
              }
            }
          }
        }

        &__title {
          font-size: 2.1rem;
          position: relative;
          width: 100%;

          &:focus {
            outline: none;
          }

          &:after {
            content: '';
            position: absolute;
            width: 15px;
            height: 15px;
            top: 25%;
            right: 9px;
            background: url('../../assets/arrow-down-out-standing.svg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 14px;
            transition: all .3s ease-in-out;
          }

          &.collapsed {
            font-weight: bold;

            &:after {
              transform: rotate(180deg);
            }
          }
        }
      }
    }

    &__slider {
      &__item {
        &__image {
          width: 100%;
          cursor: pointer;
          overflow: hidden;
          position: relative;
          padding-top: $ratioImageOutstandingFeatures;

          .outstanding-features-item-picture {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.4s ease, -webkit-transform 0.4s ease;
            }
          }

          > * {
            transition: transform .4s ease,-webkit-transform .4s ease;
          }

          &:hover {
            img {
              transform: scale(1.05);
            }
          }
        }

        &__content {
          background: $white;
          padding: 20px 25px 17px;
          height: 160px;
          overflow-x: hidden;
          overflow-y: auto;

          @include media-breakpoint-up(sm) {
            // padding: 18px 15px 0;
            height: 170px;
          }

          @include media-breakpoint-up(md) {
            padding: 20px 25px 10px;
            height: 215px;
          }

          @include media-breakpoint-up(lg) {
            padding: 26px 30px 12px;
            height: 225px;
          }

          &::-webkit-scrollbar-track {
            border-radius: 2px;
            background-color: #fff;
          }

          &::-webkit-scrollbar {
            width: 4px;
            background-color: #fff;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 2px;
            background-color: #a8a8a8;
          }

          &__heading {
            display: inline-block;
            padding-bottom: 6px;
            border-bottom: 2px solid $black;
            font-family: $font-family-eurothai-demi;
            font-size: $font-size-base;
            // line-height: 2rem; // INFO : LINE HEIGHT design
            // font-weight: bold;
            line-height: 1.13043em; // INFO: Follow customer's current site
            width: 100%;

            // @include media-breakpoint-up(sm) {
            //   font-size: $font-size-mobile;
            // }

            @include media-breakpoint-up(lg) {
              font-size: 2.6rem;
              // line-height: 3.1rem; // INFO : LINE HEIGHT design
              padding-bottom: 10px;
            }

            @include span-break();
          }

          &__desc {
            padding-top: 5px;
            color: #222;
            font-size: 1.9rem;
            line-height: 1.13043em; // INFO: Follow customer's current site

            @include media-breakpoint-up(lg) {
              padding-top: 12px;
              font-size: 2.1rem;
            }

            @include span-break();
          }
        }

        .outstanding-features__slider {
          margin-left: 0;
        }
      }
    }

    //customize collapse
    .card {
      border: none;

      &:last-child {
        .card-header {
          border-bottom: 1px solid #929292;
        }
      }
    }

    & >>> .card-body {
      background: #eeeeee;
      padding: 0 15px;

      @include media-breakpoint-up(md) {
        padding: 0 30px;
      }

      @include media-breakpoint-up(lg) {
        padding: 0 15px;
      }
    }

    .card-header {
      background: #eeeeee;
      border: none;
      border-top: 1px solid #929292;
      padding: 13px 8px;
    }

    .outstanding-features--mobile__slider__item__image {
      @include media-breakpoint-up(md) {
        padding-top: $ratioImageOutstandingFeaturesIphoneX;
      }
    }

    .outstanding-features--mobile__slider__item__content {
      @include media-breakpoint-up(md) {
        min-height: 135px;
      }
    }

    .outstanding-features__slider {
      margin: 0;
    }
  }

  &__popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: saturate(180%) blur(20px);
    background-color: rgba(0, 0, 0, 0.7);
    z-index: $HEADER_ZINDEX;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s;
    overflow-y: scroll;

    &.show-popup {
      // display: flex;
      opacity: 1;
      visibility: visible;

      .close-btn {
        transform: translateY(0);
        transition-delay: 0.5s;
      }

      .popup-contents {
        opacity: 1;
        transition-delay: 0.5s;
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
      z-index: $HEADER_ZINDEX;
      transform: translateY(-85px);
      transition: all 0.3s;
      cursor: pointer;
      z-index: 2;

      &::before {
        content: '';
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
          transform: translateZ(0) scale(1.2);
        }

        svg {
          fill: #000;
        }
      }

      @include media-breakpoint-up(md) {
        width: 60px;
        height: 60px;
        right: 65px;
      }

      svg {
        display: block;
        position: relative;
        z-index: 1;
        width: 14px;
        height: 14px;
        fill: #fff;
        transition: fill .3s cubic-bezier(.4,0,0,1);

        @include media-breakpoint-up(md) {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .popup-contents {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    opacity: 0;
    transition: opacity 0.5s;

    @include media-breakpoint-up(md) {
      max-width: 100%;
      padding-left: 0;
      padding-right: 0;
    }

    @include media-breakpoint-up(lg) {
      max-width: 1200px;
      align-items: center;
      height: auto;
      padding: 0;
    }

    .outstanding-features--mobile__slider__item__content__heading {
      @include media-breakpoint-up(lg) {
        font-size: 2.8rem;
      }
    }

    &__col {
      width: 100%;
      height: calc(100vh - 76vw);

      @include media-breakpoint-up(lg) {
        width: 50%;
        height: 380px;
      }

      @include media-breakpoint-up(xl) {
        height: 422px;
      }
    }

    &__img {
      position: relative;
      overflow: hidden;
      padding-top: $ratioImageOutstandingFeatures;

      @include media-breakpoint-down(md) {
        height: 0;
      }

      @include media-breakpoint-up(lg) {
        padding-top: 0;
      }

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__text {
      background: #fff;
      padding: 30px 20px;

      @include media-breakpoint-up(md) {
        padding: 30px;
      }

      @include media-breakpoint-up(lg) {
        padding: 60px 65px;
      }

      .outstanding-features--mobile__slider__item__content__desc {
        display: block;
        overflow-x: hidden;
        height: calc(100% - 80px);
        padding-right: 10px;

        &::-webkit-scrollbar {
          background: #a8a8a8;
          width: 7px;
          border-radius: 10px;
        }

        // @include media-breakpoint-up(sm) {
        //   height: 270px;
        // }

        @include media-breakpoint-up(lg) {
          height: 100%;
        }

        // @include media-breakpoint-up(xl) {
        //   height: 330px;
        // }
      }
    }

    .outstanding-features__slider {
      padding-bottom: 0;
      margin-left: 0;

      @include media-breakpoint-up(lg) {
        height: 100vh;
      }
    }

    & >>> .swiper-pagination-current {
      font-family: $font-family-eurothai-demi;
      font-size: 3rem;

      @include media-breakpoint-up(md) {
        color: #ff001a; //change color like in mobile
      }

      @include media-breakpoint-up(lg) {
        color: #fff;
      }
    }

    >>> .swiper-pagination {
      bottom: 30px;
      font-family: $font-family-eurothai;
      font-size: 2.6rem;
      color: #b6b6b6;
    }

    >>> .swiper-button-prev {
      @include media-breakpoint-up(lg) {
        left: 40%;
      }

      @include media-breakpoint-up(xl) {
        left: 41%;
      }
    }

    >>> .swiper-button-next {
      @include media-breakpoint-up(lg) {
        right: 40%;
      }

      @include media-breakpoint-up(xl) {
        right: 41%;
      }
    }
  }

  //customize swiper slide
  .swiper-wrapper {
    padding-bottom: 110px;

    @include media-breakpoint-up(lg) {
      padding-bottom: 70px;
    }
  }

  //INFO: modify style for mux and new mux pages
  &-mux,
  &-mux-new {
    >>>.swiper-pagination {
      .swiper-pagination-current {
        color: #222222;

        @include media-breakpoint-up(md) {
          color: $white;
        }
      }
    }
  }

  &-mux-new {
    .outstanding-features--mobile__slider__item__content__heading {
      border-bottom-color: #009cd7;
    }

    .nav-link {
      &::before {
        border-left-color: #1a3c5a;
      }
    }
  }
}
</style>
