<template>
  <div class="isuzu-experience" :id="fields.TargetId && fields.TargetId.fields.Name.value">
    <div class="container">
      <div class="isuzu-experience__content delay-500 animated" v-animate-onscroll="'fadeInUp-big'">
        <div class="isuzu-experience__content__heading title-homepage-top">
          <sc-rich-text class="isu-title" tag="h2" :field="fields.Title" />
        </div>
        <sc-rich-text class="isuzu-experience__content__desc" tag="p" :field="fields.Description" />
        <isu-button-link :field="fields.Url">
          <sc-link class="isuzu-experience__content__button i-btn i-btn__primary" :field="fields.Url"/>
        </isu-button-link>
      </div>
    </div>
    <a :href="(fields.Url.value && fields.Url.value.href) ? fields.Url.value.href : '/'" :target="fields.Url.value && fields.Url.value.target" class="isuzu-experience__picture " >
      <template v-if="isEditing">
        <sc-image class="d-none d-sm-block" :media="fields.Image" style="width:100%"/>
      </template>
      <LazyloadPictureItem v-else :fields="fields" :ratioLg="'37.36'" class="delay-500 animated" v-animate-onscroll="'fadeInUp'"></LazyloadPictureItem>
    </a>
  </div>
</template>

<script>
import { Link, Image, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import IsuButtonLink from '../shared/IsuButtonLink';
import LazyloadPictureItem from '../shared/LazyloadPictureItem';

export default {
  name: 'CTAFeature',
  components: {
    ScLink: Link,
    ScImage: Image,
    ScText: Text,
    ScRichText: RichText,
    IsuButtonLink: IsuButtonLink,
    LazyloadPictureItem: LazyloadPictureItem
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
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.isuzu-experience {
  text-align: center;

  &__content {
    padding-bottom: 30px;

    &__heading {
      text-align: center;

    }

    &__desc {
      max-width: 700px;
      margin: 20px auto;
      font-size: $font-size-cta-desc-mobile;

      @include media-breakpoint-up(lg) {
        margin: 10px auto 20px;
        font-size: $font-size-base;
      }

      @include span-break();
    }
  }

}
</style>
