<template>
  <div class="accessory-detail">
    <div class="container">
      <div class="accessory-detail__heading text-center">
        <sc-rich-text tag="h2" :field="fields.Parent.Title" class="isu-title"/>
      </div>
      <div class="accessory-detail__switch">
        <div :class="['accessory-detail__switch__previous'
        , {'accessory-detail__switch__disable' : isDisablePrevButton}
        , {'visible-hidden' : isHiddenButtons}]">
          <a href="javascript:void(0)" class="accessory-detail__switch__previous__button" @click="throttledNextMethod('prev')">
            <div class="accessory-detail__arrow accessory-detail__arrow--prev"></div>
            <span class="accessory-detail-previous-text">{{fields.PrevLabel.value}}</span>
          </a>
        </div>
        <div :class="['accessory-detail__switch__next'
        , {'accessory-detail__switch__disable' : isDisableNextButton}
        , {'visible-hidden' : isHiddenButtons}]">
          <a href="javascript:void(0)"  class="accessory-detail__switch__next__button" @click="throttledNextMethod('next')">
            <span class="accessory-detail-next-text">{{fields.NextLabel.value}}</span>
            <div class="accessory-detail__arrow accessory-detail__arrow--next"></div>
          </a>
        </div>
      </div>
      <div class="accessory-detail__products clearfix">
        <div class="accessory-detail__products__content accessory-detail-product detail-1 ">
          <accessory-detail-product :fields="accessoryData.Accessory" :isLoading="isLoadingCurrent" :partNumberLabel="fields.PartNumberLabel && fields.PartNumberLabel.value" :accessoryDetailFields="fields">
            <accessory-detail-swiper 
              slot="swiper" 
              v-if="isHaveData(accessoryData) && !isLoadingCurrent" 
              :classParent="'detail-1'" 
              :isShowBtn="accessoryData.Accessory.Images.length > 1"
            >
              <div class="swiper-slide swiper-row" v-for="(image, index) in accessoryData.Accessory.Images" :key="index">
                <img class="accessory-image d-none d-sm-block" :src="getImageDesktop(image.Image)" alt="x" >
                <img v-if="!isEditing" class="accessory-image d-sm-none" :src="getImageMobile(image.MobileImage)" alt="x">
              </div>
            </accessory-detail-swiper>
            <template v-if="isProductUrl(accessoryData)" slot="share">
              <sc-placeholder name="accessory-social-sharing" :rendering="rendering" />
            </template>
          </accessory-detail-product>
        </div>
        <div class="accessory-detail__products__content accessory-detail-product detail-2 ">
          <accessory-detail-product :fields="accessoryDataNext.Accessory" :isLoading="isLoadingNext" :partNumberLabel="fields.PartNumberLabel && fields.PartNumberLabel.value" :accessoryDetailFields="fields">
            <accessory-detail-swiper 
              slot="swiper" 
              v-if="isHaveData(accessoryDataNext) && !isLoadingNext" 
              :classParent="'detail-2'" 
              :isShowBtn="accessoryDataNext.Accessory.Images.length > 1"
            >
              <div class="swiper-slide swiper-row" v-for="(image, index) in accessoryDataNext.Accessory.Images" :key="index">
                <img class="accessory-image d-none d-sm-block" :src="getImageDesktop(image.Image)" alt="x" >
                <img v-if="!isEditing" class="accessory-image d-sm-none" :src="getImageMobile(image.MobileImage)" alt="x">
              </div>
            </accessory-detail-swiper>
            <template v-if="isProductUrl(accessoryDataNext)" slot="share">
              <sc-placeholder name="accessory-social-sharing" :rendering="rendering" />
            </template>
          </accessory-detail-product>
        </div>
      </div>
      <div class="accessory-detail__back text-center">
        <a :href="fields.BackLink.value.href" class="accessory-detail__back__button i-btn i-btn__primary">
          <sc-text :field="fields.BackLabel" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import AccessoryDetailSwiper from './AccessoryDetailSwiper';
import AccessoryDetailProduct from './AccessoryDetailProduct';
import { getAccessoryDetail } from '../../service/accessoryDetailService';
import IsuPlaceholder from '../../components/shared/IsuPlaceholder';
import { mapActions } from 'vuex';
import { isMobile } from '../../util/dom';
import defaultDesktop from '../../assets/fallback-image/accessories-detail-fallback.png';
import defaultMobile from '../../assets/fallback-image/accessories-detail-fallback.png';
import { throttle } from './accessoryDetailService';

const TransitionEndEvents = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend oTransitionEnd',
  transition: 'transitionend'
};
const getTransitionEndEvent = el => {
  for (const name in TransitionEndEvents) {
    if (!el.style[name]) {
      return TransitionEndEvents[name]
    }
  }
  // Fallback
  /* istanbul ignore next */
  return null
};
const THROTTLE_LIMITED_TIME = 1000;

