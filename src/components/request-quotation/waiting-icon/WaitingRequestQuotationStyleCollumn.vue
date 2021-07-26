<template>
  <div class="request-quotation-loading">
    <div class="container">
      <div class="request-quotation-loading__step-1 row">
        <div class="col-12">
          <div class="request-quotation-loading__step-1__heading waiting-icon"></div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="request-quotation-loading__step-1__image waiting-icon"></div>
          <div class="request-quotation-loading__step-1__title waiting-icon"></div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="request-quotation-loading__step-1__image waiting-icon"></div>
          <div class="request-quotation-loading__step-1__title waiting-icon"></div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="request-quotation-loading__step-1__image waiting-icon"></div>
          <div class="request-quotation-loading__step-1__title waiting-icon"></div>
        </div>
        <div class="col-6 col-sm-3">
          <div class="request-quotation-loading__step-1__image waiting-icon"></div>
          <div class="request-quotation-loading__step-1__title waiting-icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'WaitingRequestQuotationStyleCollumn',
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
  animation: waiting-icon 7s linear infinite;

  @include media-breakpoint-up(lg) {
    animation: waiting-icon 5s linear infinite;
  }
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

  &__step-1 {
    margin-bottom: 50px;

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

    &__image {
      // width: 280px;
      height: 130px;
      margin-bottom: 12px;
      border-radius: 10px;

      @include media-breakpoint-up(lg) {
        height: 180px;
        margin-bottom: 25px;
      }
    }

    &__title {
      // width: 280px;
      height: 20px;
      margin-bottom: 25px;
      border-radius: 15px;

      @include media-breakpoint-up(lg) {
        height: 30px;
        margin-bottom: 30px;
      }
    }
  }
}

</style>