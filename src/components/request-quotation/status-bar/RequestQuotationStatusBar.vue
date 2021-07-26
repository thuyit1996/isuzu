<template>
  <div class="container">
    <div class="request-quotation-status__wrap">
      <b-tabs class="request-quotation-status__tabs">
        <b-tab :active="step==0" class="request-quotation-status__tabs__item" @click.prevent="chooseStep(0)">
          <template slot="title">
            <sc-text tag="span" class="request-quotation-status__tabs__item__title" :field="stepModel.Steps[0].fields.Title" />
          </template>
        </b-tab>
        <b-tab :active="step==1" class="request-quotation-status__tabs__item" :disabled="!stepStatus[1]" @click.prevent="chooseStep(1)">
          <template slot="title">
            <sc-text tag="span" class="request-quotation-status__tabs__item__title" :field="stepModel.Steps[1].fields.Title" />
          </template>
        </b-tab>
        <b-tab :active="step==2" class="request-quotation-status__tabs__item" :disabled="!stepStatus[2]" @click.prevent="chooseStep(2)">
          <template slot="title">
            <sc-text tag="span" class="request-quotation-status__tabs__item__title" :field="stepModel.Steps[2].fields.Title" />
          </template>
        </b-tab>
        <b-tab :active="step==3" class="request-quotation-status__tabs__item" :disabled="!stepStatus[3]" @click.prevent="chooseStep(3)">
          <template slot="title">
            <sc-text tag="span" class="request-quotation-status__tabs__item__title" :field="stepModel.Steps[3].fields.Title" />
          </template>
        </b-tab>
        <b-tab :active="step==4" class="request-quotation-status__tabs__item" :disabled="!stepStatus[4]" @click.prevent="chooseStep(4)">
          <template slot="title">
            <sc-text tag="span" class="request-quotation-status__tabs__item__title" :field="stepModel.Steps[4].fields.Title" />
          </template>
        </b-tab>
      </b-tabs>
      <div class="request-quotation-status__archived" @click.prevent="navigateTo">
        <span class="request-quotation-status__archived__title">ใบประเมินราคาที่เก็บไว้</span>
        <div class="request-quotation-status__archived__icon">
          <img src="../../../assets/icon-quotation-save.svg" alt="icon-quotation-save">
        </div>
        <div class="request-quotation-status__archived__number" v-if="totalQuotOnLocalStorage > 0">
          <span>{{totalQuotOnLocalStorage}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
export default {
  name: 'RequestQuotationStatusBar',
  components: {
    ScText: Text,
  },
  props: {
    stepStatus: Array,
    step: Number,
    stepModel: Object,
    totalQuotOnLocalStorage: 0,
    saveAquoteLinkBar: Object,
  },
  methods: {
    navigateTo() {
      if (this.saveAquoteLinkBar?.value?.href?.length) {
        this.$router.push(this.saveAquoteLinkBar.value.href);
      }
    },
    chooseStep(param) {
      this.$emit('stepChoose', param);
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';

.request-quotation-status {
  &__wrap {
    width: 100%;
    display: flex;
    justify-content: space-between;

    @include media-breakpoint-up(lg) {
      padding: 0 110px;
    }
  }

  &__tabs {
    width: 100%;

    @include media-breakpoint-up(md) {
      width: auto;
    }

    &__item {
      &.disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      &__title {
        color: $gray-900;
      }
    }
  }

  &__archived {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 6px;
    display: none;

    @include media-breakpoint-up(md) {
      padding-left: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      width: 1px;
      height: 20px;
      background: $gray-300;

      @include media-breakpoint-up(lg) {
        height: 35px;
      }
    }

    &__title {
      display: inline-block;
      margin-right: 5px;
    }

    &__number {
      display: inline-block;
      position: relative;
      width: 17px;
      height: 17px;
      color: $white;
      background: #cd0002;
      border-radius: 50%;
      margin-bottom: 20px;

      span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 1.6rem;
      }
    }
  }

  // >>> .nav-tabs {
  //   border: none;
  //   justify-content: space-between;

  //   @include media-breakpoint-up(md) {
  //     justify-content: flex-start;
  //   }
  // }

  // >>> .nav-link {
  //   padding: 15px 0 10px;
  //   margin-right: 12px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   border: none;
  //   border-radius: 0;

  //   &.disabled {
  //     opacity: 0.5;
  //     pointer-events: none;
  //   }
  //   // INFO: It should be smaller than 375px ( iphoneX )
  //   @media screen and (max-width: 370px) {
  //     margin-right: 10px;
  //   }

  //   @include media-breakpoint-up(lg) {
  //     margin-right: 38px;
  //     padding: 20px 0 15px;
  //   }

  //   &.active {
  //     background: $white;
  //     border-bottom: 1px #ed2117 solid;

  //     @include media-breakpoint-up(lg) {
  //       border-bottom: 2px #ed2117 solid;
  //     }
  //   }
  // }
}
</style>