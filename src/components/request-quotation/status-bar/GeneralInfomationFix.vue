<template>
  <div class="general-infomation-fix-wrap" :class="{'sticky': isSticky}">
      <div class="container">
        <div class="general-infomation-fix">
          <div class="general-infomation-fix__infor">
            <div class="type-group general-infomation-fix__infor__img animated" :class="animated ? 'fadeInRight' : ''">
              <img v-if="carImage" class="d-none d-sm-block" :src="imageEndPoint(carImage)" alt="x">
              <img v-if="carImageSm" class="d-sm-none" :src="imageEndPoint(carImageSm)" alt="x">
            </div>
            <div class="type-group general-infomation-fix__infor__name">
              <div class="name-type">{{fixData.carType}}</div>
              <div class="strong-text name-cross">{{fixData.carModel.Title}}</div>
            </div>
            <div class="type-group general-infomation-fix__infor__carType">{{fixData.carGrade.Title}}</div>
          </div>

          <div class="type-group general-infomation-fix__price" v-if="isModelSelected">
            <span>ราคา</span>
            <span class="strong-text">{{fixData.allPrice | formatMoney}}</span>
            <span>บาท</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { customMoney } from '../../pipes/moneyPipe';
import EndPointMixin from '../../../mixin/endpoint-mixin';
export default {
  name: 'GeneralInfomationFix',
  mixins: [EndPointMixin],
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    isSticky: Boolean,
    fixData: {},
  },
  data() {
    return {
      animated: true,
    }
  },
  methods: {
    toggleAnimation() {
      this.$nextTick(() => {
        this.animated = false;
        setTimeout(() => {
          this.animated = true;
        });
      });
    },
  },
  computed: {
    carImage: function() {
      let carRotate =
        this.fixData.carColor.rotateImage &&
        this.fixData.carColor.rotateImage.length &&
        this.fixData.carColor.rotateImage[0];
      let carModelOrGrade = this.fixData.carGrade.Image
        ? this.fixData.carGrade.Image
        : this.fixData.carModel.Image;
      let carNormal = this.fixData.carColor.Image ? this.fixData.carColor.Image : carModelOrGrade;
      this.toggleAnimation();
      return carRotate ? carRotate : carNormal;
    },
    // INFO: don't display image on mobile, if it does, then copy logic from line 58
    carImageSm: function() {
      return this.fixData.carGrade.ImageSm
        ? this.fixData.carGrade.ImageSm
        : this.fixData.carModel.ImageSm;
    },
    isModelSelected() {
      return this.fixData.carModel.Id;
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
@import '../../../assets/reuse-mixin.scss';

.type-group {
  vertical-align: bottom;
  display: flex;
  text-align: left;
  justify-content: center;

  @include media-breakpoint-up(lg) {
    margin: 0 15px;
  }
}

.general-infomation-fix-wrap {
  background-color: $black;
  height: 45px;

  @include media-breakpoint-up(lg) {
    height: 90px;
  }
}

.general-infomation-fix {
  padding: 2px 0;
  color: $white;
  font-size: $font-size-small;
  display: flex;
  justify-content: space-between;

  @include media-breakpoint-up(lg) {
    padding-left: 70px;
    font-size: $font-size-base;
  }

  @include media-breakpoint-up(xl) {
    padding: 0 96px;
  }

  .strong-text {
    font-size: 2.4rem;
    line-height: 2.4rem; //INFO: Line-height follow as the design

    @include media-breakpoint-up(lg) {
      font-size: 3.6rem;
      line-height: 3.6rem; //INFO: Line-height follow as the design
    }
  }

  &__infor {
    display: flex;
    justify-content: flex-start;
    flex-grow: 2;
    overflow: hidden;

    &__img {
      display: none;

      @include media-breakpoint-up(lg) {
        display: flex;
        align-items: center;
        width: 175px;
        height: 90px;

        img {
          max-height: 80px;
        }
      }
    }

    &__name {
      flex-direction: column;
      width: 45%;

      @include media-breakpoint-up(md) {
        width: fit-content;
        max-width: 70%;
        margin-right: 35px;
      }

      @include media-breakpoint-up(lg) {
        margin: 0 20px 0 0;
        max-width: 50%;
      }

      @include media-breakpoint-up(xl) {
        margin: 0 30px 0 15px;
      }

      // @include media-breakpoint-up(lg) {
      //   width: 40%;
      // }

      // @include media-breakpoint-up(xl) {
      //   width: 37%;
      // }

      .name-type {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
      }

      .name-cross {
        max-width: 100%;
        height: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: -3px;

        @include media-breakpoint-up(md) {
          width: 100%;
          max-width: 100%;
        }
      }
    }

    &__carType {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 6px 3px 0 0;
      padding: 0 5px 0 3px;

      @include media-breakpoint-up(xs) {
        margin-right: 0;
      }

      @include media-breakpoint-up(lg) {
        display: block;
        margin: 46px 3px 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  &__price {
    margin-right: 0;
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    margin-left: -10px;

    @include media-breakpoint-up(xs) {
      margin-left: 0;
    }

    @include media-breakpoint-up(lg) {
      margin-top: 40px;
    }

    span {
      margin-right: 2px;
      margin-top: 5px;

      &:last-child {
        margin-right: 0;
      }

      @include media-breakpoint-up(xs) {
        margin-right: 5px;
      }

      @include media-breakpoint-up(lg) {
        margin-right: 8px;
      }
    }

    span.strong-text {
      margin: 0 2px 5px 0;

      @include media-breakpoint-up(xs) {
        margin-right: 5px;
      }
    }
  }
}
</style>
