<template>
  <div class="main-header">
    <div class="video-wrapper__modal" v-if="isShow" :class="{'is-show-modal': isShow}">
      <div class="video-wrapper__modal__overlay"></div>
      <div class="video-wrapper__modal__content">
        <div class="close-btn" @click="hideVideoOverlay">
          <svg viewBox="0 0 32 32">
            <polygon points="32,1.5 30.6,0.1 16,14.6 1.5,0.1 0,1.5 14.6,16 0,30.6 1.5,32 16,17.5 30.6,32 32,30.6 17.4,16 "></polygon>
          </svg>
        </div>
        <div class="video-container">
          <iframe frameborder="0" muted="muted" defaultMuted allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="allowfullscreen" :src="viewVideoUrl"></iframe>
        </div>
      </div>
    </div>
    <div v-swiper:mySwiper="swiperHomeOption" ref="mainSliderSwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" :key="item.id" v-for="(item, index) in fields.Items">
          <div class="header-banner" v-if="item.fields.BackgroundVideo.value.href == ''">
            <template v-if="isEditing">
              <sc-image class="d-none d-sm-block  full-width-image" :media="item.fields.Image"/>
            </template>
            <LazyloadPictureItem v-else :fields="item.fields" :ratioLg="'49.56'" :ratioSm="'157'"></LazyloadPictureItem>
            <div class="contents-banner">
              <div class="container contents-banner__wrap d-none d-md-block">
                <div class="contents-banner__desktop" :class="[{'same-position-desk': isSamePositionDesktop(item)}, setSamePositionDesk(item)]">
                  <div class="header-banner__contents" :class="setClassContentPositionDesk(item)">
                    <div class="animated" :class="isAnimated ? 'fadeInUp' : ''">
                      <sc-text tag="h1" class="title"  :field="item.fields.Title" />
                      <sc-text tag="p" class = "description" :field="item.fields.Description" />
                    </div>
                  </div>
                  <div class="header-banner__btn" :class="setClassButtonPositionDesk(item)">
                    <isu-button-link :field="item.fields.Url">
                      <sc-link class="header-banner__btn__view-detail i-btn i-btn__secondary" :field="item.fields.Url" />
                    </isu-button-link>
                  </div>
                </div>
              </div>
              <div class="container contents-banner__wrap d-md-none">
                <div class="contents-banner__mobile" :class="{'content-position-mobi-right': isMobileContentRight(item)}">
                  <div class="header-banner__contents animated" :class="isAnimated ? 'fadeInUp' : ''">
                    <sc-text tag="h1" class="title"  :field="item.fields.Title" />
                    <sc-text tag="p" class = "description" :field="item.fields.Description" />
                  </div>
                  <div class="header-banner__btn">
                    <isu-button-link :field="item.fields.Url">
                      <sc-link class="header-banner__btn__view-detail i-btn i-btn__secondary" :field="item.fields.Url" />
                    </isu-button-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section v-else class="video-header header-banner">
            <div class="video-wrapper">
              <div class="video-wrapper__media">
                <div class="video-wrapper__media__content">
                  <div class="contents-banner">
                    <div class=" container contents-banner__wrap d-none d-md-block">
                      <div class="contents-banner__desktop" :class="[{'same-position-desk': isSamePositionDesktop(item)}, setSamePositionDesk(item)]">
                        <div class="header-banner__contents" :class="setClassContentPositionDesk(item)">
                          <div class="animated" :class="isAnimated ? 'fadeInUp' : ''">
                            <sc-text tag="h1" class="title"  :field="item.fields.Title" />
                            <sc-text tag="p" class = "description" :field="item.fields.Description" />
                          </div>
                        </div>
                        <div class="header-banner__btn" :class="setClassButtonPositionDesk(item)">
                          <isu-button-link :field="item.fields.Url">
                            <sc-link class="header-banner__btn__view-detail i-btn i-btn__secondary" :field="item.fields.Url" />
                          </isu-button-link>
                        </div>
                      </div>
                    </div>
                    <div class="container contents-banner__wrap d-md-none">
                      <div class="contents-banner__mobile" :class="{'content-position-mobi-right': isMobileContentRight(item)}">
                        <div class="header-banner__contents animated" :class="isAnimated ? 'fadeInUp' : ''">
                          <sc-text tag="h1" class="title"  :field="item.fields.Title" />
                          <sc-text tag="p" class = "description" :field="item.fields.Description" />
                        </div>
                        <div class="header-banner__btn">
                          <isu-button-link :field="item.fields.Url">
                            <sc-link class="header-banner__btn__view-detail i-btn i-btn__secondary" :field="item.fields.Url" />
                          </isu-button-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="video-wrapper__background__video" ref="sliderVideo">
                  <div v-if="detectMobile">
                    <progressive-video-item :id="item.id" :image="item.fields.FallbackImage" :video="item.fields.SmallBackgroundVideo"></progressive-video-item>
                  </div>
                  <div v-else>
                    <progressive-video-item :id="item.id" :image="item.fields.FallbackImage" :video="item.fields.BackgroundVideo"></progressive-video-item>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="swiper-pagination" ref="swiperPagination" :class="{'hide': !isSingleSlide, 'dots-position-mobi-left': isMobileContentPositionRight}" slot="pagination"></div>
    </div>
    <a href="#" class="btn-scroll d-md-none" @click.prevent="targetScroll">
      <sc-image class="btn-scoll" :media="fields.DeactiveScrollIcon"/>
      <sc-image class="btn-scoll-hover" :media="fields.ActiveScrollIcon"/>
    </a>
    <a href="#1" class="header-banner__btn__video" v-show="isSwiperVideo" :style="{left: styleBtnPlayLeft, right: styleBtnPlayRight}" @click="showVideoOverlay()" v-if="btnPlayVideoResize">
      <img src="../../assets/icon-play.svg" alt="icon play video">
    </a>
    <a href="#2" class="header-banner__btn__video" v-show="isSwiperVideo" :style="setPositionButtonPlayVideo" @click="showVideoOverlay()" v-if="btnPlayVideoSlide">
      <img src="../../assets/icon-play.svg" alt="icon play video">
    </a>
  </div>
