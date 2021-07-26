<template>
  <div class="panel-slider" :id="fields.TargetId && fields.TargetId.fields.Name.value">
    <div class="panel-slider__heading title-homepage-top title-homepage-bottom delay-500 animated" v-animate-onscroll="'fadeInUp-big'">
      <div class="container">
        <sc-rich-text tag="h2" class="panel-slider__heading__title isu-title" :field="fields.Title" />
        <sc-rich-text tag="p" class="panel-slider__heading__desc" :field="fields.Description" />
      </div>
    </div>
    <div class="panel-slider-container">
      <div v-swiper:mySwiper="swiperOption" :ref="'panelSliderSwiper-'+fields.Title.value">
        <div class="swiper-wrapper">
          <div class="swiper-slide" :key="item.id" v-for="(item, index) in fields.Items">
            <div class="panel-slider__picture delay-500 animated" v-animate-onscroll="'fadeInUp'">
              <div @click="onClickPanelSlider(item)">
                <template v-if="isEditing">
                  <sc-image v-if="item.fields.Image.value.src" class="d-none d-sm-block" :media="item.fields.Image" style="width:100%;"/>
                </template>
                <LazyloadPictureItem v-else :fields="item.fields" :ratioLg="'108'" :ratioSm="'100'"></LazyloadPictureItem> <!--INFO: Image ratio follow customer's website -->
              <div class="panel-slider__wrap">
                <div class="panel-slider__wrap__content">
                  <sc-rich-text tag="h2" class="title" :field="item.fields.Title" />
                  <sc-rich-text tag="span" class="description" :field="item.fields.Description" />
                </div>
                <div class="panel-slider__wrap__button">
                  <isu-button-link :field="item.fields.Url">
                    <sc-link class="panel-slider__wrap__button__item i-btn i-btn__secondary" :field="item.fields.Url"/>
                  </isu-button-link>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination" slot="pagination"></div>
      <div v-if="!detectMobile">
        <div :class="isShowSwiperArrow ? 'show-arrow' : ''">
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
      </div>
    </div>
    <!-- Slider main container -->
  </div>
</template>

