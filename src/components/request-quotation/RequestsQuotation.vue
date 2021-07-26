<template>
  <div>
    <save-quote-item-mobile :saveAquoteLink="fields.SaveAQuoteButtonLink" ></save-quote-item-mobile>
    <general-infomation :summaryData="fixData" v-show="step !== $getConst('SELECT_MODEL_STEP')" :step="step" :isGoThroughInsurance="reselect" :saveAquoteLink="fields.SaveAQuoteButtonLink" :saveAquoteTitle="fields.SaveAQuoteButtonTitle"/>
    <request-quotation-status
    @stepChoose="clickStep"
    :step="step"
    :sticky="sticky"
    :fixData="fixData"
    :stepStatus="stepStatus"
    :reselect="reselect"
    :stepModel="fields"
    :saveAquoteLink="fields.SaveAQuoteButtonLink"
    />
    <waiting-icon-request-quotation v-show="step < $getConst('FINAL_STEP') && isLoading" :type="step === $getConst('SELECT_GRADE_STEP') ? 'row' : 'column'"></waiting-icon-request-quotation>
    <div v-if="step == $getConst('SELECT_MODEL_STEP')">
      <request-quotation-step1 :carModel="carModel" :tab="carModelTab" @update:loadingStatus="updateLoadingStatus" @update:carmodel="updateCarModel" :stepModel="fields"/>
    </div>
    <div v-else-if="step == $getConst('SELECT_GRADE_STEP')">
      <request-quotation-step2 :carGrade="carGrade" @update:cargrade="updateCarGrade" @update:loadingStatus="updateLoadingStatus" :stepModel="fields"/>
    </div>
    <div v-else-if="step == $getConst('SELECT_COLOR_STEP')">
      <request-quotation-step3 :color="carColor" :carColors="carGrade.Colors" @update:carcolor="updateCarColor" @update:loadingStatus="updateLoadingStatus" :stepModel="fields"/>
    </div>
    <div v-else-if="step == $getConst('SELECT_INSURANCE_STEP')">
      <request-quotation-step4 :carInsurance="carInsurance" :carGradeId="carGrade.Id" @update:carinsurance="updateCarInsurance" @reset:carinsurance="resetCarInsurance" @update:loadingStatus="updateLoadingStatus" :stepModel="fields"/>
    </div>
    <div v-else-if="step == $getConst('FINAL_STEP')">
      <calculation :summaryData="fixData" :stepModel="fields"/>
      <final-information
        @send:quoteToDealer="onSendQuoteToDealer"
        @send:paymentCalculator="onSendPaymentCalculator"
        :summaryData="fixData"
        :requestDealerTitle="fields.RequestQuoteToDealerButtonTitle.value"
        :paymentTitle="fields.PaymentCalculatorButtonTitle.value"
      />
    </div>
    <div class="arrow-button-wrap arrow-button-sticky sticky" :class="{'sticky-btn': stickyBtn}">
      <div class="container arrow-button" v-if="step < $getConst('FINAL_STEP')">
        <button class="i-btn i-btn__secondary" v-if="step > $getConst('SELECT_MODEL_STEP')" @click="prevStep">ย้อนกลับ</button>
        <button class="i-btn i-btn__primary" :class="stepStatus[step + 1] ? '' : 'i-btn__disable'" @click="nextStep">ดำเนินการต่อ</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import SaveQuoteItemMobile from './link-to-save-quotes/SaveQuoteItemMobile';
import GeneralInfomation from './request-quotation-step-5/GeneralInfomation';
import Calculation from './request-quotation-step-5/Calculation';
import FinalInformation from './request-quotation-step-5/FinalInformation';
import RequestQuotationStatus from './status-bar/RequestQuotationStatus';
import RequestQuotationStep1 from './request-quotation-step-1/RequestQuotationStep1';
import RequestQuotationStep2 from './request-quotation-step-2/RequestQuotationStep2';
import RequestQuotationStep3 from './request-quotation-step-3/RequestQuotationStep3';
import RequestQuotationStep4 from './request-quotation-step-4/RequestQuotationStep4';
import WaitingIconRequestQuotation from './waiting-icon/WaitingIconRequestQuotation';
import { isDesktop } from '../../util/dom';
import { mapActions, mapState, mapGetters } from "vuex";

