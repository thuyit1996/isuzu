<template>
  <div class="accessories-best-seller" v-if="listBestSellers.length">
    <div class="container">
      <div class="accessories-best-seller__heading">
        <sc-rich-text tag="div" class="accessories-best-seller__heading__title isu-title" :field="fields.Title"/>
      </div>
      <div class="accessories-best-seller__slider" :class="{'hidden-arrow-btn': isShowArrow()}">
        <div v-swiper:mySwiper="swiperAccessoriesBestSeller">
          <div class="swiper-wrapper" :class="{'center': centerSlide()}">
            <div class="swiper-slide" v-for="(bestSeller, index) in listBestSellers" :key="index">
              <accessory-item :accessory="bestSeller" :pageData="pageData"></accessory-item>
            </div>
          </div>
        </div>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </div>
    </div>
    <div class="over-lay" v-if="isShowOverLay">
      <span class="loading-icon"></span>
    </div>
  </div>
</template>

<script>
import { RichText } from '@sitecore-jss/sitecore-jss-vue';
import AccessoryItem from '../accessory/AccessoryItem';
import { GetBestSellers } from '../../service/accessoriesService';
import { isMobile } from '../../util/dom';

const MAXIMUM_SLIDES_MOBILE = 2;
const MAXIMUM_SLIDES_DESKTOP = 4;

export default {
  name: 'AccessoriesBestSeller',
  components: {
    ScRichText: RichText,
    AccessoryItem: AccessoryItem,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      swiperAccessoriesBestSeller: {
        pagination: {
          el: '.accessories-best-seller .swiper-pagination',
          type: 'fraction',
        },
        navigation: {
          nextEl: '.accessories-best-seller .swiper-button-next',
          prevEl: '.accessories-best-seller .swiper-button-prev',
        },
        slidesPerView: MAXIMUM_SLIDES_DESKTOP,
        spaceBetween: 30,
        watchOverflow: true,

        breakpoints: {
          576: {
            slidesPerView: MAXIMUM_SLIDES_MOBILE,
            spaceBetween: 23,
          },
        },
      },
      carTypeId: '',
      listBestSellers: [],
      deviceType: 3,
      detectMobile: false,
      isShowOverLay: true,
      pageData: {},
    };
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.$root.$on('IdCarTypeSelect', (id) => {
      if (id) {
        this.carTypeId = id;
      }
      this.isShowOverLay = true;
      this.getBestSellerData(this.carTypeId);
    });
    this.$root.$on('AccessoriesPageData', (data) => {
      this.pageData = data;
    });
  },
  methods: {
    getBestSellerData(carTypeId) {
      GetBestSellers(carTypeId)
        .then((response) => {
          if (response.data.IsSuccess) {
            this.listBestSellers = response.data.Accessories;
            setTimeout(() => {
              this.isShowOverLay = false;
            }, 200);
          }
        })
        .catch((err) => {});
    },
    centerSlide() {
      return this.listBestSellers?.length < (this.detectMobile ? MAXIMUM_SLIDES_MOBILE : MAXIMUM_SLIDES_DESKTOP);
    },

    isShowArrow(){
      return this.listBestSellers?.length <= (this.detectMobile ? MAXIMUM_SLIDES_MOBILE : MAXIMUM_SLIDES_DESKTOP)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
.accessories-best-seller {
  margin-top: 15px;
  position: relative;

  @include media-breakpoint-up(lg) {
    margin-top: 0;
  }

  &__heading {
    margin-bottom: 30px;
    text-align: center;

    &__title {
      @include span-break();
    }
  }

  &__slider {
    position: relative;
    padding-bottom: 50px;
    border-bottom: 1px solid #c8c8c8;
  }

  //INFO: Custom Swiper Slider

  >>> .swiper-slide {
    height: unset;
  }

  @include arrow-hover-effect--swiper();

  >>> .swiper-button-prev,
  >>> .swiper-button-next {
    top: auto;
    bottom: 45px;
    z-index: $SWIPER_PAGINATION_ZINDEX;
    outline: none;
    width: 8px;
    height: 17px;
    background-size: contain;
    background-repeat: no-repeat;
    display: block;

    @include media-breakpoint-up(lg) {
      bottom: 44px;
    }
  }

  >>>.swiper-button-prev {
    background-image: url('../../assets/arrow-prev-gray.svg');
    left: 33%;
    right: auto;

    @include media-breakpoint-up(md) {
      left: 41%;
    }

    @include media-breakpoint-up(lg) {
      left: 42%;
    }

    @include media-breakpoint-up(xl) {
      left: 43%;
    }
  }

  >>>.swiper-button-next {
    background-image: url('../../assets/arrow-next-gray.svg');
    right: 33%;
    left: auto;

    @include media-breakpoint-up(md) {
      right: 41%;
    }

    @include media-breakpoint-up(lg) {
      right: 42%;
    }

    @include media-breakpoint-up(xl) {
      right: 43%;
    }
  }

  @include swiper-pagination();

  >>> .swiper-pagination {
    z-index: $SWIPER_PAGINATION_ZINDEX;
    bottom: 38px;
    left: 0;
    text-align: center;

    @include media-breakpoint-up(lg) {
      bottom: 36px;
    }
  }

  .center {
    justify-content: center;
  }

  .hidden-arrow-btn {
    >>> .swiper-pagination {
      display: none;
    }

    >>>.swiper-button-prev,
    >>> .swiper-button-next {
      display: none;
    }

    &.accessories-best-seller__slider {
      padding-bottom: 5px;
    }
  }

  .over-lay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.8;
    z-index: 1; //INFO: use z-index to override swiper

    .loading-icon {
      @include loading-icon();
    }
  }
}
</style>