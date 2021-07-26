<template>
  <div class="compare-model animated" :class="modifyClass" v-animate-onscroll="'fadeInUp-big'">
    <div class="compare-model__wrap container no-front-rear-image">
      <picture>
        <!-- <source media="(min-width: 1024px)" srcset="../../assets/bg-compare-car-desktop-new.jpg">
        <img class="compare-model__bgr" src="../../assets/bg-compare-car-mobile-new.jpg" alt="x"> -->
        <sc-image :media="fields.BackgroundImage" class="d-none d-lg-block compare-model__bgr"/>
        <sc-image v-if="!isEditing" :media="fields.MediumBackgroundImage" class="d-none d-md-block d-lg-none compare-model__bgr"/>
        <sc-image v-if="!isEditing" :media="fields.SmallBackgroundImage" class="d-lg-none d-md-none compare-model__bgr"/>
      </picture>
      <div class="compare-model-bgr-car">
        <div class="compare-model__heading">
          <div class="container">
            <!-- <h2 class="compare-model__heading__title isu-title--underline">LINEUP</h2> -->
            <sc-rich-text tag="div" :field="fields.Title" />
            <!-- <h3 class="compare-model__heading__subtitle isu-subtitle">เลือกความรู้สึกที่เป็นคุณได้มากกว่า...</h3>
            <p class="compare-model__heading__desc isu-description d-none d-lg-block">กับ ISUZU MU-X เครื่องยนต์ 1.9 หรือ 3.0 Ddi Blue Power</p> -->
            <sc-rich-text tag="div" :field="fields.Description" />
          </div>
        </div>
        <div ref="movedCar" class="container no-pd-container-mb">
          <div class="compare-model__car">
            <img :src="imageEndPoint(activeImage)" alt="compare-model-car">
          </div>
        </div>
      </div>
    </div>
    <div class="container container-extra compare-model__panel">
      <div class="row">
        <div class="col-lg-6 compare-panel">
          <div class="compare-model-box">
            <div class="select-color">
              <div class="compare-model__panel__color">
                <div class="panel-list">
                  <div class="panel-list__item" :class="[((carColorIndex === index ? 'active' : '') + ' item-'+index), item.className]" :key="item.Id" v-for="(item, index) in getCarGrade.Colors">
                    <span class="panel-list__item__tooltip">{{item.ColorName || item.Title}}</span>
                    <div class="panel-list__item__color" :class="item.className" @click="changeColorWrapper(item, index)"></div>
                  </div>
                </div>
              </div>
              <div class="compare-model__panel__title">
                <div class="panel-title-wrap">
                  <span class="panel-icon-color" :style="{color: activeColor}">
                  </span>
                  <span class="panel-title">{{getCarGrade.Colors[carColorIndex] && getCarGrade.Colors[carColorIndex].ColorName}}</span>
                </div>
              </div>
            </div>
            <div class="select-list" v-if="!isHideGrade">
              <!-- <isu-select
              :textLable="''"
              :valSelect="car1Value"
              :placeholder="'Select car'"
              :listOptions="listCars"
              :nameSelect="'car1Value'"
              @onChangeSelect="getCarSelected">
              </isu-select> -->
              <isu-select-option-mux 
                v-if="detectMobile === true || detectTablet === true"
                :valSelect="car1Value" 
                :placeholder="'Select car'" 
                :nameSelect="'car1Value'" 
                :listOptions="listCars"
                @onChangeSelect="getCarSelected"
              >
              </isu-select-option-mux>
              <isu-select-custom
                v-else
                :valSelect="car1Value"
                :placeholder="'Select car'"
                :listOptions="listCars"
                :nameSelect="'car1Value'"
                @onChangeSelect="getCarSelected"
              >
              </isu-select-custom>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

</template>
<script>
import $ from 'jquery';
import { Text, RichText, Image } from '@sitecore-jss/sitecore-jss-vue';
import IsuSelect from '../shared/IsuSelect';
import IsuSelectCustom from '../shared/IsuSelectCustom';
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';
import { findClassByColor, getCarGrade } from './compareCarModelService';
import { GetEndPoint } from '../../service/genericService';
import { isMobile, isTablet } from '../../util/dom';
const DEFAULT_SELECTION = 0;

