<template>
  <div class="mux-safety" :class="modifyClass">
    <div class="container no-padding no-container-mobi container-extra-large">
      <div class="mux-safety__wrap" :style="{background: backgroundMuxSafety}">
        <picture class="mux-safety__background delay-200 animated" v-animate-onscroll="'fadeIn'">
          <!-- <source media="(min-width: 1024px)" srcset="../../assets/bg-product-highlight-intro4.png">
          <img src="../../assets/bg-product-image-mobile.jpg" alt="product image"> -->
          <sc-image :media="fields.Image" class="d-none d-lg-block"/>
          <!-- <sc-image v-if="!isEditing" :media="fields.BackgroundMediumImage" class="d-none d-md-block d-lg-none"/> -->
          <sc-image v-if="!isEditing" :media="fields.SmallBackgroundImage" class="d-lg-none"/>
        </picture>
        <div class="mux-safety__content">
          <div class="mux-safety__heading delay-500 animated" v-animate-onscroll="'fadeInUp'">
            <!-- <h2 class="mux-safety__heading__title mux-safety__heading__title--text isu-title--underline">SAFETY</h2>
            <h2 class="mux-safety__heading__title mux-safety__heading__title--image isu-title--image">
              <img src="../../assets/title-image-mobile-1.svg" alt="title image" class="d-lg-none">
              <img src="../../assets/title-image-1.svg" alt="title image" class="d-none d-lg-block">
            </h2> -->
            <sc-rich-text tag="div" :field="fields.Title" />
            <!-- <h3 class="mux-safety__heading__subtitle isu-subtitle">มั่นใจกับทุกนาทีแห่งการเดินทาง สู่ประสบการณ์ใหม่...</h3>
            <p class="mux-safety__heading__desc isu-description">กับระบบเพื่อความปลอดภัยครบครัน ที่พร้อมป้องกันและปกป้อง จากเหตุการณ์ไม่คาดฝัน</p> -->
            <sc-rich-text tag="div" :field="fields.Description" />
          </div>
          <div class="mux-safety__image delay-200 animated" v-animate-onscroll="'fadeIn'">
            <!-- <img src="../../assets/pdt-highlight-intro3-mobile.jpg" alt="product-image"> -->
            <!-- <sc-image :media="fields.Image" class="d-none d-lg-block"/> -->
            <sc-image v-if="!isEditing" :media="fields.SmallImage" class="d-lg-none"/>
          </div>
          <div class="mux-safety__slider-position delay-500 animated" v-animate-onscroll="'fadeInUp'">
            <div class="mux-safety__slider" v-swiper:mySwiper="swiperMuxSafetyOption">
              <div class="swiper-wrapper">
                <div class="swiper-slide" :key="(item.id)" v-for="(item, index) in fields.Items">
                  <div class="mux-safety__slider__item">
                    <div class="mux-safety__slider__item__img-border" @click="activePopup(item)">
                      <div class="mux-safety__slider__item__img">
                        <!-- <img src="../../assets/extorior-product-img-1.jpg" alt="extorior image"> -->
                        <sc-image :media="item.fields.Image" />
                      </div>
                    </div>
                    <!-- <p class="mux-safety__slider__item__text">กันชนหน้า</p> -->
                    <sc-rich-text tag="div" :field="item.fields.Title" />
                  </div>
                </div>
                <!-- <div class="swiper-slide">
                  <div class="mux-safety__slider__item" @click="activePopup">
                    <div class="mux-safety__slider__item__img-border">
                      <div class="mux-safety__slider__item__img">
                        <img src="../../assets/extorior-product-img-2.jpg" alt="extorior image">
                      </div>
                    </div>
                    <p class="mux-safety__slider__item__text">กันชนหน้า</p>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="mux-safety__slider__item" @click="activePopup">
                    <div class="mux-safety__slider__item__img-border">
                      <div class="mux-safety__slider__item__img">
                        <img src="../../assets/extorior-product-img-1.jpg" alt="extorior image">
                      </div>
                    </div>
                    <p class="mux-safety__slider__item__text">กันชนหน้า</p>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </div>
        </div>
      </div>
      <div class="mux-safety__content-bg-bottom"></div>
    </div>
    <div class="mux-safety__popup" :class="{'show-popup': isShowPopup}" >
      <div class="close-btn" @click="closePopup">
        <svg viewBox="0 0 32 32">
          <polygon points="32,1.5 30.6,0.1 16,14.6 1.5,0.1 0,1.5 14.6,16 0,30.6 1.5,32 16,17.5 30.6,32 32,30.6 17.4,16 "></polygon>
        </svg>
      </div>
      <equipment-intro-slider ref="popupSwipermuxSafety">
        <div class="swiper-slide" :key="(item.id)" v-for="(item) in listPopupMuxSafety">
          <div class="popup-contents">
            <div class="popup-contents__row">
              <div class="popup-contents__col popup-contents__img">
                <!-- <img src="../../assets/extorior-product-img-1.jpg" alt="extorior image"> -->
                <sc-image :media="item.fields.Image" />
              </div>
              <div class="popup-contents__col popup-contents__text">
                <div class="popup-contents__text__desc">
                  <!-- <h3 class="popup-contents__text__title">กันชนหน้า-หลัง สีดำ Piano Black</h3> -->
                  <sc-rich-text tag="div" class="popup-contents__text__title" :field="item.fields.Title" />
                  <!-- <p class="popup-contents__text__desc">ดุดัน สไตล์สปอร์ต</p> -->
                  <sc-rich-text tag="div" :field="item.fields.Description" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </equipment-intro-slider>
      <!-- <div class="popup-contents">
        <div class="popup-contents__col popup-contents__img">
          <img src="../../assets/extorior-product-img-1.jpg" alt="extorior image">
        </div>
        <div class="popup-contents__col popup-contents__text">
          <h3 class="popup-contents__text__title">กันชนหน้า-หลัง สีดำ Piano Black</h3>
          <p class="popup-contents__text__desc">ดุดัน สไตล์สปอร์ต</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Text, Image, RichText } from '@sitecore-jss/sitecore-jss-vue';
