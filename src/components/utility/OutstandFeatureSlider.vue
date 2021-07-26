<template>
  <div class="outstanding-features__slider" v-swiper:mySwiper="swiperOustandingFeatureMobile">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div :class="'swiper-pagination ' + this.itemId" slot="pagination"></div>
    <div :class="'swiper-button-next ' + this.itemId" slot="button-next" v-if="arrowBtn"></div>
    <div :class="'swiper-button-prev ' + this.itemId" slot="button-prev" v-if="arrowBtn"></div>
  </div>
</template>

<script>

export default {
  name: 'OutstandFeatureSlider',
  components: {
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    itemId: {
      type: String,
      default: 'item_0',
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
    arrowBtn: {
      type: Boolean,
      default: true,
    },
    initialSlide: {
      type: Number,
    },
    isPopup: {
      type: Boolean,
      default: false,
    },
  },
  computed : {
    swiperOustandingFeatureMobile : function(){
      return {
        pagination: {
          el: `.swiper-pagination.${this.itemId}`,
          type: 'fraction',
        },
        spaceBetween: this.isPopup ? 0 : 30,
        breakpoints: {    
          1024: {
            spaceBetween: this.isPopup ? 0 : 17,
          },
        },
        navigation: {
          nextEl: `.swiper-button-next.${this.itemId}`,
          prevEl: `.swiper-button-prev.${this.itemId}`,
        },
        slidesPerView: this.isMobile ? 1 : 2,
        arrowBtn: true,
        initialSlide : this.isMobile ? this.initialSlide : 0,
        touchEventsTarget: 'wrapper',
      }
    }
  },
  methods: {
    jumpToSlide(slideIndex) {
      this.mySwiper.slideTo(slideIndex);
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.outstanding-features {
  &__slider {
    padding-bottom: 50px;

    @include media-breakpoint-up(md) {
      margin-left: 20px;
      padding-bottom: 67px;
    }

    @include media-breakpoint-up(lg) {
      margin-left: 20px;
      padding-bottom: 100px;
    }

    @include media-breakpoint-up(xl) {
      margin-left: 30px; 
    }

    &__item {
      &__image {
        width: 100%;
        cursor: pointer;
        overflow: hidden;

        > * {
          transition: transform .4s ease,-webkit-transform .4s ease;
        }

        &:hover {
          img {
            transform: scale(1.05);
          }
        }
      }

      &__content {
        background: $white;
        padding: 32px 25px 10px;
        min-height: 210px;

        &__heading {
          display: inline-block;
          padding-bottom: 12px;
          border-bottom: 1px solid $black;
          font-size: 2.7rem;
        }

        &__desc {
          padding-top: 12px;
          color: #222;
          font-size: $font-size-mobile;
        }
      }
    }

    .swiper-pagination {
      color: #bdbdbd;
      bottom: 10px;

      @include media-breakpoint-up(lg) {
        bottom: 30px;
        // color: $white;
      }

      >>> .swiper-pagination-current {
        font-family: $font-family-eurothai-demi;
        color: #ff001a;
        font-size: $font-size-utility-paging-current-mobile; //INFO: follow current site
        font-weight: bold;
        margin: 0 2px;

        @include media-breakpoint-up(md) {
          color: $white;
        }

        @include media-breakpoint-up(lg) {
          font-size: $font-size-utility-paging-current; //INFO: follow current site
        }
      }

      >>> .swiper-pagination-total {
        color: #b6b6b6;
        font-size: $font-size-utility-paging-total-mobile; //INFO: follow current site

        @include media-breakpoint-up(lg) {
          font-size: $font-size-utility-paging-total; //INFO: follow current site
        }
      }
    }
  }
}

>>> .swiper-button-prev,
>>> .swiper-button-next {
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 5px;
  height: 11px;
  position: absolute;
  top: auto;
  bottom: 18px;
  outline: none;

  @include media-breakpoint-up(md) {
    width: 8px;
    height: 15px;
  }

  @include media-breakpoint-up(lg) {
    width: 18px;
    height: 18px;
    bottom: 40px;
  }

  &:after {
    content: "";
    position: absolute;
    left: auto;
    top: auto;
    right: -2px;
    bottom: -8px;
    margin-top: -30px;
    margin-left: -30px;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    transform: scale(0);
    transition: transform .3s cubic-bezier(.215,.61,.355,1),-webkit-transform .3s cubic-bezier(.215,.61,.355,1);
    border-color: #333;
    background-color: #333;

    @include media-breakpoint-up(md) {
      right: -5px;
      bottom: -10px;
      width: 30px;
      height: 30px;
    }

    @include media-breakpoint-up(lg) {
      width: 50px;
      height: 50px;
      top: 14px;
      left: 15px;
      right: auto;
      bottom: auto;
    }
  }

  &:hover {
    &::after {
      @include media-breakpoint-up(lg) {
        transform: scale(1);
        transition: transform 277ms cubic-bezier(.16,.01,.77,1),-webkit-transform 277ms cubic-bezier(.16,.01,.77,1);
        background-position: center;
        background-repeat: no-repeat;
        background-size: 10px;
      }
    }
  }
}


>>> .swiper-button-prev {
  // background-image: url('../../assets/arrow-next-oustanding-feature-mobile.png');
  // transform: rotate(180deg);
  left: 35%;
  padding: 0 10px;

  @include media-breakpoint-up(xs) {
    left: 36%;
  }

  @include media-breakpoint-up(md) {
    background-image: url('../../assets/arrow-prev.svg');
  }

  @include media-breakpoint-up(lg) {
    left: 35%;

    &:hover {
      &::after {
        background-image: url('../../assets/arrow-prev.svg');
      }
    }
  }

  @include media-breakpoint-up(xl) {
    left: 39%;
  }
}

>>> .swiper-button-next {
  background-image: url('../../assets/arrow-next-oustanding-feature-mobile.png');
  right: 35%;
  padding: 0 10px;

  @include media-breakpoint-up(xs) {
    right: 36%;
  }

  @include media-breakpoint-up(md) {
    background-image: url('../../assets/arrow-next.svg');
  }

  @include media-breakpoint-up(lg) {
    right: 35%;
  }

  @include media-breakpoint-up(xl) {
    right: 39%;
  }

  &:hover {
    @include media-breakpoint-up(lg) {
      &::after {
        background-image: url('../../assets/arrow-next.svg');
      }
    }
  }
}
</style>