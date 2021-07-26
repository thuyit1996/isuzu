<template>
  <div>
    <ul ref="navbar" class="list-navbar">
      <li :class="isNavigationActive(item) ? 'active' : ''" :key="item.id" v-for="(item, navIndex) in navigationData">
        <!-- INFO: this is for top level menu, we decide which menu is just a internal/external link ( without submenu ) and which menu is text ( with submenu ) -->
        <!-- This is menu with internal/external link -->
        <template v-if="item.fields.Url.value.href.length">
          <sc-link class="navbar-link" :field="item.fields.Url">
            <sc-text tag="span" :field="item.fields.Title"></sc-text>
          </sc-link>
        </template>
        <!-- This is menu with submenu -->
        <template v-else>
          <sc-text tag="span" class="navbar-link" @click="navLinkClick(navIndex)" :field="item.fields.Title"></sc-text>
          <!-- INFO: there are 2 type of menus in second layers -->
          <!-- Linear is sub menu with tabs -->
          <div v-if="item.fields.Option.value == 'Linear Layout'" class="sup-menu">
            <b-tabs id="sup-menu-tab">
              <b-tab :key=(subIndex) v-for="(subItem, subIndex) in item.fields.Items" :disabled="subItem.fields.ViewDisable.value">
                <template slot="title">
                  <div class="chil-menu-title" @click="subMenuClick(subItem)">
                    <sc-image :media="subItem.fields.Image"  alt="x" class="chil-menu-img"></sc-image>
                    <sc-image :media="subItem.fields.ImageActive"  alt="x" class="chil-menu-hover"></sc-image>
                    <sc-text :field="subItem.fields.Title"></sc-text>
                  </div>
                </template>
                <div class="chil-menu-content" v-if="!checkExternalLink(subItem)">
                  <div class="container">
                    <div class="row">
                      <sc-link :field="subsubItem.fields.Url" class="col-md-3 chil-menu-content__item" :key=(subsubIndex) v-for="(subsubItem, subsubIndex) in subItem.fields.Items">
                        <div class="product-tag">
                          <sc-image v-if="checkTag(subsubItem.fields.Tag)" :media="subsubItem.fields.Tag.fields.Image" class="product-tag__img"></sc-image>
                        </div>
                        <sc-image :media="subsubItem.fields.Image"></sc-image>
                        <sc-text :field="subsubItem.fields.Title"></sc-text>
                      </sc-link>
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
          <!-- Grid Layout is menu with grid options and picture stay on the left of text -->
          <div v-else-if="item.fields.Option.value == 'Grid Layout'">
            <div class="sup-menu">
              <div class="container">
                <div class="sup-menu__contents">
                  <div class="sup-menu__contents__desc">
                    <sc-text tag="h2" class="title" :field="item.fields.Title"></sc-text>
                    <sc-text tag="p" class="description" :field="item.fields.Description"></sc-text>
                    <!-- <h2 class="title">สนใจรถอีซูซ</h2>
                    <p class="description">Isuzu is not only about the best products and services, but also providing support and advices to make customers up and happy</p> -->
                  </div>
                  <div class="sup-menu__contents__list">
                    <div class="row">
                      <div class="col-md-4" :key=(subIndex) v-for="(subItem, subIndex) in item.fields.Items">
                        <sc-link :field="subItem.fields.Url" class="list-item">
                          <div class="list-item__img">
                            <sc-image :media="subItem.fields.Image" class="view-default"></sc-image>
                            <sc-image :media="subItem.fields.ImageActive" class="view-hover"></sc-image>
                          </div>
                          <sc-text class="list-item__name" tag="div" :field="subItem.fields.Title"></sc-text>
                        </sc-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Vertial Grid Layout is similar to Grid Layout, but picture stay on top of text -->
          <div v-else-if="item.fields.Option.value == 'Vertical Grid Layout'">
            <div class="sup-menu">
              <div class="container">
                <div class="sup-menu__contents">
                  <div class="sup-menu__contents__desc">
                    <sc-text tag="h2" class="title" :field="item.fields.Title"></sc-text>
                    <sc-text tag="p" class="description" :field="item.fields.Description"></sc-text>
                    <!-- <h2 class="title">สนใจรถอีซูซ</h2>
                    <p class="description">Isuzu is not only about the best products and services, but also providing support and advices to make customers up and happy</p> -->
                  </div>
                  <div class="sup-menu__contents__list">
                    <div class="row">
                      <div class="col-md-4" :key=(subIndex) v-for="(subItem, subIndex) in item.fields.Items">
                        <sc-link :field="subItem.fields.Url" class="list-item text-block">
                          <div class="list-item__img">
                            <sc-image :media="subItem.fields.Image" class="view-default"></sc-image>
                            <sc-image :media="subItem.fields.ImageActive" class="view-hover"></sc-image>
                          </div>
                          <sc-text class="list-item__name" tag="div" :field="subItem.fields.Title"></sc-text>
                        </sc-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div @click="overlayClick" class="over-lay"></div>
        </template>

      </li>
    </ul>
    <MobileMenu :fields="fields"></MobileMenu>
  </div>
