<template>
  <div class="car-intro car-intro--left car-intro--mu-x-distance car-intro--heading-color">
    <div class="car-intro__outer">
      <div class="car-intro__inner">
        <picture class="car-intro__bg delay-500 animated" v-animate-onscroll="'fadeIn'">
          <!-- <source media="(min-width: 1024px)" srcset="../../assets/product-bgr-onyx.jpg">
          <img src="../../assets/product-bgr-onyx-mobile.jpg" alt="product image"> -->
          <sc-image :media="fields.BackgroundImage" class="d-none d-lg-block"/>
          <sc-image v-if="!isEditing" :media="fields.SmallBackgroundImage" class="d-lg-none"/>
        </picture>
        <picture class="car-intro__car delay-500 animated" v-animate-onscroll="'fadeInLeft'">
          <!-- <source media="(min-width: 1024px)" srcset="../../assets/product-story-car.png">
          <img src="../../assets/product-story-car-mobile.png" alt="product image"> -->
          <sc-image :media="fields.Image" class="d-none d-lg-block"/>
          <sc-image v-if="!isEditing" :media="fields.SmallImage" class="d-lg-none"/>
        </picture>
      </div>
    </div>
    <div class="car-intro__content delay-500 animated" v-animate-onscroll="'fadeInUp'">
      <div class="car-intro__heading">
        <!-- <h2 class="car-intro__heading__title isuzu-title-inline-block">ตอบรับทุกสัมผัสแห่งการขับขี่ที่ใช่...สำหรับคุณ</h2> -->
        <sc-rich-text tag="div" :field="fields.Title" />
        <!-- <p class="car-intro__heading__desc isu-description">ออกแบบด้วยหลักการกระจายน้ำหนักที่ดีเยี่ยมจากตำแหน่งการวางเครื่องยนต์เยื้องหลังเพลาหน้าแบบ Semi-midship ผสานช่วงล่างที่นุ่มนวล แต่ยึดเกาะถนนทรงตัวเป็นเยี่ยม</p> -->
        <sc-rich-text tag="div" :field="fields.Description" />
      </div>
    </div>
  </div>
</template>

<script>
import { Image, RichText } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'CarIntro',
  components: {
    ScImage: Image,
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
      isEditing: false,
    }
  },
  mounted() {
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

>>> img {
  width: auto;
  height: auto;
}

.car-intro {
  display: block;
  position: relative;

  @include media-breakpoint-up(lg) {
    display: flex;
    margin-bottom: 30px;

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

  &__car {
    position: absolute;
    left: -19%;
    bottom: 7%;
    width: 135%;

    @include media-breakpoint-up(lg) {
      left: -14%;
      bottom: -21%;
      width: 121%;
    }
  }

  &__content {
    padding: 0 20px;
    position: absolute;
    top: 20px;
    left: 0;
    color: $white;
    text-align: center;
    width: 100%;

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

    >>>.isuzu-title-inline-block {
      width: 100%;
    }

    >>>.isu-description {
      @include media-breakpoint-up(lg) {
        max-width: 430px;
      }
    }
  }


  &--mu-x-distance {
    @include media-breakpoint-up(lg) {
      margin-top: -60px;
    }
  }

  &--heading-color {
    .car-intro__content {
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

    .car-intro {
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
