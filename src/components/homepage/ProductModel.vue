<template>
  <div class="product-model" :id="fields.TargetId && fields.TargetId && fields.TargetId.fields.Name.value">
    <div class="container">
      <div class="product-model__heading title-homepage-top title-homepage-bottom delay-500 animated" v-animate-onscroll="'fadeInUp'">
        <sc-rich-text tag="h2" :field="fields.Title" class="isu-title"/>
      </div>
      <div class="product-model__image product-model__image--mobile delay-500 d-md-none animated"  v-animate-onscroll="'fadeInUp'">
        <div v-swiper:mySwiper="swiperOption" ref="productModelSwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" :key="item.id" v-for="(item, index) in fields.Items">
              <sc-link class="product-model__image__item" :field="item.fields.Url">
                <LazyloadImageItem :ratio="'100'" :imageUrl="item.fields['Image-sm']"></LazyloadImageItem>
              </sc-link>
            </div>
          </div>
          <div class="swiper-pagination" slot="pagination"></div>
        </div>
      </div>
      <div  class="product-model__image product-model__image--desktop delay-500 d-none d-md-block animated" v-animate-onscroll="'fadeInUp'">
        <sc-link :key="item.id" v-for="(item, index) in fields.Items" class="product-model__image__item" :field="item.fields.Url">
          <sc-image :media="item.fields.Image" v-if="isEditing"/>
          <LazyloadImageItem :imageUrl="item.fields.Image" v-else></LazyloadImageItem>
        </sc-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Link, Image, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import { isMobile } from '../../util/dom';
import LazyloadImageItem from '../shared/LazyloadImageItem';
const FIRST_SLIDE_INDEX = 0;
export default {
  name: 'ProductModel',
  components: {
    ScLink: Link,
    ScImage: Image,
    ScText: Text,
    LazyloadImageItem: LazyloadImageItem,
    ScRichText: RichText
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      deviceType: 3,
      detectMobile: true,
      isEditing: false,
      isResetSlide : false,
    };
  },
  computed: {
    swiperOption: function() {
      return {
        pagination: {
          el: '.product-model .swiper-pagination',
        },
        slidesPerView: 'auto',
        spaceBetween: 7,
        speed: 1500,
        autoplay: this.setOptionDelay(), 
      };
    },
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    if(this.detectMobile){
      this.stopSwiper();
      window.addEventListener('scroll', this.initialSlide);
    }
  },
  methods: {
    isNumber() {
      return Number(this.fields?.IntervalTime?.value) > 0;
    },
    setOptionDelay() {
      let delayValue = this.fields.IntervalTime?.value || 0;
      let delayOption = {
        delay: delayValue * 1000,
        disableOnInteraction: true,
      };
      return this.isNumber() ? delayOption : false;
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
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.initialSlide);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
@import '../../../node_modules/swiper/dist/css/swiper.css';
@include media-breakpoint-down(sm) {
  .swiper-slide {
    max-width: 91%;
  }
}
.product-model {
  &__heading {
    text-align: center;
  }

  &__image {
    &__item {
      display: block;
      margin-bottom: 10px;
      overflow: hidden;

      &:last-child {
        margin-bottom: 0;
      }
      @include hover-desktop() {
        &:hover {
          >>> img {
            transform: scale(1.1);
          }
        }
      }

      >>> img {
        transition: transform .75s ease;
        width: 100%;
      }
    }
  }

  &__image--mobile {
    // @include media-breakpoint-up(md) {
    //   display: none;
    // }

    @include swiper();
  }
}
</style>
