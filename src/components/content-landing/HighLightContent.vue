<template>
  <div>
    <div class="container" v-if="isLoading">
      <div class="content-loading__highlight">
        <div class="row">
          <div class="col-md-6">
            <div class="content-loading__highlight__image news-loading"></div>
          </div>
          <div class="col-md-6">
            <div class="content-loading__highlight__text">
              <div class="content-loading__highlight__text__year news-loading"></div>
              <div class="content-loading__highlight__text__title news-loading"></div>
              <div class="content-loading__highlight__text__title content-loading__highlight__text__title--short news-loading"></div>
              <div class="content-loading__highlight__text__desc news-loading"></div>
              <div class="content-loading__highlight__text__desc news-loading"></div>
              <div class="content-loading__highlight__text__desc content-loading__highlight__text__desc--short news-loading"></div>
              <div class="content-loading__highlight__text__read-more news-loading"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <div class="high-light-content">
        <div class="high-light-content__group high-light-content__img">
          <img v-if="highLightContents.Image" class="d-none d-sm-block" :src="imageEndPoint(highLightContents.Image)" alt="x1" @click="addContentLanding(highLightContents.ItemUrl)" />
          <img v-else src="../../assets/default-news.jpg" alt="default-image-slide" class="d-none d-sm-block">
          <img v-if="highLightContents.ImageSm" class="d-sm-none" :src="imageEndPoint(highLightContents.ImageSm)" alt="x2" @click="addContentLanding(highLightContents.ItemUrl)"/>
          <img v-else src="../../assets/default-news-mobile.jpg" alt="default-image-slide" class="d-sm-none">
        </div>
        <div class="high-light-content__group high-light-content__contents">
          <div class="high-light-content__contents__date">{{highLightContents.PublishDate}}</div>
          <h5 class="high-light-content__contents__title" @click="addContentLanding(highLightContents.ItemUrl)">{{highLightContents.Title}}</h5>
          <div class="high-light-content__contents__short-description">{{highLightContents.ShortDescription}}</div>
          <a :href="highLightContents.ItemUrl" class="high-light-content__contents__see-more" @click="addContentLanding()">{{fields.TitleMoreInfo.value}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHighLightContent } from '../../service/contentLandingService';
import { GetEndPoint } from '../../service/genericService';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'HighLightContent',
  components: {},
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      categoryId: '',
    };
  },
  mounted() {
    this.getHighLightContent(this.categoryId);
  },
  computed: {
    ...mapState('recentcontent', {highLightContents : 'highLightContents'}),
    ...mapState('recentcontent', {isLoading : 'isLoading'})
  },
  methods: {
    ...mapActions('recentcontent', ['addContent','getHighLightContent']),
    imageEndPoint(url) {
      return url ? `${GetEndPoint()}${url}` : '';
    },
    addContentLanding(linkDetail){
      if(linkDetail){
        this.$router.push(linkDetail);
      }
    }
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.high-light-content {
  display: flex;
  flex-wrap: wrap;
  padding: 30px 0;

  &__group {
    width: 100%;

    @include media-breakpoint-up(md) {
      width: 50%;
    }
  }

  &__img {
    cursor: pointer;

    img {
      width: 100%;
      @include media-breakpoint-up(md) {
        height: 100%;
      }
      @include media-breakpoint-up(xl) {
        height: auto;
      }
    }
  }

  &__contents {
    padding: 24px 15px;
    background-color: $gray-500;
    color: $white;
    line-height: 1.8rem; // INFO :: LINE HEIGHT follow design

    @include media-breakpoint-up(lg) {
      padding: 50px 25px 45px 30px;
      line-height: 2.4rem; // INFO :: LINE HEIGHT follow design
    }

    &__title {
      font-size: $font-size-news-title-mobile;
      line-height: 2.4rem; // INFO :: LINE HEIGHT follow design
      margin-bottom: 10px;
      cursor: pointer;
      font-weight: $font-weight-bold;

      @include media-breakpoint-up(lg) {
        margin-bottom: 5px;
        font-size: $font-size-news-title;
        line-height: 3rem; // INFO :: LINE HEIGHT follow design

      }
    }

    &__short-description {
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      @include media-breakpoint-up(md) {
        -webkit-line-clamp: 2;
      }
    }

    &__see-more {
      color: $white;
      transition: color .2s ease-in-out;
      padding-right: 15px;
      position: relative;

      @include media-breakpoint-up(lg) {
        padding-right: 18px;
      }

      &::before,
      &::after {
        content: "";
        display: block;
        background: $white;
        width: 7px;
        height: 2px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -1px;
        transform-origin: 6px center;

        @include media-breakpoint-up(lg) {
          width: 9px;
          transform-origin: 8px center;
        }
      }

      &::before {
        transform: rotate(-45deg);
      }

      &::after {
        transform: rotate(45deg);
      }
    }
  }
}

.content-loading__highlight {
  margin-bottom: 10px;
  padding-top: 30px;

  @include media-breakpoint-up(md) {
    padding-top: 40px;
    margin-bottom: 20px;
  }

  &__image {
    height: 200px;
    border-radius: 8px;
    margin-bottom: 20px;

    @include media-breakpoint-up(md) {
      height: 250px;
    }

    @include media-breakpoint-up(md) {
      height: 300px;
    }
  }

  &__text {
    @include media-breakpoint-up(md) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }

    &__year {
      width: 40%;
      height: 16px;
      border-radius: 5px;
      margin-bottom: 12px;

      @include media-breakpoint-up(md) {
        margin-bottom: 15px;
      }

      @include media-breakpoint-up(lg) {
        height: 20px;
        margin-bottom: 18px;
      }
    }

    &__title {
      width: 95%;
      height: 20px;
      border-radius: 8px;
      margin-bottom: 6px;

      @include media-breakpoint-up(md) {
        margin-bottom: 8px;
      }

      @include media-breakpoint-up(lg) {
        height: 25px;
        margin-bottom: 10px;
      }

      &--short {
        width: 60%;
        margin-bottom: 10px;

        @include media-breakpoint-up(md) {
          margin-bottom: 18px;
        }

        @include media-breakpoint-up(lg) {
          margin-bottom: 20px;
        }
      }
    }

    &__desc {
      width: 95%;
      height: 15px;
      border-radius: 8px;
      margin-bottom: 6px;

      @include media-breakpoint-up(md) {
        margin-bottom: 8px;
      }

      @include media-breakpoint-up(lg) {
        height: 20px;
        margin-bottom: 10px;
      }

      &--short {
        width: 80%;
        margin-bottom: 10px;

        @include media-breakpoint-up(md) {
          margin-bottom: 18px;
        }

        @include media-breakpoint-up(lg) {
          margin-bottom: 20px;
        }
      }
    }

    &__read-more {
      width: 25%;
      height: 16px;
      border-radius: 8px;
      margin-bottom: 10px;

      @include media-breakpoint-up(md) {
        width: 30%;
      }

      @include media-breakpoint-up(lg) {
        height: 18px;
      }
    }
  }
}

.news-loading {
  display: block;
  background: #ECE9E6;
  background: linear-gradient(to right,  #fcfafa,  #e6e3df59 , #fcfafa );
  background-position-x: 0px;
  background-repeat: repeat;
  animation: content-loading 3s linear infinite;
}

@keyframes content-loading {
  0%   {background-position-x: 0px;}
  25%  {background-position-x: 250px;}
  50%  {background-position-x: 500px;}
  75%  {background-position-x: 750px;}
  100% {background-position-x: 1000px;}
}
</style>