</template>

<script>
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';
import { isMobile, isTablet, isDesktop } from '../../util/dom';
import { debounce } from '../../service/delayTimeService';
import MobileMenu from './MobileMenu';
export default {
  name: 'MainNavigation',
  components: {
    ScLink: Link,
    ScImage: Image,
    ScText: Text,
    MobileMenu: MobileMenu,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      currentUrl: null, // INFO: we cannot set this to '' because it will create wierd effect with navigation when reload ( multiple active navlink )
      deviceType: 3,
      detectMobile: false,
      detectTablet: false,
      detectDesktop: false,
      navigationData: [],
    }
  },
  mounted() {
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
    this.detectTablet = isTablet(this.deviceType);
    this.detectDesktop = isDesktop(this.deviceType);

    this.navigationData = JSON.parse(JSON.stringify(this.fields.items));

    this.currentUrl = window.location.pathname;
    this.onResizeNavigation();
  },
  methods: {
    subMenuClick(subMenu) {
      if (this.checkExternalLink(subMenu)) {
        window.open(
          subMenu.fields.Url.value.href,
          subMenu.fields.Url.value.target ? subMenu.fields.Url.value.target : '_self'
        );
      }
    },
    isNavigationActive(item) {
      // INFO: it is active when user click to it or it is on current URL
      return item.isActive || item.fields.Url.value.href === this.currentUrl;
    },
    navLinkClick(navIdx) {
      this.navigationData = this.navigationData.map((navItem, index) => {
        return {
          ...navItem,
          isActive: Boolean(navIdx == index),
        };
      });
    },
    overlayClick() {
      this.navigationData = this.navigationData.map((navItem, index) => {
        return {
          ...navItem,
          isActive: false,
        };
      });
    },
    checkExternalLink(item) {
      if (item.fields?.Url?.value?.href) return true;
      return false;
    },
    checkTag(tag) {
      return tag?.fields?.Image?.value?.src;
    },
    onResizeNavigation(){
      let resizeEvent = debounce(()=>{
        if(window.innerWidth < this.$getConst('MOBILE_INNERWIDTH')){
          this.detectMobile = true;
        }
        if(window.innerWidth > this.$getConst('MOBILE_INNERWIDTH') && window.innerWidth < this.$getConst('TABLET_INNERWIDTH') ){
          this.detectTablet = true;
        }
      },1000);
      window.addEventListener('resize',() => {
        if(this.detectDesktop){
          resizeEvent();
        }
      })
    },
  },
  destroyed() {
    window.removeEventListener('resize', this.onResizeNavigation);
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
@include product-tag();

.list-navbar {
  height: 100%;
  align-items: center;
  display: none;
  // INFO: prevent page jumping at load
  white-space: nowrap;

  @include media-breakpoint-up(lg) {
    display: flex;
  }

  li {
    height: 100%;
    font-weight: bold;

    &:hover {
      .navbar-link {
        color: $red-hover-color;
      }
    }

    .navbar-link {
      padding: 0 23px;
      color: $white;
      line-height: 5rem; //INFOR : LINE HEIGHT follow design
      display: block;
      cursor: pointer;

      @include media-breakpoint-up(lg) {
        padding: 0 13px;
      }

      @include media-breakpoint-up(xl) {
        padding: 0 23px;
      }
    }

    &.active {
      .navbar-link {
        color: $red-hover-color;
      }

      .sup-menu {
        z-index: 2;
        visibility: visible;
        transform: translateY(0);
        opacity: 1;
      }

      .over-lay {
        position: fixed;
        top: 66px;
        left: 0;
        width: 100%;
        height: 100%;
        background: $black;
        opacity: 0.5;
        z-index: 1;
      }

      #sup-menu-tab {
        >>> .tab-content {
          @include media-breakpoint-up(lg) {
            height: auto;
          }
        }
      }
    }
  }

  .sup-menu {
    position: absolute;
    top: 50px + 1px;
    left: 0;
    width: 100%;
    background-color: #fff;
    white-space: normal;
    visibility: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition: 0.4s all;

    &::before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: #cd0002;
    }

    &__contents {
      display: flex;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      flex-wrap: wrap;
      padding: 40px 0 20px;

      @include media-breakpoint-up(lg) {
        padding: 25px 0 0;
      }

      &__desc {
        width: 25%;
        padding-right: 25px;

        .description {
          font-weight: normal;
        }
      }

      &__list {
        width: 75%;
        padding-left: 30px;
      }
    }
  }

  .list-item {
    display: flex;
    align-items: center;
    margin: 30px 0;

    .view-hover {
      display: none;
    }

    &:hover {
      .view-default {
        display: none;
      }
      .view-hover {
        display: block;
      }

      .list-item__name {
        color: $red-hover-color;
      }
    }

    &__img {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 46px;

      img {
        width: auto;
      }
    }

    &__name {
      color: $black;
      margin: 0 13px;
    }

    &.text-block {
      display: block;
      text-align: center;

      .list-item__name {
        margin-top: 24px;
      }
    }
  }
}

