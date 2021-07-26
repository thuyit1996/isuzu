<template>
  <div class="choose-car__item animated-on-scroll fadeInRight" @click="onCarModel(carGrade)" :class="{'selected': carModelIndex===carGrade.Id}">
    <div class="choose-car__icon ">
      <img src="../../../assets/icon-check-choose-car.svg" alt="#">
    </div>
    <div class="choose-car__icon-empty">
      <img src="../../../assets/icon-check-choose-car-emty.svg" alt="#">
    </div>
    <div class="choose-car__vehicle--mobile">
      <div class="row">
        <div class="col-7">
          <div class="choose-car__vehicle__heading">
            <span class="choose-car__vehicle__type__title">อีซูซุดีแมคซ์</span>
            <h4 class="choose-car__vehicle__type">{{this.$parent.$parent.carModel.Title}}</h4>
          </div>
          <div class="choose-car__vehicle__heading">
            <h4 class="choose-car__vehicle__model">{{carGrade.Title}}</h4>
          </div>
          <div class="choose-car__vehicle__content">
            <span class="choose-car__vehicle__price__title">ราคา</span>
            <h4 class="choose-car__vehicle__price">{{carGrade.Price | formatMoney}} บาท</h4>
          </div>
        </div>
        <div class="col-5">
          <div class="choose-car__vehicle__img">
            <img :src="imageEndPoint(carGrade.ImageSm)" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="choose-car__vehicle">
      <div class="choose-car__box--primary">
        <div class="choose-car__vehicle__img">
          <img :src="imageEndPoint(carGrade.Image)" alt="">
        </div>
        <div class="choose-car__vehicle__heading">
          <span class="choose-car__vehicle__type">อีซูซุมิว-เอ็กซ์</span>
          <h4 class="choose-car__vehicle__type">{{this.$parent.$parent.carModel.Title}}</h4>
        </div>
      </div>
      <div class="choose-car__box--secondary">
        <div class="choose-car__vehicle__heading">
          <span class="choose-car__vehicle__model">รุ่นรถยนต์</span>
          <h4 class="choose-car__vehicle__model">{{carGrade.Title}}</h4>
        </div>
        <div class="choose-car__vehicle__heading heading-price">
          <span class="choose-car__vehicle__price">ราคา</span>
          <h4 class="choose-car__vehicle__price">{{carGrade.Price | formatMoney}} <span class="price-unit"> บาท</span></h4>
        </div>
      </div>
    </div>
    <div class="choose-car__pane" role="tablist">
      <b-card no-body class="choose-car__card">
        <b-card-header header-tag="header" class="choose-car__card__header" role="tab">
          <div href="#" class="choose-car__button collapsed" v-b-toggle="'accordion-' + carGrade.Id" variant="info">ดูรายละเอียดเพิ่มเติม</div>
        </b-card-header>
        <b-collapse class="choose-car__card__body" accordion="my-accordion" role="tabpanel" :id="'accordion-' + carGrade.Id">
          <div class="choose-car__content">
            <div v-html='carGrade.Description'></div>
            <!-- INFO: don't remove this comment, this is default template for the description -->
            <!-- <span class="choose-car__content__header">รายละเอียดรถยนต์</span>
            <ul class="choose-car__content__wrap">
              <li class="choose-car__content__detail">เครื่องยนต์ 2,999ซีซี</li>
              <li class="choose-car__content__detail">กำลังสูงสุด 140 (190)/3,600 กิโลวัตต์(แรงม้า)/รอบต่อนาที</li>
              <li class="choose-car__content__detail">เกียร์ธรรมดา 6จังหวะ</li>
              <li class="choose-car__content__detail">ความจุกระบอกสูบ (ซีซี) 2,999</li>
              <li class="choose-car__content__detail">ความกว้างกระบอกสูบ x ช่วงชัก (มม.) 95.4 x 104.9</li>
              <li class="choose-car__content__detail">อัตราส่วนกำลังอัด (ต่อ 1) 16.3</li>
            </ul> -->
          </div>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import { customMoney } from '../../pipes/moneyPipe';
