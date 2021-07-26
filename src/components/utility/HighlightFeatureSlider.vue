<template>
  <div class="highlight-features__slider" v-swiper:mySwiper="swiperHighlightFeature">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HighlightFeatureSlider',
  components: {},
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    jumpToSlide(slideIndex) {
      this.mySwiper.slideTo(slideIndex);
    },
  },
};
</script>
