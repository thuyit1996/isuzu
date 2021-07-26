<template>
  <div class="right-navigator" v-if="fields.Items.length">
    <div class="right-navigator__nav-right" :class="{'active-nav': isShowNav, 'scroll-mb': isScroll}">
      <ul class="right-navigator__nav-right__items">
        <li :key=(index) v-for="(item, index) in fields.Items">
          <!-- TODO: we need image for hover styling, and one image missing in mobike layout -->
          <sc-image :media="item.fields.Image"/>
          <sc-link class="item-detail"  :field="item.fields.Url">
            <div class="item-detail__contents" v-if="!isEditing">
              <sc-image :media="item.fields.ImageHover" />
              <sc-text class="d-md-none" tag="span" :field="item.fields.MobileTitle" />
              <sc-text class="d-none d-md-block" tag="span" :field="item.fields.Title" />
            </div>
          </sc-link>
        </li>
        <li @click="activeRightNav">
          <a class="btn-arrow">
            <img src="../../assets/navigator-icon-arrow.png" alt="x" class="arrow-right">
            <img src="../../assets/navigator-icon-arrow-hover.png" alt="x" class="arrow-right-hover">
          </a>
        </li>
      </ul>
    </div>
    <div class="right-navigator__show d-none d-sm-block" :class="{'active-nav': isShowNav}" @click="activeRightNav">
      <a class="right-navigator__show__btn">
        <img src="../../assets/arrow-right.svg" alt="x" class="arrow-right">
        <img src="../../assets/arrow-right-white.svg" alt="x" class="arrow-right-hover">
      </a>
    </div>
  </div>
</template>

<script>
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import { debounce } from '../../service/delayTimeService';

export default {
  name: 'SecondaryStickyMenu',
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
      isShowNav: false,
      isScroll: false,
      isEditing: false,
    }
  },
  methods: {
    activeRightNav() {
      this.isShowNav = !this.isShowNav;
    },
    windowScroll() {
      this.onScroll();
      let windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        this.isShowNav = false;
        window.addEventListener('scroll', this.onScroll);
      } else {
        this.isScroll = false;
        window.removeEventListener('scroll', this.onScroll);
      }
    },
    onScroll() {
      let currentScroll = window.scrollY;
      let previousScroll = 0;
      if (currentScroll == previousScroll) {
        this.isScroll = true;
      } else {
        this.isScroll = false;
      }
    },
    onResize() {
      window.addEventListener('resize', () => {
        debounceTimeResize();
      });
      let debounceTimeResize = debounce(() => {
        this.windowScroll();
      });
    },
  },
  mounted() {
    this.windowScroll();
    this.onResize();
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
  },
  destroyed() {
    window.removeEventListener('resize', this.windowScroll);
    window.removeEventListener('scroll', this.onScroll);
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
a:hover {
  text-decoration: none;
}

.arrow-right {
  display: block;
}

.arrow-right-hover {
  display: none;
}

.right-navigator {
  &__nav-right {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: $SECONDARY_STICKY_MENU_ZINDEX + 1;
    width: 100%;
    transition: all 0.5s ease;

    @include media-breakpoint-up(md) {
      top: 50%;
      bottom: auto;
      transform: translate(0, -50%);
      width: auto;
      transition: all 0.5s ease;
    }

    &.active-nav {
      transform: translate(100%, -50%);
    }

    &.scroll-mb {
      transform: translateY(100%);
    }

    &__items {
      display: flex;

      @include media-breakpoint-up(md) {
        display: block;
      }

      li {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(0deg,#1e1e1e,$gray-800 61%,#3c3c3c);
        background-position: center;
        background-size: cover;
        position: relative;
        border-left: .5px solid $black;
        border-right: .5px solid $black;
        cursor: pointer;

        @include media-breakpoint-up(md) {
          width: 50px;
          height: 50px;
          background: #e0e0e1;
          border: none;
          border-bottom: .5px solid #b7b7b7;
          border-top: .5px solid $white;

          &:hover {
            .item-detail {
              opacity: 1;
              right: 0;
            }
          }
        }

        @include media-breakpoint-up(lg) {
          width: 60px;
          height: 60px;
        }

        &:first-child {
          border-top-left-radius: 0;
          border-left: none;
          border-top: none;

          @include media-breakpoint-up(md) {
            border-top-left-radius: 5px;
          }
        }

        &:nth-child(n + 6) {
          border-right: none;

          @include media-breakpoint-up(md) {
            display: none;
          }
        }

        &:last-child {
          border-bottom-left-radius: 5px;
          border-bottom: none;
          display: none;

          @include media-breakpoint-up(md) {
            display: flex;
          }

          &:hover {
            background-color: $red-hover-color;

            .arrow-right {
              display: none;
            }

            .arrow-right-hover {
              display: block;
            }
          }

          a {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

        }

        >>> img { //INFO: need add >>> for this to run on EE
          display: none;

          @include media-breakpoint-up(md) {
            display: block;
            width: 28px;
            height: 28px;
          }
        }
        .arrow-right {
          display: block;
        }
        .arrow-right-hover {
          display: none;
        }
      }

      .item-detail {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        opacity: 1;
        height: 100%;
        color: $white;
        transition: right 0.5s ease;
        overflow: hidden;
        padding: 0 5px;

        @include media-breakpoint-up(md) {
          right: -116px;
          opacity: 0;
          width: 176px;
          background-color: $red-hover-color;
          white-space: nowrap;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          flex-direction: row;
        }

        &:active {
          background-color: $red-hover-color;
        }

        &__contents {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;

          @include media-breakpoint-up(md) {
            white-space: nowrap;
            flex-direction: row;
          }
        }

        img {
          width: 24px;
          height: 24px;
          display: block;

          @include media-breakpoint-up(md) {
            width: 28px;
            height: 28px;
          }
        }

        span {
          font-size: $font-size-small;
          margin-top: 6px;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          @include media-breakpoint-up(md) {
            font-size: $font-size-base;
            margin-top: 0;
            margin-left: 10px;
          }
        }
      }
    }
  }

  &__show {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translate(100%, -50%);
    z-index: $SECONDARY_STICKY_MENU_ZINDEX;
    width: 20px;
    height: 60px;
    border-radius: 5px 0 0 5px;
    border: 1px solid $white;
    border-right-width: 0;
    background: #e0e0e1;
    transition: all 0.5s ease;

    &:hover {
      background-color: $red-hover-color;
      width: 40px;
      border: 1px solid $red-hover-color;

      .arrow-right {
        display: none;
      }
      
      .arrow-right-hover {
        display: block;
      }
    }

    &.active-nav {
      transform: translate(0, -50%);
    }

    &__btn {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        transform: rotate(180deg);
      }
    }
  }

  .right-navigator__show__btn {
    cursor: pointer;
  }
}
</style>