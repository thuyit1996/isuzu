<template>
  <div class="utility-intro">
    <div class="container no-padding no-container-md">
      <div class="utility-intro__wrap">
        <div class="utility-intro__content animated delay-200" :class="isTitleWhiteColor() ? 'text-white' : ''" v-animate-onscroll="'fadeInUp'">
          <div class="utility-intro__content__heading">
            <sc-rich-text class="utility-intro__content__heading__title" tag="div" :field="fields.Title" />
          </div>
          <sc-text class="utility-intro__content__desc" tag="p" :field="fields.Description" />
        </div>
        <div class="utility-intro__picture delay-500 animated" v-animate-onscroll="'fadeInUp'">
          <sc-image class="d-none d-lg-block" width="100%" :media="fields.Image" />
          <sc-image v-if="!isEditing" class="d-none d-md-block d-lg-none" width="100%" :media="fields.ImageMedium" />
          <sc-image v-if="!isEditing" class="d-md-none" width="100%" :media="fields['Image-sm']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Image, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'ProductImage',
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
  },
  data() {
    return {
      isEditing: false,
    };
  },
  mounted() {
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
  },
  methods: {
    isTitleWhiteColor(){
      return this.fields?.WhiteColorTitle?.value === true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.utility-intro {
  text-align: center;
  font-family: $font-family-eurothai;

  // @include media-breakpoint-up(sm) {
  //   margin-top: 25px;
  // }

  @include media-breakpoint-up(lg) {
    margin: 50px 0;
  }

  // .container {
  //   padding: 0;

  //   @include media-breakpoint-up(xl) {
  //     padding: 0 15px;
  //   }
  // }

  .utility-intro__wrap {
    position: relative;
    height: 0;
    padding-bottom: percentage(566/375); //INFO: Reference to the original page ratio of the customer.
    overflow: hidden;
    max-width: 100%;

    // @include media-breakpoint-up(sm) {
    //   padding-bottom: percentage(300/540);
    // }
    @include media-breakpoint-up(md) {
      padding-bottom: percentage(1024/768);
    }

    @include media-breakpoint-up(lg) {
      padding-bottom: percentage(508/1200);
    }
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
    padding: 45px 15px 25px;
    text-align: center;
    font-size: 4.0rem; // INFO: Follow customer's current site

    @include media-breakpoint-up(md) {
      padding: 70px 50px 35px;
    }

    @include media-breakpoint-up(lg) {
      padding: 40px 50px 35px;
      font-size: 4.8rem; // INFO: Follow customer's current site
    }

    .text-white {
      color: $white;
    }

    &__heading {
      text-align: center;

      &__title {
        font-family: $font-family-eurothai;
        font-weight: bold;
        font-size: 4rem; // INFO: Follow customer's current site
        line-height: 1;
        margin: 0;

        @include media-breakpoint-up(lg) {
          font-size: 4.8rem; // INFO: Follow customer's current site
          line-height: 1.2;
          margin-bottom: 5px;
        }

        @include span-break();
      }
    }

    &__desc {
      margin: auto;
      font-weight: bold;

      @include media-breakpoint-up(md) {
        margin-top: -15px;
      }

      @include media-breakpoint-up(lg) {
        padding: 0 180px;
      }
    }

    &__button {
      display: inline-block;
      padding: 10px 50px;
      color: $white;
      background: $gray-700;
      border-radius: 50px;
      cursor: pointer;

      @include media-breakpoint-up(lg) {
        font-size: 2.4rem;
      }

      &:hover {
        text-decoration: none;
      }
    }
  }

  &__picture {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    >>> img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
