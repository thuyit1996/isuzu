<template>
  <!-- INFO: don't use v-if here, because we need $refs to have value when component re-render -->
  <div class="campaign-hero-banner loading" v-show="step === 0" :class="{'request-quotation-banner': checkRequestQuotation}">
    <div class="campaign-hero-banner__content">
      <span ref="loading" class="loading-icon"></span>
      <img
        v-if="detectMobile === true"
        :src="fields.FallbackMobileImage && fields.FallbackMobileImage.value &&fields.FallbackMobileImage.value.src"
        class="image-thumb tiny"
        :alt="'image thumb'"
        ref="imageThumb"
        data-type="mobile-image"
      />
      <img
        v-else-if="detectTablet === true"
        :src="fields.FallbackMediumImage && fields.FallbackMediumImage.value &&fields.FallbackMediumImage.value.src"
        class="image-thumb tiny"
        :alt="'image thumb'"
        ref="imageThumb"
        data-type="ipad-image"
      />
      <img
        v-else
        :src="fields.FallbackImage && fields.FallbackImage.value && fields.FallbackImage.value.src"
        class="image-thumb tiny"
        :alt="'image thumb'"
        ref="imageThumb"
        data-type="desktop-image"
      />
      <template v-if="isEditing">
        <!-- INFO: Not sure we can remove this -->
        <!-- <sc-image v-if="!isEditing" class="campaign-hero-banner__picture d-md-none" :media="fields['Image-sm']" style="width:100%;"/> -->
        <sc-image class="campaign-hero-banner__picture d-none d-md-block"  :media="fields.Image" style="width:100%;"/>
      </template>
      <picture v-else>
        <!-- INFO: on safari, we when attach .src to image element, the source element is not automatically update, that lead to issue. So I have to change other way -->
        <!-- <source media="(min-width: 768px)" :srcset="fields.Image && fields.Image.value && fields.Image.value.src" class="full-width-image"> -->
        <!-- <img ref="actualImage" :src="fields['Image-sm'].value.src" alt="Banner Image" class="full-width-image opacity-none"> -->
        <img ref="actualImage" :src="''" alt="Banner Image" class="full-width-image opacity-none">
      </picture>

      <div class="campaign-hero-banner__header">
        <div class="container container-extra">
          <sc-text tag="h1" class="campaign-hero-banner__header--main" :field="fields.Title"/>
          <sc-text tag="header" class="campaign-hero-banner__header--sub" :field="fields.Description"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import { mapState } from "vuex";
import { isMobile, isTablet } from '../../util/dom';
export default {
  name: 'SecondaryHeader',
  components: {
    ScLink: Link,
    ScImage: Image,
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      checkRequestQuotation: false,
      isEditing: false,
      detectMobile: undefined,
      detectTablet: undefined,
    }
  },
  computed: {
    ...mapState('quotation', { step: 'step'}),
  },
  mounted() {
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    if (this.isEditing) {
      this.removeLoadingImage();
    }
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.detectTablet = isTablet(this.deviceType);
    // INFO: it seems that not necessary to waiting until load event, because page with secodnary header is very light
    // TODO: remove this log
    if (document.readyState != "complete") {
      window.addEventListener('load', this.deferLoadImage)
    } else {
      this.deferLoadImage();
    }
    this.$root.$on('isRequestQuotation', (requestQuotation) => {
      this.checkRequestQuotation = requestQuotation;
    });
  },
  methods: {
    deferLoadImage() {
      // INFO: when adding src to the <img> attribute, the <source> element automatically get data
      // UPDATE: that is not true on safari, I have to change the image manually by detecting device
      // this.$refs.actualImage.src =
      //   this.detectMobile === true
      //   ? this.fields['Image-sm'].value.src
      //   : this.fields.Image.value.src;

      // TODO: should we update new solution for resize event?
      if (this.detectMobile === true) {
        this.$refs.actualImage.src = this.fields['Image-sm'].value.src;
      } else if (this.detectTablet === true) {
        this.$refs.actualImage.src = this.fields.ImageMedium.value.src;
      } else {
        this.$refs.actualImage.src = this.fields.Image.value.src;
      }
      this.$refs.actualImage.onload = () => {
        this.removeLoadingImage();
      }
    },
    removeLoadingImage() {
      this.$refs.actualImage.style.opacity = 1;
      this.$refs.imageThumb.style.opacity = 0;
      this.$el.classList.remove('loading');
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
.image-thumb {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: opacity 400ms ease 0ms;
  @include media-breakpoint-up(md) {
    object-fit: cover;
  }
}
.tiny {
  filter: blur(20px);
  // transform: scale(1.1);
  transition: visibility 0ms ease 400ms;
}
.full-width-image {
  width: 100%;
  height: auto;
}
.opacity-none {
  opacity: 0;
}

.campaign-hero-banner {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;

  @include media-breakpoint-up(md) {
    height: 0;
    padding-bottom: 350/1024 * 100%;
  }

  // @include media-breakpoint-up(lg) {
  //   height: 350px;
  // }

  @include media-breakpoint-up(xl) {
    height: 0;
    padding-bottom: 350/1903 * 100%;
  }

  .campaign-hero-banner__content {
    position: absolute;
  }

  &.loading {
    padding-bottom: 375/375 * 100%;
    overflow: hidden;
    @include media-breakpoint-up(md) {
      padding-bottom: 350/1024 * 100%;
    }

    @include media-breakpoint-up(xl) {
      padding-bottom: 350/1903 * 100%;
    }

    .campaign-hero-banner__content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      .loading-icon {
        @include loading-icon();
      }
    }
  }

  .loading-icon {
    opacity: 0;
  }

  &__content {
    height: 100%;
    width: 100%;
    picture {
      img {
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &__header {
    position: absolute;
    bottom: 0;
    color: $white;
    width: 100%;

    &--main {
      margin-bottom: 0;
    }

    &--sub {
      margin-bottom: 27px;
      font-size: $font-size-banner-small;
    }

    @include media-breakpoint-up(md) {
      .container {
        display: flex;
        align-items: stretch;
      }

      &--main {
        padding: 15px 45px 15px 0;
        // INFO: recover default style of bootstrap, since we change it in mobile scene
        margin-bottom: 0.5rem;
      }

      &--sub {
        padding: 15px 0 15px 45px;
        border-left: solid 1px rgba($white, 0.5);
        display: flex;
        align-items: center;
        // INFO: recover default style of bootstrap, since we change it in mobile scene
        margin-bottom: 0;
        // INFO: this font size does not included in header font-size scale
        font-size: 2.3rem;
      }
    }
  }
}

.request-quotation-banner {
  @include media-breakpoint-up(md) {
    height: 560px;
    background: #000;
  }
  @include media-breakpoint-up(lg) {
    height: 640px;
  }

  .campaign-hero-banner__picture {
    @include media-breakpoint-up(md) {
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>