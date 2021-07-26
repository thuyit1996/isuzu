<template>
  <div class="request-quotation-loading">
    <waiting-request-quotation-style-collumn v-show="type === 'column'"></waiting-request-quotation-style-collumn>
    <waiting-request-quotation-style-row v-show="type === 'row'"></waiting-request-quotation-style-row>
  </div>
</template>

<script>
import WaitingRequestQuotationStyleCollumn from './WaitingRequestQuotationStyleCollumn';
import WaitingRequestQuotationStyleRow from './WaitingRequestQuotationStyleRow';

export default {
  name: 'WaitingIconRequestQuotation',
  components: {
    WaitingRequestQuotationStyleRow: WaitingRequestQuotationStyleRow,
    WaitingRequestQuotationStyleCollumn: WaitingRequestQuotationStyleCollumn,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'row',
    }
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

  &__step-1 {
    margin-bottom: 50px;
    &__image {
      width: 280px;
      height: 180px;
      margin-bottom: 30px;
    }

    &__title {
      width: 280px;
      height: 35px;
    }
  }

  &__step-2 {
    &__box {
      width: 1000px;
      height: 180px;
      position: relative;
      animation: waiting-icon 0.5s linear infinite;
    }

    &__checkbox {
      position: absolute;
      top: -30px;
      right: -30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      animation: waiting-icon 10s linear infinite;
    }
  }
}

</style>