const STICKY_STOP_POINT_DESKTOP = 600;
const STICKY_STOP_POINT_MOBILE = 50;

export default {
  name: 'RequestsQuotation',
  components: {
    SaveQuoteItemMobile: SaveQuoteItemMobile,
    GeneralInfomation: GeneralInfomation,
    RequestQuotationStatus: RequestQuotationStatus,
    RequestQuotationStep1: RequestQuotationStep1,
    RequestQuotationStep2: RequestQuotationStep2,
    RequestQuotationStep3: RequestQuotationStep3,
    RequestQuotationStep4: RequestQuotationStep4,
    Calculation: Calculation,
    FinalInformation: FinalInformation,
    WaitingIconRequestQuotation: WaitingIconRequestQuotation,

  },
  props: {
    fields: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      sticky: false,
      stickyBtn: false,
      isLoading: false,
      STICKY_STOP_POINT: 0,
    };
  },
  watch: {
    // INFO: cannot move this to store, we cannot calculate reselect directly from step
    step: function() {
      this.$nextTick(() => {
        const windowTop = $(window).scrollTop();
        this.STICKY_STOP_POINT = document.querySelector('.fixed-offset')?.offsetTop - 50;
        if (this.STICKY_STOP_POINT < windowTop) {
          this.sticky = true;
          this.stickyBtn = true;
        } else {
          this.sticky = false;
          this.stickyBtn = false;
        }
      });
    },
  },
  mounted() {
    // INFO : scroll to Top after change client route
    window.scrollTo(0, 0);
    
    if (this.isFromSaveQuote) {
      this.updateIsSendFromSaveQuote(false);
    } else {
      this.resetQuotationData();
    }

    this.$nextTick(() => {
      this.STICKY_STOP_POINT = document.querySelector('.fixed-offset')?.offsetTop - 50;
    })

    // INFO: reset the state if user close the tab or reload/redirect
    window.addEventListener("beforeunload", this.onUnloadEvent);
    window.addEventListener("resize", this.onResizeEvent);
    window.addEventListener("scroll", this.onScrollEvent);
  },
  computed: {
    ...mapState('quotation', { carColor: 'carColor'}),
    ...mapState('quotation', { carModel: 'carModel'}),
    ...mapState('quotation', { carGrade: 'carGrade'}),
    ...mapState('quotation', { carInsurance: 'carInsurance'}),
    // ...mapState('quotation', { reselect: 'reselect'}),// INFO: use map Getter from now
    ...mapGetters('quotation', { reselect: 'getReselect'}),
    ...mapState('quotation', { step: 'step'}),
    ...mapState('quotation', { carType: 'carType'}),
    // ...mapState('quotation', { carModelTab: 'carModelTab'}),
    ...mapGetters('quotation', { carModelTab: 'getcarModelTab'}),
    ...mapGetters('quotation', { fixData: 'getFixData'}),
    ...mapGetters('quotation', { stepStatus: 'getStepStatus'}),
    ...mapState('quotation', { isFromSaveQuote: 'isFromSaveQuote'}),
  },
  methods: {
    ...mapActions('quotation', ['updateQuoteToDealerData']),
    ...mapActions('quotation', ['updateCarColorState']),
    ...mapActions('quotation', ['updateCarModelState']),
    ...mapActions('quotation', ['updateCarGradeState']),
    ...mapActions('quotation', ['updateCarInsuranceState']),
    ...mapActions('quotation', ['resetCarInsuranceState']),
    ...mapActions('quotation', ['updateReSelect']),
    ...mapActions('quotation', ['updateStep']),
    ...mapActions('quotation', ['increaseStep']),
    ...mapActions('quotation', ['decreaseStep']),
    ...mapActions('quotation', ['updateCarType']),
    // ...mapActions('quotation', ['updateCarModelTab']),
    ...mapActions('quotation', ['resetQuotationData']),
    ...mapActions('quotation', ['updateIsSendFromSaveQuote']),
    ...mapActions('quotation', ['resetStepState']),
    ...mapActions('quotation', ['resetModifyingQuote']),
    onScrollEvent() {
      const windowTop = $(window).scrollTop();
      this.STICKY_STOP_POINT = document.querySelector('.fixed-offset')?.offsetTop - 50;
      if (this.STICKY_STOP_POINT < windowTop) {
        this.sticky = true;
        this.stickyBtn = true;
      } else {
        this.sticky = false;
        this.stickyBtn = false;
      }
    },
    onResizeEvent() {
      this.$nextTick(() => {
        this.STICKY_STOP_POINT = document.querySelector('.fixed-offset')?.offsetTop - 50;
      })
    },
    resetStep() {
      this.resetStepState();
    },
    clickStep(param) {
      this.updateStep(param);
    },
    nextStep() {
      this.increaseStep();
    },
    prevStep() {
      this.decreaseStep();
    },
    updateCarGrade(carGradeValue) {
      this.updateCarGradeState(carGradeValue);
    },
    updateCarColor(valueCarColor) {
      this.updateCarColorState(valueCarColor);
    },
    updateCarInsurance(carInsuranceValue) {
      this.updateCarInsuranceState(carInsuranceValue);
    },
    resetCarInsurance() {
      this.resetCarInsuranceState();
    },
    updateCarModel(car) {
      this.updateCarModelState(car.carModel);
      this.updateCarType(car.carType);
      // this.updateCarModelTab(car.currentTab);
    },
    onSendQuoteToDealer(quoteData) {
      this.updateQuoteToDealerData(quoteData);
      if(this.fields?.RequestQuoteToDealerButtonLink?.value?.href?.length){
        this.$router.push(this.fields.RequestQuoteToDealerButtonLink.value.href);
      }
      this.resetModifyingQuote();
    },
    updateLoadingStatus(status) {
      this.isLoading = status;
    },
    onSendPaymentCalculator(quoteData){
      this.updateQuoteToDealerData(quoteData);
      if(this.fields?.PaymentCalculatorButtonLink?.value?.href?.length){
        this.$router.push(this.fields.PaymentCalculatorButtonLink.value.href);
      }
    },
    onUnloadEvent() {
      this.resetStep();
      this.resetModifyingQuote();
    }
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.onUnloadEvent);
    window.removeEventListener('resize', this.onResizeEvent);
    window.removeEventListener('scroll', this.onScrollEvent);

    // INFO: we need to reset step or it will affect the banner state ( banner is only display on step 0, and it is reuse in other page as well)
    this.resetStep();
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

