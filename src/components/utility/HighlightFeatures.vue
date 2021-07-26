<template>
  <div class="highlight-features">
    <div class="container no-gutters-mb no-padding">
      <div class="highlight-features__position">
        <div class="highlight-features-wrap" v-swiper:mySwiper="swiperHighlightFeaturesOption">
          <div class="swiper-wrapper">
            <div :key="(item.id)" v-for="(item, index) in fields.Features" class="swiper-slide swiper-row">
              <div class="highlight-features__title highlight-features__title--1st animated delay-100" v-animate-onscroll="'fadeInUp'">
                <sc-rich-text class="highlight-features__title__text" tag="div" :field="item.fields.Title" />
              </div>
              <div class="highlight-features__img" @click="activePopup(item.fields, index)">
                <sc-image class="d-none d-sm-block" :media="item.fields.Image" />
                <sc-image v-if="!isEditing" class="d-sm-none" :media="item.fields['Image-sm']" />
              </div>
              <div class="highlight-features__contents animated delay-200" v-animate-onscroll="'fadeInUp'" >
                <div class="highlight-features__title highlight-features__title--2nd">
                  <sc-rich-text tag="div" class="highlight-features__title__text" :field="item.fields.Title" />
                </div>
                <sc-rich-text tag="div" class="highlight-features__contents__desc" :field="item.fields.Description"/>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination animated delay-200" v-animate-onscroll="'fadeInUp'" slot="pagination"></div>
        <div class="swiper-button-prev animated delay-200" v-animate-onscroll="'fadeInUp'" slot="button-prev"></div>
        <div class="swiper-button-next animated delay-200" v-animate-onscroll="'fadeInUp'" slot="button-next"></div>
      </div>
    </div>
    <div class="highlight-features__popup" :class="{'show-popup': isShowPopup}" >
        <div class="close-btn" @click="closePopup">
          <svg viewBox="0 0 32 32">
            <polygon points="32,1.5 30.6,0.1 16,14.6 1.5,0.1 0,1.5 14.6,16 0,30.6 1.5,32 16,17.5 30.6,32 32,30.6 17.4,16 "></polygon>
          </svg>
        </div>
        <div class="highlight-features__popup__image">
          <!-- <sc-image class="d-none d-sm-block" :media="imagePoup.Image" />
          <sc-image v-if="!isEditing" class="d-sm-none" :media="imagePoup['Image-sm']" /> -->
          <highlight-feature-slider ref="popupSwiperHighlightFeature">
            <div class="swiper-slide" :key="(item.id)" v-for="(item) in fields.Features">
              <sc-image class="d-none d-sm-block" :media="item.fields.Image" />
              <sc-image v-if="!isEditing" class="d-sm-none" :media="item.fields['Image-sm']" />
            </div>
          </highlight-feature-slider>
        </div>
    </div>
  </div>
</template>
<script>
import { Image, RichText } from '@sitecore-jss/sitecore-jss-vue';
import { lockScroll, unLockScroll } from '../../service/lockPopupService';
import HighlightFeatureSlider from './HighlightFeatureSlider';