export default {
  name: 'CarSelection',
  components: {
    ScText: Text,
    ScRichText: RichText,
    IsuSelect: IsuSelect,
    ScImage: Image,
    IsuSelectCustom: IsuSelectCustom,
    IsuSelectOptionMux: IsuSelectOptionMux,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    modifyClass: {
      type: String,
    }
  },
  data() {
    return {
      car1Value: {},
      getCarGrade: {
        Colors: [],
      },
      listCars: [
      ],
      carColorIndex: 0,
      activeColor: '',
      activeImage: '',
      carGradeList: [],
      carGradeLeft: {
        Colors: [],
      },
      isHideGrade: false,
      isEditing: false,
      deviceType: 3,
      detectMobile: undefined,
      detectTablet: undefined,
    };
  },
  methods: {
    changeColorWrapper(color, colorIndex) {
      this.carColorIndex = colorIndex;
      this.activeColor = color.ColorCode;
      this.activeImage = color.Image;
    },
    getCarSelected(item) {
      let fallbackGrade = {
        Colors: [],
      };
      this.getCarGrade =
        this.carGradeList.find((cargrade) => {
          return cargrade.Id == item.value.id;
        }) || fallbackGrade;
      this.resetDefaultColor();
      this.findCarColorIndex(this.getCarGrade.CarColorDefaultLeft, this.getCarGrade.Colors);
      this.getClassByColorLeft();
    },
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
    resetDefaultColor() {
      if (this.getCarGrade.Colors.length) {
        this.changeColorWrapper(this.getCarGrade.Colors[DEFAULT_SELECTION], DEFAULT_SELECTION);
      }
    },
    getClassByColorLeft(){
      this.getCarGrade.Colors.forEach(item => {
        item.className = findClassByColor(item.ColorCode);
      });
    },

    findCarColorIndex(colorLeft, colorList){
      let index = (colorList || []).findIndex((item) => item.Id === colorLeft);
      if (index === -1) {
        index = 0;
      }
      this.carColorIndex = index;
      this.activeImage = colorList[index]?.Image;
      this.activeColor = colorList[index]?.ColorCode;
    },
  },
  mounted () {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.detectTablet = isTablet(this.deviceType);
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    let carModelId = this.$jss.routeData()?.fields.CarModel.id;
    this.isHideGrade = this.fields?.IsHideGrade?.value || false;
    getCarGrade(carModelId).then(res => {
      this.carGradeList = res?.data?.Records || [];
      let defaultLeft = res?.data?.CarGradeDefaultLeft;
      let defaultIndex = (this.carGradeList || []).findIndex(item => item.Id === defaultLeft);
      this.listCars = this.carGradeList.map(cargrade => {
        return {
          label: cargrade.Title,
          id: cargrade.Id
        }
      });
      if (defaultIndex === -1) {
        defaultIndex = 0;
      }
      this.getCarGrade = this.carGradeList[defaultIndex];
      this.car1Value = this.listCars[defaultIndex];
      this.resetDefaultColor();
      this.findCarColorIndex(
        this.carGradeList[defaultIndex]?.CarColorDefaultLeft,
        this.carGradeList[defaultIndex]?.Colors
      );
      this.getClassByColorLeft();
    })
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.compare-model {
  text-align: center;
  position: relative;
  z-index: $COMPARE_CAR_MODAL_ZINDEX;
  font-family: $font-family-eurothai;

  @include media-breakpoint-up(lg) {
    padding: 50px 0 0;
  }

  &__heading {
    padding: 33px 0 0;

    @include media-breakpoint-up(lg) {
      padding: 50px 0 0;
    }

    .isu-title--underline {
      margin-bottom: 15px;
      &:after {
        margin: 0 auto;
      }
    }
  }

  &__wrap {
    position: relative;
    // INFO: padding-top based on customer site
    // padding: calc(.97087vw + 16.35922px) 0 0 0;
    padding: 0;

    @include media-breakpoint-up(md) {
      // padding: calc(.97087vw + 16.35922px) 0 0 0;
    }

    @include media-breakpoint-down(md) {
      max-width: 100%;
    }

    picture {
      position: absolute;
      left: 0;
      display: block;
      width: 100%;

      @include media-breakpoint-up(lg) {
        padding: 0 15px;
      }

      img {
        width: 100%;
        height: auto;

        @include media-breakpoint-up(md) {
          max-height: 430px;
        }
      }
    }
  }

  &__bgr {
    width: 100%;

    &::selection {
      background: none;
    }
  }

  &__car {
    width: 100%;
    position: relative;

    @include media-breakpoint-up(lg) {
      padding: 0 5px;
    }

    @include media-breakpoint-up(xl) {
      padding: 0 85px;
    }

    &.active-interior {
      @include media-breakpoint-up(lg) {
        margin: 0 auto;
        max-width: 860px;
        padding: 0;
      }
    }
  }

  &__picture {
    position: relative;
  }

  &__panel {
    margin-top: 5px;

    @include media-breakpoint-up(md) {
      margin-top: 10px;
    }

    @include media-breakpoint-up(lg) {
      margin-top: 0;
    }

    &__color {
      position: relative;
      padding: 0 70px;

      @include media-breakpoint-up(sm) {
        padding: 0 20px;
      }

      @include media-breakpoint-up(lg) {
        padding: 0;
      }
    }

    &__title {
      padding: 20px 10px 20px;

      @include media-breakpoint-up(sm) {
        padding: 20px 0 20px;
        font-size: 1.7rem;
      }

      @include media-breakpoint-up(lg) {
        font-size: $font-size-base;
        text-align: center;
        padding: 25px 0 15px 0;
      }
    }

    .compare-panel {
      position: relative;
      margin: 0 auto;
    }
  }

  $select-list-z-index: 1;
  $select-color-z-index: 0;

  .select-list {
    padding-bottom: 0;
    position: relative;
    z-index: $select-list-z-index;
    border-top: 1px solid #ccc;

    @include media-breakpoint-up(lg) {
      padding-bottom: 15px;
    }

    @include media-breakpoint-up(xl) {
      width: 52%;
    }

    &__title {
      text-align: left;
      padding: 15px 0 0 15px;
      font-size: 16px;

      @include media-breakpoint-up(lg) {
        display: none;
      }
    }
  }

  .select-color {
    order: 2;
    position: relative;
    z-index: $select-color-z-index;

    @include media-breakpoint-up(lg) {
      order: 1;
      margin-top: 10px;
    }

    @include media-breakpoint-up(xl) {
      width: 70%;
    }
  }

  .compare-model-bgr-car {
    position: relative;
    z-index: 1;

    > .no-pd-container-mb {

      @include media-breakpoint-up(md) {
        padding-top: 20px;
      }

      @include media-breakpoint-up(lg) {
        padding-top: 0;
      }
    }
  }

  .compare-model-box {
    padding-bottom: 15px;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;

    @include media-breakpoint-up(lg) {
      align-items: center;
    }
  }

  .panel-title-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    transform: skewX(-24deg);
  }

  .panel-icon-color {
    background-color: currentColor;
    color: #7c0413;
    height: 20px;
    width: 10px;

    @include media-breakpoint-up(lg) {
      height: 100%;
    }
  }

  .panel-title {
    padding: 1px 15px 0;
    transform: skewX(24deg);
    font-family: $font-family-eurothai-demi;
    font-size: 2rem;
  }

  .panel-list {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    // INFO: this is when we don't have data to compare, we need to guarantee layout wont break
    min-height: 37px;

    &__item {
      position: relative;
      display: inline-block;
      position: relative;
      padding: 3px;
      transform: skewX(-24deg);

      @include media-breakpoint-up(xs) {
        padding: 4px;
      }

      @include media-breakpoint-up(md) {
        padding: 5px;
      }

      &:hover {
        @include hover-desktop {
          .panel-list__item__tooltip {
            opacity: 1;
          }
        }
      }

      &:after,
      &:before {
        content: "";
        width: 1px;
        height: 0;
        background: transparent;
        position: absolute;
        left: 0;
        top: 0;
        transition: 0.5s;
        display: block;
      }

      &:before {
        right: 0;
        left: auto;
      }

      &.active {

        &:after,
        &:before {
          height: 100%;
          background: $black;
        }

        .panel-list__item__color {
          &:after,
          &:before {
            width: 100%;
            background: $black;
          }
        }
      }

      @include hover-desktop() {
        &:hover {
          &:after,
          &:before {
            height: 100%;
            background: $black;
          }

          .panel-list__item__color {
            &:after,
            &:before {
              width: 100%;
              background: $black;
            }
          }
        }
      }

      // COLOR ITEM
      // /////////////////////
      // white color
      &.everest-pearl-white {
        .panel-list__item__color {
          @include color-item(#f0f0ed, #f5f5f5, #d6d6d6);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #d6d6d6;
          }
        }
      }

      // Light gray color
      &.siberian-white {
        .panel-list__item__color {
          @include color-item(#f7f7f7, #f2f2f2, #dddddd);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #dddddd;
          }
        }
      }

      // Silver
      &.arctic-silver {
        .panel-list__item__color {
          @include color-item(#bababa, #e2e1e1, #a8a8a8);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #a8a8a8;
          }
        }
      }

      // Gray
      &.zermatt-money {
        .panel-list__item__color {
          @include color-item(#393d40, #717579, #303030);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #717579;
          }
        }
      }

      // Black
      &.bavarian-black-mica {
        .panel-list__item__color {
          @include color-item(#000, #2c2c2c, #080808);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #2c2c2c;
          }
        }
      }

      // Red
      &.etna-red {
        .panel-list__item__color {
          @include color-item(#990005, #c30e36, #880016);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #c30e36;
          }
        }
      }

      // Blue
      &.polynesian-blue {
        .panel-list__item__color {
          @include color-item(#002b64, #206ec4, #001c50);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #206ec4;
          }
        }
      }

      // Orange
      &.valencia-topas-metallic {
        .panel-list__item__color {
          @include color-item(#a93d18, #df5223, #862208);
        }

        &.active,
        &:hover {
          &:before,
          &:after,
          .panel-list__item__color:before,
          .panel-list__item__color:after {
            background-color: #df5223;
          }
        }
      }

      // Tooltip
      &__tooltip {
        position: absolute;
        bottom: calc(100% + 10px);
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        font-size: 1.7rem; // INFO : follow fontsize on current site
        line-height: 2.5rem; // INFO : follow line height on current site
        color: #fff;
        pointer-events: none;
        white-space: nowrap;
        background-color: #383838;
        border-radius: 3px;
        padding: 1px 10px;
        margin-left: 7px;
        transition: transform .3s ease-out;
        display: none;

        @include hover-desktop() {
          opacity: 0;
          display: block;
        }

        @include media-breakpoint-up(lg) {
          bottom: calc(100% + 13px);
        }

        &:after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          right: auto;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 6px solid #383838;
        }
      }

      &__color {
        // background: url('../../assets/mask-color.png');
        // background-size: contain;
        width: 40px;
        height: 24px;
        cursor: pointer;

        @include media-breakpoint-up(xs) {
          width: 45px;
          height: 27px;
        }

        @include media-breakpoint-up(md) {
          width: 54px;
          height: 33px;
        }

        @include media-breakpoint-up(xl) {
          width: 66px;
          height: 40px;
        }

        &:after,
        &:before {
          content: "";
          height: 1px;
          width: 0;
          background: transparent;
          position: absolute;
          top: 0;
          right: 0;
          transition: 0.5s;
          display: block;
        }

        &:before {
          top: auto;
          bottom: 0;
        }
      }
    }
  }

  .no-pd-container-mb {
    padding-right: 0;
    padding-left: 0;

    @include media-breakpoint-up(md) {
      padding-right: 15px;
      padding-left: 15px;
    }
  }

  // Customize Isu Select
  >>> .vs__dropdown-toggle {
    border: none;
    // border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-radius: 0;
    padding: 5px;
    height: 45px;

    @include media-breakpoint-up(md) {
      padding: 5px;
      height: 50px;
    }
  }

  >>> .vs__dropdown-menu {
    display: block;
    padding: 16px 30px 0 18px;
    left: 0;
    z-index: 2;
    background: $white;
    border: 1px solid #e3e3e3;
    width: 100%;
    box-shadow: none;
  }

  >>> .vs__dropdown-option {
    border-bottom: 1px solid #e3e3e3;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }
  }

  >>> .vs__dropdown-option--highlight {
    background-color: $gray-400;
    color: $white;
    margin: 0 -30px;
    padding-left: 30px;
  }

  >>> .vs__open-indicator {
    background: url('../../assets/arrow-mu-x.svg');
    background-size: 14px;
    background-repeat: no-repeat;

    @include media-breakpoint-up(lg) {
      background-repeat: no-repeat;
      width: 14px;

    }
  }

  & >>> .vs__actions {
    padding-top: 0;
  }

  >>> .vs__actions {
    padding-right: 12px;
  }

  >>> .vs__search {
    padding: 0 3px;
  }

  >>> .v-select {
    @include media-breakpoint-up(xl) {
      width: auto;
    }
  }

  .isu-select {
    font-size: 2.3rem;
    font-family: $font-family-eurothai;
    width: 100%;
  }

  //INFO: style select-box IsuSelectOptionMux apply for CarSelection only
  .isu-select-option-mux {
    font-size: 2.3rem;
    font-family: $font-family-eurothai;
    margin-bottom: 20px;

    >>> select {
      border: none;
      padding: 0 35px 0 17px;
      border-bottom: 1px solid #ccc;
      background: url('../../assets/select-car-compare-mobile.svg');
      background-repeat: no-repeat;
      background-position-x: calc(100% - 15px);
      background-position-y: 50%;
    }
  }

  &--without-select-model {
    .select-list {
      display: none;
    }

    .compare-model__panel {
      @include media-breakpoint-up(lg) {
        margin-top: 45px;
      }
    }
  }
}
</style>