</template>

<script>
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import IsuButtonLink from '../shared/IsuButtonLink';
import { isMobile, isDesktop } from '../../util/dom';
import ProgressiveVideoItem from '../shared/ProgressiveVideoItem';
import LazyloadPictureItem from '../shared/LazyloadPictureItem';

const FIRST_SLIDE_INDEX = 0;
const BUTTON_RIGHT_OFFSET = 5;
const CONTAINER_PADDING = 15;
const MIN_DESKTOP_WIDTH = 768;

export default {
  name: 'MainSlider',
  components: {
    ScLink: Link,
    ScImage: Image,
    ScText: Text,
    IsuButtonLink: IsuButtonLink,
    ProgressiveVideoItem: ProgressiveVideoItem,
    LazyloadPictureItem: LazyloadPictureItem,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      detectMobile: true,
      isShow: false,
      viewVideoUrl: '',
      intervalTime: 0,
      targetClass: '',
      targetScrollName: this.fields.TargetScroll && this.fields.TargetScroll.fields.Name.value,
      videoUrl: '',
      targetScrollIndex: this.fields.TargetScrollIndex && this.fields.TargetScrollIndex.value,
      swiperIndex: 0,
      isEditing: false,
      styleBtnPlayRight: '',
      styleBtnPlayLeft: '',
      isAnimated: true,
      btnPlayVideoSlide: false,
      btnPlayVideoResize: true,
    };
  },
  computed: {
    swiperHomeOption: function() {
      return {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: this.setOptionDelay(),
        // INFO-TODO: loop feature causes issue with video
        // loop: this.isSingleSlide,
        speed: 1500,
        initialSlide: 0,
        slidesPerView: 1,
      };
    },
    isSingleSlide: function() {
      let length = this.fields.Items?.length || 0;
      return length > 1 ? true : false;
    },
    swiper() {
      return this.$refs.mainSliderSwiper.swiper;
    },
    buttonPlayVideo() {
      return this.$refs.buttonPlayVideo;
    },
    swiperPagination() {
      return this.$refs.swiperPagination;
    },
    videoIndexList() {
      let videoIndex = [];
      if (this.fields?.Items?.length) {
        this.fields.Items.forEach((item, index) => {
          if (item.fields?.BackgroundVideo?.value?.href?.length) {
            videoIndex.push(index);
          }
        });
      }
      return videoIndex;
    },
    isSwiperVideo() {
      return this.videoIndexList.includes(this.swiperIndex);
    },
    mobileContentRightIndexList() {
      let listIndex = [];
      if (this.fields?.Items?.length) {
        this.fields.Items.forEach((item, index) => {
          if (item.fields?.IsMobileContentRight?.value) {
            listIndex.push(index);
          }
        });
      }
      return listIndex;
    },
    isMobileContentPositionRight() {
      return this.mobileContentRightIndexList.includes(this.swiperIndex);
    },
    setPositionButtonPlayVideo() {
      let swiperPaginationWidth = this.$refs.swiperPagination?.offsetWidth || 0;
      let swiperPaginationLeft = this.$refs.swiperPagination?.offsetLeft || 0;
      let mainHeaderWidth = this.$el?.offsetWidth || 0;
      let containerWidth = this.$el?.querySelector('.contents-banner .container.d-md-none')?.offsetWidth || mainHeaderWidth;
      let offsetLeftContainer = (mainHeaderWidth - containerWidth) / 2;
      let position = {
        left: '',
        right: '',
      }
      if (mainHeaderWidth < MIN_DESKTOP_WIDTH) {
        if (this.mobileContentRightIndexList.includes(this.swiperIndex)) {
          position = {
            left: offsetLeftContainer + swiperPaginationWidth + CONTAINER_PADDING + BUTTON_RIGHT_OFFSET + 'px',
            right: 'auto',
          }
        } else {
          position = {
            left: 'auto',
            right: offsetLeftContainer + swiperPaginationWidth + CONTAINER_PADDING + BUTTON_RIGHT_OFFSET + 'px',
          };
        }
      } else {
        const btnPlayRight = mainHeaderWidth - swiperPaginationLeft + swiperPaginationWidth / 2 + BUTTON_RIGHT_OFFSET;
        //INFO: swiperPaginationWidth / 2 add for transform: translateX(-50%)
        position = {
          left: 'auto',
          right: btnPlayRight + 'px',
        };
      }
      return position;
    },
    getPopupVideo() {
      let linkVideoPopup = '';
      if (this.isSwiperVideo) {
        if (this.fields.Items[this.swiperIndex]?.fields?.PopupVideo?.value?.href?.length) {
          linkVideoPopup = this.fields.Items[this.swiperIndex].fields.PopupVideo.value.href;
        }
      }
      return linkVideoPopup;
    },
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;

    this.mySwiper.on('transitionStart', () => {
      this.isAnimated = false;
    });
    this.mySwiper.on('transitionEnd', () => {
      this.isAnimated = true;
      this.btnPlayVideoSlide = true;
      this.btnPlayVideoResize = false;
      const mainHeaderWidth = this.$el?.offsetWidth || 0;
      if (mainHeaderWidth > MIN_DESKTOP_WIDTH) {
        this.btnPlayVideoSlide = false;
        this.btnPlayVideoResize = true;
      }
    });
    let touchStartClientX = 0;
    this.mySwiper.on('touchStart', (event) => {
      // INFO: event.clientX is for desktop
      // event.changedTouches is for mobile/ipad
      touchStartClientX = event.changedTouches?.[0]?.clientX || event.clientX;
    })
    this.mySwiper.on('touchEnd', (event) => {
      let touchEndClientX = event.changedTouches?.[0]?.clientX || event.clientX;
      // INFO: detect swiping to the right
      if (touchEndClientX - touchStartClientX < 0) {
        let numberOfSlide = this.fields.Items?.length || 0;
        if (this.mySwiper.activeIndex == numberOfSlide - 1) {
          this.$nextTick(() => {
            this.mySwiper.slideTo(FIRST_SLIDE_INDEX);
            this.swiperIndex = FIRST_SLIDE_INDEX;
          });
        }
      }
    });
    this.onSlidingHandler();
    this.getStyleBtnPlayRight();
    window.addEventListener('resize', this.getStyleBtnPlayRight);
  },
  methods: {
    getStyleBtnPlayRight() {
      this.btnPlayVideoSlide = false;
      this.btnPlayVideoResize = true;
      const mainHeaderWidth = this.$el?.offsetWidth || 0;
      const swiperPaginationWidth = this.swiperPagination?.offsetWidth || 0;
      const swiperPaginationLeft = this.swiperPagination?.offsetLeft || 0;
      if (mainHeaderWidth < MIN_DESKTOP_WIDTH) {
        if (!this.checkMobileContentRightCurrentSlideIndex()) {
          const btnPlayRight = mainHeaderWidth - swiperPaginationLeft + BUTTON_RIGHT_OFFSET;
          this.styleBtnPlayRight = btnPlayRight + 'px';
          this.styleBtnPlayLeft = 'auto';
        } else {
          this.styleBtnPlayRight = 'auto';
          this.styleBtnPlayLeft = swiperPaginationWidth + swiperPaginationLeft + BUTTON_RIGHT_OFFSET + 'px';
        }
      } else {
        const btnPlayRight = mainHeaderWidth - swiperPaginationLeft + swiperPaginationWidth / 2 + BUTTON_RIGHT_OFFSET;
        //INFO: swiperPaginationWidth / 2 add for transform: translateX(-50%)
        this.styleBtnPlayRight = btnPlayRight + 'px';
        this.styleBtnPlayLeft = 'auto';
      }
    },
    checkMobileContentRightCurrentSlideIndex() {
      let currentSlideIndex = this.$refs.mainSliderSwiper.swiper.activeIndex;
      if (this.fields?.Items?.length) {
        if (this.fields.Items[currentSlideIndex].fields?.IsMobileContentRight?.value) {
          return true;
        }
      }
    },
    showVideoOverlay() {
      this.viewVideoUrl = this.getPopupVideo + '?autoplay=1';
      this.isShow = true;
    },
    hideVideoOverlay() {
      this.isShow = false;
    },
    targetScroll() {
      this.targetClass = '.' + this.targetScrollName;
      let getClassTarget = document.querySelectorAll(this.targetClass);
      let parseIntScrollIndex = parseInt(this.targetScrollIndex);
      if (
        !parseIntScrollIndex ||
        parseIntScrollIndex < 1 ||
        parseIntScrollIndex > getClassTarget.length
      ) {
        parseIntScrollIndex = 1;
      }
      let hash = getClassTarget[parseIntScrollIndex - 1];
      hash.scrollIntoView({ behavior: 'smooth' });
    },
    onSlidingHandler() {
      this.swiper.off('slideChangeTransitionEnd').on('slideChangeTransitionEnd', () => {
        // INFO: if it is looping, we should use realIndex instead:
        // https://swiperjs.com/api/#methods
        this.swiperIndex = this.mySwiper.activeIndex;
      });
    },
    isNumber() {
      return Number(this.fields?.IntervalTime?.value) > 0;
    },
    setOptionDelay() {
      let delayValue = this.fields.IntervalTime?.value || 0;
      let delayOption = {
        delay: delayValue * 1000,
        disableOnInteraction: false,
      };
      return this.isNumber() ? delayOption : false;
    },
    setSamePositionDesk(item) {
      if (this.isSamePositionDesktop(item)) {
        let textPositionX = item.fields.TextPositionRow.value.toLowerCase();
        let textPositionY = item.fields.TextPositionColumn.value.toLowerCase();
        return `position-desk-${textPositionX}-${textPositionY}`;
      }
    },
    checkNullPositionContent(item) {
      if (
        item?.fields?.TextPositionColumn?.value?.length > 0 &&
        item?.fields?.TextPositionRow?.value?.length > 0
      ) {
        return true;
      }
    },
    checkNullPositionButton(item) {
      if (
        item?.fields?.ButtonPositionColumn?.value?.length > 0 &&
        item?.fields?.ButtonPositionRow?.value?.length > 0
      ) {
        return true;
      }
    },
    isSamePositionDesktop(item) {
      if (this.checkNullPositionContent(item) && this.checkNullPositionButton(item)) {
        if (
          item.fields.TextPositionColumn.value === item.fields.ButtonPositionColumn.value &&
          item.fields.TextPositionRow.value === item.fields.ButtonPositionRow.value
        ) {
          return true;
        }
      }
    },
    setClassContentPositionDesk(item) {
      if (this.checkNullPositionContent(item)) {
        let textPositionX = item.fields.TextPositionRow.value.toLowerCase();
        let textPositionY = item.fields.TextPositionColumn.value.toLowerCase()
        return `position-desk-${textPositionX}-${textPositionY}`;
      }
    },
    setClassButtonPositionDesk(item) {
      if (this.checkNullPositionButton(item)) {
        let buttonPositionX = item.fields.ButtonPositionRow.value.toLowerCase();
        let buttonPositionY = item.fields.ButtonPositionColumn.value.toLowerCase();
        return `position-desk-${buttonPositionX}-${buttonPositionY}`;
      }
    },
    isMobileContentRight(item) {
      return item?.fields?.IsMobileContentRight?.value;
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.getStyleBtnPlayRight);
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
// TODO: move this import the global file
@import '../../../node_modules/swiper/dist/css/swiper.css';
$leftPosition: 15px;
$rightPosition: 15px;
$topPosition: 25px;
$bottomPositionMd: 14px;
$bottomPositionLg: 31px;

.full-width-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-header {
  position: relative;
  // @include media-breakpoint-up(lg) {
  //   padding-top: 48px;
  // }
  .contents-banner {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &__wrap {
      position: relative;
      height: 100%;
    }

    &__desktop {
      max-width: calc(100% / 3);
    }

    &__mobile {
      position: absolute;
      left: 15px;
      bottom: 20px;
    }
  }

  .header-banner {
    position: relative;

    &__contents {
      color: $white;

      @include media-breakpoint-up(md) {
        position: absolute;
        // bottom: 60px;
        // left: 0;
        // max-width: 290px;
      }

      @include media-breakpoint-up(lg) {
        bottom: 25px;
        left: 15px;
        // max-width: 500px;
      }

      .title {
        margin: 0;
      }

      .description {
        @include media-breakpoint-down(sm) {
          font-size: 2rem;
          // padding-right: 33px;
        }
      }
    }

    &__btn {
      display: flex;
      align-items: center;
      text-align: center;

      @include media-breakpoint-up(md) {
        position: absolute;
        bottom: 25px;
        right: 15px;
      }

      // @include media-breakpoint-up(lg) {
      //   right: 0;
      //   left: auto;
      //   bottom: 32px;
      // }

      // &__view-detail {
      //   margin-right: 95px;

      //   @include media-breakpoint-up(lg) {
      //     margin-right: 30px;
      //   }
      // }

      &__video {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 26px;
        right: 150px;
        width: 9px;
        height: 11px;
        z-index: 1;

        @include media-breakpoint-up(lg) {
          bottom: 50px;
          width: 10px;
          height: 12px;
          margin-top: 0;
        }
      }
    }
  }

  .i-btn {
    min-width: 105px;

    @include media-breakpoint-up(xs) {
      min-width: 130px;
    }
  }

  .btn-scroll {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    cursor: pointer;

    @include media-breakpoint-up(lg) {
      bottom: 40px;
    }

    &:hover {
      @include hover-desktop() {
        .btn-scoll {
          display: none;
        }

        .btn-scoll-hover {
          display: block;
        }
      }
    }

    .btn-scoll {
      display: block;
    }

    .btn-scoll-hover {
      display: none;
    }
  }

  & >>> .swiper-pagination-bullet {
    opacity: 1;
    background: none;
    border: 1px solid $white;
    width: 11px;
    height: 11px;
    margin: 0 4px;
    outline: none;

    @include media-breakpoint-up(xs) {
      margin: 0 5px;
    }

    @include media-breakpoint-up(lg) {
      width: 12px;
      height: 12px;
    }
  }

  & >>> .swiper-pagination-bullet-active {
    background: $white;
  }

  & >>> .swiper-pagination {
    &.hide {
      display: none;
    }

    text-align: right;
    bottom: 26px;
    right: 15px;
    left: auto;
    width: auto;
    display: flex;
    align-items: center;

    @include media-breakpoint-up(sm) {
      right: calc((100% - 540px) / 2 + 15px);
    }

    @include media-breakpoint-up(md) {
      // right: calc((100% - 720px) / 2 + 15px);
      left: 50%;
      right: auto;
      transform: translateX(-50%);
    }

    @include media-breakpoint-up(lg) {
      bottom: 50px;
      // right: calc((100% - 960px) / 2 + 15px);
    }

    // @include media-breakpoint-up(xl) {
    //   right: calc((100% - 1200px) / 2 + 15px);
    // }
  }

  .content-position-mobi-right {
    left: auto;
    right: 15px;
    .header-banner {
      &__contents {
        text-align: right;
      }

      &__btn {
        justify-content: flex-end;
      }
    }
  }

  .dots-position-mobi-left {
    right: auto;
    left: 15px;

    @include media-breakpoint-up(sm) {
      left: calc((100% - 540px) / 2 + 15px);
    }

    @include media-breakpoint-up(md) {
      left: 50%;
    }
  }

  [class*='position-desk-'] {
    @include media-breakpoint-up(md) {
      position: absolute;
    }
  }

  .position-desk-left-top {
    @include media-breakpoint-up(md) {
      left: $leftPosition;
      top: $topPosition;
      right: auto;
      bottom: auto;
    }
  }

  .position-desk-left-center {
    @include media-breakpoint-up(md) {
      left: $leftPosition;
      top: 50%;
      right: auto;
      bottom: auto;
      transform: translateY(-50%);
    }
  }

  .position-desk-left-bottom {
    @include media-breakpoint-up(md) {
      bottom: $bottomPositionMd;
      left: $leftPosition;
      right: auto;
      top: auto;
    }
    @include media-breakpoint-up(lg) {
      bottom: $bottomPositionLg;
    }
  }

  .position-desk-center-top {
    @include media-breakpoint-up(md) {
      left: 50%;
      top: $topPosition;
      right: auto;
      bottom: auto;
      transform: translateX(-50%);
    }
  }

  .position-desk-center-center {
    @include media-breakpoint-up(md) {
      left: 50%;
      top: 50%;
      right: auto;
      bottom: auto;
      transform: translate(-50%, -50%);
    }
  }

  .position-desk-center-bottom {
    @include media-breakpoint-up(md) {
      left: 50%;
      top: auto;
      right: auto;
      bottom: 52px;
      transform: translateX(-50%);
    }

    @include media-breakpoint-up(lg) {
      bottom: 76px;
    }
  }

  .position-desk-right-top {
    @include media-breakpoint-up(md) {
      bottom: auto;
      right: $rightPosition;
      left: auto;
      top: $topPosition;
    }
  }

  .position-desk-right-center {
    @include media-breakpoint-up(md) {
      bottom: auto;
      right: $rightPosition;
      left: auto;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .position-desk-right-bottom {
    @include media-breakpoint-up(md) {
      bottom: $bottomPositionMd;
      right: $rightPosition;
      left: auto;
      top: auto;
    }

    @include media-breakpoint-up(lg) {
      bottom: $bottomPositionLg;
    }
  }

  .same-position-desk {
    .header-banner {
      &__contents {
        position: static;
        transform: translate(0, 0);
      }

      &__btn {
        position: static;
        transform: translate(0, 0);
      }
    }
  }
}

.video-wrapper {
  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11111;
    padding: 160px 0;
    overflow: hidden;
    display: none;

    @include media-breakpoint-up(sm) {
      padding: 295px 0;
    }

    @include media-breakpoint-up(lg) {
      padding: 90px 110px;
    }

    &__overlay {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: saturate(180%) blur(20px);
      background-color: rgba(0, 0, 0, 0.7);
    }

    &__content {
      width: 100%;
      max-width: 1200px;
      height: 100%;
      margin: 0 auto;
      position: relative;
    }

    .video-container {
      width: 100%;
      height: 100%;

      iframe {
        width: 100%;
        height: 100%;
      }
    }

    .close-btn {
      position: fixed;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: none;
      top: 25px;
      right: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      @include media-breakpoint-up(sm) {
        width: 50px;
        height: 50px;
      }

      @include media-breakpoint-up(lg) {
        width: 60px;
        height: 60px;
      }

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        background-color: $black;
        border-radius: 50%;
        transform: translateZ(0) scale(1);
        transition: background-color 0.3s cubic-bezier(0.4, 0, 0, 1),
          -webkit-transform 0.45s cubic-bezier(0.17, 0.67, 0.3, 1.33);
        transition: background-color 0.3s cubic-bezier(0.4, 0, 0, 1),
          transform 0.45s cubic-bezier(0.17, 0.67, 0.3, 1.33);
        transition: background-color 0.3s cubic-bezier(0.4, 0, 0, 1),
          transform 0.45s cubic-bezier(0.17, 0.67, 0.3, 1.33),
          -webkit-transform 0.45s cubic-bezier(0.17, 0.67, 0.3, 1.33);
        box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.04);
      }
      &:hover {
        &::before {
          background-color: $white;
        }

        svg {
          fill: $black;
        }
      }

      svg {
        display: block;
        position: relative;
        z-index: 1;
        width: 14px;
        height: 14px;
        fill: $white;
        transition: fill 0.3s cubic-bezier(0.4, 0, 0, 1);

        @include media-breakpoint-up(sm) {
          width: 18px;
          height: 18px;
        }

        @include media-breakpoint-up(lg) {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  &__media {
    position: relative;
    // overflow: hidden;
    // height: 668px;
    // width: 100%;

    &__content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;

      .container {
        height: 100%;
      }
    }

    &__video {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      overflow: hidden;
    }
  }

  &__background {
    &__video {
      width: 100%;
      height: 100%;

      div {
        height: 100%;
      }

      >>> .slider-video {
        width: 100%;
        height: 100%;
        object-fit: cover;

        // fix for Edge browser
        @supports (-ms-ime-align:auto) {
          height: auto;
        }
      }
    }
  }
}

.is-show-modal {
  display: block !important; //INFO: Use !important to display the modal
}

.swiper-slide {
  height: 0 !important;
  padding-bottom: percentage(588/375);
  overflow: hidden;

  @include media-breakpoint-up(md) {
    padding-bottom: 45%;
  }

  .header-banner,
  .video-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .header-banner {
    background: $black;
  }

  .video-wrapper {
    height: 100%;

    &__media {
      background: $black;
      height: 100%;
    }
  }
}
</style>
