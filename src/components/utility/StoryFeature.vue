<template>
  <div>
    <div :class="isPictureLeft ? 'story-feature story-feature--left' : 'story-feature story-feature--right story-feature--mu-x-distance'">
      <div class="story-feature__outer">
        <div class="story-feature__inner">
          <picture class="story-feature__bg delay-500 animated" v-animate-onscroll="'fadeIn'">
            <!-- <source media="(min-width: 1024px)" srcset="../../assets/product-story-desktop.jpg">
            <img src="../../assets/product-story-mobile.jpg" alt="product image"> -->
            <sc-image :media="fields.Image" class="d-none d-lg-block"/>
            <sc-image v-if="!isEditing" :media="fields.SmallImage" class="d-lg-none"/>
          </picture>
        </div>
      </div>
      <div class="story-feature__content delay-500 animated" v-animate-onscroll="'fadeInUp'">
        <div class="story-feature__heading">
          <!-- <h2 class="story-feature__heading__title isu-title--underline">POWER</h2> -->
          <sc-rich-text tag="div" :field="fields.Title" />
          <!-- <h3 class="story-feature__heading__subtitle isu-subtitle">จัดจ้าน เร้าใจ กับขุมพลัง 1.9 และ 3.0 Ddi Blue Power...</h3>
          <p class="story-feature__heading__desc isu-description">เทคโนโลยีเปลี่ยนโลกที่แรงแต่ประหยัดน้ำมัน พร้อมเป็นมิตรต่อสิ่งแวดล้อม เอกสิทธิ์แห่งเทคโนโลยีดีเซลจาก ISUZU ที่ยากจะหาใครเทียบ</p> -->
          <sc-rich-text tag="div" :field="fields.Description" />
        </div>
      </div>
    </div>
    <!-- <div class="story-feature story-feature--left story-feature--mu-x-distance story-feature--heading-color">
      <div class="story-feature__outer">
        <div class="story-feature__inner">
          <picture class="story-feature__bg delay-500 animated" v-animate-onscroll="'fadeIn'">
            <source media="(min-width: 1024px)" srcset="../../assets/product-power-blue.jpg">
            <img src="../../assets/product-power-blue-mobile.jpg" alt="product image">
          </picture>
        </div>
      </div>
      <div class="story-feature__content delay-500 animated" v-animate-onscroll="'fadeInUp'">
        <div class="story-feature__heading">
          <h2 class="story-feature__heading__title isu-title--image">
            <img src="../../assets/product-story-heading-mobile.svg" alt="title image" class="d-lg-none">
            <img src="../../assets/product-story-heading.svg" alt="title image" class="d-none d-lg-block">
          </h2>
          <h3 class="__heading__subtitle isu-subtitle">ขีดสุดสมรรถนะ ตอบความท้าทายที่ใช่...ในทุกสถานการณ์</h3>
          <p class="__heading__desc isu-description">ขีดสุดแห่งเทคโนโลยีเครื่องยนต์ 1.9 และ 3.0 Ddi Blue Power ทั้งแรงและประหยัดน้ำมันดีเยี่ยม พร้อมให้คุณโลดแล่นอย่างมั่นใจไร้ขีดจำกัดในทุกเส้นทาง</p>
        </div>
      </div>
    </div>
    <div class="story-feature story-feature--right story-feature--mu-x-distance story-feature--heading-color">
      <div class="story-feature__outer">
        <div class="story-feature__inner">
          <picture class="story-feature__bg delay-500 animated" v-animate-onscroll="'fadeIn'">
            <source media="(min-width: 1024px)" srcset="../../assets/product-power-blue.jpg">
            <img src="../../assets/product-power-blue-mobile.jpg" alt="product image">
          </picture>
        </div>
      </div>
      <div class="story-feature__content delay-500 animated" v-animate-onscroll="'fadeInUp'">
        <div class="story-feature__heading">
          <h2 class="story-feature__heading__title isu-title--image">
            <img src="../../assets/product-story-heading-mobile.svg" alt="title image" class="d-lg-none">
            <img src="../../assets/product-story-heading.svg" alt="title image" class="d-none d-lg-block">
          </h2>
          <h3 class="__heading__subtitle isu-subtitle">ขีดสุดสมรรถนะ ตอบความท้าทายที่ใช่...ในทุกสถานการณ์</h3>
          <p class="__heading__desc isu-description">ขีดสุดแห่งเทคโนโลยีเครื่องยนต์ 1.9 และ 3.0 Ddi Blue Power ทั้งแรงและประหยัดน้ำมันดีเยี่ยม พร้อมให้คุณโลดแล่นอย่างมั่นใจไร้ขีดจำกัดในทุกเส้นทาง</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { Image, RichText } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'StoryFeature',
  components: {
    ScImage: Image,
    ScRichText: RichText,
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
  },
  data () {
    return {
      isPictureLeft: false,
      isEditing: false,
    };
  },
  mounted() {
    if (this.params.ImagePosition == "Left") {
      this.isPictureLeft = true;
    } else {
      this.isPictureLeft = false;
    }
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
.story-feature {
  display: block;
  position: relative;

  @include media-breakpoint-up(lg) {
    display: flex;

  }

  &--left {
    margin-left: auto;
    margin-right: auto;

    @include media-breakpoint-up(lg) {
      max-width: 1200px;
    }
  }

  &__outer {
    width: 100%;

    @include media-breakpoint-up(lg) {
      margin: 60px auto 60px 0;
      flex: 0 0 50%;
      max-width: 50%;
    }
  }

  &__inner {
    position: relative;

    @include media-breakpoint-up(lg) {
      max-width: 640px;
    }

    @include media-breakpoint-up(xl) {
      width: 107%;
      left: -40px;
    }

    &:before {
      content: "";
      display: block;
      position: relative;
      width: 100%;
      padding-top: percentage(566.41/375);

      @include media-breakpoint-up(md) {
        padding-top: percentage(1024/768);
      }

      @include media-breakpoint-up(lg) {
        padding-top: percentage(380/640);
      }
    }
  }

  &__bg {
    position: absolute;
    bottom: 0;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 133.33333%;
    height: auto;

    @include media-breakpoint-up(md) {
      height: 100%;
    }

    @include media-breakpoint-up(lg) {
      height: auto;
      top: 0;
      left: 0;
      bottom: 0;
      transform: translateX(0);
      width: 100%;
    }

    >>> img {
      width: 100%;
      height: 100%;
    }
  }

  &__content {
    padding: 0 20px;
    position: absolute;
    top: 20px;
    left: 0;
    color: $white;
    text-align: center;

    @include media-breakpoint-up(md) {
      top: 60px;
    }

    @include media-breakpoint-up(lg) {
      top: 0;
      position: relative;
      padding: 0 60px 0 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $black;
      text-align: left;

    }

    @include media-breakpoint-up(xl) {
      padding: 0 35px 0 70px;
    }
  }

  &__heading {
    @include span-break();
    @include media-breakpoint-up(md) {
      padding: 0 30px;
    }

    @include media-breakpoint-up(lg) {
      padding: 0;
      margin: 0;
    }
  }


  &--mu-x-distance {
    @include media-breakpoint-up(lg) {
      margin-top: -60px;
    }
  }

  &--heading-color {
    .story-feature__content {
      color: $black;
    }
  }

  &--right {
    display: flex;
    flex-direction: row-reverse;
    margin-left: auto;
    margin-right: auto;

    @include media-breakpoint-up(lg) {
      max-width: 1200px;
    }

    .story-feature {
      margin-top: -60px;

      &__content {

        @include media-breakpoint-up(lg) {
          padding: 0 60px 0 60px;
        }

        @include media-breakpoint-up(xl) {
          padding: 0 70px 0 35px;
        }
      }

      &__inner {
        position: relative;
        left: auto;
        right: auto;
        top: auto;
        bottom: auto;
      }
    }
  }
}
</style>
