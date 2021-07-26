<template>
  <div class="grade-selection" :class="params.LineColorPosition == 'Top' ? 'grade-selection--line-top' : ''">
    <div class="product-detail-tab product-detail-tab-mobile d-md-none" v-swiper:mySwiper="swiperOption" v-bind:style="params.LineColorPosition == 'Top' ? {'border-top-color' : lineColor} : {'border-bottom-color' : lineColor}">
      <ul class="product-detail-tab__nav swiper-wrapper" :class="{'flex-justify-center': carModelList.length <= 2}">
        <li class="product-detail-tab__nav__item swiper-slide" v-bind:class="model.IsActive ? ' active' : ''" :key="model.ID" v-for="(model, index) in carModelList" @click="selectModel(model)">
          <!-- INFO: disable due to tester requirement
          <div class="product-tag" v-if="model.Tag.length">
            <div class="product-tag__text">{{model.Tag}}</div>
          </div> -->
          <div class="product-tag">
            <img v-if="model.Tag" :src="imageEndPoint(model.Tag)" alt="x" class="product-tag__img">
          </div>
          <img :src="imageEndPoint(model.DeactiveImage)" alt="product image" class="product-detail-tab__nav__item__icon icon-nomal">
          <img :src="imageEndPoint(model.ActiveImage)" alt="product image" class="product-detail-tab__nav__item__icon icon-active">
          <!-- <sc-image class="product-detail-tab__nav__item__icon icon-active" :media="imageEndPoint(model.ActiveImage)"/> -->
          <span class="product-detail-tab__nav__item__title">{{model.Title}}</span>
        </li>
      </ul>
      <!-- <div>
        <div class="swiper-button-prev " slot="button-prev"></div>
        <div class="swiper-button-next " slot="button-next"></div>
      </div> -->
    </div>
    <div class="product-detail-tab d-none d-md-block" v-bind:style="params.LineColorPosition == 'Top' ? {'border-top-color' : lineColor} : {'border-bottom-color' : lineColor}">
      <ul class="product-detail-tab__nav" v-bind:style="params.LineColorPosition == 'Top' ? {'border-top-color' : lineColor} : {'border-bottom-color' : lineColor}">
          <li class="product-detail-tab__nav__item" v-bind:class="model.IsActive ? ' active' : ''" :key="model.ID" v-for="(model, index) in carModelList" @click="selectModel(model)">
            <div class="product-tag">
              <!-- <div class="product-tag__text" v-if="model.Tag.length">{{model.Tag}}</div> -->
              <img v-if="model.Tag" :src="imageEndPoint(model.Tag)" alt="x" class="product-tag__img">
            </div>
            <img :src="imageEndPoint(model.DeactiveImage)" alt="product image" class="product-detail-tab__nav__item__icon icon-nomal">
            <img :src="imageEndPoint(model.ActiveImage)" alt="product image" class="product-detail-tab__nav__item__icon icon-active">
            <!-- <sc-image class="product-detail-tab__nav__item__icon icon-active" :media="imageEndPoint(model.ActiveImage)"/> -->
            <span class="product-detail-tab__nav__item__title">{{model.Title}}</span>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import { GetEndPoint } from '../../service/genericService';
