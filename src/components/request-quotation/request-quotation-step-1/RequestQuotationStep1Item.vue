<template>
  <div class="col-6 col-md-3">
    <div class="quotation-car-type animated-on-scroll delay-500 fadeInRight" @click="selectPickupTruck()" :class="{'selected': carTypeIndex===carType.Id}">
      <div class="quotation-car-type__image">
        <img class="d-none d-sm-block" :src="imageEndPoint(carType.Image)" alt="image-car">
        <img class="d-sm-none" :src="imageEndPoint(carType.ImageSm)" alt="image-car">
      </div>
      <p class="quotation-car-type__name">{{carType.Title}}</p>
    </div>
  </div>
</template>

<script>
import EndPointMixin from '../../../mixin/endpoint-mixin';
export default {
  name: 'RequestQuotationStep1Item',
  mixins: [EndPointMixin],
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carType: Object,
    carTypeIndex: String,
  },
  data() {
    return {};
  },
  methods: {
    selectPickupTruck() {
      this.$emit('chooseCarType', this.carType);
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';
.quotation-car-type {
  cursor: pointer;
  height: 100%;
  max-height: 135px;
  overflow: hidden;
  padding: 15px 0 10px;
  margin-bottom: 15px;
  transition: box-shadow .2s ease-in-out;

  @include media-breakpoint-up(xs) {
    max-height: 147px;
    padding-top: 17px;
  }

  @include media-breakpoint-up(lg) {
    max-height: none;
    padding: 15px 0 10px;
  }

  &:hover {
    box-shadow: 0px 0px 10px 1px rgba(217,217,217,1);
    border-radius: 3px;

    @include media-breakpoint-up(lg) {
      box-shadow: none;
      border-radius: none;
    }

    .quotation-car-type__image {
      img {

        @include media-breakpoint-up(lg) {
          transform: scale(1.2);
        }
      }
    }

    .quotation-car-type__name {
      color: $red-hover-color;
    }
  }

  &.selected {
    box-shadow: 0px 0px 10px 1px rgba(217,217,217,1);
    border-radius: 3px;

    @include media-breakpoint-up(lg) {
      box-shadow: none;
      border-radius: none;
    }

    .quotation-car-type__image {
      img {

        @include media-breakpoint-up(lg) {
          transform: scale(1.2);
        }
      }
    }

    .quotation-car-type__name {
      color: $red-hover-color;
    }
  }

  &__image {
    width: 100%;
    height: 65px;
    padding: 0;

    @include media-breakpoint-up(xs) {
      height: 80px;
    }

    @include media-breakpoint-up(lg) {
      height: 130px;
      padding: 0 15px;
    }

    img {
      width: 100%;
      margin: 0 auto;
      transition: transform .5s ease;
    }
  }

  &__name {
    margin: 5px 0 10px;
    padding: 0 3px;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;

    @include media-breakpoint-up(xs) {
      margin: 5px 0 6px;
    }

    @include media-breakpoint-up(lg) {
      padding: 0 5px;
      margin: 10px 0 22px;
      text-align: center;
    }
  }
}
</style>
