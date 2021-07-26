<template>
  <div class="content-loading">
    <div class="container">
      <div class="content-loading__content-list">
        <div class="row">
          <div class="col-md-6 col-lg-4">
            <div class="content-loading__item">
              <div class="content-loading__item__image news-loading"></div>
              <div class="content-loading__item__text">
                <div class="content-loading__item__text__year news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="content-loading__item">
              <div class="content-loading__item__image news-loading"></div>
              <div class="content-loading__item__text">
                <div class="content-loading__item__text__year news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="content-loading__item">
              <div class="content-loading__item__image news-loading"></div>
              <div class="content-loading__item__text">
                <div class="content-loading__item__text__year news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="content-loading__item">
              <div class="content-loading__item__image news-loading"></div>
              <div class="content-loading__item__text">
                <div class="content-loading__item__text__year news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="content-loading__item">
              <div class="content-loading__item__image news-loading"></div>
              <div class="content-loading__item__text">
                <div class="content-loading__item__text__year news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <div class="content-loading__item">
              <div class="content-loading__item__image news-loading"></div>
              <div class="content-loading__item__text">
                <div class="content-loading__item__text__year news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
                <div class="content-loading__item__text__desc news-loading"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'ContentLoading',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin';

.content-loading {
  padding-top: 20px;

  &__item {
    display: flex;
    margin-bottom: 25px;

    @include media-breakpoint-up(md) {
      display: block;
    }

    &__image {
      flex-grow: 1;
      height: 110px;
      border-radius: 8px;

      @include media-breakpoint-up(md) {
        height: 210px;
        margin-bottom: 10px;
      }
    }

    &__text {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;

      @include media-breakpoint-up(md) {
        margin-left: 0;
      }

      &__year {
        width: 70%;
        height: 15px;
        border-radius: 5px;
        margin: 15px 0;

        @include media-breakpoint-up(md) {
          height: 20px;
          width: 50%;
        }
      }

      &__desc {
        width: 95%;
        height: 15px;
        border-radius: 8px;
        margin-bottom: 10px;

        @include media-breakpoint-up(md) {
          height: 20px;
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
}
</style>