<template>
  <div class="progressive-picture">
    <span ref="loading" class="loading-icon"></span>
    <picture ref="picture">
      <source ref="source" media="(min-width: 768px)" :srcset="''" style="width:100%">
      <img ref="image" :src="''" alt="Banner Image" style="width:100%" class="animated">
    </picture>
  </div>
</template>

<script>
import { isMobile } from '../../util/dom';

export default {
  name: 'ProgressivePictureItem',
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    ratioLg: {
      type: String,
    },
    ratioSm: {
      type: String,
      default: '100',
    },
  },
  mounted() {
    if (document.readyState != "complete") {
      window.addEventListener('load', this.deferLoadImage)
    } else {
      this.deferLoadImage();
    }
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    if (this.detectMobile) {
      this.$el.style.paddingBottom = `${this.ratioSm}%`;
    } else {
      this.$el.style.paddingBottom = `${this.ratioLg}%`;
    }
  },
  methods: {
    deferLoadImage() {
      const instance = this;
      this.$refs.source.srcset = this.fields.Image.value.src;
      this.$refs.image.src = this.fields['Image-sm'].value.src;
      this.$refs.image.onload = () => {
        instance.$refs.picture.style.opacity = 1;
        instance.$refs.image.classList.add('fadeIn');
        instance.$refs.loading.style.opacity = 0;
      }
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.progressive-picture {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 37.36%;
  overflow: hidden;

  picture {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;

    opacity: 0;

    img {
      widows: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .loading-icon {
    @include loading-icon();
  }
}
</style>
