<template>
  <div class="calculation">
    <div class="container">
      <div class="calculation__heading text-center">
        <sc-text tag="h2" class="isu-title" :field="stepModel.Steps[4].fields.Title" />
      </div>
      <div class="calculation__content">
        <div class="calculation__content__car-type flex-justify-between">
          <h4 class="calculation__content__car-type__name">
            <span>{{summaryData.carModel.Title}} </span>
            <span>{{summaryData.carGrade.Title}}</span>
          </h4>
          <span class="calculation__content__car-type__estimated-result d-none d-sm-block">Estimated Result (Approximate)</span>
        </div>
        <div class="calculation__content__total-payment flex-justify-between">
          <div class="calculation__content__total-payment__title">
            <span class="total-payment__title__text">Total payment (incl tax)</span>
            <div class="total-payment__title__icon">
              <div class="icon-title icon-title--big">
                <span>A</span>
              </div>
              <span class="plus"> + </span>
              <div class="icon-title icon-title--big">
                <span>B</span>
              </div>
            </div>
          </div>
          <span class="calculation__content__total-payment__value">{{totalPriceWithInsurance | formatMoney}}</span>
        </div>
        <div class="calculation__content__sub-total">
          <div class="row">
            <div class="col-sm-6">
              <div class="calculation__content__sub-total__item">
                <div class="sub-total__summary flex-justify-between">
                  <div class="sub-total__summary__title">
                    <div class="sub-total__summary__title__icon icon-title">
                      <span>A</span>
                    </div>
                    <span class="sub-total__summary__title__text">Total car price (Baht)</span>
                  </div>
                  <span class="sub-total__summary__value">{{totalPriceAfterTax | formatMoney}}</span>
                </div>
                <div class="sub-total__detail flex-justify-between">
                  <span class="sub-total__detail__title">Car Price</span>
                  <span class="sub-total__detail__value">{{totalPrice | formatMoney}} </span>
                </div>
                <div class="sub-total__detail flex-justify-between">
                  <span class="sub-total__detail__title">Tax 10%</span>
                  <span class="sub-total__detail__value">{{totalPriceTax | formatMoney}}</span>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="calculation__content__sub-total__item">
                <div class="sub-total__summary flex-justify-between">
                  <div class="sub-total__summary__title">
                    <div class="sub-total__summary__title__icon icon-title">
                      <span>B</span>
                    </div>
                    <span class="sub-total__summary__title__text">Total Insurance Package (Baht)</span>
                  </div>
                  <span class="sub-total__summary__value">{{summaryData.carInsurance.price | formatMoney}}</span>
                </div>
                <div class="sub-total__detail flex-justify-between">
                  <span class="sub-total__detail__title">Insurance package 1</span>
                  <span class="sub-total__detail__value">{{summaryData.carInsurance.price | formatMoney}} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { customMoney } from '../../pipes/moneyPipe';
export default {
  name: 'Calculation',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    summaryData: {},
    stepModel: Object,
  },
  computed: {
    totalPrice: function() {
      // INFO: requirement change, we don't include insurance into based price
      // return (parseInt(this.summaryData.totalPrice ? this.summaryData.totalPrice : 0) + parseInt(this.summaryData.carInsurance.price ? this.summaryData.carInsurance.price : 0)) * 0.9;
      return parseInt(this.summaryData.totalPrice ? this.summaryData.totalPrice : 0) * 0.9;
    },
    totalPriceTax: function() {
      return parseInt(this.summaryData.totalPrice ? this.summaryData.totalPrice : 0) * 0.1;
    },
    totalPriceAfterTax: function() {
      return this.totalPrice + this.totalPriceTax;
    },
    totalPriceWithInsurance: function() {
      return (
        this.totalPriceAfterTax +
        parseInt(this.summaryData.carInsurance.price ? this.summaryData.carInsurance.price : 0)
      );
    },
  },
  filters: {
    formatMoney: function(value) {
      return customMoney(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/reuse-mixin';

.calculation {
  background: #f5f5f5;
  padding: 85px 0 25px;

  @include media-breakpoint-up(lg) {
    padding: 155px 0 70px;
  }

  &__heading {
    padding-bottom: 37px;

    @include media-breakpoint-up(lg) {
      padding-bottom: 45px;
    }
  }

  &__content {
    &__car-type {
      padding-bottom: 0;
      border-bottom: $gray-800 1px solid;

      @include media-breakpoint-up(lg) {
        padding-bottom: 12px;
      }

      &__name {
        @include media-breakpoint-down(lg) {
          font-size: 2.4rem; //INFO: Because fontsize in mobile design is smaller than typography, I use media-breakpoint-down here!
        }
      }
    }

    &__total-payment {
      padding: 15px 0;
      align-items: center;
      border-bottom: $gray-300 1px solid;
      font-weight: bold;

      @include media-breakpoint-up(lg) {
        padding: 18px 0 28px;
      }

      &__value {
        @include media-breakpoint-up(lg) {
          font-size: 3rem;
          margin-top: 10px;
        }
      }
    }

    &__sub-total {
      &__item {
        padding-top: 12px;
        margin-bottom: 20px;

        @include media-breakpoint-up(lg) {
          padding-top: 22px;
          margin-bottom: 0;
        }
      }
    }
  }

  .col-sm-6 {
    &:last-child {
      .calculation__content__sub-total__item {
        margin-bottom: 0;
      }
    }
  }

  .total-payment {
    &__title {
      &__text {
        @include media-breakpoint-up(lg) {
          font-size: 3rem;
        }
      }

      &__icon {
        display: flex;
        align-items: center;
        margin-top: 5px;
      }
    }
  }

  .sub-total {
    &__summary {
      padding-bottom: 12px;
      margin-bottom: 10px;
      font-weight: bold;
      border-bottom: $gray-300 1px solid;

      @include media-breakpoint-up(lg) {
        padding-bottom: 18px;
        margin-bottom: 18px;
      }

      &__title {
        display: flex;
        align-items: center;

        &__text {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }

    &__detail {
      padding: 5px 0;

      @include media-breakpoint-up(lg) {
        padding: 10px 0;
      }
    }
  }

  .icon-title {
    width: 15px;
    height: 15px;
    background: $white;
    border-radius: 50%;
    border: 1px solid $gray-800;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $black;

    @include media-breakpoint-up(lg) {
      width: 23px;
      height: 23px;
    }

    @include media-breakpoint-down(lg) {
      font-size: $font-size-small;
    }

    &--big {
      @include media-breakpoint-up(lg) {
        width: 30px;
        height: 30px;
        font-size: 3rem;
      }
    }
  }

  .plus {
    display: inline-block;
    margin: 0 4px;

    @include media-breakpoint-up(lg) {
      margin: 0 7px;
      font-size: 3rem;
    }
  }

  .flex-justify-between {
    display: flex;
    justify-content: space-between;
  }
}
</style>
