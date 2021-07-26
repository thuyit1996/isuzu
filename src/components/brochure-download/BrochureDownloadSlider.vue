<template>
  <div class="download-brochure-des">
    <div v-swiper:mySwiper="swiperDownBrochureOption">
      <div class="swiper-wrapper" :class="centerSlide ? 'center' : ''">
        <div class="swiper-slide chil-menu-content__item" v-for="(model, index) in items" :key="model.id">
          <div class="chil-menu-content__item__link">
            <div class="product-tag">
              <!-- <sc-text tag="div" class="product-tag__text" :field="model.fields.Tag"></sc-text> -->
              <sc-image v-if="checkTag(model.fields.Tag)" :media="model.fields.Tag.fields.Image" class="product-tag__img"></sc-image>
            </div>
            <sc-image :media="model.fields.Image" alt="x" id="ee-image"/>
          </div>
          <div class="download">
            <div class="download__text"><sc-text :field="model.fields.Title"/></div>
            <div class="download__btn">
              <isu-button-link :field="model.fields.Url">
                <sc-link :field="model.fields.Url" class="download__btn__link">
                  <span>ดาวน์โหลดโบรชัวร์</span>
                  <div class="download__icon">
                    <img src="../../assets/download-icon-hover.svg" alt="x" class="icon-nomal">
                    <img src="../../assets/download-icon.svg" alt="x" class="icon-hover">
                  </div>
                </sc-link>
              </isu-button-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </div>
</template>

<script>
const MAXIMUM_SLIDES = 4;
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import IsuButtonLink from '../shared/IsuButtonLink';

export default {
  name : 'BrochureDownloadSlider',
  components : {
    ScLink : Link,
    ScImage: Image,
    ScText: Text,
    IsuButtonLink: IsuButtonLink,
  },
  props : {
    items: {
      type : Array,
    },
    indexTab: {
      type : Number,
    }
  },
  data () {
    return {
      swiperDownBrochureOption: {
        slidesPerView: MAXIMUM_SLIDES,
        spaceBetween: 35,
        navigation: {
          nextEl: '.download-brochure-des .swiper-button-next',
          prevEl: '.download-brochure-des .swiper-button-prev',
        },
      },
    }
  },
  computed: {
    centerSlide: function() {
      return this.items?.length < MAXIMUM_SLIDES;
    },
  },
  methods: {
    checkTag(tag) {
      return tag?.fields?.Image?.value?.src;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.download-brochure-des {
  >>> #ee-image { //INFO: This is to override width, height on EE
    width: auto;
    height: auto;
  }

  .chil-menu-content {
    &__item {
      color: $black;
      display: flex;
      margin: 18px 0;

      @include media-breakpoint-up(md) {
        display: block;
        margin: 0;
        height: unset;
        padding-bottom: 30px;
        position: relative;
      }

      &:first-child {
        margin-top: 0;
      }

      &:hover {
        @include media-breakpoint-up(lg) {
          img {
            transform: scale(1.03);
          }
          
          .download__text {
            color: $red-hover-color;
            transition: color 0.25s ease-in;
          }

          .download__btn {
            &__link {
              background: $primary-bgr-activated; //INFO: Follow customer's required
              color: $primary-color-activated;
            }

            .download__icon {
              img {
                transform: scale(1);
              }
            }
          }
        }
      }

      &__link {
        height: 95px;
        width: 50%;
        display: flex;
        align-items: center;
        padding-right: 12px;

        @include media-breakpoint-up(sm) {
          justify-content: center;
          flex-direction: column;
        }

        @include media-breakpoint-up(md) {
          height: 110px;
          width: 100%;
          justify-content: center;
          padding-right: 0;
        }

        @include media-breakpoint-up(lg) {
          margin-bottom: 25px;
        }

        img {
          transition: transform .25s ease;
        }

        @include product-tag();

        .product-tag {
          top: 20px;
          height: 9px;

          @include media-breakpoint-up(lg) {
            top: 4px;
            height: 13px;
            right: 66%;
          }

          @include media-breakpoint-up(xl) {
            right: 73%;
          }
        }
      }

      .download {
        width: 50%;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        padding-left: 12px;
        line-height: 1.8rem; //INFO: Line-height follow as the design
        justify-content: center;
        align-items: center;

        @include media-breakpoint-up(md) {
          width: 100%;
          padding-left: 0;
        }

        &__text {
          margin-bottom: 10px;
          text-align: center;

          @include media-breakpoint-up(lg) {
            margin-bottom: 35px;
          }
        }

        &__btn {
          transition: all 0.25s ease-in-out;
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          width: 100%;

          &__link {
            display: block;
            padding: 10px 12px;
            width: 100%;
            text-align: center;
            line-height: 1.8rem; //INFO: Line-height follow as the design
            background: $primary-bgr; //INFO: Follow customer's required
            color: $primary-color;
            border-radius: 50px;
            transition: all .25s ease-in-out;

            @include media-breakpoint-up(lg) {
              padding: 11px 35px;
            }

            @include media-breakpoint-up(lg) {
              padding: 11px 35px;
            }
          }
        }

        &__icon {
          display: inline-flex;
          align-items: center;
          height: 100%;

          img {
            margin-left: 4px;

            @include media-breakpoint-up(lg) {
              margin-left: 6px;
            }
          }

          .icon-nomal {
            display: block;
          }

          .icon-hover {
            display: none;
          }
        }
      }

      img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  // .all-new {
  //   display: none;
  //   position: relative;

  //   @include media-breakpoint-up(md) {
  //     display: block;
  //   }

  //   &::before {
  //     content: '';
  //     position: absolute;
  //     top: 0;
  //     right: 0;
  //     width: 72px;
  //     height: 13px;
  //     background: url('../../assets/all-new.png') no-repeat;
  //     background-position: center;
  //     background-size: cover;
  //   }
  // }

  .swiper-wrapper.center {
    justify-content: center;
  }

  @include swiper();

  .swiper-wrapper {
    padding-bottom: 30px;
  }
}

</style>