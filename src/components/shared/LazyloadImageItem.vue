<template>
  <div class="progressive-image">
    <span ref="loading" class="loading-icon"></span>
    <picture ref="picture">
      <img ref="image" :src="''" alt="Banner Image" style="width:100%" class="animated">
    </picture>
  </div>
</template>

<script>
import { isMobile } from '../../util/dom';

export default {
  name: 'LazyloadImageItem',
  props: {
    imageUrl: {
      type: Object,
      default: () => ({}),
    },
    ratio: {
      type: String,
      default: '18.01',
    },
  },
  mounted() {
    this.isLoaded = false;
    this.lazyLoadImage();
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.$el.style.paddingBottom = `${this.ratio}%`;
  },
  watch: {
    imageUrl: function (newUrl) {
      this.deferLoadImage();
    },
  },
  methods: {
    deferLoadImage() {
      const instance = this;
      if (this.imageUrl?.value?.src) {
        this.$refs.image.src = this.imageUrl.value.src;
        this.$refs.image.onload = () => {
          instance.$refs.picture.style.opacity = 1;
          instance.$refs.image.classList.add('fadeIn');
          instance.isLoaded = true;
          instance.$refs.loading.style.opacity = 0; 
        }
      }
    },
    lazyLoadImage() {
      window.addEventListener('scroll', this.onScroll);
      this.onScroll();
    },
    onScroll() {
      if (!this.isLoaded &&  0 > this.$el.getBoundingClientRect().top - window.innerHeight) {
        this.deferLoadImage();
      }
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.progressive-image {
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
  }

  .loading-icon {
    @include loading-icon();
  }
}
</style>
