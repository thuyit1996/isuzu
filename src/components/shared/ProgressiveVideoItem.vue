<template>
  <div class="progressive-video">
    <span ref="loading" class="loading-icon" v-bind:data-id="id"></span>
    <img
      :src="dataImage.value.src"
      class="video-thumb tiny"
      :alt="dataImage.value.alt"
      ref="imageThumb"
      v-bind:data-id="id"
    />
    <video ref="video" class="slider-video" style="width: 100%" playsinline="false" loop="loop" muted="muted" preload="none" autoplay>
      <source :src="''" type="video/mp4"/>
      <!-- <source :src="video.value.href" type="video/mp4"/> -->
    </video>
  </div>
</template>

<script>
export default {
  name: 'ProgressiveVideoItem',
  props: {
    image: Object,
    video: Object,
    id: String,
  },
  data() {
    return {
      dataImage: this.image,
      dataVideo: this.video,
    };
  },
  watch: {
    image: function(newImage) {
      this.dataImage = Object.assign({}, this.dataImage, newImage);
    },
    video: function(newVideo) {
      this.dataVideo = Object.assign({}, this.dataVideo, newVideo);
      this.deferLoadVideo();
    },
  },
  mounted() {
    if (document.readyState != "complete") {
      window.addEventListener('load', this.deferLoadVideo);
    } else {
      this.deferLoadVideo();
    }
  },
  methods: {
    deferLoadVideo() {
      const instance = this;
      this.$refs.video.src = this.dataVideo.value.href;
      this.$refs.video.onloadeddata = () => {
        instance.$refs.video.style.opacity = 1;
        instance.$refs.imageThumb.style.opacity = 0;
        instance.$refs.loading.style.opacity = 0;
        instance.$emit('on:videoLoaded', this.id);
      };
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.progressive-video {
  position: relative;

  .loading-icon {
    @include loading-icon();
  }
}
.video-thumb {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transition: opacity 400ms ease 0ms;
  object-fit: cover;
}

.tiny {
  filter: blur(20px);
  /* transform: scale(1.1); */
  transition: visibility 0ms ease 400ms;
}
</style>