<template>
  <div class="subscription-form__email">
    <sitecore-form :fields="fields"></sitecore-form>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import SitecoreForm from '../shared/SitecoreForm';
export default {
  name: 'FormEmailFooter',
  components: {
    ScText: Text,
    SitecoreForm: SitecoreForm
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

.subscription-form__email {
  > div {
    @include media-breakpoint-up(lg) {
      display: inline-block;
    }

    position: relative;
  }

  h5 {
    margin: 0 10px 10px;
    color: #8d8d8d;

    @include media-breakpoint-up(lg) {
      color: $gray-700;
    }
  }

  .i-btn__small {
    padding: 11px 20px;
  }

  >>> &__label {
    display: block;
    font-size: 2.4rem;
    color: #8d8d8d;
    position: absolute;
    top: -5px;
    left: 20px;

    @include media-breakpoint-up(md) {
      color: #666666;
      top: 15px;
    }
  }

  >>> &__input {
    input {
      border-radius: 50px;
      border: 1px solid #d9d9d9;
      width: 100%;
      height: 40px;
      padding: 9px 20px;
      position: relative;
      outline: none;

      &:focus {
        border-color: $gray-600;
      }

      @include media-breakpoint-up(md) {
        width: 300px;
      }

      @include media-breakpoint-up(lg) {
        width: 380px;
        height: 44px;
        padding: 8px 25px;
        border: 1px solid #b7b7b7; 
      }
    }
  }

  >>> &__button {
    position: absolute;
    border: none;
    outline: none;
    right: 0;
    bottom: 0;
  }

  ::placeholder {
    color:#b8b8b8;
    font-size: $font-size-subscribe-form-mobile;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-subscribe-form-desktop;
    }
  }

  >>> .campaign-form {
    position: relative;
    flex-wrap: nowrap;
    padding-top: 30px;

    @include media-breakpoint-up(md) {
      padding-top: 50px;
    }
  }

  >>> .form-group-button {
    position: absolute;
    border: none;
    outline: none;
    right: 0;
    bottom: 0;
    width: auto;

    button {
      height: 40px;
      min-width: 100px;
      padding: 10px 30px;
      // background: $gray-500;
      // color: $white;
      border: none;

      // &:hover {
      //   background: #626262;
      // }

      @include media-breakpoint-up(lg) {
        height: 44px;
        min-width: 110px;
        padding: 10px 25px;
      }
    }
  }

  >>> .error-required,
  >>> .error-invalid {
    position: absolute;
    left: 20px;
    bottom: -6px;
    white-space: nowrap;

    @include media-breakpoint-up(lg) {
      bottom: -12px;
    }
  }
}
</style>