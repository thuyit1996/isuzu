<template>
  <div class="car-model">
    <div class="container">
      <div class="car-model__number">
        <span>01</span>
      </div>
      <div class="text-center car-model__title">
        <sc-text class="isu-title" tag="h2" :field="fields.Title" />
      </div>
      <div class="car-model__content">
        <div class="row">
          <div class="col-md-4">
            <div class="select-group">
              <isu-input
                :typeInput="'text'"
                :textLable="'ประเภทรถยนต์'"
                :required="true"
                :valInput="finalQuote.carType"
                :formGroupName="'userAccount'"
                :formControlName="'Car type'"
                :nameInput="'carType'"
                :disabled="true"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="select-group">
              <isu-input
                :typeInput="'text'"
                :textLable="'รุ่นรถยนต์'"
                :required="true"
                :valInput="finalQuote.carGrade.Title"
                :formGroupName="'userAccount'"
                :formControlName="'Car grade'"
                :nameInput="'carGrade'"
                :disabled="true"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="select-group">
              <isu-input
                :typeInput="'text'"
                :textLable="'สีรถยนต์'"
                :required="true"
                :valInput="finalQuote.carColor.name ? finalQuote.carColor.name : finalQuote.carColor.label"
                :formGroupName="'userAccount'"
                :formControlName="'Car color'"
                :nameInput="'carColor'"
                :disabled="true"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="car-model__picture">
        <img :src="imageEndPoint(carImage)" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import IsuInput from '../shared/IsuInput';
import { mapState } from 'vuex';
import EndPointMixin from '../../mixin/endpoint-mixin';
export default {
  name: 'RequestQuotetoDealerCar',
  mixins: [EndPointMixin],
  components: {
    ScText: Text,
    IsuInput: IsuInput,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState('quotation', { finalQuote: 'quoteToDealerData' }),
    carImage: function() {
      let carRotate =
        this.finalQuote.carColor.rotateImage &&
        this.finalQuote.carColor.rotateImage.length &&
        this.finalQuote.carColor.rotateImage[0];
      let carNormal = this.finalQuote.carGrade.Image
        ? this.finalQuote.carGrade.Image
        : this.finalQuote.carModel.Image;

      let carColor = this.finalQuote.carColor.Image ? this.finalQuote.carColor.Image : carNormal;

      return carRotate ? carRotate : carColor;
    },
  },
  data() {
    return {
      carType: '',
      carGrade: '',
      carColor: '',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
.car-model {
  text-align: center;
  background-color: $white;
  padding: 75px 0 0;

  @include media-breakpoint-up(lg) {
    padding: 120px 0 0;
  }

  &__number {
    color: #cccccc;
    margin-bottom: 0;

    // @include media-breakpoint-up(lg) {
    //   margin-bottom: 8px;
    // }

    span {
      font-size: 5rem;
      line-height: 2.4rem; //INFO: Line-height follow as the design

      @include media-breakpoint-up(lg) {
        font-size: 6rem;
        line-height: 4.8rem; //INFO: Line-height follow as the design
      }
    }
  }

  &__title {
    margin-bottom: 18px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 52px;
    }
  }

  &__picture {
    max-width: 83%;
    margin: 25px 0 20px 30px;

    @include media-breakpoint-up(lg) {
      margin: 20px 0 0 0;
      max-width: 100%;
    }
  }

  .select-group {
    width: 100%;
    margin-bottom: 15px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 25px;
    }

    .select-label {
      display: block;
      text-align: left;
    }

    .select-input {
      width: 100%;
      padding: 6px 10px;
    }
    & >>> label {
      text-align: left;
    }
  }

  .asterisk {
    color: #ed2f25;
    font-size: $font-size-base;
  }
}
</style>
