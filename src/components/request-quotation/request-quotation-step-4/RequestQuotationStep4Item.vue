<template>
  <div class="col-6 col-md-3">
    <div class="choose-insurance__item animated-on-scroll delay-500 fadeInRight" :class="isActive == carInsurance.Id ? 'item-active' : ''" @click="onCarInsurance(carInsurance)">
      <div class="choose-insurance__icon " v-show="isActive===carInsurance.Id" >
        <img src="../../../assets/icon-check-choose-car.svg" alt="">
      </div>
      <div class="choose-insurance__box">
        <div class="choose-insurance__box__heading">
          <span>{{carInsurance.Title}}</span>
        </div>
        <div class="choose-insurance__box__img">
          <img :src="imageEndPoint(carInsurance.Image)" alt="">
        </div>
        <div class="choose-insurance__box__detail">
          <p>{{carInsurance.ShortDescription}}</p>
        </div>
      </div>
      <div class="choose-insurance__see-more" @click.stop="showModal(carInsurance)">
        <span class="choose-insurance__see-more__details">ดูรายละเอียดเพิ่มเติม</span>
      </div>
    </div>
  </div>
</template>

<script>
import EndPointMixin from '../../../mixin/endpoint-mixin';
export default {
  name: 'RequestQuotationStep4Item',
  mixins: [EndPointMixin],
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carInsurance: {
      type: Object,
      default: () => ({}),
    },
    isActive: {
      type: String,
      required: true,
    },
  },
  methods: {
    onCarInsurance(carInsuranceVal) {
      this.$emit('chooseCarInsurance', {
        Id: carInsuranceVal.Id,
        title: carInsuranceVal.Title,
        price: carInsuranceVal.Price,
        Description: carInsuranceVal.Description,
      });
    },
    showModal(carInsuranceVal){
      this.$emit('clickShowModal', {
        Id: carInsuranceVal.Id,
        Description: carInsuranceVal.Description,
        Title: { value: carInsuranceVal.Title },
        ShortDescription: { value: carInsuranceVal.ShortDescription },
      });
    }
  },

}
</script>
<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';
.choose-insurance {
  .col-md-3 {
    margin-bottom: 10px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 0;
    }
  }
  &__item {
    height: auto;
    border: 1px solid $gray-300;
    position: relative;
    background-color: $white;
    transition: transform .75s ease;
    cursor: pointer;

    @include media-breakpoint-up(lg) {
      margin-bottom: 28px;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  &__icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 3px;
    right: 5px;
    transition: all .5s ease-in-out;
    border-radius: 50px;

    @include media-breakpoint-up(lg) {
      width: 32px;
      height: 32px;
      top: -15px;
      right: -12px;
    }

  }

  &__box {
    padding: 5px 5px;

    @include media-breakpoint-up(lg) {
      padding: 15px 10px 15px;
    }


    &__heading {
      @include media-breakpoint-down(md) {
        font-size: $font-size-small;
      }
    }

    &__img {
      padding: 5px 0 10px 0;

      @include media-breakpoint-up(lg) {
        padding: 10px 0 13px 0;
      }

      img {
        width: 100%;
      }
    }

    &__detail {
      margin-bottom: 10px;

      @include media-breakpoint-down(md) {
        font-size: $font-size-small;
      }

      @include media-breakpoint-up(lg) {
        margin-bottom: 0;
      }

      p {
        // TODO: check our postcss
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  &__see-more {
    border-top: 1px solid $gray-300;
    padding: 8px 12%;

    @include media-breakpoint-up(xs) {
      padding: 8px 18%;
    }
    @include media-breakpoint-up(lg) {
      padding: 8px 50px;
    }

    &__details {
      position: relative;

      @include media-breakpoint-down(lg) {
        font-size: $font-size-small;
      }

      &:after {
        content: "";
        width: 16px;
        height: 16px;
        background: url('../../../assets/icon-choose-insurance.svg') no-repeat;
        background-size: contain;
        margin-left: 7px;
        position: absolute;
        top: 0;
        right: -20px;

        @include media-breakpoint-up(xl) {
          top: 5px;
        }
      }
    }
  }

  .item-active {
    border: 1px solid $black;

  }
}
</style>

