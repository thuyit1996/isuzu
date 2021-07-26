<template>
  <div class="final-info">
    <div class="container">
      <div class="final-infor-car">
        <div class="row">
          <div class="col-md-6 order-desc">
            <div class="final-info__model">
              <h2 class="final-info__model__title"> {{summaryData.carModel.Title}} </h2>
              <h4 class="final-info__model__type">{{summaryData.carGrade.Title}} </h4>
              <h4 class="final-info__model__color"> {{summaryData.carColor.name}} </h4>
              <h2 class="final-info__model__total"> รวมราคา  {{summaryData.allPrice | formatMoney }} บาท </h2>
            </div>
          </div>
          <div class="col-md-6 order-img">
            <div class="final-info__picture">
              <img class="image-full-width d-none d-sm-block" :src="imageEndPoint(carImage)" alt="" />
              <img class="image-full-width d-sm-none" :src="imageEndPoint(carImageSm)" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="final-infor-price">
        <div class="row">
          <div class="col-md-6 col-sm-pull-6">
            <div class="final-info__pricing">
              <h4 class="final-info__pricing__heading"> ส่งการประเมินราคาเบื้องต้นให้ผู้จำหน่ายอีซูซุ </h4>
              <div class="final-info__pricing__content">
                <p> ส่งใบเสนอราคาเพื่อรับการติดต่อกลับจากผู้จำหน่ายอีซูซุที่ท่านต้องการได้ง่ายๆที่นี่ </p>
              </div>
              <div class="final-infor__button i-btn i-btn__primary" @click.prevent="sendQuoteToDealer">
                <a href="" class="icon-send-quote" > {{requestDealerTitle }}</a>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="final-info__pricing">
              <h4 class="final-info__pricing__heading"> คำนวณราคา </h4>
              <div class="final-info__pricing__content">
                <p> คำนวณราคารถอีซูซุง่ายๆเพื่อประกอบการพิจารณา </p>
              </div>
              <div class="final-infor__button i-btn i-btn__primary" @click.prevent="sendToPaymentCalculator">
                <a href="#" class="icon-pricing"> {{paymentTitle}} </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { customMoney } from '../../pipes/moneyPipe';
import EndPointMixin from '../../../mixin/endpoint-mixin';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'FinalInformation',
  mixins: [EndPointMixin],
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    summaryData: {},
    requestDealerTitle : {
      type : String,
    },
    paymentTitle : {
      type : String,
    }
  },
  computed: {
    ...mapState('quotation', { isModifyingQuote: 'isModifyingQuote'}),
    carImage: function() {
      let carRotate =
        this.summaryData.carColor.rotateImage &&
        this.summaryData.carColor.rotateImage.length &&
        this.summaryData.carColor.rotateImage[0];
      let carNormal = this.summaryData.carGrade.Image
        ? this.summaryData.carGrade.Image
        : this.summaryData.carModel.Image;

      let carColor = this.summaryData.carColor.Image ? this.summaryData.carColor.Image : carNormal;

      return carRotate ? carRotate : carColor;
    },
    carImageSm: function() {
      let carRotate =
        this.summaryData.carColor.rotateImage &&
        this.summaryData.carColor.rotateImage.length &&
        this.summaryData.carColor.rotateImage[0];

      let carNormal = this.summaryData.carGrade.ImageSm
        ? this.summaryData.carGrade.ImageSm
        : this.summaryData.carModel.ImageSm;

      let carColor = this.summaryData.carColor.ImageSm
        ? this.summaryData.carColor.ImageSm
        : carNormal;

      return carRotate ? carRotate : carColor;
    },
  },
  methods: {
    ...mapActions('quotation', ['updateIsSendFromRequestQuotation']),
    ...mapActions('quotation', ['resetModifyingQuote']),
    ...mapActions('savequote', ['addQuote']),
    sendQuoteToDealer() {
      this.saveAQuote();
      this.$emit('send:quoteToDealer', this.summaryData);
    },
    sendToPaymentCalculator(){
      this.updateIsSendFromRequestQuotation(true);
      this.$emit('send:paymentCalculator', this.summaryData);
    },
    saveAQuote(){
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
    }
  },
  filters: {
    formatMoney: function(value) {
      return customMoney(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';
.final-info {
  background-color: $gray-800;
  color: $white;
  padding: 35px 0 35px 0;

  @include media-breakpoint-up(lg) {
    padding: 50px 0 65px 0;
  }

  .col-md-6 {
    margin-bottom: 15px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 0;
    }
  }

  &__model {
    padding: 0 15px;

    @include media-breakpoint-up(lg) {
      padding: 45px 0 0 92px;
    }

    &__title {
      @include media-breakpoint-down(md) {
        font-size: 2.4rem; //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
      }
    }

    &__type {
      @include media-breakpoint-down(md) {
        font-size: $font-size-small; //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
      }
    }

    &__color {
      @include media-breakpoint-down(md) {
        font-size: $font-size-small;
        margin-top: -6px; //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
      }
    }

    &__total {
      @include media-breakpoint-down(md) {
        font-size: 2.4rem; //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
      }
    }
  }

  &__picture {
    margin-left: 50px;
    width: 70%;

    @include media-breakpoint-up(lg) {
      width: 85%;
      margin-left: 43px;
    }

    @include media-breakpoint-up(xl) {
      width: 100%;
    }
  }

  &__pricing {
    padding: 10px 20px 57px;
    border-radius: 3px;
    background-color: $white;
    color: $black;
    text-align: center;
    height: 137px;
    position: relative;

    @include media-breakpoint-up(lg) {
      padding: 40px 40px 110px;
      height: 100%;
    }

    &__heading {
      @include media-breakpoint-down(md) {
        font-size: $font-size-mobile; //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
      }
    }

    &__heading {
      margin-bottom: 5px;

      @include media-breakpoint-up(lg) {
        margin-bottom: 10px;
      }
    }

    &__content {
      @include media-breakpoint-down(md) {
        font-size: $font-size-small;
      }
    }
  }

  span {
    display: block;
  }

  .final-infor-price {
    margin-top: 0;
    padding: 0 15px;

    @include media-breakpoint-up(lg) {
      margin-top: 40px;
      padding: 0;
    }
  }

  .i-btn {
    padding: 10px 13px 10px 0;
    min-width: 170px;
    border: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 18px;

    @include media-breakpoint-up(lg) {
      bottom: 40px;
      min-width: 242px;
    }

    &:hover {
      background-color: $red-hover-color;
      color: $white;
    }
  }

  a {
    color: $white;
    text-decoration: none;
  }

  .icon-pricing {
    position: relative;

    &::after{
      content: "";
      display: block;
      position: absolute;
      top: 4px;
      right: -15px;
      height: 13px;
      width: 13px;
      background: url('../../../assets/icon-pricing.svg') no-repeat;
      background-size: contain;

      @include media-breakpoint-up(lg) {
        top: 2px;
        right: -23px;
        height: 20px;
        width: 20px;
      }
    }
  }

  .icon-send-quote {
    position: relative;

    &::after{
      content: "";
      display: block;
      position: absolute;
      top: 4px;
      right: -15px;
      height: 13px;
      width: 11px;
      background: url('../../../assets/icon-send-quote.svg') no-repeat ;
      background-size: contain;

      @include media-breakpoint-up(lg) {
        top: 2px;
        right: -24px;
        height: 20px;
        width: 20px;
      }
    }
  }

  .order-desc {
    order: 2;

    @include media-breakpoint-up(lg) {
      order: 1;
    }
  }

  .order-img {
    order: 1;

    @include media-breakpoint-up(md) {
      order: 2;
    }
  }
}
</style>