export default {
  name: 'HighlightFeatures',
  components: {
    ScRichText: RichText,
    ScImage: Image,
    HighlightFeatureSlider: HighlightFeatureSlider,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      swiperHighlightFeaturesOption: {
        pagination: {
          el: '.highlight-features .swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.highlight-features .swiper-button-next',
          prevEl: '.highlight-features .swiper-button-prev',
        },
        loop: true,
        spaceBetween: 15,
        breakpoints: {
          992: {
            centeredSlides: true,
            spaceBetween: 6,
            slidesPerView: 'auto',
          },
        },
      },
      isShowPopup: false,
      imagePoup: {},
      isEditing: true,
    };
  },
  methods: {
    activePopup(item, index) {
      this.isShowPopup = true;
      // this.imagePoup = item;
      this.$refs.popupSwiperHighlightFeature.jumpToSlide(index);
      lockScroll();
    },
    closePopup() {
      unLockScroll();
      this.isShowPopup = false;
    },
  },
  mounted() {
    this.$nextTick(() => {
      // INFO: we need to forceUpdate in order to make swiper library run correctly,
      // otherwise we have issue with paging type
      this.$forceUpdate();
    });
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    this.mySwiper.on('transitionStart', () => {
      this.$el.querySelectorAll('.highlight-features__contents, .highlight-features__title').forEach(item => {
        item.classList.remove('fadeInUp');
      });
    });
    this.mySwiper.on('transitionEnd', () => {
      this.$el.querySelectorAll('.highlight-features__contents, .highlight-features__title').forEach(item => {
        item.classList.add('fadeInUp');
      });
    });

  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
// TODO: move this import the global file
@import '../../../node_modules/swiper/dist/css/swiper.css';
$img-width: 50%;

.title {
  display: inline-block;
  position: relative;
  margin: 0;
  padding: 0 20px;
  font-size: $font-size-highlight-feature-heading-mobile; //INFO: because having wrong font-size h2-tag compared to mobile design , I have to increase font-size here!
  line-height: 3rem; // INFO : LINE HEIGHT follow design

  @include media-breakpoint-up(lg) {
    padding: 0 30px;
    font-size: $font-size-highlight-feature-heading; //INFO: because having wrong font-size h2-tag compared to design
    line-height: 4.8rem; // INFO : LINE HEIGHT follow design
  }

  &::before {
    left: 100%;
  }

  &::after {
    right: 100%;
  }

  &__line-bottom {
    padding: 0 0 10px 0;

    &::before {
      display: none;
    }

    &::after {
      content: "";
      position: absolute;
      top: auto;
      bottom: 0;
      left: 0;
      right: auto;

      @include media-breakpoint-up(lg) {
        width: 82px;
        height: 2px;
        background: #ed2600;
      }
    }
  }
}

.highlight-features-wrap {
  // margin-left: -15px;
  // margin-right: -15px;

  @include media-breakpoint-up(md) {
    // margin-left: auto;
    // margin-right: auto;

    // INFO: fix for 125% issue
    position: relative;
    left: 1px;

    .swiper-wrapper {
      position: relative;
      left: -2px;
    }
  }
}

.no-gutters-mb {
  @include media-breakpoint-down(md) {
    padding-right: 0;
    padding-left: 0;
    max-width: 100%;
  }
}

.highlight-features {
  background-color: $white;
  font-family: $font-family-eurothai;

  @include media-breakpoint-up(lg) {
    padding: 50px 0;
    background-color: #f5f5f5;
  }

  &__position {
    position: relative;
    z-index: $NOMAL-ZINDEX;

    .swiper-slide {
      max-width: 89.8%;

      @include media-breakpoint-up(lg) {
        max-width: 100%;
      }
    }

    .swiper-row {
      @include media-breakpoint-up(lg) {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  &__title {
    font-family: $font-family-eurothai;
    font-weight: bold;
    font-size: $font-size-highlight-feature-title-mobile;
    letter-spacing: -0.02em;
    line-height: 1em;
    position: relative;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-highlight-feature-title-lg;
    }

    @include media-breakpoint-up(xl) {
      font-size: $font-size-highlight-feature-title-xl;
    }

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 2px;
      width: 100%;
      background-color: #fff;

      @include media-breakpoint-up(lg) {
        background-color: #f5f5f5;
      }
    }

    >>> span {
      display: inline-block;
      word-wrap: break-word;
      word-break: keep-all;
    }

    &__text {
      position: relative;
      text-align: center;
      display: inline;
      box-shadow: 0 2px 0 #000;

      @include media-breakpoint-up(lg) {
        text-align: left;
      }

      >>> * {
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        display: inline;
        position: relative;
        z-index: 1;
      }
    }

    &--1st {
      width: 100vw;
      text-align: center;
      height: 146px;
      padding: 32px 20px;
      display: table-cell;
      vertical-align: bottom;

      &:after {
        bottom: 32px;
      }

      @include media-breakpoint-up(md) {
        padding: 32px;
        height: 130px;
      }

      @include media-breakpoint-up(lg) {
        display: none;
      }
    }

    &--2nd {
      display: none;
      margin-right: 40px;

      @include media-breakpoint-up(lg) {
        display: block;
        // margin-bottom: 15px;
      }
    }
  }

  &__img {
    display: block;
    cursor: pointer;

    @include media-breakpoint-up(lg) {
      order: 2;
      width: $img-width;
      overflow: hidden;
      margin-top: 0;

      &:hover {
        img {
          transform: scale(1.1);
        }
      }
    }

    img {
      width: 100%;
      transition: transform .75s ease;
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
    visibility: hidden;
    opacity: 0;
    text-align: center;
    padding: 80px 0;
    transition: 0.5s all;
    overflow-y: scroll;

    &.show-popup {
      visibility: visible;
      opacity: 1;
      // transition-delay: 0.5s;

      .close-btn {
        transition-delay: 0.5s;
        transform: translateY(0);
        opacity: 1;
      }

      .highlight-features__popup__image {
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
      transition: 0.5s all;
      transform: translateY(-82px);
      opacity: 0;
      cursor: pointer;
      z-index: 2;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        background-color: $black;
        border-radius: 50%;
        transform: translateZ(0) scale(1);
        transition: background-color .3s cubic-bezier(.4,0,0,1),-webkit-transform .45s cubic-bezier(.17,.67,.3,1.33);
        transition: background-color .3s cubic-bezier(.4,0,0,1),transform .45s cubic-bezier(.17,.67,.3,1.33);
        transition: background-color .3s cubic-bezier(.4,0,0,1),transform .45s cubic-bezier(.17,.67,.3,1.33),-webkit-transform .45s cubic-bezier(.17,.67,.3,1.33);
        box-shadow: 0 5px 10px 2px rgba(0,0,0,.04);
      }

      &:hover {
        &::before {
          background-color: $white;
        }

        svg {
          fill: $black;
        }
      }

      @include media-breakpoint-up(md) {
        width: 60px;
        height: 60px;
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

    &__image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.5s all;
      opacity: 0;

      @include media-breakpoint-up(lg) {
        width: 100%;
        max-width: 960px;
        margin: 0 auto;
      }

      img {
        width: 100%;
        height: auto;
      }
    }
  }

  &__contents {
    text-align: center;
    padding: 25px 12px 100px 12px;
    font-size: $font-size-desc-mobile;

    @include media-breakpoint-up(sm) {
      padding: 25px 35px 100px 30px;
    }

    @include media-breakpoint-up(md) {
      padding: 25px 32px 80px;
      font-size: $font-size-base;
    }

    @include media-breakpoint-up(lg) {
      order: 1;
      width: 100% - $img-width;
      text-align: left;
      padding: 10px 30px 0 0;
    }

    @include media-breakpoint-up(xl) {
      padding: 30px 60px 0 55px;
    }

    &__desc {
      max-height: 95px;
      font-size: $font-size-highlight-feature-desc-mobile; //INFO: follow customer's current website
      font-family: $font-family-eurothai;
      line-height: 1.2em; // INFO : customer's current website
      color: $black;

      // @include media-breakpoint-up(sm) {
      //   font-size: calc(0.30817vw + 17.84438px);
      // }

      @include media-breakpoint-up(md) {
        font-size: $font-size-highlight-feature-desc-md;
      }

      @include media-breakpoint-up(lg) {
        max-height: 100px;
        // line-height: 2.7rem; // INFO : LINE HEIGHT follow design
        margin-top: 23px;
        font-size: $font-size-highlight-feature-desc;
      }

      >>> span {
        display: inline-block;
        word-wrap: break-word;
        word-break: keep-all;
      }
    }

    // p {
    //   font-family: $font-family-eurothai;
    //   line-height: 1.95rem; // INFO : LINE HEIGHT follow design
    //   color: $black;

    //   @include media-breakpoint-up(lg) {
    //     line-height: 2.7rem; // INFO : LINE HEIGHT follow design
    //     margin-top: 10px;
    //     font-size: 2.1rem;
    //   }
    // }
  }

  @include swiper-pagination();

  @include arrow-hover-effect--swiper();

}
</style>
