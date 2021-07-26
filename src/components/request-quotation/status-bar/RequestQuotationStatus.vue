<template>
  <div>
    <div class="request-quotation-status" :class="{'sticky': sticky}">
      <general-infomation-fix
      :fixData="fixData"></general-infomation-fix>
      <request-quotation-status-bar :totalQuotOnLocalStorage="totalQuotOnLocalStorage" :stepModel="stepModel" :stepStatus="stepStatus" :step="step" @stepChoose="chooseStep" :saveAquoteLinkBar="saveAquoteLink"></request-quotation-status-bar>
    </div>
    <div class="request-quotation-status fixed-offset">
      <request-quotation-status-bar :totalQuotOnLocalStorage="totalQuotOnLocalStorage" :stepModel="stepModel" :stepStatus="stepStatus" :step="step" @stepChoose="chooseStep" :saveAquoteLinkBar="saveAquoteLink"></request-quotation-status-bar>
    </div>

  </div>

</template>

<script>
import RequestQuotationStatusBar from './RequestQuotationStatusBar';
import GeneralInfomationFix from './GeneralInfomationFix';
import { mapGetters } from "vuex";
export default {
  name: 'RequestQuotationStatus',
  components: {
    GeneralInfomationFix: GeneralInfomationFix,
    RequestQuotationStatusBar: RequestQuotationStatusBar,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    step: Number,
    sticky: Boolean,
    fixData: Object,
    stepStatus: Array,
    stepModel: Object,
    saveAquoteLink: Object,
  },
  methods: {
    chooseStep(param) {
      this.$emit('stepChoose', param);
    },
  },
  computed: {
    ...mapGetters('savequote', { totalQuotOnLocalStorage: 'getSaveQuoteListLength' }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';

.request-quotation-status {
  font-size: 1.3rem; //INFO: Temporarily set font-size like that so as not to break the layout.
  // INFO: It should be smaller than 375px ( iphoneX )
  @media screen and (max-width: 370px) {
    font-size: 1.1rem; //INFO: Temporarily set font-size like that so as not to break the layout.
  }

  @include media-breakpoint-up(sm) {
    font-size: 1.6rem; //INFO: Temporarily set font-size like that so as not to break the layout.
  }

  @include media-breakpoint-up(xl) {
    font-size: $font-size-base;
  }

  &:not(.fixed-offset) {
    position: fixed;
    top: -200px;
    left: 0;
    z-index: $HEADER_ZINDEX;
    transition: top .5s ease-in-out;
  }

  width: 100%;
  background-color: $white;
  box-shadow: 0 2px 5px rgba($black, 0.2);

  &.sticky {
    top: 0px;
  }

  >>> .nav-tabs {
    border: none;
    justify-content: space-between;

    @include media-breakpoint-up(md) {
      justify-content: flex-start;
    }
  }

  >>> .nav-link {
    padding: 15px 0 10px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 0;

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
    // INFO: It should be smaller than 375px ( iphoneX )
    @media screen and (max-width: 370px) {
      margin-right: 10px;
    }

    @include media-breakpoint-up(lg) {
      margin-right: 38px;
      padding: 20px 0 15px;
    }

    &.active {
      background: $white;
      border-bottom: 1px $red-hover-color solid;

      @include media-breakpoint-up(lg) {
        border-bottom: 2px $red-hover-color solid;
      }
    }
  }
}

</style>
