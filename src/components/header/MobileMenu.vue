<template>
  <div class="mobi-menu" :class="{show : isShow}">
    <div class="mobi-menu__list" role="tablist">
      <div class="li-menu" :key=(index) v-for="(item, index) in mobileMenuData" :class="item.fields.Url.value.href.length ? '' : 'has-chil-menu'">
        <!-- <a href="#">ISUZU Experience</a> -->
        <!-- <sc-link v-if="item.fields.Url.value.href.length" :field="item.fields.Url"/> -->
        <slot v-if="item.fields.Url.value.href.length">
          <sc-link class="navbar-link" :field="item.fields.Url">
            <sc-text tag="span" :field="item.fields.Title"></sc-text>
          </sc-link>
        </slot>
        <slot v-else>
          <div role="tab">
            <sc-text tag="a" v-b-toggle="'accordion-' + index"  class="menu-link" :field="item.fields.Title"/>
          </div>
          <b-collapse class="menu-collapse" accordion="my-accordion" role="tabpanel" :id="'accordion-' + index">
            <div v-if="item.fields.Option.value == 'Linear Layout'" class="sup-menu" :class="isIntact(item) ? 'menu-intact' : ''">
              <b-tabs>
                <b-tab :key=(subIndex) v-for="(subItem, subIndex) in item.fields.Items" @click="subMenuClick(subItem, index)" :disabled="subItem.fields.ViewDisable.value">
                  <template slot="title">
                    <div class="chil-menu-title">
                      <sc-image :media="subItem.fields.Image"  alt="x" class="chil-menu-img"></sc-image>
                      <sc-image :media="subItem.fields.ImageActive"  alt="x" class="chil-menu-hover"></sc-image>
                      <sc-text tag='span' class='title' :field="subItem.fields.Title"></sc-text>
                    </div>
                  </template>
                  <div class="chil-menu-content">
                    <div class="row">
                        <sc-link :field="subsubItem.fields.Url" class="col-md-3 chil-menu-content__item" :key=(subsubIndex) v-for="(subsubItem, subsubIndex) in subItem.fields.Items">
                          <div class="product-tag">
                            <sc-image v-if="checkTag(subsubItem.fields.Tag)" :media="subsubItem.fields.Tag.fields.Image" class="product-tag__img"></sc-image>
                          </div>
                          <div class="chil-menu-content__item__link">
                            <sc-image :media="subsubItem.fields.Image"></sc-image>
                          </div>
                          <sc-text tag="p" :field="subsubItem.fields.Title"></sc-text>
                        </sc-link>
                      </div>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
            <div v-else>
              <div class="chil-menu">
                <sc-text tag="p" class="chil-menu__desc" :field="item.fields.Description"></sc-text>
                <div class="chil-menu__lists">
                  <sc-link :field="subItem.fields.Url" class="list-item" :key=(subIndex) v-for="(subItem, subIndex) in item.fields.Items">
                    <div class="list-item__img">
                      <sc-image :media="subItem.fields.Image"></sc-image>
                    </div>
                    <sc-text class="list-item__name" tag="div" :field="subItem.fields.Title"></sc-text>
                  </sc-link>
                </div>
              </div>
            </div>
          </b-collapse>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';

