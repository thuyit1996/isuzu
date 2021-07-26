<template>
  <div class="equipment-intro-slider" v-swiper:mySwiper="swiperEquipmentIntro">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-next d-none d-lg-block" slot="button-next"></div>
    <div class="swiper-button-prev d-none d-lg-block" slot="button-prev"></div>
  </div>
</template>

<script>
export default {
  name: 'EquipmentIntroSlider',
  components: {},
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    itemId: {
      type: String,
      default: 'item_0',
    },
  },
  computed : {
    swiperEquipmentIntro: function() {
      return {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.equipment-intro-slider .swiper-button-next',
          prevEl: '.equipment-intro-slider .swiper-button-prev',
        },
        arrowBtn: true,
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
.equipment-intro-slider {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .swiper-wrapper {
    @include media-breakpoint-up(lg) {
      height: auto;
    }
  }

  & >>> .swiper-pagination-current {
    font-family: $font-family-eurothai-demi;
    font-size: 2.5rem;
    font-weight: bold;
    color: #222;

    @include media-breakpoint-up(md) {
      font-size: calc(.32362vw + 23.78641px);
    }

    @include media-breakpoint-up(lg) {
      color: #fff;
      font-size: 3rem;
    }
  }

  >>> .swiper-pagination {
    bottom: 33px;
    font-family: $font-family-eurothai;
    font-size: 2.1rem;
    color: #b6b6b6;

    @include media-breakpoint-up(md) {
      font-size: calc(.32362vw + 19.78641px);
    }

    @include media-breakpoint-up(md) {
      font-size: 2.6rem;
    }
  }

  >>> .swiper-button-prev {
    @include media-breakpoint-up(lg) {
      left: 40%;
    }

    @include media-breakpoint-up(xl) {
      left: 41%;
    }
  }

  >>> .swiper-button-next {
    @include media-breakpoint-up(lg) {
      right: 40%;
    }

    @include media-breakpoint-up(xl) {
      right: 41%;
    }
  }
}
</style>