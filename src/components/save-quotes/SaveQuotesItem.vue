<template>
  <div class="">
    <div class="save-quotes__content__item">
      <div class="save-quotes__item__delete">
        <span>{{deleteQuoteTitle}}</span>
        <span class="delete-icon" @click="deleteQuote(listSaveQuote)"></span>
      </div>
      <div class="save-quotes__item__box" v-bind:id="'save-quotes-'+listSaveQuote.carGrade.Id">
        <div class="save-quotes__item__box__image">
          <div class="image__picture">
            <img :src="imageEndPoint(carImage)" alt="save quote image" />
          </div>
          <p class="image__title text-bold">{{listSaveQuote.carType ? listSaveQuote.carType : '-'}}</p>
          <p class="image__sub-title text-bold">{{listSaveQuote.carGrade.Title ? listSaveQuote.carGrade.Title : '-'}}</p>
          <p class="image__sub-title text-bold">{{listSaveQuote.carColor.name ? listSaveQuote.carColor.name : '-'}}</p>
        </div>
        <div class="save-quotes__item__box__info">
          <div class="box__info__detail">
            <div class="row">
              <div class="col-md-6">
                <span class="text-bold">ราคารถยนต์ (บาท)</span>
              </div>
              <div class="col-md-6">
                <span>{{listSaveQuote.carGrade.Price | formatMoney}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <span class="text-bold">ราคาสีรถยนต์ (บาท)</span>
              </div>
              <div class="col-md-6">
                <span>{{listSaveQuote.carColor.price | formatMoney}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <span class="text-bold">ราคาประกันภัยรถยนต์ (บาท)</span>
              </div>
              <div class="col-md-6">
                <span>{{listSaveQuote.carInsurance.price ? listSaveQuote.carInsurance.price : 0  | formatMoney}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <span class="text-bold">ราคารวม (บาท)</span>
              </div>
              <div class="col-md-6">
                <span>{{ totalPrice()   | formatMoney}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <span class="text-bold">จำนวนเงินดาวน์</span>
              </div>
              <div class="col-md-6">
                <span v-if="listSaveQuote.downPayment">{{listSaveQuote.downPayment | formatMoney}}</span>
                <span v-else>-</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <span class="text-bold">อัตราดอกเบี้ย (%)</span>
              </div>
              <div class="col-md-6">
                <span>{{listSaveQuote.interestRate ? listSaveQuote.interestRate : '-'}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <span class="text-bold">ระยะเวลาผ่อนชำระ (เดือน)</span>
              </div>
              <div class="col-md-6">
                <span>{{listSaveQuote.installmentPeriod ? listSaveQuote.installmentPeriod : '-'}}</span>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <span class="text-bold">ยอดจัดสินเชื่อ</span>
              </div>
              <div class="col-md-6">
                <span v-if="listSaveQuote.loanAmount">{{listSaveQuote.loanAmount | formatMoney}}</span>
                <span v-else>-</span>
              </div>
            </div>
          </div>
          <div class="box__info__baht">
            <div class="row">
              <div class="col-md-6">
                <span class="text-bold">ค่างวดรายเดือน (บาท)</span>
              </div>
              <div class="col-md-6">
                <span v-if="listSaveQuote.monthlyInstallments">{{listSaveQuote.monthlyInstallments | formatMoney}}</span>
                <span v-else>-</span>
              </div>
            </div>
          </div>
        </div>
        <div class="save-quotes__item__box__button">
          <a class="button-item i-btn i-btn__primary" @click="fixQuote()">{{saveAQuoteField.RequestQuoteButtonTitle.value}}</a>
          <a class="button-item i-btn i-btn__primary btn-down-pdf" @click="downloadPDF(listSaveQuote)">{{saveAQuoteField.SaveAsPDFButtonTitle.value}}</a>
          <a class="button-item i-btn i-btn__primary" @click="routeToQuoteDealer()">{{saveAQuoteField.RequestQuoteToDealerButtonTitle.value}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetEndPoint } from '../../service/genericService';
import { mapActions } from 'vuex';
import { customMoney } from '../pipes/moneyPipe';
import { isDesktop } from '../../util/dom';
export default {
  name: 'SaveQuotesItem',
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    listSaveQuote: {
      type: Object,
      default: () => ({}),
    },
    saveAQuoteField : {
      type : Object
    }
  },
  data (){
    return {
      deleteQuoteTitle : ''
    }
  },
  methods: {
    ...mapActions('quotation', ['updateCarType']),
    ...mapActions('quotation', ['updateCarColorState']),
    ...mapActions('quotation', ['updateCarModelState']),
    ...mapActions('quotation', ['updateCarGradeState']),
    ...mapActions('quotation', ['updateCarInsuranceState']),
    ...mapActions('quotation', ['updateIsSendFromSaveQuote']),
    ...mapActions('quotation', ['updateModifyingQuote']),
    ...mapActions('quotation', ['updateStep']),
    ...mapActions('quotation', ['updateQuoteToDealerData']),
    ...mapActions('quotation', ['updatePaymentInfo']),
    ...mapActions('quotation', ['updateCurrentQuoteId']),
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
    deleteQuote(quote) {
      this.$emit('delete:quote', quote);
    },
    fixQuote() {
      // INFO: the order here matter because we clear the data after previous data update
      this.updateCarType(this.listSaveQuote.carType);
      this.updateCarModelState(this.listSaveQuote.carModel);
      this.updateCarGradeState(this.listSaveQuote.carGrade);
      this.updateCarColorState(this.listSaveQuote.carColor);
      this.updateCarInsuranceState(this.listSaveQuote.carInsurance);
      this.updatePaymentInfo({
        downPayment: this.listSaveQuote.downPayment,
        installmentPeriod: this.listSaveQuote.installmentPeriod,
        interestRate: this.listSaveQuote.interestRate,
        loanAmount: this.listSaveQuote.loanAmount,
        monthlyInstallments: this.listSaveQuote.monthlyInstallments,
      });
      this.updateIsSendFromSaveQuote(true);
      this.updateStep(4);
      this.updateCurrentQuoteId(this.listSaveQuote.id);
      this.updateModifyingQuote(true);
      if(this.saveAQuoteField?.RequestQuoteButtonLink?.value?.href?.length){
        this.$router.push(this.saveAQuoteField.RequestQuoteButtonLink.value.href);
      }
    },

    routeToQuoteDealer() {
      this.updateQuoteToDealerData(this.listSaveQuote);
      if(this.saveAQuoteField?.RequestQuoteToDealerButtonLink?.value?.href?.length){
        this.$router.push(this.saveAQuoteField.RequestQuoteToDealerButtonLink.value.href);
      }
    },
    downloadPDF(quote) {
      this.$emit('printQuote', {
        quote: quote,
        carImage: this.carImage,
      });
    },
    totalPrice(){
      let totalPrice = 0;
      if(this.listSaveQuote?.carGrade?.Price){
        totalPrice += Number(this.listSaveQuote?.carGrade?.Price);
      }
      if(this.listSaveQuote?.carColor?.price){
        totalPrice += Number(this.listSaveQuote?.carColor?.price);
      }
      if(this.listSaveQuote?.carInsurance?.price){
        totalPrice += Number(this.listSaveQuote?.carInsurance?.price);
      }
      return totalPrice;
    }
  },
  mounted (){
    this.deleteQuoteTitle = this.$getConst('DELETE_QUOTE_TITLE');
  },
  filters: {
    formatMoney: function(value) {
      return customMoney(value);
    },
  },
  computed: {
    carImage: function() {
      let carRotate =
        this.listSaveQuote.carColor.rotateImage &&
        this.listSaveQuote.carColor.rotateImage.length &&
        this.listSaveQuote.carColor.rotateImage[0];
      let carNormal = this.listSaveQuote.carGrade.Image
        ? this.listSaveQuote.carGrade.Image
        : this.listSaveQuote.carModel.Image;

      let carColor = this.listSaveQuote.carColor.Image
        ? this.listSaveQuote.carColor.Image
        : carNormal;

      return carRotate ? carRotate : carColor;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.save-quotes__item {
  &__delete {
    text-align: right;
    margin-bottom: 3px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 8px;
    }

    .delete-icon {
      cursor: pointer;

      &::after {
        content: '';
        display: inline-block;
        width: 13px;
        height: 13px;
        background: url('../../assets/icon-delete.svg') center no-repeat;
        background-size: contain;
        margin-left: 4px;
        transform: translateY(3px);

        @include media-breakpoint-up(lg) {
          width: 16px;
          height: 16px;
          margin-left: 7px;
        }
      }
    }
  }

  &__box {
    background: $white;

    @include media-breakpoint-up(lg) {
      border: 1px solid $gray-300;
    }

    &__image {
      padding: 0 0 15px;
      text-align: center;
      border-bottom: 1px solid $gray-300;

      @include media-breakpoint-up(lg) {
        padding: 0 0 20px;
      }

      .image {
        &__picture {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 96px;
          padding: 10px 10% 0;
          background-image: url('../../assets/bg-save-quote.jpg');

          @include media-breakpoint-up(sm) {
            height: 160px;
          }

          @include media-breakpoint-up(lg) {
            padding: 20px 15% 0;
            height: 196px;
          }

          img {
            width: 100%;
            height: 70%;
            object-fit: contain;
          }
        }

        &__title {
          padding-top: 25px;

          @include media-breakpoint-up(lg) {
            padding-top: 30px;
            font-size: 3rem;
          }
        }

        &__sub-title {
          font-size: $font-size-small;
          width: 100%;
          padding: 0 8px;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          @include media-breakpoint-up(md) {
            padding: 0 15px;
          }

          @include media-breakpoint-up(lg) {
            font-size: 1.9rem;
            padding: 0 20px;
            margin-bottom: 10px;
          }
        }
      }
    }

    &__info {
      font-size: $font-size-small;

      @include media-breakpoint-up(lg) {
        font-size: 1.9rem;
      }

      .box__info {
        &__detail {
          padding: 23px 15px 0;

          @include media-breakpoint-up(lg) {
            border-bottom: 1px solid $gray-300;
            padding: 25px 20px 16px;
          }

          .row {
            @include media-breakpoint-down(lg) {
              margin-bottom: 10px;
            }
          }
        }

        &__baht {
          padding: 0px 15px 25px;

          @include media-breakpoint-up(lg) {
            padding: 25px 20px 20px;
          }
        }
      }

      span {
        display: inline-block;
        margin-bottom: 0;

        @include media-breakpoint-up(lg) {
          margin-bottom: 7px;
        }
      }
    }

    &__button {
      padding: 0 6px 30px;

      @include media-breakpoint-up(xs) {
        padding: 0 15px 45px;
      }

      @include media-breakpoint-up(lg) {
        padding: 0 20px 45px;
      }

      .button-item {
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
        // border: 1px solid $gray-300;
        color: $primary-color; //INFO: Follow customer's required
        cursor: pointer;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;

        @include media-breakpoint-up(lg) {
          height: 45px;
          padding: 10px 50px;
        }

        &:last-child {
          margin-bottom: 0;
        }

        &:hover {
          color: $primary-color-activated;
        }
      }

      .btn-down-pdf {
        @include media-breakpoint-up(lg) {
          pointer-events: auto;
        }
      }
    }
  }
}

</style>