export default {
  name: 'MobileMenu',
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
      isShow: false,
      mobileMenuData: [],
    };
  },
  mounted() {
    this.mobileMenuData = JSON.parse(JSON.stringify(this.fields.items));
    this.mobileMenuData = this.mobileMenuData.map((mobileItem) => {
      return {
        ...mobileItem,
        isIntact: true,
      };
    });
    this.$root.$on('on:toggleMobileMenu', () => {
      this.isShow = !this.isShow;
      this.resetMenuIntactStatus();
    });
  },
  methods: {
    checkToExternalLink(subMenu) {
      if (this.checkExternalLink(subMenu)) {
        window.open(
          subMenu.fields.Url.value.href,
          subMenu.fields.Url.value.target ? subMenu.fields.Url.value.target : '_self'
        );
      }
    },
    checkExternalLink(item) {
      if (item.fields?.Url?.value?.href) return true;
      return false;
    },
    checkTag(tag) {
      return tag?.fields?.Image?.value?.src;
    },
    isIntact(item) {
      return item.isIntact;
    },
    subMenuClick(subMenu, mobileIdx) {
      this.checkToExternalLink(subMenu);
      this.mobileMenuData[mobileIdx].isIntact = false;
    },
    resetMenuIntactStatus() {
      this.mobileMenuData = this.mobileMenuData.map((mobileItem) => {
        return {
          ...mobileItem,
          isIntact: true,
        };
      });
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
@include product-tag();

.mobi-menu {
  position: absolute;
  top:0;
  left: 0;
  width: 100vw;
  height: 0;
  background-color: $white;
  color: $black;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: all .6s ease;
  opacity: 0;
  border-top: 4px solid #e3e3e4;

  &.show {
    top: 49px;
    //INFO: padding-bottom have to > top to last element will not be hidden
    padding-bottom: 160px;
    opacity: 1;
    // INFO: temporary accept that the menu height will be full screen, this will enable scroll easier
    // TODO: need complete solution for this.
    height: 100vh;
  }

  .sup-menu {
    // INFO: menu intact class is to defined whether the sub-sub menu of that menu is open or not.
    // If NO, then hide the sub sub menu content, only display it when user click to tab
    &.menu-intact {
      .chil-menu-content {
        display: none;
      }

      >>> .nav-link.active:after {
        opacity: 0;
      }
    }
  }

  &__list {
    background-color: $white;

    .li-menu {
      border-bottom: 2px solid #e3e3e4;

      a {
        padding: 18px 40px;
        color: $black;
        font-size: 2.4rem;
        display: block;
        cursor: pointer;
      }

      &.has-chil-menu {
        .menu-link {
          position: relative;

          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 6px;
            height: 100%;
            background-color: #ff001a;
          }

          &:after {
            content: '';
            position: absolute;
            right: 25px;
            top: 30px;
            width: 15px;
            height: 15px;
            background: url('../../assets/arrow-down.svg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 15px;
            transition: all .2s ease-in-out;
            transform: rotate(180deg)
          }

          &.collapsed {
            &:after {
              transform: rotate(0deg)
            }

            &::before {
              display: none;
            }
          }
        }
      }
    }
  }

  .menu-collapse {
    .chil-menu-title {
      padding: 30px 10px 20px 10px;
      text-align: center;

      img {
        width: 64px;
        height: 26px;

        @include media-breakpoint-up(lg) {
          height: auto;
          max-height: 26px;
        }
      }

      .title {
        font-size: $font-size-mobile;
        color: $black;
        display: block;
        margin-top: 6px;

      }
    }
  }

  .chil-menu-content {

    .row {
      justify-content: center;
    }

    &__item {
      border-bottom: 2px solid #e3e3e4;

      @include media-breakpoint-up(md) {
        border-bottom: none;
      }

      &:first-child {
        border-top: 2px solid #e3e3e4;

        @include media-breakpoint-up(md) {
          border-top: none;
        }
      }

      &:last-child {
        border-bottom: none;
      }

      p {
        width: calc(100% - 115px);
        margin-bottom: 0;
        font-size: 2.4rem;
        line-height: 2.4rem; //INFOR : LINE HEIGHT follow design
        margin-left: 30px;

        @include media-breakpoint-up(md) {
          width: 100%;
          margin-left: -5px;
          display: block;
          margin-top: 5px;

        }
      }

      &__link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 115px;
        height: 42px;

        img {
          width: auto;
          max-width: 100%;
          height: 43px;

        }
      }
    }

    a.chil-menu-content__item {
      display: flex;
      align-items: center;

      @include media-breakpoint-up(md) {
        display: block;
        text-align: center;
        padding-top: 28px;
      }

      @include media-breakpoint-up(lg) {
        padding-top: 8px;
        margin-top: 20px;
      }
    }
  }

  .chil-menu {
    &__desc {
      display: none;
      color: $black;
      font-size: $font-size-mobile;
      line-height: 1.8rem; //INFOR : LINE HEIGHT follow design
      margin-bottom: 0;
      background-color: #f5f5f5;
      padding: 24px 25px 20px 25px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 12px;
        background-image: url('../../assets/shadow-sub-menu.png');
        background-position: center;
        background-size: cover;
      }
    }

    &__lists {
      .list-item {
        display: flex;
        align-items: center;
        padding: 18px 25px;
        border-bottom: 2px solid #e3e3e4;

        &:first-child {
          border-top: 2px solid #e3e3e4;
        }

        &:last-child {
          border-bottom: none;
        }

        &__img {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 115px;
          height: 42px;

          img {
            width: auto;
            max-width: 100%;
            max-height: 100%;
            height: auto;
          }
        }

        &__name {
          margin-left: 20px;
        }
      }
    }
  }

  .li-menu:not(.has-chil-menu) .navbar-link,
  .chil-menu-content__item,
  .list-item {
    &:focus,
    &:hover,
    &:active {
      outline: none;
      background: #f5f5f5;
    }
  }

  .product-tag {
    height: 9px;
    top: 14px;

    @include media-breakpoint-up(md) {
      top: 24px;
      right: 62%;
    }

    @include media-breakpoint-up(lg) {
      top: 4px;
    }

    &__img {
      margin-left: 26px;
      height: 100%;

      @include media-breakpoint-up(md) {
        margin-left: 0;
      }
    }
  }
}
</style>