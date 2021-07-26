<template>
  <div>
    <div class="accessory-detail__products__content__swiper__images" v-swiper:mySwiper="swiperAccesoryDetailImageOption">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="accessory-detail__products__content__swiper__button" v-if="isShowBtn" ref="accessorySlideButtons">
      <div :class="'swiper-pagination ' + this.itemId" slot="pagination" ref="accessoryPagination"></div>
      <div :class="'swiper-button-next ' + this.itemId" slot="button-next" v-if="arrowBtn" ref="accessoryNextArrow"></div>
      <div :class="'swiper-button-prev ' + this.itemId" slot="button-prev" v-if="arrowBtn" ref="accessoryPrevArrow"></div>
    </div>
  </div>
</template>

<script>
import { isDesktop } from '../../util/dom';

export default {
  name: 'AccessoryDetailSwiper',
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
    isShowBtn: {
      type: Boolean,
      default: true,
    },
    initialSlide: {
      type: Number,
    },
    classParent: {
      type: String,
    }
  },
  data() {
    return {
      deviceType: 3,
      detectDesktop: false,
    }
  },
  mounted(){
    this.detectDesktop = isDesktop(this.deviceType);
    this.calculateSlidePosition();
    window.addEventListener('resize',() => {
      if(this.detectDesktop){
        this.calculateSlidePosition();
      }
    })
  },
  computed : {
    swiperAccesoryDetailImageOption : function(){
      return {
        pagination: {
          el: `.${this.classParent} .swiper-pagination`,
          clickable: true,
        },
        spaceBetween: 35,
        navigation: {
          nextEl: `.${this.classParent} .swiper-button-next`,
          prevEl: `.${this.classParent} .swiper-button-prev`,
        },
        arrowBtn: true,
        // slidesPerView: this.isMobile ? 1 : 2,
        // initialSlide : this.isMobile ? this.initialSlide : 0,
      }
    }
  },
  methods: {
    calculateSlidePosition() {
      if (this.isShowBtn) {
        let parrentDiv = this.$refs.accessorySlideButtons;
        let pagination = this.$refs.accessoryPagination;
        let nextArrow = this.$refs.accessoryNextArrow;
        let prevArrow = this.$refs.accessoryPrevArrow;

        // INFO: parrentDiv is equal 'accessory-detail__products__content__swiper__button'. it contains all 3 button pagination, next and prev
        // first set parrentDiv Height = pagination Buttons height. all 3 pagination, next and prev are position absolute.
        parrentDiv.style.height = pagination.offsetHeight + 'px';
        // INFO: set pagination button left = (parrentDiv - itself) / 2 => so it will be center.
        pagination.style.left = ((parrentDiv.offsetWidth - pagination.offsetWidth) / 2) + 'px';
        // INFO: set 2 arrow button left/right = sum of parrent div and pagination button / 2 => so it will be at the end or top of pagination button
        // INFO: +12 at the end of math is for the padding.
        nextArrow.style.left = (((parrentDiv.offsetWidth + pagination.offsetWidth) / 2) + 12) + 'px';
        prevArrow.style.right = (((parrentDiv.offsetWidth + pagination.offsetWidth) / 2) + 12) + 'px';
      }
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.calculateSlidePosition);
  },
}
</script>
<style lang="scss" scoped>
</style>