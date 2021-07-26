<template>
  <div class="main-menu"  :class="[isTransparent ? '' : 'sticky', isEditing ? 'experience-edit-header': '']">
    <!-- <sc-placeholder name="header-content" :rendering="rendering" /> -->
    <div class="nav-bar-wrap">
      <div class="nav-bar container">
        <a href="/" class="logo">
          <sc-image class="white-logo" :media="fields.DefaultLogo"/>
          <sc-image class="red-logo" :media="fields.ActiveLogo"/>
        </a>
        <sc-placeholder name="header-content" :rendering="rendering" />
        <div class="burger-menu" :class="{open : isOpen}" @click="clickIconMenu">
          <span></span>
          <span></span>
          <span></span>
          <span>เมนู</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../components/shared/IsuPlaceholder';
import { unLockScroll, lockScroll } from '../service/lockPopupService';
export default {
  name: 'Header',
  components: {
    ScPlaceholder: IsuPlaceholder,
    ScImage: Image,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    rendering: {
      type: Object,
    },
  },
  data() {
    return {
      isOpen: false,
      isTransparent: true,
      isActive: false,
      isEditing: false
    }
  },
  mounted() {
    this.pageData = this.$jss.routeData().fields;
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    this.isTransparent = this.pageData.IsTransparent.value;
  },
  methods: {
    clickIconMenu() {
      this.isOpen = !this.isOpen;
      this.$root.$emit('on:toggleMobileMenu');
      this.isOpen ? lockScroll() : unLockScroll();
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/reuse-mixin.scss';

.main-menu {
  position: fixed;
  left: 0;
  width: 100%;
  // INFO: disable transition ALL, if NOT, we will have jitter when popup open
  // TODO: find better way to make transition without having jitter
  transition: background .2s ease-in-out;

  .nav-bar-wrap {
    padding-top: 3px;

    @include media-breakpoint-up(lg) {
      padding-top: 16px;
    }

    &.bgrActive {
      background-color: $white;
      padding-top: 0;
      .logo {
        .white-logo {
          display: none;
        }
        .red-logo {
          display: block;
        }
      }
      & >>> .list-navbar {
        > li {
          height: 50px;
          display: flex;
          align-items: center;

          &:hover {
            background-color: $red-hover-color;

            .navbar-link {
              color: $white;
            }
          }

          &.active {
            background-color: $red-hover-color;

            .navbar-link {
              color: $white;
            }
          }

          .navbar-link {
            color: $black;
          }
        }
      }
    }
  }

  &.sticky {
    background-color: $white;
    top: 0;
    border-bottom: 2px solid #cd0002;

    // INDO: disable this because of design change
    // &::before {
    //   content: '';
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   height: 3px;
    //   width: 100%;
    //   background-color: #cd0002;
    // }

    .nav-bar-wrap {
      padding-top: 0;
    }

    .logo {
      .white-logo {
        display: none;
      }
      .red-logo {
        display: block;
      }
    }

    & >>> .list-navbar {
      > li {
        height: 100%;
        display: flex;
        align-items: center;

        &:hover {
          background-color: $red-hover-color;

          .navbar-link {
            color: $white;
          }
        }

        &.active {
          background-color: $red-hover-color;

          .navbar-link {
            color: $white;
          }
        }

        .navbar-link {
          color: $black;
        }
      }
    }

    .burger-menu {
      span:not(:last-child) {
        background-color: $black;
      }
      span {
        color: $black;
      }
    }

    &.experience-edit-header {
      position: inherit;
    }
  }

  .nav-bar-wrap {
    position: relative;
    width: 100%;
  }

  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // max-width: 100%;
    // margin: 0 15px;
    height: 50px;

    @include media-breakpoint-up(lg) {
      // max-width: 1200px;
      // margin: 0 auto;
      min-height: auto;
    }
  }

  .logo {
    @include media-breakpoint-up(lg) {
      display: inline-block;
      margin-top: -3px;
      max-width: 80px;
    }

    @include media-breakpoint-up(xl) {
      max-width: auto;
    }

    img {
      height: 12px;
      width: auto;

      @include media-breakpoint-up(lg) {
        height: 18px;
      }
    }

    .red-logo {
      display: none;
    }
  }

  .burger-menu {
    display: flex;
    // width: 35px;
    flex-direction: column;
    padding: 10px 0 10px 20px;
    width: auto;

    @include media-breakpoint-up(lg) {
      display: none;
    }

    span:not(:last-child) {
      width: 30px;
      height: 2px;
      background-color: $white;
      margin-bottom: 5px;
    }

    span {
      opacity: 1;
      color: $white;

      &:first-child {
        transition: all .5s ease;
      }
      &:nth-child(2) {
        transition: all .5s ease;
      }

      &:nth-child(3) {
        width: 20px;
        transition: all .5s ease;
      }
      &:last-child {
        line-height: 12px;
        font-size: 18px;
        transition: all .5s ease;
        font-weight: $font-weight-bold;

      }
    }

    &.open {
      span {
        &:first-child {
          margin-bottom: -2px;
          transform: rotate(45deg);
        }
        &:nth-child(2) {
          margin-bottom: 0;
          transform: rotate(-45deg);
        }
        &:nth-child(3) {
          margin-left: -25px;
          display: none;
        }
        &:last-child {
          margin-bottom: -16px;
          opacity: 0;
        }
      }
    }
  }

  & >>> .card {
    border: none;
    border-radius: 0;
  }

  & >>> .nav-tabs {
    border: none;
    position: relative;
    background-color: #f5f5f5;
    padding: 0 25px;
    justify-content: space-between;

    @include media-breakpoint-up(md) {
      justify-content: center;

      .nav-item {
        margin: 0 45px;
      }
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 12px;
      background-image: url('../assets/shadow-sub-menu.png');
      background-position: center;
      background-size: cover;
    }

    .nav-link {
      border: none;
      border-radius: 0;
      padding: 0;

      .chil-menu-img {
        display: inline-block;
      }

      .chil-menu-hover {
        display: none;
      }

      &.active {
        background: none;
        position: relative;

        &::after {
          content: "";
          display: block;
          z-index: 1;
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 3px;
          background: $red-hover-color;

          @include media-breakpoint-up(md) {
            bottom: 0;
          }
        }

        .chil-menu-img {
          display: none;
        }

        .chil-menu-hover {
          display: inline-block;
        }
      }

      &.non-active {
        &::after {
          display: none;
        }

        .chil-menu-img {
          display: inline-block;
        }

        .chil-menu-hover {
          display: none;
        }
      }
    }
  }
}
</style>