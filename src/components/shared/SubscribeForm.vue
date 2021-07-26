<template>
  <div class="">
    <div class="subscription-form">
      <div class="container container-extra">
        <div class="row">
          <div class="col-12 col-md-6">
            <form-email-footer :fields="fields"/>
          </div>
          <div class="col-12 col-md-6">
            <div class="subscription-form__hotline">
              <a :href="'tel:' + (hotlineInfo.ContactNumber && hotlineInfo.ContactNumber.value)" target="_top">
                <sc-image :media="hotlineInfo.Hotline" alt="isuzu hotline"></sc-image>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text, Image } from '@sitecore-jss/sitecore-jss-vue';
import FormEmailFooter from '../footer/FormEmailFooter';

export default {
  name: 'SubscribeForm',
  components: {
    ScText: Text,
    ScImage: Image,
    FormEmailFooter: FormEmailFooter,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      hotlineInfo: {},
    };
  },
  mounted() {
    // TODO: this is temporary solution
    this.$root.$on('footerModel', (hotlineInformation) => {
      this.hotlineInfo = hotlineInformation;
      // INFO : add fall back contact number;
    });
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.subscription-form {
  margin-top: 15px;
  padding: 50px 0;
  background-color: $gray-100;
  width: 100%;

  @include media-breakpoint-up(md) {
    height: 150px;
    display: flex;
    align-items: center;
  }

  @include media-breakpoint-up(lg) {
    padding: 45px 0 40px 0;
    margin-top: 30px;
  }

  // .row {
  //   margin: 0;
  //   .col-12 {
  //     padding: 0;

  //     @include media-breakpoint-up(lg) {
  //       padding: 0 15px;
  //     }
  //   }
  // }

  &__hotline {
    margin-top: 25px;
    padding: 0 30px;

    @include media-breakpoint-up(md) {
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0;
      padding: 0;
      justify-content: flex-end;
    }

    a {
      display: block;
      max-width: 290px;
      margin: 0 auto;
      @include media-breakpoint-up(md) {
        margin: 0;
        max-width: 223px;
      }
      @include media-breakpoint-up(lg) {
        max-width: 290px;
      }
    }
  }
}
</style>
