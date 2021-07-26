<template>
  <div class="general-info">
    <div class="container">
      <div class="general-info__wrap">
        <div class="general-info__content">
          <div class="general-info__content__heading">
            <h2 class="car-model">{{summaryData.carModel.Title}}</h2>
            <h4 v-show="hasCarGrade" class="car-type">{{summaryData.carGrade.Title}}</h4>
            <h4 v-show="hasCarColor" class="car-color">{{summaryData.carColor.name}}</h4>
          </div>
          <div class="general-info__content__price">
            <p v-show="hasCarColor" class="price__bonus">+ {{summaryData.carColor.price | formatMoney}} บาท</p>
            <div v-show="isShowSummary" class="price__sub-total">
              <div class="price__sub-total__info">
                <div class="price__sub-total__info__title">
                  <span class="text-title">Total car price</span>
                  <div class="icon-title">
                    <span>A</span>
                  </div>
                </div>
                <span class="price__sub-total__info__baht">{{summaryData.totalPrice | formatMoney}} บาท</span>
              </div>
              <div class="price__sub-total__info">
                <div class="price__sub-total__info__title">
                  <span class="text-title">Total insurance package</span>
                  <div class="icon-title">
                    <span>B</span>
                  </div>
                </div>
                <span class="price__sub-total__info__baht">{{summaryData.carInsurance.price ? summaryData.carInsurance.price : 0 | formatMoney}} บาท</span>
              </div>
            </div>
            <div class="price__summary">
              <template v-if="isShowSummary">
                <h4 class="price__summary__title">รวมราคา</h4>
                <div class="price__summary__info">
                  <div class="price__summary__info__icon">
                    <div class="icon-title">
                      <span>A</span>
                    </div>
                    <span class="plus">+</span>
                    <div class="icon-title">
                      <span>B</span>
                    </div>
                  </div>
                  <div class="price__summary__info__baht">
                    <h2 class="price-value">{{summaryData.allPrice | formatMoney}}</h2>
                    <span class="price-unit">บาท</span>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="price__summary__info before-step5">
                  <h4 class="price__summary__title">ราคา</h4>
                  <div class="price__summary__info__baht">
                    <h2 class="price-value">{{summaryData.totalPrice | formatMoney}}</h2>
                    <span class="price-unit">บาท</span>
                  </div>
                </div>
              </template>

            </div>
          </div>
          <div v-show="hasCarColor && hasCarGrade" class="general-info__content__button" @click.prevent="saveQuote">
            <a href="#" class="button-quotation i-btn i-btn__secondary">{{saveAquoteTitle && saveAquoteTitle.value}}</a>
          </div>
        </div>
        <div class="general-info__image animated" :class="`${animated ? 'fadeInRight' : ''} ${centerStyle ? ' center-style' : ''}`">
          <!-- INFO: TODO: hard code, find better solution -->
          <template v-if="summaryData.carColor.rotateImage && summaryData.carColor.rotateImage.length">
            <img  v-for="(item, index) in summaryData.carColor.rotateImage" :key="item.Id"  :src="imageEndPoint(item)" alt="car image" />
          </template>
          <template v-else>
            <img class="image-full-width d-sm-none " :src="imageEndPoint(carImageSm)" alt="car image" />
            <img class="image-full-width d-none d-sm-block" :src="imageEndPoint(carImage)" alt="car image" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { customMoney } from '../../pipes/moneyPipe';
