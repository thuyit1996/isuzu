<template>
  <div class="reference-list" :class="templateName === componentFontEuro ? 'font-euro' : ''" :id="fields.TargetId && fields.TargetId.fields.Name.value" v-if="fields.Items.length">
    <div class="container">
      <div class="d-none d-md-block">
        <div class="reference-list__heading text-center title-homepage-top title-homepage-bottom">
          <sc-text class="isu-title" tag="h2" :field="fields.Title"/>
        </div>
        <div class="reference-list__list--desktop">
          <div class="" v-swiper:mySwiper="swiperQuickSelectionOption">
            <div class="swiper-wrapper" :class="centerSlide ? 'center' : ''">
              <div :key=(index) v-for="(item, index) in fields.Items" class="reference-item swiper-slide">
                <sc-link :field="item.fields.Url">
                  <div class="reference-item__icon">
                    <sc-image class="d-hover-none" :media="item.fields.Image"/>
                    <!-- <sc-image class="d-hover-block" :media="item.fields.ImageHover"/> -->
                  </div>
                  <sc-text tag="div" class="reference-item__title" :field="item.fields.Title"/>
                  <sc-text tag="div" class="reference-item__description" :field="item.fields.Description"/>
                </sc-link>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
      </div>
      <!-- <div v-else>
        <div class="reference-list__list">
          <div class="reference-item" :key="item.id" v-for="(item, index) in fields.Items">
              <sc-link :field="item.fields.Url">
                <div class="reference-item__icon">
                  <sc-image class="d-hover-none" :media="item.fields.Image"/>
                  <sc-image class="d-hover-block" :media="item.fields.ImageHover"/>
                </div>
                <sc-text tag="div" class="reference-item__title" :field="item.fields.Title"/>
                <sc-text tag="div" class="reference-item__description" :field="item.fields.Description"/>
              </sc-link>
            </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
const MAXIMUM_SLIDES_DESKTOP = 6;  //INFO: Follow customer's required: QuickSelection should be closer
const MAXIMUM_SLIDES_TABLET = 4;
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import { isMobile, isDesktop } from '../../util/dom';
export default {
  name: 'QuickSelection',
  components: {
    ScLink: Link,
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
      detectMobile: false,
      swiperQuickSelectionOption: {
        updateOnWindowResize: true, // TODO: Don't use this property for now
        slidesPerView: MAXIMUM_SLIDES_DESKTOP,
        spaceBetween: 0,
        navigation: {
          nextEl: '.reference-list .swiper-button-next',
          prevEl: '.reference-list .swiper-button-prev',
        },
        breakpoints : {
          1366: {
            slidesPerView: MAXIMUM_SLIDES_DESKTOP - 1,
          },

          1200: {
            slidesPerView: MAXIMUM_SLIDES_TABLET,
          },
        }
      },
      deviceType : 3,
      componentFontEuro: 'Product Detail',
      templateName : '',
      centerSlide: false,
    }
  },
  mounted () {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.templateName = this.$jss?.routeData()?.templateName || '';

    window.addEventListener('resize', this.onResizeWindow);

    this.centerSlide = this.getCenterSlide();
  },
  methods: {
    getCenterSlide() {
      if (isDesktop(this.deviceType)) {
        return this.fields.Items?.length < MAXIMUM_SLIDES_DESKTOP && window.innerWidth > 1400;
      } else {
        return this.fields.Items?.length < MAXIMUM_SLIDES_TABLET;
      }
    },
    onResizeWindow() {
      this.centerSlide = this.getCenterSlide();
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.onResizeWindow);
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.swiper-wrapper.center {
  display: flex;
  justify-content: center;
}

.reference-list {
  &.font-euro {
    font-family: $font-family-eurothai;

    .isu-title {
      @include media-breakpoint-up(lg) {
        font-size: 5.6rem;
        font-weight: bold;
      }
    }

    .reference-list__title {
      @include media-breakpoint-up(lg) {
        font-size: 2.1rem;
      }
    }
  }

  &__list {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0 28px;

    @include media-breakpoint-up(lg) {
      padding: 0;
    }

    &--desktop {
      position: relative;
      margin: 0 -6px;

      @include media-breakpoint-up(xl) {
        margin: 0 -15px;
      }
    }
  }

  .reference-item {
    width: 100%;
    height: auto;
    min-height: 91px;
    color: $black;
    // padding: 4px;

    @include media-breakpoint-up(md) {
      // padding: 3px;
      // width: 20%;
      min-height: 112px;
    }

    @include media-breakpoint-up(lg) {
      min-height: 158px;
      // padding: 0 6px;
    }

    @include media-breakpoint-up(xl) {
      max-width: 200px;
    }

    &:first-child {
      a::after {
        display: none;
      }
    }

    &__icon {
      display: flex;
      align-items: flex-end;
      height: 40px;
      overflow: hidden;

      @include media-breakpoint-up(md) {
        height: 45px;
      }

      @include media-breakpoint-up(lg) {
        height: 56px;
      }

      img {
        width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    &__title {
      margin-top: 10px;

      // @include media-breakpoint-up(md) {
      //   margin-top: 14px;
      //   margin-bottom: 14px;
      // }
      @include media-breakpoint-up(lg) {
        margin-top: 15px;
        // font-size: 2.1rem;
      }
    }

    &__description {
      font-size: $font-size-small;
      line-height: 1.5rem;  //compare and follow with design
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: center;

      @include media-breakpoint-up(md) {
        font-size: 1.9rem;
        line-height: 1.9rem; // compare and follow with design
        -webkit-line-clamp: 2;
      }
    }

    a {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      // background-color: $gray-100;
      // border: 1px solid $white;
      padding: 16px 15px 20px 15px;
      color: $black;
      position: relative;

      @include media-breakpoint-up(md) {
        padding: 28px 10px;
      }

      @include media-breakpoint-up(lg) {
        padding: 43px 20px;
      }

      &::after {
        position: absolute;
        content: '';
        background-image: url('../../assets/2d8b888.png');
        transform: rotate(180deg);
        background-repeat: no-repeat;
        background-position: 50%;
        width: 22px;
        right: 100%;
        top: 0;
        bottom: 0;
      }

      img.d-hover-block {
        display: none;
      }

      &:hover {
        text-decoration: none;
        // background-color: $red-hover-color;
        color: $red-hover-color;

        // img.d-hover-block {
        //   display: block;
        // }

        // img.d-hover-none {
        //   display: none;
        // }
      }
    }

    // img {
    //   width: 100%;
    //   max-width: 65px;
    // }

    // span {
    //   display: block;
    //   margin-top: 14px;
    //   color: $black;
    // }

  }

  @include swiper();
  & >>> .swiper-button-next {
    right: -15px;

    @include media-breakpoint-up(lg) {
      right: -20px;
    }
  }

  & >>> .swiper-button-prev {
    left: -13px;

    @include media-breakpoint-up(lg) {
      left: -20px;
    }
  }

  & >>> .swiper-button-next,
  & >>> .swiper-button-prev {
    z-index: $NOMAL-ZINDEX;
    outline: none;
    border-radius: 50%;
    background-size: contain;
    box-shadow: 0 0 6px #ccc;
    width: 30px;
    height: 30px;
    top: 50%;

    @include media-breakpoint-up(lg) {
      width: 45px;
      height: 45px;
      top: calc(50% - 10px);
    }
  }

  .swiper-wrapper {
    padding-bottom: 0;
  }
}
</style>