@include media-breakpoint-up(lg) {
  #sup-menu-tab {
    & >>> .nav-tabs {
      justify-content: center;
      margin-top: 4px;

      &::before {
        display: none;
      }

      .nav-link {
        padding: 15px 4px 10px 4px;
        color: #b7b7b7;

        &.active {
          color: $black;
          height: 100%;
          display: block;
        }
      }
    }

    & >>> .nav-item {
      margin: 0 78px;

      .chil-menu-title {
        text-align: center;

        img {
          width: 64px;
          max-width: 64px;
        }

        span {
          margin-top: 6px;
          display: block;
          color: $black;
        }
      }
    }

    .chil-menu-content {
      padding: 20px 0 13px;

      @include media-breakpoint-up(lg) {
        padding: 12px 0 13px;
      }

      .row {
        justify-content: center;
      }

      &__item {
        text-align: center;
        color: $black;
        height: 144px;
        margin-top: 10px;
        overflow: hidden;
        padding-top: 10px;

        @include media-breakpoint-up(lg) {
          height: 120px;
        }

        &:hover {
          span {
            color: $red-hover-color;
            transition: color .8s cubic-bezier(.165,.84,.44,1) 0s;
          }
        }

        &__link {
          height: 110px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &.text-down {
          display: flex;
          flex-direction: column-reverse;
          margin: 30px 0;

          &:nth-child(-n+4) {
            margin-top: 0;
          }

          .chil-menu-content__item__link {
            align-items: flex-end;
          }

          span {
            display: block;
            margin-top: 10px;
          }
        }

        span {
          display: block;
          margin-top: 10px;

          @include media-breakpoint-up(lg) {
            margin-top: 5px;
          }
        }

        img {
          width: auto;
          height: 70px;
          max-width: 100%;

          @include media-breakpoint-up(xl) {
            height: 84px;
          }
        }

        .product-tag {
          top: 4px;
          &__img {
            height: 100%;
          }
        }
      }
    }

    >>> .tab-content {
      overflow: hidden;
      height: 0;

      > .tab-pane {
        display: inherit !important;
        visibility: hidden;
        opacity: 0;
        transition: 0.4s all;
        height: 0;
      }

      > .active {
        display: inherit !important;
        visibility: visible;
        opacity: 1;
        height: auto;
      }
    }
  }
}


</style>
