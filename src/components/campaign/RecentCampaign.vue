<template>
  <div class="recent-campaign" v-if="recentCampaignList.length">
    <div class="container">
      <div class="recent-campaign__heading">
        <sc-text tag="h2" class="isu-title" :field="fields.Title"/>
      </div>
      <div class="recent-campaign__content--desktop">
        <div class="" v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in recentCampaignList" :key="item.Id">
              <a :href="item.ItemUrl"  class="recent-campaign__content__item">
                <div class="recent-campaign__content__image">
                  <img v-if="item.Image" :src="item.Image" alt="recent campaign image" />
                  <img v-else src="../../assets/default-recent-campaign.jpg" alt="default image">
                </div>
                <a :href="item.ItemUrl">
                  <h4 class="recent-campaign__content__title">{{item.Title}}</h4>
                </a>
                <div class="recent-campaign__content__desc">
                  <div v-html="item.ShortDescription"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div v-show="recentCampaignList && recentCampaignList.length > 3">
          <div class="swiper-button-prev d-none d-lg-block" slot="button-prev"></div>
          <div class="swiper-button-next d-none d-lg-block" slot="button-next"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import { GetEndPoint } from '../../service/genericService';
import { mapState } from 'vuex';
export default {
  name: 'RecentCampaign',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState('recentcampaign', { recentCampaignList: 'recentCampaignList' }),
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.recent-campaign .swiper-button-next',
          prevEl: '.recent-campaign .swiper-button-prev',
        },
        slidesPerView: 3,
        spaceBetween: 30,

        breakpoints: {
          576: {
            slidesPerView: 'auto',
            spaceBetween: 7,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 7,
          },
        }
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.recent-campaign {
  background: $gray-100;
  padding: 50px 0 30px;
  position: relative;

  &__heading {
    text-align: center;
    padding: 0 0 30px;
  }

  &__content {
    &__image {
      margin-bottom: 20px;
      position: relative;
      width: 100%;
      overflow: hidden;

      &:hover {
        img {
          transform: scale(1.1);
        }
      }

      &::before {
        content: "";
        display: block;
        position: relative;
        width: 100%;
        padding-top: 56%;
      }

      img {
        position: absolute;
        object-fit: cover;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: transform 0.5s ease-in-out;
      }
    }

    &__title {
      color: $black;
      transition: all .3s ease;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: $font-size-recent-content-title-mobile;

      @include media-breakpoint-up(lg) {
        font-size: $font-size-recent-content-title;
      }

      &:hover {
        color: $red-hover-color;
      }
    }

    &__desc {
      color: $black;

      @include media-breakpoint-up(lg) {
        font-size: 2.4rem;
      }

      span {
        display: block;
        padding-bottom: 0;
        margin: 0;
      }
    }

    &__item {
      color: $black;
    }
  }

  // &__content--mobile {
  //   @include media-breakpoint-up(lg) {
  //     display: none;
  //   }

  //   @include swiper();
  // }

  &__content--desktop {
    display: block;

    @include media-breakpoint-down(sm) {

    @include swiper();
    }

    @include media-breakpoint-up(lg) {
      display: block;
      position: relative;
    }
  }

  .swiper-slide {
    max-width: 92%;
  }

  a {
    text-decoration: none;
  }

  @include swiper();

  .swiper-button-next ,
  .swiper-button-prev {
    top: 80px;
    z-index : $NOMAL-ZINDEX;
    outline: none;

    @include media-breakpoint-up(xl) {
      top: 103px;
    }
  }

  .swiper-button-next {
    right: -23px;
  }

  .swiper-button-prev {
    left: -23px;
  }

  .swiper-wrapper {
    padding-bottom: 0;
  }
}
</style>