export default {
  name: 'AccessoryDetail',
  components: {
    ScImage: Image,
    ScRichText: RichText,
    ScText: Text,
    AccessoryDetailSwiper: AccessoryDetailSwiper,
    AccessoryDetailProduct: AccessoryDetailProduct,
    ScPlaceholder: IsuPlaceholder,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    rendering: {
      type: Object,
    },
  },
  data() {
    return {
      firstAccessoryId: '',
      accessoryData: {},
      accessoryDataNext: {},
      currentData: false,
      isLoadingCurrent: true,
      isLoadingNext: true,
      storedData: [],
      deviceType: 3,
      detectMobile: false,
      isEditing: true,
    }
  },
  computed: {
    isDisablePrevButton: function() {
      if ((this.accessoryData.PrevId === null && this.currentData) 
      || (this.accessoryDataNext.PrevId === null && !this.currentData)) {
        return true;
      }
      return false;
    },
    isDisableNextButton: function() {
      if ((this.accessoryData.NextId === null && this.currentData) 
      || (this.accessoryDataNext.NextId === null && !this.currentData)) {
        return true;
      }
      return false;
    },
    isHiddenButtons: function() {
      return this.accessoryData.PrevId === null && this.accessoryData.NextId === null;
    },
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    this.firstAccessoryId = this.$jss?.routeData()?.itemId || '';
    this.getData(true);
    let isActive = this.$el.querySelector('.accessory-detail-product.active');
    if (isActive === null) {
      let firstActiveEl = this.$el.querySelector('.accessory-detail-product');
      firstActiveEl.classList.add('active');
    }
  },
  methods: {
    ...mapActions('accessorydetail', ['updateAccessoryData']),
    getAccessoryType() {
      let queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let type = urlParams.get('type');
      return type || '';
    },
    throttledNextMethod: throttle(function(direction) {
      if (direction) {
        let id = direction === 'next' ? this.accessoryData?.NextId : this.accessoryData?.PrevId;
        let nextId = direction === 'next' ? this.accessoryDataNext?.NextId : this.accessoryDataNext?.PrevId;
        this.showNextProduct(id, nextId, direction);
      }
    }, THROTTLE_LIMITED_TIME),
    getData(isFirstTime = false) {
      if (isFirstTime) {
        getAccessoryDetail(this.firstAccessoryId, this.getAccessoryType()).then((response) => {
          if (response.data.IsSuccess) {
            this.accessoryData = response.data;
            this.currentData = true;
            this.updateAccessoryData(this.accessoryData);
            this.accessoryData.Id = this.firstAccessoryId.replace(/\-/g,"");
            this.storedData.push(this.accessoryData)
            setTimeout(() => {
              this.isLoadingCurrent = false;
            }, 200);
          }
        });
      }
    },
    isProductUrl(val) {
      return val?.Accessory?.ItemUrl?.length
    },
    isHaveData(val){
      return val?.Accessory?.Images?.length;
    },
    isElement(el) {
      return Boolean(el && el.nodeType === Node.ELEMENT_NODE)
    },
    reflow(el) {
      return this.isElement(el) && el.offsetHeight
    },
    isStoredData(dynamicId) {
      let item = this.storedData.find(item => item.Id === dynamicId);
      return item;
    },

    showNextProduct(id, idNext, direction) {
      if (this.currentData) {
        this.isLoadingNext = true;
      } else {
        this.isLoadingCurrent = true;
      }
      let dynamicId = this.currentData ? id : idNext;

      if (!this.isStoredData(dynamicId)) {
        getAccessoryDetail(dynamicId, this.getAccessoryType()).then((response) => {
          if (response.data.IsSuccess) {
            let accessoryProduct = response.data;
            if (this.currentData) {
              this.accessoryDataNext = accessoryProduct;
              this.currentData = false;
              this.updateAccessoryData(this.accessoryDataNext);
              setTimeout(() => {
                this.isLoadingNext = false;
              }, 200);
              } else {
              this.accessoryData = accessoryProduct;
              this.currentData = true;
              this.updateAccessoryData(this.accessoryData);
              setTimeout(() => {
                this.isLoadingCurrent = false;
              }, 200);
            }
            accessoryProduct.Id = dynamicId;
            this.storedData.push(accessoryProduct);
            let accessoryUrl = '';
            if (response?.data?.Accessory?.VehicleType) {
              let itemUrl = response.data.Accessory.ItemUrl;
              accessoryUrl = itemUrl ? `${itemUrl}?type=${response?.data?.Accessory?.VehicleType}` : '';
            } else {
              accessoryUrl = response.data.Accessory.ItemUrl || '';
            }
            window.history.pushState(null, '', accessoryUrl);
          }
        });
      } else {
        if (this.currentData) {
          this.accessoryDataNext = this.isStoredData(dynamicId);
          this.currentData = false;
          this.updateAccessoryData(this.accessoryDataNext);
          setTimeout(() => {
            this.isLoadingNext = false;
          }, 200);
        } else {
          this.accessoryData = this.isStoredData(dynamicId);
          this.currentData = true;
          this.updateAccessoryData(this.accessoryData);
          setTimeout(() => {
            this.isLoadingCurrent = false;
          }, 200);
        }
        let accessoryUrl = '';
        if (this.isStoredData(dynamicId)?.Accessory?.VehicleType) {
          let itemUrl = this.isStoredData(dynamicId)?.Accessory?.ItemUrl;
          accessoryUrl = itemUrl ? `${itemUrl}?type=${this.isStoredData(dynamicId).Accessory.VehicleType}` : '';
        } else {
          accessoryUrl = this.isStoredData(dynamicId).Accessory.ItemUrl || '';
        }
        window.history.pushState(null, '', accessoryUrl);
      }

      this.slideProductAnimation(direction);
    },

    slideProductAnimation(direction) {
      let currentSlide = this.$el.querySelector('.accessory-detail-product.active');
      let nextSlide = this.$el.querySelector('.accessory-detail-product:not(.active)');
      let dirClass = '';
      let overlayClass = '';
      if (direction === 'next') {
        dirClass = 'accessory-detail-product-left';
        overlayClass = 'accessory-detail-product-next';
      } else if (direction === 'prev') {
        dirClass = 'accessory-detail-product-right';
        overlayClass = 'accessory-detail-product-prev';
      }

      this.transitionEndEvent = getTransitionEndEvent(currentSlide) || null
      const events = this.transitionEndEvent.split(/\s+/)

      nextSlide.classList.add(overlayClass);

      this.reflow(nextSlide)
      currentSlide.classList.add(dirClass);
      nextSlide.classList.add(dirClass);

      const onceTransEnd = evt => {
        currentSlide.removeEventListener(events, onceTransEnd);
        nextSlide.classList.remove(dirClass);
        nextSlide.classList.remove(overlayClass);
        nextSlide.classList.add('active');
        currentSlide.classList.remove('active');
        currentSlide.classList.remove(dirClass);
        currentSlide.classList.remove(overlayClass);
      }
      currentSlide.addEventListener(events, onceTransEnd);
    },

    getImageDesktop(image){
      return image || defaultDesktop; 
    },
  
    getImageMobile(image){
      return image || defaultMobile; 
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.accessory-detail {
  .clearfix:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
  }

  &__heading {
    padding: 50px 0 30px;
  }

  &__products {
    @include media-breakpoint-up(lg) {
      position: relative;
      overflow: hidden;
      padding: 20px 0;
    }

    &__content {
      >>> &__info {
        @include media-breakpoint-up(lg) {
          padding-left: 23px;
        }
  
        .accessory-detail-info {
          &__title {
            margin-top: 16px;
            border-bottom: 1px solid $black;

            @include media-breakpoint-up(lg) {  
              margin-top: 0;
            }

            &__text {
              font-size: 30px;
              line-height: 36px;
              margin-bottom: 12px;
              font-weight: bold;
              font-family: $font-family-eurothai;

              @include media-breakpoint-up(lg) {
                line-height: 58px;
                font-size: 48px;
              }
            }
          }

          &__description {
            &__price {
              font-size: 30px;
              font-weight: bold;
              line-height: 36px;
              padding-top: 16px;
              font-family: $font-family-eurothai;

              @include media-breakpoint-up(lg) {
                padding-top: 18px;
                line-height: 58px;
                font-size: 48px;
              }
            }

            &__desc {
              font-size: 22px;
              font-family: $font-family-base;
              padding-top: 16px;

              @include media-breakpoint-up(lg) {
                padding-top: 18px;
              }

              ul {
                padding-left: 20px;

                li {
                  list-style: disc;
                }
              }
            }

            &__desc--part {
              padding-top: 24px;             
              font-size: 22px;
              font-family: $font-family-base;
            }
          }

          &__share {
            padding: 24px 0;

            @include media-breakpoint-up(lg) {
              padding: 24px 0 0;
            }

            &__list {
              .accessory-detail-share-item {
                display: inline-block;
                margin-right: 16px;

                &__button {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: relative;
                  width: 40px;
                  height: 40px;

                  &__icon {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 100%;
                  }

                  &:hover {
                    .img-default {
                      opacity: 0;
                    }

                    .img-hover {
                      opacity: 1;
                    }
                  }

                  .img-default {
                    opacity: 1;
                    transition: all 0.5s;
                  }

                  .img-hover {
                    opacity: 0;
                    transition: all 0.5s;
                  }
                }
              }
            }
          }
        }
      }

      >>> &__swiper {
        @include media-breakpoint-up(lg) {
          padding-right: 23px;
        }

        &__images {
          margin: 0 -15px;

          @include media-breakpoint-up(lg) {
            margin: 0;
          }

          .swiper-wrapper {
            .accessory-image {
              width: 100%;
            }
          }
        }

        &__button {
          position: relative;
          margin: 16px 0;

          @include media-breakpoint-up(lg) {
            margin: 30px 0;
          }

          .swiper-pagination {
            z-index: $SWIPER_PAGINATION_ZINDEX;

            .swiper-pagination-bullet {
              margin-left: 12px;
              width: 12px;
              height: 12px;

              &:focus {
                outline: none;
              }
            }

            .swiper-pagination-bullet:first-child {
              margin: 0;
            }

            .swiper-pagination-bullet-active {
              background: #e60012;
            }
          }

          .swiper-button-next {
            background-image: url('../../assets/arrow-next-gray.svg');
            left: unset;
          }

          .swiper-button-prev {
            background-image: url('../../assets/arrow-prev-gray.svg');
            left: unset;
          }

          .swiper-button-prev, 
          .swiper-button-next {
            background-size: contain;
            top: auto;
            bottom: 0;
            width: 6px;
            height: 100%;
            z-index: $SWIPER_PAGINATION_ZINDEX;

            @include media-breakpoint-down(xs) {
              bottom: 2px;
            }

            &:focus {
              outline: none;
            }
          }
        }
      }

      >>> .detail-content-col {
        display: block;
        width: 100%;
        vertical-align: top;

        @include media-breakpoint-up(lg) {
          width: 50%;
          display: inline-block;
        }
      }
    }

    >>> .campaign-loading {
      &__image {
        @include media-breakpoint-up(lg) {
          width: 50%;
        }
      }

      &__content {
        @include media-breakpoint-up(lg) {
          width: 50%;
        }
      }

      &__button {
        &__item {
          border-radius: 50%;
          width: 30px;
          height: 30px;

          @include media-breakpoint-up(lg) {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
  }

  &__switch {
    display: flex;
    justify-content: space-between;
    font-family: $font-family-base;
    font-size: 23px;
    padding: 0 0 16px;

    @include media-breakpoint-up(lg) {
      padding: 0 0 10px;
    }

    &__disable {
      opacity: 0.35;
      cursor: auto;
      pointer-events: none;
    }

    &__previous {
      display: inline-block;

      &__button {
        color: $black;

        .accessory-detail-previous-text {
          padding-left: 16px;
          vertical-align: middle;

          @include hover-desktop() {
            padding-left: 20px;
          }
        }
      }
    }

    &__next {
      display: inline-block;

      &__button {
        color: $black;

        .accessory-detail-next-text {
          padding-right: 16px;
          vertical-align: middle;

          @include hover-desktop() {
            padding-right: 20px;
          }
        }
      }
    }
  }

  &__back {
    padding-bottom: 15px;

    @include media-breakpoint-up(lg) {
      padding-bottom: 0;
    }
  }

  &__arrow {
    position: relative;
    display: inline-block;
    background-size: contain;
    background-position: center;
    vertical-align: middle;
    width: 8px;
    height: 14px;

    @include arrow-hover-effect();

    &::after {
      top: 17px;
      width: 40px;
      height: 40px;
      display: none;

      @include hover-desktop() {
        display: block;
      }
    }

    &:hover {
      &::after {
        background-size: 8px;
      }
    }

    &--prev {
      background-image: url('../../assets/arrow-prev-gray.svg');

      &:hover {
        &::after {
          background-image: url('../../assets/arrow-prev.svg');
        }
      }
    }

    &--next {
      background-image: url('../../assets/arrow-next-gray.svg');

      &:hover {
        &::after {
          background-image: url('../../assets/arrow-next.svg');
        }
      }
    }
  }

  .accessory-detail-product {
    display: none;
    margin-right: -100%;
    width: 100%;
    float: left;
    transition: transform .6s ease-in-out;
    //INFO: set min-height to fix twitching slide animation
    min-height: $content-min-height; 
  }

  .accessory-detail-product.active,
  .accessory-detail-product-next,
  .accessory-detail-product-prev {
    display: block;
  }

  .accessory-detail-product-next:not(.accessory-detail-product-left),
  .active.accessory-detail-product-right {
    transform: translateX(100%);
  }

  .accessory-detail-product-prev:not(.accessory-detail-product-right),
  .active.accessory-detail-product-left {
    transform: translateX(-100%);
  }
  
  .visible-hidden {
    visibility: hidden;
  }
}
</style>