import { mapActions, mapState } from 'vuex';
import EndPointMixin from '../../../mixin/endpoint-mixin';
// INFO: don't import here, will have ssr issue
// import circlr from 'circlr';
export default {
  name: 'GeneralInfomation',
  mixins: [EndPointMixin],
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    summaryData: {},
    isGoThroughInsurance: {
      type: Boolean,
      default: () => false,
    },
    step: 0,
    saveAquoteLink: {
      type : Object,
    },
    saveAquoteTitle:{
      type: Object
    }
  },
  data() {
    return {
      circlr: {},
      circlrInstance: null,
      animated: true,
    };
  },
  computed: {
    ...mapState('quotation', { isModifyingQuote: 'isModifyingQuote'}),
    ...mapState('quotation', { currentQuoteId: 'currentQuoteId'}),
    centerStyle: function() {
      return this.step === 1 && !this.isGoThroughInsurance;
    },
    carImage: function() {
      this.toggleAnimation();
      let carModelOrGrade = this.summaryData.carGrade.Image
        ? this.summaryData.carGrade.Image
        : this.summaryData.carModel.Image;
      return this.summaryData.carColor.Image ? this.summaryData.carColor.Image : carModelOrGrade;
    },
    carImageSm: function() {
      this.toggleAnimation();
      let carModelOrGrade = this.summaryData.carGrade.ImageSm
        ? this.summaryData.carGrade.ImageSm
        : this.summaryData.carModel.ImageSm;
      return this.summaryData.carColor.ImageSm
        ? this.summaryData.carColor.ImageSm
        : carModelOrGrade;
    },
    hasCarGrade: function() {
      return Boolean(this.summaryData.carGrade.Id);
    },
    hasCarColor: function() {
      return Boolean(this.summaryData.carColor.Id.length);
    },
    hasCarInsurance: function() {
      return this.isGoThroughInsurance;
    },
    isShowSummary: function() {
      // INFO: remove insurance out of condition, it may differ a bit from design, but it is logical
      // return this.hasCarColor && this.hasCarGrade && this.hasCarInsurance;
      return this.hasCarColor && this.hasCarGrade;
    },
  },
  methods: {
    ...mapActions('savequote', ['addQuote']),
    ...mapActions('quotation', ['resetModifyingQuote']),

    // TODO: Better way for animation
    toggleAnimation() {
      this.$nextTick(() => {
        this.animated = false;
        setTimeout(() => {
          this.animated = true;
        });
      });
    },
    saveQuote() {
      let quoteId = '';
      if (this.isModifyingQuote) {
        quoteId = this.currentQuoteId;
      } else {
        // INFO: use time from EPOC, that will ensure that no ID collision
        quoteId = (new Date()).getTime().toString();
      }

      this.addQuote({
        ...this.summaryData,
        id: quoteId,
      });
      this.resetModifyingQuote();
      if(this.saveAquoteLink?.value?.href?.length){
        this.$router.push(this.saveAquoteLink.value.href);
      }
    },
    // imageEndPoint(url) {
    //   return `${GetEndPoint()}${url}`;
    // },
    // // TODO: Move this to store
    // saveQuoteOnLocalStorage() {
    //   let quoteList = localStorageService.getByKey(STORAGE_SAVE_QUOTE);
    //   if (quoteList && typeof quoteList != 'undefined') {
    //     quoteList = JSON.parse(quoteList);
    //   } else {
    //     quoteList = [];
    //   }
    //   if (quoteList.length >= 3) {
    //     quoteList.push(this.summaryData);
    //     quoteList.shift();
    //   } else {
    //     quoteList.push(this.summaryData);
    //   }
    //   localStorageService.setLocalStorageByKey(STORAGE_SAVE_QUOTE, JSON.stringify(quoteList));
    // },
    // TODO: create separate component for this
    initiate360Image() {
      if (this.summaryData.carColor.rotateImage && this.summaryData.carColor.rotateImage.length) {
        const el = document.querySelector('.general-info .general-info__image');
        // INFO: https://www.npmjs.com/package/circlr
        if (this.circlrInstance) {
          this.circlrInstance.unbind();
        }
        this.circlrInstance = this.circlr(el)
          .scroll(false)
          .on('show', (n) => {});
      }
    },
  },
  mounted() {
    // this.circlr = require('circlr');
    import(/* webpackChunkName: "circlr" */ /* webpackPreload: true */ 'circlr').then(
      ({ default: circlr }) => {
        this.circlr = circlr;
        this.$nextTick(() => {
          this.initiate360Image();
        });
    });
  },
  filters: {
    formatMoney: function(value) {
      return customMoney(value);
    },
  },
  watch: {
    summaryData: function(newVal) {
      if (
        newVal &&
        newVal.carColor &&
        newVal.carColor.rotateImage &&
        newVal.carColor.rotateImage.length
      ) {
        this.$nextTick(() => {
          this.initiate360Image();
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/reuse-mixin';

.general-info {
  background-image: url('../../../assets/bg-step5-general-info_01.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 315px 0 15px;
  height: 425px;
  color: $white;
  position: relative;

  @include media-breakpoint-up(md) {
    padding: 110px 0 80px;
    height: 560px;
  }

  @include media-breakpoint-up(lg) {
    padding: 135px 0 80px;
    height: 640px;
  }

  &__wrap {
    @include media-breakpoint-up(md) {
      height: 400px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__content {
    width: 90%;
    position: absolute;
    left: 15px;
    bottom: 15px;

    @include media-breakpoint-up(md) {
      width: 400px;
      position: static;
    }

    &__heading {
      .car-model,
      .car-color {
        margin-bottom: 0;
      }

      .car-model {
        @include media-breakpoint-down(sm) {
          font-size: $font-size-mobile;  //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .car-color,
      .car-type {
        @include media-breakpoint-down(sm) {
          font-size: $font-size-small;   //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
        }
      }

      .car-type {
        margin-bottom: -5px;
      }
    }

    &__price {
      padding-bottom: 25px;

      @include media-breakpoint-down(sm) {
        font-size: 1.15rem;   //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
        padding-bottom: 7px;
      }
    }

    &__button {
      .button-quotation {
        position: relative;
        padding: 5px 40px 5px 20px;

        @include media-breakpoint-up(md) {
          padding: 10px 50px 10px 30px;
        }

        &::after {
          content: "";
          width: 13px;
          height: 13px;
          background: url('../../../assets/icon-quotation-hover.svg') no-repeat;
          background-size: contain;
          margin-left: 5px;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);

          @include media-breakpoint-up(md) {
            width: 19px;
            height: 19px;
          }
        }

        &:hover,
        &:focus,
        &:active {
          &::after {
            background: url('../../../assets/icon-quotation.svg') no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }

  .price {
    &__sub-total {
      width: 170px;

      @include media-breakpoint-up(md) {
        width: auto;
        padding-top: 5px;
      }

      &__info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3px;

        &__title {
          display: flex;

          .text-title {
            display: inline-block;
            margin-right: 5px;
          }
        }
      }
    }

    &__summary {
      margin-top: 15px;
      padding-top: 6px;
      border-top: 1px solid $gray-300;

      @include media-breakpoint-up(md) {
        margin-top: 26px;
        padding-top: 20px;
      }

      &__title {
        margin-bottom: 0;

        @include media-breakpoint-down(sm) {
          font-size: $font-size-small;    //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
          margin-bottom: 2px
        }
      }

      &__info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__icon {
          display: flex;
          align-items: center;
        }

        &__baht {
          margin-top: -20px;

          @include media-breakpoint-up(md) {
            margin-top: -9px
          }

          .price-value {
            display: inline-block;

            @include media-breakpoint-down(xs) {
              font-size: 3rem;     //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
            }
          }

          .price-unit {
            font-size: $font-size-mobile;
            display: inline-block;
            margin-left: 5px;

            @include media-breakpoint-up(md) {
              font-size: 3rem;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

  &__image { // Use !important override library to display image as layout design
    position: absolute !important;
    top: 145px;
    right: 15px;
    width: 160px !important; // INFO: this is for iphone 5: 320 screen

    @include media-breakpoint-up(xs) {
      top: 132px;
      width: 200px !important;
    }

    @include media-breakpoint-up(md) {
      position: static !important;
      order: 0;
      width: 700px !important;
      padding-top: 40px;
      margin: 0 -20px 0 30px;
    }

    @include media-breakpoint-up(xl) {
      // TODO: hard fix
      width: 665px !important;
      height: 400px;
      padding-top: 60px;
      margin-left: 0px;

      img {
        max-height: 100%;
      }
    }
  }

  .center-style {
    width: 75% !important;
    right: 12%;
    top: 165px;

    @include media-breakpoint-up(md) {
      width: 700px !important;
    }

    @include media-breakpoint-up(xl) {
      width: 665px !important;
    }
  }

  .icon-title {
    width: 12px;
    height: 12px;
    background: $white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $black;

    @include media-breakpoint-up(md) {
      width: 23px;
      height: 23px;
    }
  }

  .plus {
    display: inline-block;
    margin: 0 7px;
  }

  .before-step5 {
    @include media-breakpoint-up(md) {
      display: block;
    }

    .price__summary__info__baht {
      margin-top: -5px;
    }
  }
}

</style>
