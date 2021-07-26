<template>
  <div class="container">
    <div class="campaign-form__wrap" :id="signupFormId">
      <div class="campaign-form__content">
        <sitecore-form :fields="fields"></sitecore-form>
      </div>
    </div>

  </div>
</template>

<script>
import SitecoreForm from '../shared/SitecoreForm';

export default {
  name: 'SignupForm',
  components: {
    SitecoreForm: SitecoreForm,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      signupFormId: this.$getConst('SIGNUP_FORM_ID'),
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

>>> .campaign-form {
  &__wrap {
    padding: 70px 25px 30px;
    margin: 40px 0 100px;
    border: 2.5px solid $gray-200;
    display: none;

    @include media-breakpoint-up(lg) {
      padding: 70px 90px 10px;
      margin: 105px 90px 120px;
      border: 5px solid $gray-200;
    }
  }
}
</style>