<script>
import { Link, Image, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import IsuButtonLink from '../shared/IsuButtonLink';
import LazyloadPictureItem from '../shared/LazyloadPictureItem';
import * as $ from 'jquery';
import { isMobile } from '../../util/dom';
const FIRST_SLIDE_INDEX = 0;
export default {
  name: 'PanelSlider',
  components: {
    ScLink: Link,
    ScImage: Image,
    ScText: Text,
    ScRichText: RichText,
    IsuButtonLink: IsuButtonLink,
    LazyloadPictureItem: LazyloadPictureItem,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isShowSwiperArrow : false,
      isEditing: false,
      deviceType: 3,
      detectMobile: false,
      isResetSlide : false,
    };
  },
  computed: {
    swiper() {
      return this.$refs[`panelSliderSwiper-${this.fields?.Title?.value}`].swiper.el;
    },
    swiperOption: function(){
      return {
        pagination: {
          el: '.panel-slider .swiper-pagination',
        },
        navigation: {
          nextEl: '.panel-slider .swiper-button-next',
          prevEl: '.panel-slider .swiper-button-prev',
        },
        autoplay: this.setOptionDelay(),
        slidesPerView: 3,
        spaceBetween: 1,
        speed: 1500,

        breakpoints: {
          576: {
            slidesPerView: 'auto',
            spaceBetween: 7,
          },
          992: {
            slidesPerView: 2,
            spaceBetween: 1,
          },
        },
      }
    }
  },
  methods: {
    isNumber() {
      return Number(this.fields?.IntervalTime?.value) > 0;
    },
    setOptionDelay() {
      let delayOption = {
        delay: this.fields.IntervalTime.value * 1000,
        disableOnInteraction: true,
      };
      return this.isNumber() ? delayOption : false;
    },
    onHoverSwiper(){
      $(this.swiper).hover(() => {
        this.isShowSwiperArrow = true;
      }, () => {
        this.isShowSwiperArrow = false;
      });
    },
    initialSlide(){
      let image = this.$el.querySelector('img');
      let imageBoundingTop = image.getBoundingClientRect().top;
      let imageHeight = image.clientHeight;
      let isActive = this.isSlideActive({ imageBoundingTop , imageHeight });
      let isDeactive = this.isSlideDeactive({ imageBoundingTop , imageHeight });
      if(isActive && this.isResetSlide){
         this.mySwiper.slideTo(FIRST_SLIDE_INDEX);
         this.isResetSlide = false;
         this.startSwiper();
      }
      if(isDeactive){
        this.isResetSlide = true;
        this.stopSwiper();
      }
    },
    isSlideActive({ imageBoundingTop , imageHeight}){
      // INFO: slide is active if this display full height of image
      return (imageBoundingTop + imageHeight + 60 - window.innerHeight) < 0 && imageBoundingTop + imageHeight > 60;
    },
    isSlideDeactive({ imageBoundingTop , imageHeight}){
      return (imageBoundingTop + imageHeight + 60 - window.innerHeight) > 0 || imageBoundingTop + imageHeight < 60
    },
    startSwiper(){
      this.mySwiper.autoplay.start();
    },
    stopSwiper(){
      this.mySwiper.autoplay.stop();
    },
    onClickPanelSlider(item) {
      if (this.checkExternalLink(item)) {
        window.open(item.fields.Url.value.href, item.fields?.Url?.value?.target || '_self');
      }
    },
    checkExternalLink(item) {
      return item.fields?.Url?.value?.href ? true : false;
    },
  },
  mounted (){
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.onHoverSwiper();
    this.mySwiper.on('transitionStart', () => {
      this.$el.querySelectorAll('.panel-slider__wrap.animated').forEach(item => {
        item.classList.remove('fadeInUp');
      });
    });
    this.mySwiper.on('transitionEnd', () => {
      this.$el.querySelectorAll('.panel-slider__wrap.animated').forEach(item => {
        item.classList.add('fadeInUp');
      });
    });
    this.stopSwiper();
    window.addEventListener('scroll', this.initialSlide);
  },
  destroyed() {
    window.removeEventListener('scroll', this.initialSlide);
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
@import '../../../node_modules/swiper/dist/css/swiper.css';

.panel-slider {
  // INFO: make sure the pagination arrow does not jump out of component layout
  position: relative;

  &__heading {
    text-align: center;

    &__desc {
      font-size: $font-size-cta-desc-mobile;

      @include media-breakpoint-up(lg) {
        font-size: $font-size-base;
      }
    }
  }

  &__picture {
    position: relative;
    overflow: hidden;

    &:hover {
      .panel-slider__wrap {
        background: rgba(0,0,0,.5);
      }

      >>> picture {
        transform: scale(1.1);
      }

      .panel-slider__wrap__content {
        margin-top: 12%;
      }

      .panel-slider__wrap__button {
        bottom: 15%;
        opacity: 1;
      }
    }
  }

  >>> picture {
    transition: all .4s ease;
  }

  &__wrap {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all .4s ease;

    &__content {
      color: $white;
      margin-top: 6%;
      text-align: center;
      transition: all .4s ease;
      padding: 0 15px;

      .title {
        font-size: 3.75rem; //INFO: Follow customer's website
        // font-family: KittithadaBold75;
        line-height: 1;
        margin-bottom: 0;

        @include media-breakpoint-up(lg) {
          font-size: 4.625rem; //INFO: Follow customer's website
        }
      }

      .description {
        font-size: 2rem; //INFO: Follow customer's website
        line-height: 0.9; //INFO: Follow customer's website

        @include media-breakpoint-up(lg) {
          font-size: 2.5rem;
        }
      }
    }

    &__button {
      position: absolute;
      bottom: 0;
      opacity: 0;
      left: 50%;
      width: fit-content;
      transform: translateX(-50%);
      transition: all .4s ease;

      &__item {
        // INFO: customer ask to remove border in this specific case
        border: none;
        font-size: 2.4rem; //INFO: Follow customer's website
        // font-family: KittihadaMedium65;
      }
    }
  }

  @include swiper();

  .swiper-wrapper {
    padding-bottom: 40px;

    @include media-breakpoint-up(md) {
      padding-bottom: 44px;
    }

    @include media-breakpoint-up(lg) {
      padding-bottom: 0;
    }
  }

  .show-arrow {
    .swiper-button-next,
    .swiper-button-prev {
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }

    .swiper-button-next {
      transform: translateX(0);
    }

    .swiper-button-prev {
      transform: translateX(0) rotate(180deg)
    }
  }

  .swiper-button-next,
  .swiper-button-prev {
    display: none;
    opacity: 0;
    transition: all 0.5s;
  }

  .swiper-button-next {
    transform: translateX(100%);
  }

  .swiper-button-prev {
    transform: translateX(-100%) rotate(180deg);
  }

  & >>> .swiper-pagination {
    z-index: $SWIPER_PAGINATION_ZINDEX;
  }

  & >>> .swiper-pagination-bullets {
    @include media-breakpoint-up(md) {
      justify-content: center;
    }

    @include media-breakpoint-up(lg) {
      display: none;
    }

    .swiper-pagination-bullet {
      @include media-breakpoint-up(md) {
        width: 7px;
        height: 7px;
        background: #b7b7b7;
        margin: 0 5px;
        border-radius: 50%;
      }
    }

    .swiper-pagination-bullet-active {
      @include media-breakpoint-up(md) {
        background: $red-hover-color;
      }
    }
  }

  .swiper-slide {
    max-width: 91%;

    @include media-breakpoint-up(md) {
      max-width: none;
    }
  }


  .panel-slider-container {
    padding: 0 15px;

    @include media-breakpoint-up(md) {
      padding: 0;
    }
  }

  // .swiper-slide {
  //   max-width: 91%;

  //   @include media-breakpoint-up(lg) {
  //     max-width: 95%;
  //   }
  // }
}
</style>
