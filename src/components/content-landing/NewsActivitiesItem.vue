<template>
  <div class="news-activities-item">
    <a :href="activitiesItem && activitiesItem.ItemUrl" :target="activitiesItem && activitiesItem.TargetUrl" class="news-activities-item__group news-activities-item__img">
      <div class="news-activities-item__placeholder">
        <!-- <img v-if="activitiesItem && activitiesItem.ImageSm" :src="imageEndPoint(activitiesItem.ImageSm)" alt="x" class="d-sm-none" />
        <img v-else src="../../assets/fallback-image/default-act-mobile.jpg" alt="default-mb-image" class="d-sm-none">
        <img v-if="activitiesItem && activitiesItem.Image" :src="imageEndPoint(activitiesItem.Image)" alt="x" class="d-none d-sm-block" />
        <img v-else src="../../assets/fallback-image/default-act-desktop.jpg" alt="default-desc-image" class="d-none d-sm-block"> -->
        <ProgressiveImageItem v-if="detectMobile === false" :ratio="'66.67'" :imageUrl="imageItem(activitiesItem.Image)"></ProgressiveImageItem>
        <ProgressiveImageItem v-else-if="detectMobile === true" :ratio="'66.55'" :imageUrl="imageItem(activitiesItem.ImageSm)"></ProgressiveImageItem>
      </div>
    </a>
    <div class="news-activities-item__group news-activities-item__contents">
      <div class="news-activities-item__contents__date">{{activitiesItem && activitiesItem.PublishDate}}</div>
      <a :href="activitiesItem && activitiesItem.ItemUrl" :target="activitiesItem && activitiesItem.TargetUrl">
        <h4 class="news-activities-item__contents__title">{{activitiesItem && activitiesItem.Title}}</h4>
      </a>
    </div>
  </div>
</template>

<script>
import { GetEndPoint } from '../../service/genericService';
import { mapActions } from 'vuex';
import { isMobile } from '../../util/dom';
import ProgressiveImageItem from '../shared/ProgressiveImageItem';
export default {
  name: 'NewsActivitiesItem',
  components: {
    ProgressiveImageItem: ProgressiveImageItem,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    activitiesItem: Object,
  },
  data() {
    return {
      detectMobile: undefined,
    };
  },
  methods: {
    ...mapActions('recentcontent', ['addContent']),
    imageItem(url) {
      return {
        value: {
          src: this.imageEndPoint(url),
        },
      };
    },
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.news-activities-item {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 25px;

  @include media-breakpoint-up(md) {
    display: block;
    margin-bottom: 40px;
  }

  &__placeholder {
    width: 100%;
    height: 0;
    padding-bottom: 66%;
    position: relative;

    &:hover {
      >>> img {
        transform: scale(1.1);
      }
    }

    >>> img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      position: absolute;
      transition: transform .5s ease;
    }
  }

  &__group {
    width: 50%;

    @include media-breakpoint-up(md) {
      width: auto;
    }
  }

  &__img {
    overflow: hidden;
    padding-right: 8px;

    @include media-breakpoint-up(md) {
      padding-right: 0;
    }
  }

  &__contents {
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include media-breakpoint-up(md) {
      margin-top: 10px;
    }

    &__date {
      font-size: $font-size-mobile;
      // line-height: 1.5rem; // INFO :: LINE HEIGHT follow design

      @include media-breakpoint-up(md) {
        font-size: $font-size-base;
        line-height: 3rem; // INFO :: LINE HEIGHT follow design
      }
    }

    &__title {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: $font-size-content-small;
      // line-height: 1.8rem; // INFO :: LINE HEIGHT follow design
      transition: all .3s ease;

      @include media-breakpoint-up(md) {
        -webkit-line-clamp: 2;
        font-size: 3rem;
        line-height: 3rem; // INFO :: LINE HEIGHT follow design
      }

      &:hover {
        color: $red-hover-color;
      }
    }
  }

  a {
    color: #000;
    text-decoration: none;
  }
}
</style>