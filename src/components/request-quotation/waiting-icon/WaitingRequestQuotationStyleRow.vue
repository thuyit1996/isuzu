<template>
  <div class="request-quotation-loading">
    <div class="container">
      <div class="request-quotation-loading__step-2">
        <div class="request-quotation-loading__step-2__heading waiting-icon"></div>
        <div class="request-quotation-loading__step-2__box waiting-icon">
          <div class="request-quotation-loading__step-2__checkbox waiting-icon"></div>
        </div>
        <div class="request-quotation-loading__step-2__box waiting-icon">
          <div class="request-quotation-loading__step-2__checkbox waiting-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'WaitingRequestQuotationStyleRow',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/reuse-mixin';

.waiting-icon {
  background: #ECE9E6;
  background: linear-gradient(to right,  #fcfafa,  #e6e3df59 , #fcfafa );
  background-position-x: 0px;
  background-repeat: repeat;
  animation: waiting-icon 3s linear infinite;
}

@keyframes waiting-icon {
  0%   {background-position-x: 0px;}
  25%  {background-position-x: 250px;}
  50%  {background-position-x: 500px;}
  75%  {background-position-x: 750px;}
  100% {background-position-x: 1000px;}
}

.request-quotation-loading {
  margin: 50px 0;

  &__step-2 {
    &__heading {
      width: 50%;
      height: 30px;
      margin: 0 auto 45px;
      border-radius: 18px;

      @include media-breakpoint-up(lg) {
        height: 40px;
        width: 35%;
        margin: 0 auto 70px;
      }
    }

    &__box {
      position: relative;
      margin: 30px 0;
      border-radius: 8px;
      width: 100%;
      height: 95px;
      position: relative;
      animation: waiting-icon 5s linear infinite;

      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background: #ccc;
        position: absolute;
        bottom: 20%;
        left: 0;
        opacity: 0.15;
      }

      @include media-breakpoint-up(lg) {
        margin: 30px 0 50px;
        height: 180px;
        animation: waiting-icon 0.75s linear infinite;
      }
    }

    &__checkbox {
      position: absolute;
      top: -12px;
      right: -12px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      animation: waiting-icon 50s linear infinite;

      @include media-breakpoint-up(lg) {
        top: -24px;
        right: -24px;
        width: 48px;
        height: 48px;
        animation: waiting-icon 30s linear infinite;
      }
    }
  }
}

</style>