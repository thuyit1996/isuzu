<template>
  <div class="equipment-intro" :class="[modifyClass,setClassForLayout(), 'equipment-intro--' + this.rendering.uid]">
    <picture class="equipment-intro__background--exterior delay-200 animated" v-animate-onscroll="'fadeIn'">
      <!-- <source media="(min-width: 1024px)" srcset="../../assets/bg-product-image.jpg">
      <img src="../../assets/bg-product-image-mobile.jpg" alt="product image"> -->
      <sc-image :media="fields.BackgroundImage" class="d-none d-lg-block"/>
      <sc-image v-if="!isEditing" :media="fields.SmallBackgroundImage" class="d-lg-none"/>
    </picture>
    <div class="container no-padding-desktop container-extra-large">
      <div class="equipment-intro__wrap">
        <picture class="equipment-intro__background delay-200 animated" v-animate-onscroll="'fadeIn'">
          <!-- <source media="(min-width: 1024px)" srcset="../../assets/bg-product-highlight-intro1.jpg">
          <img src="../../assets/bg-product-image-mobile.jpg" alt="product image"> -->
          <sc-image :media="fields.Image" class="d-none d-lg-block"/>
        </picture>
        <div class="equipment-intro__content">
          <div class="equipment-intro__heading delay-500 animated" v-animate-onscroll="'fadeInUp'">
            <sc-rich-text tag="div" class="equipment-intro__heading__text" :field="fields.Title" />
            <!-- <h2 class="equipment-intro__heading__title equipment-intro__heading__title--text isu-title--underline">INTERIOR</h2>
            <h2 class="equipment-intro__heading__title equipment-intro__heading__title--image isu-title--image">
              <img src="../../assets/title-image-mobile-1.svg" alt="title image" class="d-lg-none">
              <img src="../../assets/title-image-1.svg" alt="title image" class="d-none d-lg-block">
            </h2> -->
            <sc-rich-text tag="div" :field="fields.Description" />
            <!-- <div class="">
              <h3 class="equipment-intro__heading__subtitle isu-subtitle">สุนทรียอารมณ์ที่พร้อมเปิด ประสบการณ์ใหม่ ให้ทุกสัมผัส...</h3>
              <p class="equipment-intro__heading__desc isu-description">ด้วยห้องโดยสารโอ่อ่าโทนเข้ม เปี่ยมความรู้สึกถึงอารมณ์ด้วย AMBIENT LIGHT แสงบรรยากาศ ที่เพิ่ม มิติในห้องโดยสาร รายล้อม ด้วยดีไซน์</p>
            </div> -->
          </div>
          <div class="equipment-intro__image delay-200 animated" v-animate-onscroll="'fadeIn'">
            <sc-image v-if="!isEditing" :media="fields.SmallImage" class="d-lg-none"/>
          </div>
          <div :class="fields.IsHideCardInDesktop.value ? 'd-lg-none' : ''" class="equipment-intro__slider-position delay-500 animated" v-animate-onscroll="'fadeInUp'">
            <div class="equipment-intro__slider" v-swiper:mySwiper="swiperEquipmentIntroOption">
              <div class="swiper-wrapper">
                <div class="swiper-slide" :key="(item.id)" v-for="(item, index) in fields.Items">
                  <div class="equipment-intro__slider__item">
                    <div class="equipment-intro__slider__item__img-border" @click="activePopup(item, index)">
                      <div class="equipment-intro__slider__item__img">
                        <!-- <img src="../../assets/extorior-product-img-1.jpg" alt="extorior image"> -->
                        <sc-image :media="item.fields.Image" />
                      </div>
                    </div>
                    <!-- <p class="equipment-intro__slider__item__text">กันชนหน้า</p> -->
                    <sc-rich-text tag="div" :field="item.fields.Title" />
                  </div>
                </div>
                <!-- <div class="swiper-slide">
                  <div class="equipment-intro__slider__item" @click="activePopup">
                    <div class="equipment-intro__slider__item__img-border">
                      <div class="equipment-intro__slider__item__img">
                        <img src="../../assets/extorior-product-img-2.jpg" alt="extorior image">
                      </div>
                    </div>
                    <p class="equipment-intro__slider__item__text">กันชนหน้า</p>
                  </div>
                </div>
                <div class="swiper-slide">
                  <div class="equipment-intro__slider__item" @click="activePopup">
                    <div class="equipment-intro__slider__item__img-border">
                      <div class="equipment-intro__slider__item__img">
                        <img src="../../assets/extorior-product-img-1.jpg" alt="extorior image">
                      </div>
                    </div>
                    <p class="equipment-intro__slider__item__text">กันชนหน้า</p>
                  </div>
                </div> -->
              </div>
            </div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="equipment-intro__popup" :class="{'show-popup': isShowPopup}" >
      <div class="close-btn" @click="closePopup">
        <svg viewBox="0 0 32 32">
          <polygon points="32,1.5 30.6,0.1 16,14.6 1.5,0.1 0,1.5 14.6,16 0,30.6 1.5,32 16,17.5 30.6,32 32,30.6 17.4,16 "></polygon>
        </svg>
      </div>
      <equipment-intro-slider ref="popupSwiperEquipmentIntro">
        <div class="swiper-slide" :key="(item.id)" v-for="(item) in fields.Items">
          <div class="popup-contents">
            <div class="popup-contents__row">
              <div class="popup-contents__col popup-contents__img">
                <sc-image :media="item.fields.Image" />
              </div>
              <div class="popup-contents__col popup-contents__text">
                <div class="popup-contents__text__desc">
                  <sc-rich-text tag="div" class="popup-contents__text__title" :field="item.fields.Intro" />
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

