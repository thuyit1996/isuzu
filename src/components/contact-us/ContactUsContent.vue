<template>
  <div class="isuzu-info-contact-content">
    <div class="isuzu-info-contact-content__informations">
      <div class="isuzu-info-contact-content__informations__group isuzu-info-contact-content__informations__address" v-if="checkHeadOffice() && contactUs.HeadOffice.fields.Address && contactUs.HeadOffice.fields.Address.value">
        <div class="isuzu-info-contact-content__informations__group__icon">
          <img src="../../assets/address-icon.svg" alt="x">
        </div>
        <div class="isuzu-info-contact-content__informations__group__text">
          <sc-text v-if="checkHeadOffice()" tag="div" :field="contactUs.HeadOffice.fields.Name" class="isuzu-info-contact-content__informations__group__text__name"/>
          <sc-rich-text v-if="checkHeadOffice()" tag="div" :field="contactUs.HeadOffice.fields.Address" />
        </div>
      </div>
      <div class="isuzu-info-contact-content__informations__phone-email">
        <div class="isuzu-info-contact-content__informations__group" v-if="checkHeadOffice() && contactUs.HeadOffice.fields.Phone && contactUs.HeadOffice.fields.Phone.value">
          <div class="isuzu-info-contact-content__informations__group__icon">
            <a>
              <img src="../../assets/phone-icon.svg" alt="x">
            </a>
          </div>
          <div class="isuzu-info-contact-content__informations__group__text">
            <div class="isuzu-info-contact-content__informations__group__label">
              <sc-text tag="span" :field="contactUs.PhoneTitle" class="isuzu-info-contact-content__informations__group__text__contact"/>
              <!-- <span> : </span> -->
            </div>
            <div>
              <a v-for="(phoneNumber, index) in getPhoneNumbers" :key="index" :href="'tel:' + phoneNumber" target="_top">{{phoneNumber}}</a>
            </div>
          </div>
        </div>
        <div class="isuzu-info-contact-content__informations__group" v-if="checkHeadOffice() && contactUs.HeadOffice.fields.Email && contactUs.HeadOffice.fields.Email.value">
          <div class="isuzu-info-contact-content__informations__group__icon">
            <a :href="'mailto:' + contactUs.HeadOffice.fields.Email.value" target="_top">
              <img src="../../assets/email-icon.svg" alt="x">
            </a>
          </div>
          <div class="isuzu-info-contact-content__informations__group__text">
            <div class="isuzu-info-contact-content__informations__group__label">
              <sc-text tag="span" :field="contactUs.EmailTitle" class="isuzu-info-contact-content__informations__group__text__contact"/>
              <!-- <span> : </span> -->
            </div>
            <div>
              <a :href="'mailto:' + contactUs.HeadOffice.fields.Email.value" target="_top"><sc-text :field="contactUs.HeadOffice.fields.Email"/></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="isuzu-info-contact-content__hotline" v-if="checkHeadOffice()">
      <a :href="'tel:' + getHotline(contactUs.HeadOffice.fields)" target="_top">
        <sc-image :media="contactUs.HeadOffice.fields.Image" alt="hotline"/>
      </a>
    </div>
  </div>
</template>

<script>
import { Image, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'ContactUsContent',
  components: {
    ScImage: Image,
    ScText: Text,
    ScRichText: RichText,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    contactUs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      getPhoneNumbers: [],
    };
  },
  mounted() {
    this.getPhoneNumbers = this.split(this.contactUs?.HeadOffice?.fields?.Phone?.value || []);
  },
  methods: {
    split(element) {
      if (element) return element.toString().split(',');
      return [];
    },
    getHotline(hotline) {
      return hotline?.Hotline?.value || '';
    },
    checkHeadOffice() {
      return this.contactUs?.HeadOffice?.fields;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
.isuzu-info-contact-content {
  &__informations {
    padding: 35px 0;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;

    @include media-breakpoint-up(sm) {
      padding: 45px 0;
      padding-left: 30px;
    }

    @include media-breakpoint-up(md) {
      display: flex;
      padding: 35px 0 15px;
    }

    @include media-breakpoint-up(lg) {
      display: block;
      padding: 45px 0;
      padding-left: 30px;
    }

    &__address {
      @include media-breakpoint-up(md) {
        width: 50%;
      }

      @include media-breakpoint-up(lg) {
        width: auto;
      }
    }

    &__group {
      display: flex;
      margin-bottom: 14px;
      line-height: 1.8rem; //INFO: Line-height follow as the design

      @include media-breakpoint-up(sm) {
        line-height: 3rem; //INFO: Line-height follow as the design
        margin-bottom: 30px;
      }

      @include media-breakpoint-up(md) {
        margin-bottom: 15px;
      }

      @include media-breakpoint-up(lg) {
        margin-bottom: 30px;
      }

      &:last-child {
        margin-bottom: 0;
      }

      &__label {
        display: inline;

        @include media-breakpoint-up(md) {
          display: block;
        }

        @include media-breakpoint-up(lg) {
          display: inline;
        }
      }

      &__icon {
        width: 25px;

        @include media-breakpoint-up(sm) {
          width: 35px;
          text-align: center;
        }

        img {
          max-width: 24px;

          @include media-breakpoint-up(sm) {
            max-width: 32px;
          }
        }
      }

      &__text {
        width: calc(100% - 25px);
        margin: 3px 0 0 8px;

        @include media-breakpoint-up(sm) {
          width: calc(100% - 35px);
        }

        @include media-breakpoint-up(lg) {
          max-width: 320px;
          margin: 0 0 0 8px;
        }

        &__name {
          font-size: 2.4rem;
          line-height: 2.4rem; //INFO: Line-height follow as the design
          margin-bottom: 10px;

          @include media-breakpoint-up(sm) {
            font-size: 3rem;
            line-height: 3.6rem; //INFO: Line-height follow as the design
          }
        }

        a {
          &::after {
            content: ',';
          }

          &:hover {
            color: $red-hover-color;
          }

          &:last-child {
            &::after {
              content: '';
            }
          }
        }

        &__contact {
          font-size: 2.4rem;
        }
      }
    }
  }

  &__hotline {
    padding: 35px 0;
    margin-bottom: 60px;
    border-bottom: 1px solid #d9d9d9;

    img {
      max-height: 100px;

      @include media-breakpoint-up(md) {
        max-height: 120px;
      }

      @include media-breakpoint-up(lg) {
        max-height: 110px;
      }
    }

    @include media-breakpoint-up(sm) {
      padding: 38px 0;
      padding-left: 30px;
    }
    
    @include media-breakpoint-up(lg) {
      margin-bottom: 0;
    }
  }

  a {
    color: $black;
  }
}
</style>
