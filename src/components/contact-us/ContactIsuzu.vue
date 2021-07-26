<template>
  <div class="campaign-form__wrap" id="campaign-form">
    <div class="container">
      <div class="campaign-form__wrap__container">
        <!-- <div class="campaign-form__title">
          <h3 class="campaign-form__title__heading"> สมัครรับข่าวสาร เกี่ยวกับข้อเสนอพิเศษ </h3>
        </div> -->
        <div class="campaign-form__content">
          <sitecore-form :fields="fields" :formName="'contactUs'"></sitecore-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import SitecoreForm from '../shared/SitecoreForm';
export default {
  name: 'ContactIsuzu',
  components: {
    SitecoreForm: SitecoreForm,
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
@import '../../assets/reuse-mixin.scss';

.campaign-form {
  &__wrap {
    padding: 50px 0;
    background: $gray-100;
    border: none;

    &__container {
      @include media-breakpoint-up(lg) {
        padding: 0 90px;
      }
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 15px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 25px;
    }

    &__heading {
      display: inline-block;
      position: relative;
      padding: 0 12px;
      max-width: 210px;

      @include media-breakpoint-up(lg) {
        padding: 0 20px;
        max-width: 100%;
      }

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 25px;
        height: 1px;
        background: #ed2117;

        @include media-breakpoint-up(lg) {
          height: 2px;
          width: 50px;
        }
      }

      &::before {
        left: 100%;
      }

      &::after {
        right: 100%;
      }
    }
  }

  &__content {
    .form-group {
      width: 100%;
      margin-bottom: 25px;

      .form-label {
        display: block;
      }

      .form-input {
        width: 100%;
        padding: 6px 10px;
      }
    }
  }

  .checkbox-custom {
    position: relative;
    cursor: pointer;
    color: #8f8f8f;
    margin: 0 -20px 0 -3px;

    @include media-breakpoint-up(lg) {
      margin: 0;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      color: #8f8f8f;
      margin: 0 -20px 0 -3px;

      @include media-breakpoint-up(lg) {
        margin: 0;
      }
    }

    .checkmark {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -15px;
      height: 10px;
      width: 10px;
      border: 0.5px solid #dfdfdf;
      border-radius: 50%;

      @include media-breakpoint-up(lg) {
        height: 20px;
        width: 20px;
        left: -30px;
        border: 2px solid #dfdfdf;
      }

      &::after {
        content: '';
        display: none;
        position: absolute;
        background: red;
        border-radius: 50%;
        width: 5px;
        height: 5px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        @include media-breakpoint-up(lg) {
          height: 8px;
          width: 8px;
        }
      }
    }
  }

  .form-button {
    padding: 4px 0;
    min-width: 152px;
    color: $white;
    background: $gray-700;
    border-radius: 50px;
    cursor: pointer;
    border: none;

    @include media-breakpoint-up(lg) {
      padding: 10px 0;
      min-width: 175px;
    }
  }

  .asterisk {
    color: #cd0002;
  }

  .text-center {
    text-align: center;
  }
}
</style>