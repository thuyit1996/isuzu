<template>
  <div class="choose-car">
    <div class="container">
      <div class="choose-car__heading">
        <span class="choose-car__heading__number">01</span>
        <div class="text-center">
          <sc-text class="isu-title" tag="h2" :field="fields.Title" />
        </div>
      </div>
      <div class="choose-car__select">
        <label for="car" class="choose-car__select__label">เลือกประเภทรถ <span class="asterisk">*</span></label>
        <!-- <isu-select
        :placeholder="'อีซูซุดีแมกซ์'"
        :valSelect="carValue"
        :required="true"
        :listOptions="listCars"
        :nameSelect="'carValue'"
        :formGroupName="'userAccount'"
        :formControlName="'Card type'"
        @onChangeSelect="getCarValue">
        </isu-select> -->
        <isu-select-option-mux 
          :placeholder="'อีซูซุดีแมกซ์'" 
          :valSelect="carValue" 
          :required="true"
          :listOptions="listCars"
          :nameSelect="'carValue'" 
          :formGroupName="'userAccount'"
          :formControlName="'Card type'"
          @onChangeSelect="getCarValue"
        >
        </isu-select-option-mux>
      </div>
      <div class="choose-car__image">
        <img class="d-none d-sm-inline-block" :src="image" alt="imageCar">
        <img class="d-sm-none" :src="imageSm" alt="imageSmCar"> 
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import IsuSelect from '../shared/IsuSelect';
import IsuSelectOptionMux from '../shared/IsuSelectOptionMux';
import { mapActions, mapState, mapGetters } from "vuex";

function parseQuery(queryString) {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

const DEFAULT_CAR_MODEL_VALUE = 0;

export default {
  name: 'TestDriveCar',
  components: {
    ScText: Text,
    IsuSelect: IsuSelect,
    IsuSelectOptionMux: IsuSelectOptionMux,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carModelValue: Array,
  },
  mounted() {
    this.getCarModelList();
    if(this.listCars?.length){
      this.updatecarValue(this.listCars[DEFAULT_CAR_MODEL_VALUE]);
    }
  },
  methods: {
    ...mapActions('testdrive', ['updatecarValue']),
    ...mapActions('testdrive', ['getCarModelList']),
    ...mapActions('testdrive', ['updateCarValueById']),


    getCarValue(carVal) {
      // this.$root.$emit('carSelectedValue', carVal.value);
      this.updatecarValue(carVal.value);
      setTimeout(() => {
        this.scrollToNextStep();
      }, 800);
    },
    scrollToNextStep() {
      this.$root.$emit('scroll:TestDriveDealer');
    },
  },
  computed: {
    ...mapGetters('testdrive', { carValue: 'getcarvalue'}),
    ...mapGetters('testdrive', { image: 'getImage'}),
    ...mapGetters('testdrive', { imageSm: 'getImageSm'}),
    ...mapGetters('testdrive', { listCars: 'getCarList' }),
    ...mapState('testdrive', { thankUrlList: 'thankUrlList' }),
  },
  watch: {
    thankUrlList: function (newThankUrlList) {
      let carTypeId = '';
      newThankUrlList.forEach((carGrade) => {
        if (window.location.pathname.includes(carGrade.UrlGradeType)) {
          carTypeId = carGrade.GradeType;
        }
      })
      // INFO: if thing go wrong, carTypeId will be undefined
      if (carTypeId) {
        this.updateCarValueById(carTypeId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.choose-car {
  margin: 50px 0;
  z-index: $NOMAL-ZINDEX;
  position: relative;

  &__heading {
    text-align: center;
    margin-bottom: 30px;

    &__number {
      display: block;
      font-size: $font-size-test-drive-heading-number-mobile;
      line-height: 2.4rem; //INFO: Line-height follow as design
      color: #cccccc;
      margin-bottom: 5px;

      @include media-breakpoint-up(lg) {
        font-size: $font-size-test-drive-heading-number;
        line-height: 4.8rem; //INFO: Line-height follow as design
        margin-bottom: -5px;
      }
    }
  }

  &__select {
    margin-bottom: 30px;

    @include media-breakpoint-up(md) {
      display: flex;
      justify-content: center;
      transform: translateX(-50px);
    }

    @include media-breakpoint-up(lg) {
      transform: translateX(-60px);
    }

    &__label {
      display: inline-block;
      margin-bottom: 10px;
      font-size: $font-size-test-drive-label;

      @include media-breakpoint-up(md) {
        padding-top: 6px;
        margin-right: 20px;
      }
    }

    .isu-select-option-mux {
      font-size: $font-size-test-drive-select;
      margin-bottom: 20px;

      @include media-breakpoint-up(md) {
        width: 220px;
      }

      @include media-breakpoint-up(lg) {
        width: 360px;
      }
      >>> select {
        height: 50px;
      }
    }
  }

  &__image {
    text-align: center;
    margin: 0 auto;
    // width: 285px;
    height: 105px;
    overflow: hidden;

    @include media-breakpoint-up(md) {
      // width: 426px;
      height: 155px;
    }

    @include media-breakpoint-up(lg) {
      // width: 570px;
      height: 206px;
    }

    img {
      max-width: none;
      height: 100%;
    }
  }

  .asterisk {
    color: #ef3f36;
  }
}

</style>
