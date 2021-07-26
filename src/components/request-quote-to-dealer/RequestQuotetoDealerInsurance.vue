<template>
  <div class="bonus-services">
    <div class="container">
      <div class="bonus-services__heading">
        <span class="bonus-services__heading__number">02</span>
        <div class="text-center">
          <sc-text class="isu-title" tag="h2" :field="fields.Title" />
        </div>
      </div>
      <div class="bonus-services__select">
        <label for="insuranceValue" class="bonus-services__select__label"> ประกันรถยนต์</label>
        <isu-input
          :typeInput="'text'"
          :valInput="finalQuote.carInsurance.title ? finalQuote.carInsurance.title : 'ไม่มีประกัน'"
          :required="false"
          :disabled="true"
          :nameInput="'insuranceValue'"
          :formGroupName="'userAccount'"
          :formControlName="'Insurance'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import IsuInput from '../shared/IsuInput';
import { mapState } from 'vuex';

export default {
  name: 'RequestQuotetoDealerInsurance',
  components: {
    ScText: Text,
    IsuInput,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      insuranceValue: '',
    };
  },
  mounted() {},
  computed: {
    ...mapState('quotation', { finalQuote: 'quoteToDealerData' }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.bonus-services {
  margin: 75px 0 154px 0;

  @include media-breakpoint-up(lg) {
    margin: 60px 0 123px 0;
  }

  &__heading {
    text-align: center;
    margin-bottom: 22px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 32px;
    }

    &__number {
      display: block;
      font-size: 5rem;
      line-height: 2.4rem; //INFO: Line-height follow as the design
      color: #cccccc;
      margin-bottom: 8px;

      @include media-breakpoint-up(lg) {
        font-size: 6rem;
        line-height: 4.8rem; //INFO: Line-height follow as the design
        margin-bottom: 2px;
      }
    }
  }

  &__select {
    margin-bottom: 80px;

    @include media-breakpoint-up(md) {
      display: flex;
      justify-content: center;
      transform: translateX(-50px);
    }

    @include media-breakpoint-up(lg) {
      transform: translateX(-60px);
      margin-bottom: 60px;
    }

    &__label {
      display: inline-block;
      margin-bottom: 10px;

      @include media-breakpoint-up(md) {
        padding-top: 6px;
        margin-right: 20px;
      }
    }
  }

  &__image {
    text-align: center;
    padding: 0 30px;

    @include media-breakpoint-up(lg) {
      padding: 0;
    }
  }

  .asterisk {
    color: #ef3f36;
    font-size: $font-size-base;
  }

  >>> .isu-input {
    width: 100%;

    @include media-breakpoint-up(md) {
      width: 220px;
    }

    @include media-breakpoint-up(lg) {
      width: 360px;
    }
  }
}
</style>
