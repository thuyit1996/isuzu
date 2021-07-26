<template>
  <div class="campaign-loading">
    <div class="container">
      <div class="campaign-loading__image d-block  cam-loading"></div>
      <div class="campaign-loading__content">
        <div class="campaign-loading__content__title d-none d-md-block cam-loading"></div>
        <div class="campaign-loading__content__view-more cam-loading"></div>
        <div class="campaign-loading__button">
          <div class="campaign-loading__button__item cam-loading"></div>
          <div class="campaign-loading__button__item cam-loading"></div>
          <div class="campaign-loading__button__item cam-loading"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'CampaignLoading',
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
@import '../../assets/reuse-mixin';

.campaign-loading {
  padding: 50px 0 5px;

  .container {
    display: block;

    @include media-breakpoint-up(lg) {
      display: flex;
    }
  }

  &__image {
    width: 100%;
    height: 160px;
    margin-bottom: 20px;

    @include media-breakpoint-up(md) {
      height: 388px;
    }

    @include media-breakpoint-up(lg) {
      width: 372px;
      height: 210px;
    }

    @include media-breakpoint-up(xl) {
      width: 468px;
      height: 263px;
    }
  }

  &__content {
    width: 100%;

    @include media-breakpoint-up(sm) {
      width: auto;

      &__paragraph {
        width: 400px;
      }
    }

    @include media-breakpoint-up(md) {
      margin-left: 0;

      &__title {
        width: 550px;

        @include media-breakpoint-up(lg) {
          width: 510px;
        }

        @include media-breakpoint-up(xl) {
          width: 550px;
        }
      }

      &__paragraph {
        width: 500px;
      }
    }

    @include media-breakpoint-up(lg) {
      margin-left: 30px;
    }

    &__title {
      height: 30px;
      margin-bottom: 40px;
      border-radius: 50px;

      @include media-breakpoint-up(md) {
        margin-bottom: 30px;
      }

      @include media-breakpoint-up(lg) {
        margin-bottom: 50px;
      }
    }

    &__paragraph {
      height: 20px;
      margin-bottom: 30px;
      border-radius: 50px;
    }

    &__view-more {
      margin-top: 30px;
      width: 170px;
      height: 25px;
      border-radius: 50px;

      @include media-breakpoint-up(lg) {
        margin-top: 35px;
      }
    }
  }

  &__button {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 30px;

    @include media-breakpoint-up(lg) {
      margin-top: 50px;
    }

    &__item {
      padding: 0;
      margin: 0 20px 16px 0;
      width: 135px;
      height: 30px;
      justify-content: center;
      align-items: center;
      border-radius: 50px;

      @include media-breakpoint-up(sm) {
        margin: 0 15px 16px 0;
        width: 152px;
      }

      @include media-breakpoint-up(md) {
        height: 40px;
        margin-top: 30px;
        margin: 0 18px 16px 0px;
       
      }

      @include media-breakpoint-up(lg) {
        max-width: 174px;

      } 
    }
  }

  .cam-loading {
    display: block;
    background: #ECE9E6;
    background: linear-gradient(to right,  #fcfafa,  #e6e3df59 , #fcfafa );
    background-position-x: 0px;
    background-repeat: repeat;
    animation: campaign-loading 3s linear infinite;
  }

  @keyframes campaign-loading {
    0%   {background-position-x: 0px;}
    25%  {background-position-x: 250px;}
    50%  {background-position-x: 500px;}
    75%  {background-position-x: 750px;}
    100% {background-position-x: 1000px;}
  }
}
</style>