import EquipmentIntroSlider from './EquipmentIntroSlider';
import { lockScroll, unLockScroll } from '../../service/lockPopupService';

const MIN_WIDTH_DESKTOP = 992;
const MIN_WIDTH_DESKTOP_LG = 1200;
const MIN_WIDTH_DESKTOP_XL = 1400;
const BACKGROUND_SIZE_COVER = 'cover';
const BACKGROUND_SIZE_MD = '150%';
const BACKGROUND_SIZE_LG = '130%';

export default {
  name: 'MuxSafety',
  components: {
    ScText: Text,
    ScImage: Image,
    ScRichText: RichText,
    EquipmentIntroSlider: EquipmentIntroSlider,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      swiperMuxSafetyOption: {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: '.mux-safety__content .swiper-button-next',
          prevEl: '.mux-safety__content .swiper-button-prev',
        },
        watchOverflow: true,
      },
      isShowPopup: false,
      modifyClass: '',
      listPopupMuxSafety: [],
      backgroundMuxSafety: '',
      isEditing: false,
    }
  },
  methods: {
    activePopup(item) {
      this.listPopupMuxSafety = [];
      item.fields.Items.forEach((supItem) => {
        this.listPopupMuxSafety.push(supItem);
      });
      this.isShowPopup = true;
      lockScroll();
    },
    closePopup() {
      unLockScroll();
      this.isShowPopup = false;
    },
    setBackgrounColordMuxSafety() {
      this.$el.setAttribute(
        'style',
        `background: ${this.fields?.BackgroundColor?.value || 'none'}`
      );
      // if (window.innerWidth > MIN_WIDTH_DESKTOP) {
      //   this.backgroundMuxSafety = this.fields?.BackgroundColor?.value || 'none';
      // } else {
      //   this.backgroundMuxSafety = 'none';
      // }
    },
    setBackgrounImagedMuxSafety() {
      if (this.checkBackgrounImagedMuxSafety()) {
        let muxSafety = this.$el;
        if (window.innerWidth < MIN_WIDTH_DESKTOP) {
          muxSafety.setAttribute(
            'style',
            `background: url('${
              this.fields.SmallBackgroundImage.value.src
            }') center no-repeat; background-size: ${BACKGROUND_SIZE_COVER}`
          );
        } else {
          muxSafety.setAttribute(
            'style',
            `background: url('${
              this.fields.BackgroundImage.value.src
            }') center no-repeat; background-size: ${BACKGROUND_SIZE_COVER}; background-position: bottom;`
          );
        }
        //  else if (
        //   window.innerWidth > MIN_WIDTH_DESKTOP &&
        //   window.innerWidth < MIN_WIDTH_DESKTOP_LG
        // ) {
        //   muxSafety.setAttribute(
        //     'style',
        //     `background: url('${
        //       this.fields.BackgroundImage.value.src
        //     }') center no-repeat; background-size: ${BACKGROUND_SIZE_MD}`
        //   );
        // } else if (
        //   window.innerWidth > MIN_WIDTH_DESKTOP_LG &&
        //   window.innerWidth < MIN_WIDTH_DESKTOP_XL
        // ) {
        //   muxSafety.setAttribute(
        //     'style',
        //     `background: url('${
        //       this.fields.BackgroundImage.value.src
        //     }') center no-repeat; background-size: ${BACKGROUND_SIZE_LG}`
        //   );
        // } else {
        //   muxSafety.setAttribute(
        //     'style',
        //     `background: url('${
        //       this.fields.BackgroundImage.value.src
        //     }') center no-repeat; background-size: ${BACKGROUND_SIZE_COVER}`
        //   );
        // }
      } else {
        this.setBackgrounColordMuxSafety();
      }
    },
    checkBackgrounImagedMuxSafety() {
      if (this.fields?.BackgroundImage?.value?.src) {
        return true;
      }
    }
  },
  mounted() {
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    if (this.checkBackgrounImagedMuxSafety()) {
      this.modifyClass = 'mux-safety--new-mux mux-safety--slide-blue';
      // this.setBackgrounImagedMuxSafety();
    }
    this.setBackgrounImagedMuxSafety()
    // this.setBackgrounColordMuxSafety();
    // window.addEventListener('resize', this.setBackgrounColordMuxSafety);
    window.addEventListener('resize', this.setBackgrounImagedMuxSafety);
  },
  destroyed() {
    // window.removeEventListener('resize', this.setBackgrounColordMuxSafety);
    window.removeEventListener('resize', this.setBackgrounImagedMuxSafety);
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.mux-safety {
  color: $white;
  text-align: center;
  // padding: 6.5% 0 15px;
  // background: url('../../assets/bg-product-highlight-intro-mobile-2.jpg') center no-repeat;
  background-size: cover;

  // @include media-breakpoint-up(md) {
  //   padding: 9% 0 35px;
  // }

  @include media-breakpoint-up(lg) {
    background: none;
    padding: 0 0 50px;
    text-align: left;
  }

  &__wrap {
    z-index: 1;
    position: relative;
    padding: 6.5% 0 15px;

    @include media-breakpoint-up(md) {
      padding: 9% 0 35px;
    }

    @include media-breakpoint-up(lg) {
      background: linear-gradient(0deg,#000,#0d1e2e 27%,#193c5b 46%,#5886a4 72%,#f2f6ff);
      height: 0;
      padding: 0;
      padding-bottom: 42.33333%;
    }
  }
  
  &__content-bg-bottom {
    display: none;
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;

    >>> img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // display: none;

      // @include media-breakpoint-up(lg) {
      //   display: block;
      // }
    }
  }

  &__content {
    padding: 0 20px;
    @include media-breakpoint-up(lg) {
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      padding: 0 35px 0 70px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 100%;
      height: auto;
    }
  }

  &__heading {
    min-height: 200px;
    padding: 0 5px;

    @include span-break();

    @include media-breakpoint-up(md) {
      height: auto;
    }

    @include media-breakpoint-up(lg) {
      padding: 50px 0 0 0;
      margin-bottom: 25px;
      width: 100%;
      z-index: 1;
    }

    &__title {
      &--image {
        display: none;
      }
    }
  }

  &__image {
    opacity: 0;
    text-align: center;
    height: 0;
    padding-bottom: 62.5%;

    @include media-breakpoint-up(md) {
      margin-bottom: 40px;
    }

    @include media-breakpoint-up(lg) {
      display: none;
    }

    img {
      width: auto;
      height: auto;
    }
  }

  &__slider-position {
    position: relative;
    margin: 0 auto;

    @include media-breakpoint-up(md) {
      max-width: 480px;
    }

    @include media-breakpoint-up(lg) {
      max-width: 400px;
      margin: 0 35px;
      padding-bottom: 16px;
    }

    @include media-breakpoint-up(xl) {
      // margin: 0 0 0 35px;
      padding-bottom: 34px;
    }
  }

  &__slider {
    display: flex;
    margin: 0 25px;

    @include media-breakpoint-up(lg) {
      margin: 0;
    }

    &__item {
      text-align: center;

      &__img-border {
        background: $white;
        padding: 1px;
        cursor: pointer;

        @include media-breakpoint-up(md) {
          padding: 2px;
        }
      }

      &__img {
        width: 100%;
        height: 0;
        padding-bottom: 69%;
        position: relative;
        overflow: hidden;

        > * {
          transition: transform .4s ease,-webkit-transform .4s ease;
        }

        &:hover {
          >>> img {
            transform: scale(1.05);
          }
        }

        >>> img {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }

      >>> &__text {
        margin: 10px 0 0;
        font-size: 1.9rem;

        @include media-breakpoint-up(sm) {
          font-size: calc(.30817vw + 17.84438px);
        }

        @include media-breakpoint-up(lg) {
          font-size: 2.1rem;
        }
      }
    }
  }

  

  @include swiper-mux();

  &--slide-blue {
    .mux-safety {
      &__slider {
        &__item {
          &__img-border {
            background: linear-gradient(0deg,#009cd7,#fff);
          }
        }
      }
    }

    @include swiper-mux-blue();
  }

  &__popup {
    .popup-contents {
      margin: 0 auto;

      &__text {
        &__desc {
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
        }
      }
    }
  }

  @include product-detail-popup();

  &--new-mux {
    background: url('../../assets/bg-product-highlight-intro-mobile-2.jpg') center no-repeat;
    background-size: cover;
    position: relative;

    @include media-breakpoint-up(lg) {
      background: url('../../assets/bg-product-highlight-intro4.jpg') center no-repeat;
      background-size: cover;
      background-position: bottom;
      padding-bottom: 0;
    }

    .mux-safety {
      &__content-bg-bottom {
        @include media-breakpoint-up(lg) {
          display: block;
          height: 0;
          width: 100%;
          padding-bottom: 47.5%;
        }
      }

      &__heading {
        color: $black;

        @include media-breakpoint-up(md) {
          margin-bottom: 30px;
        }

        @include media-breakpoint-up(lg) {
          color: $white;
          margin-bottom: 0;
        }

        &__title {
          &--text {
            display: none;
          }

          &--image {
            display: block;
          }
        }
      }

      &__image {
        opacity: 1;
        margin-bottom: 25px;
      }
    }

    .popup-contents__text__title {
      border-bottom: 2px solid #009cd7;
    }
  }

  .no-container-mobi {
    @include media-breakpoint-down(md) {
      padding: 0;
      max-width: 100%;
    }
  }
}
</style>
