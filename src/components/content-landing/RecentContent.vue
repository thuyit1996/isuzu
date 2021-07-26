<template>
  <div class="recent-news">
    <div class="recent-news__title">
      <!-- <div class="isu-title">ข่าวสารที่เกี่ยวข้อง</div> -->
      <sc-text tag="h2" class="isu-title" :field="fields.Title" />
    </div>
    <div class="container">
      <div class="recent-news-group">
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in recentContentList" :key="item.Id">
              <div class="news-activities-item">
                  <a :href="item.ItemUrl" class="news-activities-item__img">
                    <img v-if="item.Image && item.Image != ''" :src="item.Image"  class="d-none d-sm-block" alt="recent content image" />
                    <img v-else src="../../assets/default-recent-campaign.jpg"  class="d-none d-sm-block" alt="x">
                    <img v-if="item.ImageSm && item.ImageSm != ''" :src="item.ImageSm"  class="d-sm-none" alt="recent content image" />
                    <img v-else src="../../assets/default-recent-campaign.jpg"  class="d-sm-none" alt="x">
                  </a>
                  <a :href="item.ItemUrl" class="news-activities-item__contents" v-if="item.Title && item.Title != ''">{{item.Title}}</a>
                </div>
            </div>
          </div>
        </div>
        <div v-show="recentContentList && recentContentList.length > 3">
          <div class="swiper-button-prev d-none d-lg-block" slot="button-prev"></div>
          <div class="swiper-button-next d-none d-lg-block" slot="button-next"></div>
        </div>
      </div>
      <!-- <div class="d-md-none">
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="news-activities-item">
                <a href="#" class="news-activities-item__img">
                  <img src="../../assets/news-detail.jpg" alt="x">
                </a>
                <a href="#" class="news-activities-item__contents">อีซูซุทุ่มกว่า 4,000 ล้านปรับโชว์รูมและศูนย์บริการใหม่ ชูคอนเซ็ปต์ “The TOUCH” </a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="news-activities-item">
                <a href="#" class="news-activities-item__img">
                  <img src="../../assets/news-detail.jpg" alt="x">
                </a>
                <a href="#" class="news-activities-item__contents">อีซูซุทุ่มกว่า 4,000 ล้านปรับโชว์รูมและศูนย์บริการใหม่ ชูคอนเซ็ปต์ “The TOUCH” </a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="news-activities-item">
                <a href="#" class="news-activities-item__img">
                  <img src="../../assets/news-detail.jpg" alt="x">
                </a>
                <a href="#" class="news-activities-item__contents">อีซูซุทุ่มกว่า 4,000 ล้านปรับโชว์รูมและศูนย์บริการใหม่ ชูคอนเซ็ปต์ “The TOUCH” </a>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="news-activities-item">
                <a href="#" class="news-activities-item__img">
                  <img src="../../assets/news-detail.jpg" alt="x">
                </a>
                <a href="#" class="news-activities-item__contents">อีซูซุทุ่มกว่า 4,000 ล้านปรับโชว์รูมและศูนย์บริการใหม่ ชูคอนเซ็ปต์ “The TOUCH” </a>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </div>
      </div> -->
    </div>
    <div class="recent-news__btn">
      <!-- <a href="/content-landing" class="i-btn i-btn__primary">ข่าวสารและกิจกรรม</a> -->
      <isu-button-link :field="fields.ButtonUrl">
        <sc-link class="i-btn i-btn__primary" :field="fields.ButtonUrl">
          <sc-text tag="span" :field="fields.ButtonTitle" />
        </sc-link>
      </isu-button-link>
    </div>
  </div>
</template>

<script>
import { Link, Text } from '@sitecore-jss/sitecore-jss-vue';
import NewsActivitiesItem from './NewsActivitiesItem';
import { mapState } from 'vuex';
import IsuButtonLink from '../shared/IsuButtonLink';

export default {
  name: 'RecentContent',
  components: {
    ScText: Text,
    ScLink: Link,
    NewsActivitiesItem: NewsActivitiesItem,
    IsuButtonLink: IsuButtonLink,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.recent-news .swiper-button-next',
          prevEl: '.recent-news .swiper-button-prev',
        },
        slidesPerView: 3,
        spaceBetween: 30,

        breakpoints: {
          576: {
            slidesPerView: 'auto',
            spaceBetween: 7
          },

          768: {
            slidesPerView: 2,
            spaceBetween: 7
          },
      }
    },
    };
  },
  computed: {
    ...mapState('recentcontent', { recentContentList: 'recentContentList' }),
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

@include swiper();

.recent-news {
  background-color: $gray-100;
  padding: 50px 0 40px 0;

  @include media-breakpoint-up(lg) {
    padding: 50px 0 56px 0;
  }

  &__title {
    text-align: center;
    margin-bottom: 30px;

  }

  &__btn {
    text-align: center;

    @include media-breakpoint-up(lg) {
      margin-top: 5px;
    }

    // a {
    //   color: $white;
      
    //   &:hover {
    //     color: $black;
    //   }
    // }
  }

  .swiper-slide {
    max-width: 92%;
  }

  .swiper-button-prev,
  .swiper-button-next {
    top: 82px;
    margin-top: -8px;
    outline: none;
    z-index : $NOMAL-ZINDEX;

    @include media-breakpoint-up(xl) {
      top: 100px;
    }
  }

  .swiper-button-prev {
    @include media-breakpoint-up(sm) {
      left: -23px;
    }
  }

  .swiper-button-next {
    @include media-breakpoint-up(sm) {
      right: -23px;
    }
  }
}

.recent-news-group {
  position: relative;
}

.news-activities-item {
  display: block;

  &__img {
    padding-right: 8px;
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 66%;
    position: relative;
    overflow: hidden;

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
      transition: transform .75s ease;
    }
  }

  &__contents {
    margin-top: 22px;
    font-size: $font-size-recent-content-title-mobile;
    line-height: 2.4rem; // INFO :: LINE HEIGHT follow design
    display: inline-block;
    transition: all .3s ease;
    color: $black;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-recent-content-title;
      line-height: 3.5rem; // INFO :: LINE HEIGHT follow design
      margin-top: 20px;
    }

    &:hover {
      color: $red-hover-color;
    }
  }
}
</style>