import { isMobile } from './../../util/dom';
import * as $ from 'jquery';
export default {
  name: 'GradeSelection',
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
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      carModelList: this.fields.Items,
      swiperOption: {
        // navigation: {
        //   nextEl: '.grade-selection .swiper-button-next',
        //   prevEl: '.grade-selection .swiper-button-prev',
        // },
        // slidesPerView: this.fields.Items.length > 1 ? 2 : 1,
        slidesPerView: 'auto',
        // spaceBetween: 15,
        // freeMode: true,
      },
      isDesktop : true,
      lineColor : '',
      deviceType : 3,
    }
  },
  watch: {
    fields: {
      handler (newValue) {
        this.carModelList = newValue.Items;
        this.lineColor =  this.$jss.routeData().fields.LineColor && this.$jss.routeData().fields.LineColor.fields.ColorCode.value;
        this.checkLineColor();
      },
      deep: true,
    },
  },
  methods: {
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
    selectModel(model) {
      this.$root.$emit('setDefaultLineGradeSelection', true);
      this.$router.push(model.Url);
      // window.location.reload();
      // INFO: I want the page reload completely, so I use this api.
      // if (model.Url) {
      //   window.location.href = model.Url;
      // }
    },
    calculateSwiperPosition() {
      this.carModelList = this.carModelList ? this.carModelList : [];
      let activeIndex = this.carModelList.findIndex(item => {
        return item.IsActive === true;
      });
      this.mySwiper.slideTo(activeIndex);
    },
    checkLineColor(isScroll = true) {
      const MIN_DESKTOP_WIDTH = 768;
      if (window.innerWidth >= MIN_DESKTOP_WIDTH) {
        this.isDesktop = true;
      } else {
        this.isDesktop = false;
      }
      if($('.after-rectangle').length){
        $('.after-rectangle').remove();
      }

      if (this.isDesktop) {
        this.$nextTick(() => {
          $('.product-detail-tab__nav li.active').append(`<style class="after-rectangle">.product-detail-tab__nav li.active::after{ border-bottom-color : ${this.lineColor} !important}</style>`);
          $('.product-detail-tab__nav li.active').append(`<style class="after-rectangle">.product-detail-tab__nav li.active::before{ border-top-color : ${this.lineColor} !important}</style>`);
        })
      } else {
        this.$nextTick(() => {
          $('.product-detail-tab-mobile li.active').append(`<style class="after-rectangle">.product-detail-tab-mobile li.active::after{ border-bottom-color : ${this.lineColor} !important}</style>`);
          $('.product-detail-tab-mobile li.active').append(`<style class="after-rectangle">.product-detail-tab-mobile li.active::before{ border-top-color : ${this.lineColor} !important}</style>`);
        });
        this.$nextTick(() => {
          this.calculateSwiperPosition();
        });
      }
      if(!isScroll){
        window.scroll({ top, left: 0, behavior: 'smooth' });
      }
    },
  },
  mounted(){
    this.lineColor =  this.$jss.routeData().fields.LineColor && this.$jss.routeData().fields.LineColor.fields.ColorCode.value;
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.checkLineColor();
    window.addEventListener('resize', this.checkLineColor(false));
  },
  destroyed() {
    window.removeEventListener('resize', this.checkLineColor);
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';
// .grade-selection {
//   .product-tag {
//     width: 100%;
//     display: flex;
//     justify-content: flex-end;

//     @include media-breakpoint-up(md) {
//       height: 14px;
//       margin-right: -12px;
//       padding-right: 0;
//     }

//     &__text {
//       @include media-breakpoint-up(lg) {
//         font-size: 12px;
//         &::before {
//           border-top: 14px solid transparent;
//         }
//         &::after {
//           border-bottom: 14px solid transparent;
//         }
//       }
//     }
//   }
// }

.product-detail-tab {
  background: #f5f5f5;
  padding-top: 0;
  box-shadow: inset 0px 5px 10px #ebebeb;
  border-bottom: 6px solid #cd0000;
  position: relative;

  // @include media-breakpoint-up(sm) {
  //   padding-top: 10px;

  //   &:last-child {
  //     padding-top: 0;
  //   }
  // }

  @include media-breakpoint-up(md) {
    border-bottom: 8px solid #cd0000;
  }

  @include media-breakpoint-up(lg) {
    padding-top: 10px;
    border-bottom: none;
  }

  &__nav {
    padding-bottom: 0 !important; //Override padding-bottom of swiper-wrapper class.
    padding-top: 12px;
    min-height: 90px;
    // INFO: make collum equal height
    display: flex;

    @include media-breakpoint-up(md) {
      justify-content: center;
      padding-bottom: 10px !important;
      min-height: 108px;
    }

    @include media-breakpoint-up(lg) {
      padding-top: 0;
      border-bottom: 8px solid #cd0000;
    }

    @include media-breakpoint-up(xl) {
      border-bottom: 10px solid #cd0000;
      min-height: 114px;
    }

    &.flex-justify-center {
      justify-content: center;
    }

    &__item {
      opacity: .6;
      min-width: 160px;

      display: flex;
      flex-direction: column;
      align-items: center;
      // INFO: disable justify content if the label has 2 line text, layout is broken
      // justify-content: center;
      // INFO: height: auto is to overwrite swiper default style, to enable equal height collumn
      height: auto;
      padding-bottom: 10px;

      &:not(:last-child) {
        margin-right: 15px;
      }

      &:hover {
        opacity: 1;

        span {
          color: $red-hover-color;
        }
      }

      &.active {
        background: transparent;
        color: $gray-800;
        opacity: 1;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 8px solid $red-hover-color;
          display: block;
        }

        .icon-active {
          display: block;
        }

        .icon-nomal {
          display: none;
        }
      }

      @include media-breakpoint-up(md) {
        cursor: pointer;
        margin-right: 0;
        justify-content: center;
        position: relative;
        // padding-top: 30px;
        padding-top: 8px;
        padding-bottom: 0;

        &:not(:last-child) {
          margin-right: 30px;
        }

        &:first-child {
          margin-left: 12px;
        }

        &:last-child {
          margin-right: 12px;
        }

        &:hover {
          background: transparent;
          color: $gray-800;

          .icon-active {
            display: block;
          }

          .icon-nomal {
            display: none;
          }
        }

        &.active {
          &::after {
            bottom: -11px;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-bottom: 10px solid $red-hover-color;
          }
        }
      }

      @include media-breakpoint-up(lg) {
        margin-right: 60px;
        padding-top: 17px;
        min-width: 180px;

        &:not(:last-child) {
          margin-right: 60px;
        }

        &.active {
          &::after {
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
          }
        }
      }

      @include media-breakpoint-up(xl) {
        min-width: 200px;
        padding: 19px 10px 0 10px;
      }

      img {
        height: 60px;
      }

      &__title {
        display: inline-block;
        margin-top: 4px;
        text-align: center;
        font-family: KittithadaBold75;
        font-size: 1.8rem; //INFO: Follow customer's website
      }

      &__icon {
        @include media-breakpoint-up(lg) {
          margin: -12px 10px 0 10px;
        }
      }
    }

    .icon-nomal {
      display: block;
    }

    .icon-active {
      display: none;
    }
  }

  >>> .nav-tabs {
    border: none;
    justify-content: center;
    border-bottom: 5px solid #cd0000;

    @include media-breakpoint-up(md) {
      border-bottom: 10px solid #cd0000;
    }
  }

  >>> .nav-item {
    &:last-child {
      .nav-link {
        margin-right: 0;
      }
    }

    @include media-breakpoint-up(md) {
      margin-right: 0;
    }
  }

  >>> .nav-link {
    // INFO: hard fix
    max-width: 120px;
    display: block;
    text-align: center;
    border: none;
    border-radius: 0;
    padding: 30px 0 10px;
    color: $gray-700;
    font-size: 1.15rem;
    position: relative;
    margin-right: 80px;
    transition: all .2s ease-in-out;

    @include media-breakpoint-up(md) {
      margin-right: 55px;
      font-size: 1.9rem;
    }

    &::after {
      content: "";
      position: absolute;
      display: none;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0px;
      height: 0px;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #cd0000;;

      @include media-breakpoint-up(md) {
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #cd0000;
      }
    }

    &:hover {
      background: transparent;
      color: $gray-800;

      .icon-active {
        display: block;
      }

      .icon-nomal {
        display: none;
      }
    }

    .icon-nomal {
      display: block;
    }

    .icon-active {
      display: none;
    }

    &.active {
      background: transparent;
      color: $gray-800;

      .icon-active {
        display: block;
      }

      .icon-nomal {
        display: none;
      }

      &::after {
        display: block;
      }
    }
  }

  @include swiper();

  & .swiper-button-prev,
  & .swiper-button-next {
    @include media-breakpoint-down(sm) {
      top: calc(50% - 23px);
      width: 25px;
      height: 25px;
      border-radius: 50px;
      background-size: 36px;
      margin-top: 0px;
      outline: none;
    }
  }

  & .swiper-slide {
    max-width: 180px;
    // @include media-breakpoint-up(sm) {
    //   max-width: 40%;
    // }
  }

  @include product-tag();

  .product-tag {
    height: 9px;
    left: 8px;
    // @include media-breakpoint-up(sm) {
    //   left: 40px;
    //   height: 11px;
    // }
    @include media-breakpoint-up(md) {
      top: 4px;
      left: auto;
    }

    @include media-breakpoint-up(lg) {
      height: 11px;
      top: 0;
      right: 66%;
    }
  }
}

.grade-selection {
  &--line-top {
    margin-top: 20px;

    @include media-breakpoint-up(lg) {
      margin-top: 45px;
    }

    @include media-breakpoint-up(xl) {
      margin-top: 75px;
    }

    .product-detail-tab {
      padding-top: 0;
      border-top: 6px solid #cd0000;
      border-bottom: none;

      @include media-breakpoint-up(lg) {
        border-top: none;
      }

      &__nav {
        padding-top: 15px;

        @include media-breakpoint-up(md) {
          padding-top: 10px;
        }

        @include media-breakpoint-up(lg) {
          border-top: 8px solid #cd0000;
          border-bottom: none;
        }

        @include media-breakpoint-up(xl) {
          border-top: 10px solid #cd0000;
        }

        &__item {
          &.active {
            &::after {
              display: none;
            }

            &::before {
              content: '';
              position: absolute;
              top: -15px;
              left: 50%;
              transform: translateX(-50%);
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 8px solid $red-hover-color;
              display: block;

              @include media-breakpoint-up(md) {
                top: -10px;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
              }

              @include media-breakpoint-up(lg) {
                border-top: 10px solid #e50011;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
              }
            }
          }
        }
      }
    }
  }
}
</style>
