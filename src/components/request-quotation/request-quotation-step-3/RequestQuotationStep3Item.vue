<template>
  <div class="col-6 col-md-3">
  <div class="choose-car-color__content__item animated-on-scroll delay-500 fadeInRight" :class="{'item-active' :isActive == carColor.Id}" @click="onCarColor(carColor)">
    <div class="icon-active">
      <img src="../../../assets/icon-check-choose-car.svg" alt="icon active">
    </div>
    <div class="choose-car-color__content__item__image" :style="getColor(carColor.ColorCode)">
    </div>
    <div class="choose-car-color__content__item__info">
      <span class="color-name">{{carColor.ColorName}}</span>
      <span class="color-name">{{carColor.Title}}</span>
      <span class="baht-bonus"> + {{carColor.ColorPrice | formatMoney}} บาท</span>
    </div>
  </div>
</div>
</template>

<script>
import { customMoney } from '../../pipes/moneyPipe';
import { getCarColor } from '../../../util/styleGradient';

export default {
  name: 'RequestQuotationStep3Item',
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carColor: {
      type: Object,
      default: () => ({}),
    },
    isActive: {
      type: String,
      required: true,
    },
  },
  methods: {
    onCarColor(carColor) {
      this.$emit('chooseCarColor', {
        Id: carColor.Id,
        price: carColor.ColorPrice,
        name: carColor.ColorName  || carColor.Title,
        rotateImage: carColor.RotateImage,
        Image: carColor.Image,
        ImageSm: carColor.ImageSm,
      });
    },

    getColor(color){
      return getCarColor(color)
    }
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

.choose-car-color__content__item {
  background: $white;
  padding: 10px 10px 3px;
  margin-bottom: 20px;
  border: 1px solid $gray-300;
  position: relative;
  cursor: pointer;
  transition: transform .75s ease;

  @include media-breakpoint-up(lg) {
    padding: 10px 10px 20px;
    margin-bottom: 30px;

    &:hover {
      transform: scale(1.1);
    }
  }


  &__image {
    margin-bottom: 10px;
    height: 100px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      background: url('../../../assets/color-step3.png');
      background-repeat: no-repeat;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-size: cover;
    }
    // img {
    //   width: 100%;
    //   transition: transform .5s ease;
    // }
  }

  &__info {
    .baht-bonus {
      opacity: 0;
      transition: all 0.25s ease;
    }

    span {
      display: block;
    }
  }

  .icon-active {
    display: none;
    position: absolute;
    top: -10px;
    right: -10px;
    z-index: 1;

    @include media-breakpoint-up(lg) {
      top: -15px;
      right: -15px;
    }

    img {
      width: 20px;
      height: 20px;

      @include media-breakpoint-up(lg) {
        width: 32px;
        height: 32px;
      }
    }
  }

  &.item-active {
    border: 1px solid $black;

    .icon-active {
      display: block;
    }

    .baht-bonus {
      opacity: 1;
    }
  }
  .color-name {
    font-size: $font-size-small;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-base;
    }
  }
}
</style>
