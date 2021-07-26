<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-wrap">
        <div class="row">
          <!-- TODO: Hard code, need better way to manage -->
          <div :key="column.id" v-for="(column, index) in fields.items" :class="index === 2 ? 'col-12 col-md-4' : 'col-6 col-md-4'">
            <template v-if="column.name == 'First Column'">
              <div class="footer__content content-empty-link">
                <sc-text tag="h6" class="footer__content__title title-underline" :field="column.fields.Items[0].fields.Title" />
              </div>
              <div class="footer__content" :key=(subIndex) v-for="(subMenu, subIndex) in column.fields.Items[0].fields.Items">
                <div :class="getClassParentLink(subMenu.fields.Url, subMenu.fields.Items)">
                  <sc-link :field="subMenu.fields.Url">
                    <sc-text tag="h6" class="footer__content__title" :field="subMenu.fields.Title" />
                  </sc-link>
                </div>
                <ul class="footer__content__link">
                  <li :key=(subsubIndex) v-for="(subItem, subsubIndex) in subMenu.fields.Items">
                    <div :class="getClassChildLink(subItem.fields.Url)">
                      <sc-link  :field="subItem.fields.Url">
                        <sc-text tag="span" :field="subItem.fields.Title" />
                      </sc-link>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else-if="column.name == 'Secondary Column'">
              <div class="footer__content" :key=(index) v-for="(subMenu, index) in column.fields.Items">
                <div :class="getClassParentLink(subMenu.fields.Url, subMenu.fields.Items)">
                  <sc-link  :field="subMenu.fields.Url">
                    <sc-text tag="h6" class="footer__content__title title-underline" :field="subMenu.fields.Title" />
                  </sc-link>
                </div>
                <ul class="footer__content__link">
                  <li :key=(subIndex) v-for="(subMenuLink, subIndex) in subMenu.fields.Items">
                    <div :class="getClassChildLink(subMenuLink.fields.Url)">
                      <sc-link :field="subMenuLink.fields.Url">
                        <sc-text tag="span" :field="subMenuLink.fields.Title" />
                      </sc-link>
                    </div>
                    </li>
                </ul>
              </div>
            </template>
            <template v-else-if="column.name == 'Third Column'">
              <div class="row">
                <!-- INFO: About isuzu -->
                <div class="col-6 col-md-12" :key=(index) v-for="(subMenu, index) in column.fields.Items">
                  <!-- TODO: Hard code, need better way to manage -->
                  <template v-if="index === 1">
                    <!-- INFO: Social Media -->
                    <div class="footer__content top-footer">
                      <div :class="getClassParentLink(subMenu.fields.Url, subMenu.fields.Items)">
                        <sc-link  :field="subMenu.fields.Url">
                          <sc-text tag="h6" class="footer__content__title title-underline" :field="subMenu.fields.Title" />
                        </sc-link>
                      </div>
                      <ul class="footer__content__link link-social">
                        <li :key=(subIndex) v-for="(subLink, subIndex) in subMenu.fields.Items">
                          <div :class="getClassChildLink(subLink.fields.Url)">
                            <sc-link :field="subLink.fields.Url">
                              <span class="media-image d-inline-block">
                                <sc-image class="d-inline-block" :media="subLink.fields.Image"/>
                              </span>
                              <sc-text tag="span" :field="subLink.fields.Title" />
                            </sc-link>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="footer__content">
                      <!-- <sc-link :field="footerModel.PrivacyPolicy"/>
                      <sc-link :field="footerModel.Sitemap"/> -->
                    </div>
                  </template>
                  <template v-else>
                    <div class="footer__content">
                      <div v-bind:class="getClassParentLink(subMenu.fields.Url, subMenu.fields.Items)">
                        <sc-link :field="subMenu.fields.Url">
                          <sc-text tag="h6" class="footer__content__title title-underline" :field="subMenu.fields.Title" />
                        </sc-link>
                      </div>
                      <ul class="footer__content__link">
                        <li :key=(subIndex) v-for="(subLink, subIndex) in subMenu.fields.Items">
                          <div v-bind:class="getClassChildLink(subLink.fields.Url)">
                            <sc-link  :field="subLink.fields.Url">
                              <sc-text tag="span" :field="subLink.fields.Title" />
                            </sc-link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </template>
                </div>
            </div>
            </template>
          </div>
        </div>
      </div>
      <div class="footer__copyright">
        <sc-text tag="p" :field="footerModel.Copyright"/>
      </div>
      <div class="btn-scroll-top" @click="backToTop" >
        <sc-text tag="span" :field="footerModel.ScrollTopTitle" />
        <img src="../../assets/scroll-top.png" alt="x" id="btn-scroll-top">
      </div>
    </div>
  </footer>