import EndPointMixin from '../../../mixin/endpoint-mixin';
export default {
  name: 'RequestQuotationStep2Item',
  mixins: [EndPointMixin],
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carGrade: {
      type: Object,
      default: () => ({}),
    },
    isActive: {
      type: String,
      required: true,
    },
    carModelIndex: {
      type: String,
    },
  },
  methods: {
    onCarModel(carModelVal) {
      this.$emit('chooseCarModel', carModelVal);
    },
  },
  filters: {
    formatMoney: function(value) {
      return customMoney(value);
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';
.choose-car {
  &__item {
    height: auto;
    border: 1px solid $gray-300;
    position: relative;
    margin-bottom: 10px;
    cursor: pointer;

    @include media-breakpoint-up(md) {
      margin-bottom: 20px;
    }

    &.selected {
      border: 1px solid $black;

      .choose-car__icon {
        display: block;
      }

      .choose-car__icon-empty {
        display: none;
      }
    }
  }

  &__icon {
    display: none;
    width: 22px;
    height: 22px;
    position: absolute;
    top: -8px;
    right: -10px;
    transition: all .5s ease-in-out;

    @include media-breakpoint-up(md) {
      top: -11px;
      right: -11px;
    }

    @include media-breakpoint-up(lg) {
      width: 35px;
      height: 35px;
      top: -15px;
      right: -15px;
    }
  }

  &__icon-empty {
    display: inline-block;
    width: 24px;
    height: 24px;
    position: absolute;
    top: -8px;
    right: -10px;
    transition: all .5s ease-in-out;

    @include media-breakpoint-up(md) {
      top: -12px;
      right: -12px;
    }

     @include media-breakpoint-up(lg) {
      width: 42px;
      height: 41px;
      top: -15px;
      right: -18px;
    }
  }

  &__vehicle {
    display: none;
    padding: 15px 0;
    background: $white;

    @include media-breakpoint-up(md) {
      display: flex;
      // height: 131px;
    }

    &__img {
      max-width: 60%;
      margin: 5px 0 0 50px;

      @include media-breakpoint-up(md) {
        display: flex;
        align-items: center;
        max-width: 40%;
        margin: 0;
        width: 110px;
      }

      @include media-breakpoint-up(lg) {
        width: 175px;
      }
    }

    &__heading {
      &:first-child {
        padding: 0;

        @include media-breakpoint-up(md) {
          width: 200px;
        }

        @include media-breakpoint-up(lg) {
          padding: 0 10px 0 65px;
          width: 355px;
        }

        @include media-breakpoint-up(xl) {
          padding: 0 10px 0 75px;
          width: 410px;
        }
      }

      &:last-child {
        margin-left: 0;

        @include media-breakpoint-up(md) {
          margin: 0 10px 0 50px;
        }
      }
    }

    &__type {
      margin: 0; //INFO: according to design

      @include media-breakpoint-down(md) {
        font-size: 2.4rem;
      }

      &__title {
        @include media-breakpoint-down(lg) {
          font-size: $font-size-small;
        }
      }
    }

    &__model {
      @include media-breakpoint-down(md) {
        font-size: $font-size-small;
        line-height: 1; //INFO: according to design
        margin: 0; //INFO: according to design
      }
    }

    &__price {
      @include media-breakpoint-down(md) {
        font-size: $font-size-small;
        line-height: 1; //INFO: according to design
        margin: 0; //INFO: according to design
      }

      &__title {
        @include media-breakpoint-down(md) {
          font-size: $font-size-small;
          margin-right: 2px;
        }
      }
    }

    &__content {
      display: flex;
    }
  }

  &__vehicle--mobile {
    display: block;
    background-color: $white;
    padding: 10px 10px 5px;
    line-height: 1; //INFO: according to design

    @include media-breakpoint-up(md) {
      display: none;
    }
  }

  $box-secondary-width: 610px;
  $box-secondary-width-lg: 500px;
  $box-secondary-width-md: 400px;
  &__box--primary {
    display: flex;
    justify-content: center;
    padding: 0 15px;

    @include media-breakpoint-up(md) {
      width: calc(100% - #{$box-secondary-width-md});
    }

    @include media-breakpoint-up(lg) {
      padding: 15px 30px 0 30px;
      width: calc(100% - #{$box-secondary-width-lg});
    }

    @include media-breakpoint-up(xl) {
      padding-top: 20px;
      width: calc(100% - #{$box-secondary-width});
    }
  }

  &__box--secondary {
    display: flex;
    justify-content: center;
    padding: 0 15px 0 0;
    border-left: 1px solid $gray-300;

    @include media-breakpoint-up(md) {
      width: $box-secondary-width-md;
    }

    @include media-breakpoint-up(lg) {
      padding: 0;
      padding-top: 15px;
      width: $box-secondary-width-lg;
    }

    @include media-breakpoint-up(xl) {
      padding-top: 20px;
      width: $box-secondary-width;
    }
  }

  &__button {
    @include media-breakpoint-down(md) {
      font-size: $font-size-small;
    }

    &:after {
      content: '';
      width: 10px;
      height: 10px;
      background: url('../../../assets/arrow-down.svg') center no-repeat;
      background-size: contain;
      margin-left: 7px;
      position: absolute;
      top: 9px;
      transition: all .2s ease-in-out;
      transform: rotate(180deg);

      @include media-breakpoint-up(md) {
        top: 13px;
      }

      @include media-breakpoint-up(lg) {
        width: 16px;
        height: 16px;
        top: 15px;
      }
    }

    &.collapsed {
      &:after {
        transform: rotate(0deg);
      }
    }
  }

  &__content {
    padding: 5px 0 15px 30px;

    @include media-breakpoint-up(md) {
      padding: 20px 0 55px 110px;
    }

    @include media-breakpoint-down(sm) {
      font-size: $font-size-small //INFO : follow font-size of design
    }

    &__wrap {
      margin-top: 5px;

      @include media-breakpoint-up(md) {
        margin-top: 20px;
      }
    }

    &__header {
      @include media-breakpoint-down(lg) {
        font-size: $font-size-small;
      }
    }

    &__detail {
      padding-bottom: 10px;
      position: relative;

      @include media-breakpoint-down(lg) {
        font-size: $font-size-small;
      }

      @include media-breakpoint-up(md) {
        padding-bottom: 20px;
      }

      &::before {
        position: absolute;
        background-image: url('../../../assets/dot-choose-car.svg');
        content: "";
        background-position: center;
        background-repeat: no-repeat;
        height: 5px;
        width: 5px;
        top: 6px;
        left: -10px;

        @include media-breakpoint-up(md) {
          height: 7px;
          width: 7px;
          top: 11px;
          left: -15px;
        }
      }
    }
  }

  .card {
    border: none;
    border-top: 1px solid rgba(0,0,0,0.125);
  }

  .card-header {
    border-bottom: none;
    background-color: $white;
    text-align: center;
    padding: 5px 0;

    @include media-breakpoint-up(md) {
      padding: 9px 0;
    }
  }

  .title {
    font-size: 2.4rem;
  }

  .price-unit {
    font-size: $font-size-mobile;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-base;
    }
  }

  .heading-price {

    @include media-breakpoint-up(md) {
      width: 78px;
    }

    @include media-breakpoint-up(lg) {
      margin: 0 5px;
      width: 160px;
    }

    @include media-breakpoint-up(xl) {
      margin: 0 20px;
    }
  }
}
</style>
