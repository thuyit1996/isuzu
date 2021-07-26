<template>
  <div class="col-6 col-md-4 col-lg-3 car-item">
    <div class="car-item-wrap clearfix">
      <div class="car-item__img">
        <img v-if="image" :src="imageEndPoint(image)" alt="car-compare" />
      </div>
      <!-- <isu-select
        class="car-item__vehicleType"
        :valSelect="carModel"
        :placeholder="'เลือกประเภทรถยนต์'"
        :listOptions="listCarModel"
        :nameSelect="'carModel'"
        @onChangeSelect="getValSelect"
      ></isu-select>
      <isu-select
        class="car-item__model"
        :valSelect="carGrade"
        :placeholder="'เลือกรุ่นรถยนต์'"
        :listOptions="listCarGrade"
        :nameSelect="'carGrade'"
        @onChangeSelect="getValSelect"
      ></isu-select> -->
      <isu-select-option-mux 
        class="car-item__vehicleType"
        :valSelect="carModel" 
        :placeholder="'เลือกประเภทรถยนต์'" 
        :listOptions="listCarModel"
        :nameSelect="'carModel'" 
        @onChangeSelect="getValSelect"
      >
      </isu-select-option-mux>
      <isu-select-option-mux 
        class="car-item__model"
        :valSelect="carGrade" 
        :placeholder="'เลือกรุ่นรถยนต์'" 
        :listOptions="listCarGrade"
        :nameSelect="'carGrade'" 
        @onChangeSelect="getValSelect"
      >
      </isu-select-option-mux>

      <div class="car-item__price">
        <span class="car-item__price__value">{{price | formatMoney }}</span>
        <sc-text tag="span" class="car-item__price__unit" :field="carComparisonProperties.CurrencyUnit" />
      </div>
      <div class="car-item__color">
        <car-comparison-color-palette
          :carColorList="carGrade.colors || []"
          :defaultCarColor="carGrade.colorDefault"
          :carIndex="carGrade.index"
          @get:carImage="getCarImage"
        ></car-comparison-color-palette>
      </div>
      <div class="car-item__color__name">
        <p class="car-item__color__name--thailand">{{colorThai}}</p>
        <p class="car-item__color__name--english">{{colorEnglish}}</p>
      </div>
      <sc-rich-text tag="div" class="car-item__desc" :field="carComparisonProperties.Note" />
    </div>
  </div>
</template>