</template>

<script>
import $ from 'jquery';
import { Link, Image, Text } from '@sitecore-jss/sitecore-jss-vue';
export default {
  name: 'FooterNavigation',
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
      footerModel: {},
    }
  },
  methods: {
    backToTop(event) {
      event.preventDefault();
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    },
    checkLinkValid(link){
      return link?.value?.href?.length > 0;
    },
    getClassParentLink(url, items){ 
      return this.checkLinkValid(url) && items?.length === 0 ? 'active-parent' : 'deactive';
    },
    getClassChildLink(url){
      return this.checkLinkValid(url) ? 'active' : 'deactive';
    }
  },
  mounted() {
    this.$root.$on('footerModel', (value) => {
      this.footerModel = value;
    });
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.footer {
  .footer-wrap {
    color: #414141;
    padding: 34px 5px 35px 5px;

    @include media-breakpoint-up(lg) {
      padding: 34px 90px 35px 190px;
    }
  }

  &__content {
      margin-bottom: 15px;

      @include media-breakpoint-up(lg) {
        margin-bottom: 25px;
      }

    &__title {
      margin-bottom: 3px;
      transition: all 0.5 ease;
      cursor: default;
      font-size: $font-size-footer-title-mobile;
      font-weight: bold;

      @include media-breakpoint-up(lg) {
        font-size: $font-size-footer-title;
      }
    }

    &__link {
      li {
        font-size: $font-size-footer-link-mobile;
        margin-bottom: 3px;

        @include media-breakpoint-up(lg) {
          font-size: $font-size-footer-link;
        }
      }

      .media-image {
        text-align: center;
        margin-right: 4px;
        width: 13px;

        @include media-breakpoint-up(sm) {
          width: 15px;
        }

        @include media-breakpoint-up(lg) {
          margin-right: 8px;
          width: 20px;
        }

        @include media-breakpoint-up(xl) {
          margin-right: 10px;
          width: 23px;
        }
      }
    }

    >a {
      font-size: $font-size-small;
      display: block;
      margin-bottom: 5px;

      @include media-breakpoint-up(lg) {
        font-size: $font-size-footer-link;
        margin-bottom: 18px;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .top-footer{
    // margin-top: -40px;

    @include media-breakpoint-up(lg) {
      margin-top: 0;
    }
  }

  .bottom-footer{
    margin-bottom: 20px;

    @include media-breakpoint-up(lg) {
      margin-top: 0;
    }
  }

  &__copyright {
    text-align: center;
    border-bottom: 1px solid #bcbcbc;
    padding-bottom: 10px;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-footer-title;
      padding-bottom: 16px;
    }
  }

  a {
    color: #535353;
    text-decoration: none;
    transition: color 277ms cubic-bezier(.16,.01,.77,1);

    &:hover {
      color: $red-hover-color;
    }
  }

  .title-underline {
    border-bottom: 1px solid $gray-300;
    padding-bottom: 6px;
    margin-bottom: 10px;
    margin-top: 10px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 20px;
      margin-top: 0;
    }
  }

  .content-empty-link {
    margin-bottom: 15px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 25px;
    }
  }

  .link-social {
    li {
      @include media-breakpoint-up(lg) {
        margin-bottom: 12px;
      }

      img {
        max-height: 13px;
        margin-top: -4px;

        @include media-breakpoint-up(md) {
          max-height: 15px;
          margin-top: -5px;
        }

        @include media-breakpoint-up(lg) {
          max-height: 18px;
          margin-top: -6px;
        }

        @include media-breakpoint-up(xl) {
          max-height: 20px;
        }
      }
    }
  }

  li {
    &:last-child {
      margin-bottom: 0;
    }
  }

  .btn-scroll-top {
    padding: 32px 0 70px 0;
    text-align: center;

    @include media-breakpoint-up(lg) {
      padding: 32px 0 42px 0;
    }

    img {
      cursor: pointer;
      max-width: 22px;
      display: block;
      margin: 0 auto;
    }
  }

  .deactive{
    pointer-events: none;
    a{
      cursor: initial;
      pointer-events: none;

      &:hover {
        color: inherit;
      }
    }
  }

  .active,
  .active-parent {
    a {
      span,h6{
        cursor: pointer;
      }
    }
  }

  .active-parent{
    a h6{
      font-weight: bold;
    }
  }
}
</style>