export default {
  name: 'EquipmentIntro',
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
    params: {
      type: Object,
      default: () => ({}),
    },
    rendering: {
      type: Object,
    },
  },
  data () {
    return {
      swiperEquipmentIntroOption: {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: `.equipment-intro--${this.rendering.uid} .equipment-intro__content .swiper-button-next`,
          prevEl: `.equipment-intro--${this.rendering.uid} .equipment-intro__content .swiper-button-prev`,
        },
      },
      isShowPopup: false,
      modifyClass: '',
    }
  },
  methods: {
    activePopup(item, index) {
      this.$refs.popupSwiperEquipmentIntro.jumpToSlide(index);
      this.isShowPopup = true;
      lockScroll();
    },
    closePopup() {
      this.isShowPopup = false;
      unLockScroll();
    },
    setBackgroundColor() {
      this.$el.style.background = this.fields.BackgroundColor?.value?.length > 0 ? this.fields.BackgroundColor.value : 'none';
    },
    setClassForLayout() {
      let styleType = this.params?.StyleType || '';
      if (styleType === 'Interior-MuX') return '';
      if (styleType === 'Exterior-MuX') return 'equipment-intro--exterior';
      if (styleType === 'Exterior-New-MuX') return 'equipment-intro--exterior-new-mux equipment-intro--new-mux';
      if (styleType === 'Interior-New-MuX') return 'equipment-intro--new-mux';
    }
  },
  mounted() {
    this.setBackgroundColor();
    // if (this.params.TextPosition == "Left") {
    //   this.modifyClass = "equipment-intro--new-mux";
    // } else if (this.params.TextPosition == "Right") {
    //   this.modifyClass = "equipment-intro--new-mux equipment-intro--exterior-new-mux";
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.equipment-intro {
  color: $white;
  text-align: center;
  padding: 9.3% 0 14px;
  background: $black;
  position: relative;
  overflow: hidden;

  @include media-breakpoint-up(md) {
    padding: 9.3% 0 34px;
  }

  @include media-breakpoint-up(lg) {
    padding: 50px 0 100px;
    text-align: left;
  }

  &__wrap {
    z-index: 1;
    position: relative;

    @include media-breakpoint-up(lg) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 0;
      padding-bottom: 42.3%;
    }
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    >>> img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: none;

      @include media-breakpoint-up(lg) {
        display: block;
      }
    }

    &--exterior {
      // display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // z-index: -1;

      >>> img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__content {
    @include media-breakpoint-up(lg) {
      position: absolute;
      top: 0;
      left: 0;
      max-width: 50%;
    }
  }

  &__heading {
    // min-height: 200px;
    padding: 0 5px;
    max-width: 668px;
    width: 100%;
    margin: 0 auto;
    line-height: 1.13043em;

    @include span-break();

    @include media-breakpoint-up(md) {
      height: auto;
      margin: 0 auto 30px auto;
    }

    @include media-breakpoint-up(lg) {
      padding: 50px 58px 0 30px;
      margin-bottom: 25px;
      // width: 50%;
      z-index: 1;
    }

    @include media-breakpoint-up(xl) {
      padding: 50px 70px 0 35px;
    }

    &__title {
      &--image {
        display: none;
      }
    }

    &__text {
      line-height: 0;
    }
  }

  &__image {
    text-align: center;
    margin-bottom: 25px;
    height: 0;
    padding-bottom: 62.5%;
    position: relative;

    @include media-breakpoint-up(md) {
      margin-bottom: 40px;
    }

    @include media-breakpoint-up(lg) {
      display: none;
    }

    img {
      width: auto;
      height: auto;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
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
      margin: 22px 0 0 70px;
    }
  }

  &__slider {
    display: flex;
    margin: 0 25px;

    @include media-breakpoint-up(md) {
      margin: 0;
    }

    @include media-breakpoint-up(lg) {
      margin: 0 35px;
    }

    @include media-breakpoint-up(xl) {
      margin: 0;
    }

    &__item {
      text-align: center;
      @include span-break();

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
        font-family: $font-family-eurothai;

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

  &__popup {
    .popup-contents {
      margin: 0 auto;
    }
  }

  @include product-detail-popup();

  &--new-mux {
    background: linear-gradient(0deg,#000,#000 27%,#0d1e2e 72%,#193c5b);

    @include media-breakpoint-up(lg) {
      padding: 0 0 100px;
    }

    .equipment-intro {
      &__heading {
        @include media-breakpoint-up(lg) {
          margin-bottom: 40px;
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

      &__slider {
        &__item {
          &__img-border {
            background: linear-gradient(0deg,#009cd7,#fff);
          }
        }
      }
    }

    @include swiper-mux-blue();

    .popup-contents__text__title {
      border-bottom: 2px solid #009cd7;
    }

    .equipment-intro__popup {
      >>>.swiper-button-prev {
        background-image: url('../../assets/arrow-prev.svg');
      }

      >>>.swiper-button-next {
        background-image: url('../../assets/arrow-next.svg');
      }
    }
  }

  &--exterior {
    background: none;
    position: relative;

    @include media-breakpoint-up(lg) {
      padding: 50px 0;
    }

    .equipment-intro {
      &__wrap {
        @include media-breakpoint-up(lg) {
          padding-bottom: 47%;
        }
      }

      &__content {
        @include media-breakpoint-up(lg) {
          max-width: 400px;
        }
      }

      &__background {
        display: none;

        @include media-breakpoint-up(lg) {
          display: block;
          top: 11%;
          left: 8.3%;
          width: 87.5%;

          >>> img {
            object-fit: contain;
          }
        }

        &--exterior {
          display: block;
        }
      }

      &__heading {
        @include media-breakpoint-up(lg) {
          padding-top: 0;
        }
      }

      &__image {
        img {
          width: 91%;

          @include media-breakpoint-up(lg) {
            width: 100%;
          }
        }
      }

      &__slider-position {
        @include media-breakpoint-up(lg) {
          display: none;
        }
      }
    }
  }

  &--exterior-new-mux {
    background: none;
    position: relative;

    @include media-breakpoint-up(lg) {
      background: $black;
      padding: 50px 0;
    }

    .equipment-intro {
      &__background {
        display: none;

        @include media-breakpoint-up(lg) {
          display: block;
        }

        &--exterior {
          display: block;
        }
      }

      &__content {
        @include media-breakpoint-up(lg) {
          left: auto;
          right: 0;
          width: 50%;
        }
      }

      &__heading {
        @include media-breakpoint-up(lg) {
          width: 100%;
          padding: 50px 30px 0 60px;
        }
        @include media-breakpoint-up(xl) {
          padding: 50px 35px 0 70px;
        }
      }

      &__image {
        opacity: 0;
      }

      &__slider-position {
        @include media-breakpoint-up(lg) {
          display: none;
        }
      }
    }
  }
}
</style>