<script>
import IsuSelect from '../shared/IsuSelect';
import IsuButtonLink from '../shared/IsuButtonLink';
import { getCarGrade, getCarGradeProperties } from '../../service/carComparisionService';
import { Link, RichText , Text } from '@sitecore-jss/sitecore-jss-vue';
import { GetEndPoint } from '../../service/genericService';
import { customMoney } from '../pipes/moneyPipe';
import { isMobile } from '../../util/dom';
import CarComparisonColorPalette from './CarComparisonColorPalette';
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';
const cardModelId = [];
export default {
  name: 'CarComparisionTypeCarItem',
  components: {
    ScLink: Link,
    IsuSelect: IsuSelect,
    IsuButtonLink: IsuButtonLink,
    CarComparisonColorPalette: CarComparisonColorPalette,
    ScRichText: RichText,
    IsuSelectOptionMux: IsuSelectOptionMux,
    ScText : Text
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carData: {
      type: Object,
    },
    carIndex: {
      type: Number,
    },
    carModelList: {
      type: Array,
    },
    carComparisonProperties: {
      type: Object,
      default: () => ({}),
    },
    carList: {
      type: Array,
    },
  },
  data() {
    return {
      carModel: {},
      carGrade: {},
      listCarModel: [],
      listCarGrade: [],
      image: '',
      price: 0,
      carGradeProperties: [],
      cardModelId: [],
      limitCarModel: 3,
      deviceType: 3,
      detectMobile: false,
      carDefaultModelId: '',
      colorThai: '',
      colorEnglish: '',
    };
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.getCarDefaultId();
  },
  filters: {
    formatMoney: function(value) {
      return customMoney(value);
    },
  },
  watch: {
    carModelList: function(newModelList) {
      this.listCarModel = newModelList.map((item) => {
        return {
          label: item.Title,
          id: item.Id,
          image: item.Image,
          index: this.carIndex,
          carGradeDefault: item?.CarGradeDefault || '',
        };
      });
      this.listCarModel.forEach((item, index) => {
        if (item.id === this.carDefaultModelId) {
          this.carModel = {
            id: item.id,
            label: item.label,
            image: item.image,
            index: item.index,
            carGradeDefault: item?.carGradeDefault || '',
          };
        }
      });
      this.getValSelect(
        {
          name: 'carModel',
          value: this.carModel,
        },
        'select-first-model'
      );
    },
  },
  methods: {
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
    onSubmit() {
      this.$emit('clickBtnSubmit', {
        carGrade: this.carGrade,
        carModel: this.carModel,
        route: this.carComparisonProperties?.RequestQuotationTitle?.value?.href,
      });
    },

    getCarDefaultId() {
      if (this.carIndex === 0)
        this.carDefaultModelId = this.carComparisonProperties?.CarModelDefaultFirstColumn?.id || '';
      if (this.carIndex === 1)
        this.carDefaultModelId =
          this.carComparisonProperties?.CarModelDefaultSecondColumn?.id || '';
      if (this.carIndex === 2)
        this.carDefaultModelId = this.carComparisonProperties?.CarModelDefaultThirdColumn?.id || '';
    },

    getValSelect(selectVal, selectDefault) {
      this[selectVal.name] = selectVal.value;
      // INFO: If carModel change, get list of CarGrade
      if (selectVal.name == 'carModel') {
        this.retrieveCarGrade(selectVal.value, selectDefault);
        // INFO: If carGrade change, get car price
      } else if (selectVal.name == 'carGrade') {
        if (selectVal?.value) {
          this.image = selectVal.value?.carActiveImage || '';
          this.colorThai = selectVal.value?.colorThai || '';
          this.colorEnglish = selectVal.value?.colorEnglish || '';
          this.$emit('update:carModel', selectVal.value);
          this.getCarPrice(selectVal.value.id);
          if (selectDefault) {
            // INFO : Goto page car comparison select default first value of three model
            cardModelId.push({
              index: selectVal.value.index,
              id: selectVal.value.id,
            });
            if (cardModelId.length == this.limitCarModel) {
              this.getDefaultModel(cardModelId);
            }
          } else {
            let itemId = this.$jss.routeData().itemId;
            getCarGradeProperties(selectVal.value.id, itemId).then((res) => {
              this.carGradeProperties = res.data?.Records;
              this.$root.$emit('carGradeProperties', {
                index: selectVal.value.index,
                properties: this.carGradeProperties,
              });
            });
          }
        }
      }
    },

    retrieveCarGrade(value, selectDefault) {
      getCarGrade(value.id).then((res) => {
        this.listCarGrade = res.data?.Records.map((item) => {
          let carActive =
            (item?.Colors || []).find((color) => color.Id === item.CarColorDefaultRight) ||
            item?.Colors[0];
          return {
            label: item.Title,
            id: item.Id,
            price: carActive?.Price || 0,
            index: this.carIndex,
            colors: item?.Colors || [],
            colorDefault: item?.CarColorDefaultRight,
            carActiveImage: this.detectMobile ? carActive?.ImageSm : carActive?.Image,
            colorThai: carActive?.ColorName || '',
            colorEnglish: carActive?.Title || '',
          };
        });
        this.carGrade =
          (this.listCarGrade || []).find((item) => item.id === value.carGradeDefault) ||
          this.listCarGrade[0];
        if (selectDefault) {
          this.getValSelect(
            {
              name: 'carGrade',
              value: this.carGrade,
            },
            'select-first-model'
          );
        } else {
          this.getValSelect({
            name: 'carGrade',
            value: this.carGrade,
          });
        }
      });
    },
    getCarPrice(id) {
      let findCarItem = this.listCarGrade.find((item) => item.id == id);
      if (findCarItem) {
        this.price = findCarItem.price;
      }
    },

    getDefaultModel(cardModelId) {
      let itemId = this.$jss.routeData().itemId;
      Promise.all(
        cardModelId.map((model) =>
          Promise.all([getCarGradeProperties(model.id, itemId), model.index])
        )
      ).then((res) => {
        let listData = [];
        res.forEach((item) => {
          listData.push({
            index: item[1],
            properties: item[0].data?.Records,
          });
        });
        this.$root.$emit('comparision:listProperties', listData);
      });
    },

    getCarImage({ image, imageSm, carIndex, price, colorThai, colorEnglish }) {
      this.image = this.detectMobile ? image : imageSm;
      this.price = price;
      this.colorThai = colorThai;
      this.colorEnglish = colorEnglish;
      this.$emit('update:carModelImage', { index: carIndex, image: this.image });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

button {
  outline: none;
}

.car-item {
  padding: 15px 10px 10px 10px;
  border-right: 1px solid $gray-300;
  border-bottom: 1px solid $gray-300;

  @include media-breakpoint-up(md) {
    padding: 38px 20px 12px 20px;
    border-bottom: 1px solid $gray-300;
  }

  @include media-breakpoint-up(xl) {
    padding: 38px 20px 70px 20px;
  }

  &:last-of-type {
    border-right: none;
  }

  .car-item-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;

    @include media-breakpoint-up(xl) {
      display: block;
    }
  }

  &__img {
    margin-bottom: 12px;
    max-width: 100%;
    height: 93px;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    @include media-breakpoint-up(sm) {
      min-height: 50px;
    }

    @include media-breakpoint-up(md) {
      min-height: 100px;
    }

    @include media-breakpoint-up(lg) {
      margin-bottom: 30px;
    }

    @include media-breakpoint-up(xl) {
      margin-bottom: 20px;
    }
  }

  &__name {
    display: none;
    font-size: $font-size-comparison-small;
    line-height: 1.2rem; //INFO: Line-height follow as the design
    text-align: center;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-base;
      line-height: 2.4rem; //INFO: Line-height follow as the design
    }
  }

  &__vehicleType,
  >>> &__model {
    cursor: pointer;
  }

  &__price {
    // border-bottom: 1px solid $gray-300;
    text-align: left;
    color: $gray-700;
    padding: 7px 0 7px 4px;

    @include media-breakpoint-up(lg) {
      padding: 11px 0 11px 4px;
    }

    &__value {
      font-size: $font-size-comparison-select-price-small;
      line-height: 1.2rem; //INFO: Line-height follow as the design

      @include media-breakpoint-up(lg) {
        font-size: $font-size-comparison-select-price;
        line-height: 2.4rem; //INFO: Line-height follow as the design
      }
    }

    &__unit {
      display: inline-block;
      margin-left: 2px;
    }
  }

  &__color {
    @include media-breakpoint-up(xl) {
      // display: flex;
      float: left;
      width: 50%;
    }

    &__name {
      font-size: 1.8rem;
      line-height: 0.9;
      width: 100%;
      text-align: left;
      margin-top: auto;

      @include media-breakpoint-up(lg) {
        font-size: 2.0rem;
      }

      @include media-breakpoint-up(xl) {
        width: 50%;
        text-align: right;
        margin-top: 0;
        float: left;
      }
    }
  }

  &__desc {
    font-size: 1.8rem;
    width: 100%;
    line-height: 0.9;
    text-align: left;
    margin-top: 10px;

    @include media-breakpoint-up(xl) {
      position: absolute;
      bottom: 65px;
      transform: translateY(100%);
      width: 90%;
    }
  }

  &__submit {
    margin-top: 16px;

    @include media-breakpoint-up(lg) {
      margin-top: 55px;
    }
  }

  &.col-6 {
    &:nth-child(3) {
      border-right: none;

      @include media-breakpoint-up(lg) {
        border-right: 1px solid $gray-300;
      }
    }
  }

  .i-btn {
    padding: 10px 0;
    width: 100%;
    font-size: $font-size-comparison-button-small;

    @include media-breakpoint-up(lg) {
      padding: 8px 0;
      font-size: $font-size-comparison-button;
    }
  }
  >>> .isu-select-option-mux {
    select {
      background-color: transparent;
      border-color: transparent;
      border: none;
      border-bottom: 1px solid #d5d5d5;
      padding: 6px 25px 6px 10px;
      background-position-x: calc(100%);
      @include media-breakpoint-up(lg) {
        height: 54px;
      }
      @include media-breakpoint-down(md) {
        height: 45px;
      }
    }
  }

  >>> .isu-select {
    margin-bottom: 0;
  }

  >>> .v-select {
    width: 100%;
  }

  & >>> .vs__dropdown-toggle {
    border: none;
    border-bottom: 1px solid $gray-300;
    padding: 4px 0;

    @include media-breakpoint-up(lg) {
      padding: 6px 0;
    }
  }

  >>> .vs__dropdown-menu {
    padding: 0 !important;
  }

  >>> .vs__dropdown-option {
    padding: 3px 10px !important;
    border: none !important;
  }

  & >>> .vs__actions {
    padding-right: 0;
  }

  & >>> .vs__selected,
  & >>> .vs__search {
    padding: 0;
  }
}
</style>
