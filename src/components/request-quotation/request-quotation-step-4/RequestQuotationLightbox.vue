<template>
  <div class="light-box" :id="popUpId">
    <div class="container">
      <div class="light-box__modal">
        <div class="light-box__heading">
          <div class="light-box__heading__img">
            <img src="../../../assets/img-light-box.png" alt="#">
          </div>
          <div class="light-box__heading__title">
            <sc-text tag="h2"  :field="carInsuranceSelect.Title" />
            <sc-text class="light-box__heading__title__detail" tag="h4"  :field="carInsuranceSelect.ShortDescription" />
          </div>
        </div>
        <div class="light-box__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'RequestQuotationLightbox',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    popUpId : {
      type: Number,
    },
    carInsuranceSelect: Object,
  },
}
</script>
<style lang="scss" scoped>
@import '../../../assets/reuse-mixin.scss';
.light-box {

  &__modal {
    background-color: #fefefe;
    margin: auto;
    width: 100%;
    height: auto;
  }

  &__heading {
    display: block;

    @include media-breakpoint-up(lg) {
      display: flex;
    }


    &__img {
      width: 100%;
      img {
        width: 100%;
      }

      @include media-breakpoint-up(lg) {
        width: 25%;
      }
    }

    &__title {
      width: 100%;
      margin: 10px 0 15px;

      @include media-breakpoint-up(lg) {
        width: 75%;
        margin: 0 0 0 30px;
      }

      &__detail {
        @include media-breakpoint-down(md) {
          font-size: $font-size-mobile;
        }

        p {
          margin: 0;
        }
      }
    }
  }

  &__content {
    padding: 0;

    @include media-breakpoint-up(lg) {
      padding: 30px 70px 30px 55px;
    }

    &__item {
      margin-bottom: 20px;

      @include media-breakpoint-up(lg) {
        margin-bottom: 0;
      }

      &__highlight {
        font-weight: $font-weight-bold;
      }
    }

    &__note {
      font-size: 1.15rem; //INFO: follow fontsize of design

      @include media-breakpoint-up(lg) {
        font-size: 1.9rem; //INFO: follow fontsize of design
      }
    }
  }

  .note-highlight {
    font-weight: $font-weight-bold;
  }

  h2 {
    @include media-breakpoint-down(md) {
      font-size: 2.4rem; //INFO: follow fontsize of design
    }
  }
}
</style>
