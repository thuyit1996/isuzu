<template>
  <div class="choose-insurance">
    <div class="container">
      <div class="choose-insurance__title">
        <sc-text tag="h2" class="isu-title" :field="stepModel.Steps[3].fields.Title" />
      </div>
      <div class="row">
        <request-quotation-step-4-item
          v-for="(carInsurance, index) in carInsuranceList"
          :key="carInsurance.Id"
          :carInsurance="carInsurance"
          :isActive="activeIndex"
          @chooseCarInsurance="selectCarInsurance"
          @clickShowModal="clickShowModal"
        ></request-quotation-step-4-item>
      </div>
    </div>
    <isu-popup ref="step4Modal">
      <request-quotation-lightbox :carInsuranceSelect="carInsuranceSelect">
        <div v-html="insuranceInfo"></div>
      </request-quotation-lightbox>
    </isu-popup>

  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import RequestQuotationStep4Item from './RequestQuotationStep4Item';
import RequestQuotationLightbox from './RequestQuotationLightbox';
import IsuPopup from '../../shared/IsuPopup';
import { getInsurance } from '../../../service/requestQuotationService';

export default {
  name: 'RequestQuotationStep4',
  components: {
    RequestQuotationStep4Item: RequestQuotationStep4Item,
    RequestQuotationLightbox: RequestQuotationLightbox,
    ScText: Text,
    IsuPopup: IsuPopup,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    carGradeId: {
      type: String,
      default: '',
    },
    carInsurance: {},
    stepModel: Object,
  },
  data() {
    return {
      carInsuranceList: [],
      activeIndex: this.carInsurance.Id,
      insuranceInfo: '',
      carInsuranceSelect: {},
    };
  },
  mounted() {
    this.$emit('update:loadingStatus', true);
    getInsurance(this.carGradeId).then(data => {
      this.$emit('update:loadingStatus', false);
      this.carInsuranceList = data.data.Records;
    });
  },

  methods: {
    selectCarInsurance(carInsuranceVal) {
      if (this.activeIndex === carInsuranceVal.Id) {
        this.activeIndex = '';
        this.$emit('reset:carinsurance');
      } else {
        this.activeIndex = carInsuranceVal.Id;
        this.$emit('update:carinsurance', carInsuranceVal);
      }
    },
    clickShowModal(carInsuranceVal) {
      this.insuranceInfo = carInsuranceVal.Description;
      this.$refs.step4Modal.showModal();
      this.carInsuranceSelect = carInsuranceVal;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';
.choose-insurance {
  background-color: #f5f5f5;
  padding: 80px 0 55px 0;

  @include media-breakpoint-up(lg) {
    padding: 160px 0 120px 0;
  }

  .row {
    margin: 0 -5px;
    @include media-breakpoint-up(lg) {
      margin: 0 -15px;
    }
  }

  .col-6,
  .col-md-3 {
    padding: 0 5px;
    @include media-breakpoint-up(lg) {
      padding: 0 15px;
    }
  }

  &__title {
    text-align: center;
    padding: 0 0 45px 0;
    @include media-breakpoint-up(lg) {
      padding: 0 0 60px 0;
    }
  }

}
</style>