button {
  border: none;
  outline: none;
}

.arrow-button-sticky {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: $white;
  box-shadow: 0 -2px 5px rgba($black, 0.2);
  z-index: $HEADER_ZINDEX;
  transform: translateY(100%);
  // INFO: disable this, or we will have jitter when dialog open
  // transition: all 0.3s ease;

  .arrow-button {
    justify-content: space-around;
    padding: 10px 10px;
    
    @include media-breakpoint-up(md) {
      padding: 13px 10px;
    }
  }

  &.sticky-btn {
    transform: translateY(0);
  }
}

.arrow-button {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px 10px;

  @include media-breakpoint-up(md) {
    justify-content: center;

    button {
      margin: 0 11px;
    }
  }

  .i-btn {
    min-width: 114px;
    @include i-btn-padding(5px 17px, 10px 30px, 10px 36px);
    @include media-breakpoint-up(lg) {
      min-width: 176px;
    }
  }

  //Custom follow customer's required
  .i-btn__secondary {
    border: 1px solid $gray-700;

    &:hover {
      border: 1px solid $secondary-bgr-activated;
    }
  }

  // .i-btn__danger {
  //   // border: 1px solid #cd0013;

  //   &:hover {
  //     // border: 1px solid $gray-800;
  //   }
  // }
}
</style>
