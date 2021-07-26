<template>
  <div class="car-comparision">
    <div class="container container-extra car-comparision__container">
      <div class="car-comparision__heading text-center">
        <div class="car-comparision__heading__title">
          <sc-text class="isu-title" tag="h1" :field="carComparisonModel.Title" />
        </div>
        <sc-text class="car-comparision__heading__description" tag="div" :field="carComparisonModel.Description" />
      </div>
      <div class="choose-car">
        <div class="row no-gutters">
          <div class="col-md-4 col-lg-3 car-item-desc d-none d-md-block">
            <sc-text tag="p" :field="carComparisonModel.CarModelSearchTitle" />
            <sc-text tag="p" :field="carComparisonModel.CarGradeSearchTitle" />
            <sc-text tag="p" :field="carComparisonModel.PriceSearchTitle" />
            <sc-text tag="p" :field="carComparisonModel.CarColorSearchTitle" />
          </div>
          <car-comparision-type-car-item
            v-for="(car, index) in listCar"
            :key="index"
            :carData="car"
            :carIndex="index"
            :carModelList="listCarModel"
            :carList="listCarModel"
            @update:carModel="updateCarModel"
            @update:carModelImage="updateCarModelImage"
            @clickBtnSubmit="onSubmitCar"
            :carComparisonProperties="carComparisonModel"
          ></car-comparision-type-car-item>
        </div>
      </div>
    </div>
    <div class="car-comparision-fix" :class="{'sticky': sticky}">
      <div class="container container-extra">
        <div class="list-car">
          <div class="row no-gutters">
            <div class="col-md-4 col-lg-3 item-car">
              <sc-text v-if="detectDesktop" class="re-comparision" tag="div" :field="carComparisonModel.CompareAgainTitle" />
              <sc-text v-else class="re-comparision" tag="div" :field="carComparisonModel.CompareAgainTitle" @click="collapseCarComparision"/>
              <div class="re-comparision-icon" @click="collapseCarComparision">
                <img src="../../assets/re-comparision.png" alt="x" />
              </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3 car-item" v-for="(car, index) in listCar" :key="index">
              <div class="car-item-wrap">
                <div class="car-item__img">
                  <img v-if="car.image" :src="imageEndPoint(car.image)" alt="x" />
                </div>
                <p class="car-item__name">{{car.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import CarComparisionTypeCarItem from './CarComparisionTypeCarItem';
import { getAllCarModel } from '../../service/testDriveService';
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { GetEndPoint } from '../../service/genericService';
import { getCarGrade } from '../../service/requestQuotationService';
import { mapActions, mapState } from "vuex";
import { getCarTypeFromModel } from './carComparisionService';
import { isDesktop } from '../../util/dom';
export default {
  name: 'CarComparisionTypeCar',
  components: {
    ScText: Text,
    CarComparisionTypeCarItem: CarComparisionTypeCarItem,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carComparisonModel: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      listVehicleType: '',
      listModel: '',
      vehicleType: '',
      carModel: '',
      listCar: null,
      sticky: false,
      listCarModel: [],
      deviceType : 3,
      detectDesktop: true,
    };
  },
  computed: {
    ...mapState('quotation', { carTypeList: 'carTypeList'}),
  },
  methods: {
    ...mapActions('quotation', ['getCarTypes']),
    ...mapActions('quotation', ['updateCarType']),
    ...mapActions('quotation', ['updateCarModelState']),
    ...mapActions('quotation', ['updateCarGradeState']),
    ...mapActions('quotation', ['resetQuotationData']),
    ...mapActions('quotation', ['updateIsSendFromSaveQuote']),
    ...mapActions('quotation', ['updateStep']),

    updateCarModel(model) {
      this.updateListCar(model);
    },
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
    onSubmitCar(data) {
      let carModel = this.listCarModel.find(model => {
        return model.Id == data.carModel.id;
      });
      let carType = getCarTypeFromModel(carModel, this.carTypeList);
      // INFO: ask BE for get all api
      getCarGrade(carModel.Id).then(res => {
        let carGradeList = res.data?.Records;
        let carGrade = carGradeList.find(grade => {
          return grade.Id == data.carGrade.id;
        })
        this.resetQuotationData();
        this.updateCarType(carType);
        this.updateCarModelState(carModel);
        this.updateCarGradeState(carGrade);
        this.updateIsSendFromSaveQuote(true);
        this.updateStep(1);
        if(data.route){
          this.$router.push(data.route);
        }
      });
    },
    updateListCar(carInfo) {
      this.listCar.forEach((car, index) => {
        if (index == carInfo.index) {
          car.title = carInfo.label;
          car.image = carInfo.carActiveImage;
        }
      });
    },
    updateCarModelImage({ index, image }){
      this.listCar.forEach((car, idx) => {
        if (idx == index) {
          car.image = image;
        }
      });
    },
    collapseCarComparision(){
      let topPixel = $(this.$el).offset().top - 50;
      window.scroll({ top: topPixel, behavior: 'smooth' });
    },
    onScrollEvent() {
      if(this.$el.querySelector('.car-item__img') != null){
        const positionOpenSticky = $('.car-item__img').offset().top;
        if ($(window).scrollTop()  >= positionOpenSticky - 100) {
          this.sticky = true;
        } else {
          this.sticky = false;
        }
      }
    },

  },
  mounted() {
    
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectDesktop = isDesktop(this.deviceType);
    getAllCarModel().then((res) => {
      this.listCarModel = res.data?.Records;
    });
    this.getCarTypes();
    this.listCar = [
      {
        image: '',
      },
      {
        image: '',
      },
      {
        image: '',
      },
    ];
    window.addEventListener("scroll", this.onScrollEvent);
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

img {
  max-height: 100%;
}

.car-comparision {
  padding-top: $distance-carcomparison-choose-car;
  background: #f5f5f5;

  @include media-breakpoint-up(lg) {
    padding-top: $distance-carcomparison-choose-car-lg;
  }

  &__container {
    z-index: $NOMAL-ZINDEX;
    position: relative;
  }

  &__heading {
    &__title {
      margin-bottom: 5px;

    }

    &__description {
      margin: 0 auto 20px;
      line-height: 2.4rem; //INFO: Line-height follow as the design
      max-width: 270px;
      font-size: $font-size-comparison-desc-small;

      @include media-breakpoint-up(lg) {
        max-width: 100%;
        font-size: $font-size-comparison-desc;
        margin-bottom: 30px;
      }
    }
  }

  .choose-car {
    line-height: 2.3rem; //INFO: Line-height follow as the design
    text-align: center;
    padding-bottom: 8px;
    font-size: $font-size-comparison-choose-car-small;

    @include media-breakpoint-up(md) {
      padding: 0 0 8px 0;
    }

    @include media-breakpoint-up(lg) {
      padding: 0 0 27px 0;
      font-size: $font-size-comparison-choose-car;
    }

    @include media-breakpoint-up(xl) {
      padding: 10px 0 27px 0;
    }
  }

  .car-item-desc {
    border-right: 1px solid $gray-300;
    border-bottom: 1px solid $gray-300;
    padding-top: 160px;
    padding-right: 50px;
    text-align: right;

    @include media-breakpoint-up(md) {
      padding-top: 160px;
    }

    @include media-breakpoint-up(lg) {
      padding-top: 182px;
    }

    @include media-breakpoint-up(xl) {
      padding-top: 174px;
    }

    p {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      @include media-breakpoint-up(lg) {
        margin-bottom: 30px;
      }
    }
  }

  // TODO: we have to remove this when we bind data with v-for
  .col-6 {
    &:last-child {
      display: none;

      @include media-breakpoint-up(lg) {
        display: block;
        border-right: none;
      }
    }

    &:nth-child(3) {
      border-right: none;
      border-left: none;

      @include media-breakpoint-up(lg) {
        border-right: 1px solid $gray-300;
      }
    }

    &:nth-child(4) {
      border-left: none;
    }
  }

  & >>> .vs__dropdown-option {
    border-bottom: 1px solid #e3e3e3;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }
  }
}

.car-comparision-fix {
  display: none;

  &.sticky {
    display: block;
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    background-color: $white;
    box-shadow: 0 3px 5px rgba($black, 0.2);
    z-index: $CAR_COMPARISION_FIX_BAR_Z_INDEX;
    border-top: 2px solid $red-hover-color;

    @include media-breakpoint-up(lg) {
      border-top: 1px solid $gray-300;
    }
  }

  .list-car {
    font-size: $font-size-comparison-small;
    font-weight: bold;

    // @include media-breakpoint-up(md) {
    //   padding: 0 15px;
    // }

    @include media-breakpoint-up(lg) {
      font-size: $font-size-comparison-desc;
    }
  }

  .item-car {
    display: flex;
    justify-content: center;
    flex-direction: row-reverse;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;

    @include media-breakpoint-up(md) {
      flex-direction: column;
      border-right: 1px solid $gray-300;
      padding: 8px 15px;
    }
  }

  .no-gutters {
    margin-right: 0;
    margin-left: 0;

    // @include media-breakpoint-up(md) {
    //   margin-right: -15px;
    //   margin-left: -15px;
    // }
  }

  .re-comparision {
    font-size: $font-size-comparison-title-fix-small;
    // line-height: 1.2rem; //INFO: Line-height follow as the design

    @include media-breakpoint-up(lg) {
      font-size: $font-size-comparison-title-fix;
      line-height: 2.4rem; //INFO: Line-height follow as the design
    }
  }

  .re-comparision-icon {
    width: 24px;
    margin-right: 6px;
    cursor: pointer;

    @include media-breakpoint-up(md) {
      width: 32px;
      margin-right: 0;
      margin-top: 10px;
    }

    @include media-breakpoint-up(lg) {
      width: 46px;
    }
  }

  .car-item {
    border: 1px solid $gray-300;
    border-bottom: none;
    padding: 0 0 10px;

    @include media-breakpoint-up(md) {
      border-top: none;
      border-left: none;
      padding: 10px 20px 15px 20px;
    }

    @include media-breakpoint-up(xl) {
      padding: 15px 30px 30px;
    }

    &__img {
      margin: 15px auto 12px auto;
      width: 90%;
      display: flex;
      // align-items: flex-end;
      justify-content: center;
      max-height: 65px;

      @include media-breakpoint-up(sm) {
        max-height: 85px;
      }

      @include media-breakpoint-up(lg) {
        margin-bottom: 27px;
        width: auto;
        height: 95px;
        max-height: none;
        max-width: 100%;
        align-items: flex-end;
      }

      @media screen and (min-width: 1400px) {
        min-height: 120px;
      }

      img {
        display: block;
        object-fit: contain;
      }
    }

    &__name {
      line-height: 1.2rem; //INFO: Line-height follow as the design
      text-align: center;

      @include media-breakpoint-up(lg) {
        line-height: 2.4rem; //INFO: Line-height follow as the design
      }
    }

    &.col-6 {
      &:nth-child(3) {
        border-right: 1px solid $gray-300;

        @include media-breakpoint-up(md) {
          border-right: none;
        }

        @include media-breakpoint-up(lg) {
          border-right: 1px solid $gray-300;
        }
      }
    }
  }
}
</style>
