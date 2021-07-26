<template>
  <!-- Old code for old design -->
  <!-- <div class="down-brochure-component">
    <div class="text-center ">
      <h2 class="isu-title">
        <sc-text :field="fields.Title" />
      </h2>
    </div>
    <b-tabs id="down-brochure-tab"  >
      <b-tab v-for="(type, index) in fields.Items" :key="type.id" :disabled="type.fields.ViewDisable.value">
        <template slot="title">
          <div class="chil-menu-title" @click="tabClick(index)">
            <sc-image :media="type.fields.Image" alt="x" class="chil-menu-img"/>
            <sc-image :media="type.fields.ImageActive" alt="x" class="chil-menu-hover"/>
            <span class="title">
              <sc-text :field="type.fields.Title" />
            </span>
          </div>
        </template>
        <div class="container chil-menu-content">
          <div class="d-none d-md-block">
            <div v-if="tabIndex == index">
                <BrochureDownloadSlider :indexTab = tabIndex :items = type.fields.Items></BrochureDownloadSlider>
            </div>
          </div>
          <div class="download-brochure-mobi container d-md-none">
            <div class="swiper-row">
              <div class="col-md-3 chil-menu-content__item" v-for="(model, index) in type.fields.Items" :key="index">
                <div class="chil-menu-content__item__link">
                  <div class="product-tag">
                    <!- - <sc-text tag="div" class="product-tag__text" :field="model.fields.Tag"></sc-text> - ->
                    <sc-image v-if="checkTag(model.fields.Tag)" :media="model.fields.Tag.fields.Image" class="product-tag__img"></sc-image>
                  </div>
                  <sc-image :media="model.fields.Image" alt="x" />
                </div>
                <div class="download">
                  <div class="download__text"><sc-text :field="model.fields.Title"/></div>
                  <div class="download__btn">
                    <isu-button-link :field="model.fields.Url">
                      <sc-link :field="model.fields.Url">
                        <span>ดาวน์โหลดโบรชัวร์</span>
                        <div class="download__icon">
                          <img src="../../assets/download-icon.svg" alt="x" class="icon-nomal">
                          <img src="../../assets/download-icon-hover.svg" alt="x" class="icon-hover">
                        </div>
                      </sc-link>
                    </isu-button-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div> -->
  <!-- New code for new design -->
  <div class="download-brochure">
    <div class="container container-extra">
      <div class="download-brochure__heading text-center" v-if="fields.Title.value">
        <h2 class="download-brochure__heading__title isu-title">
          <sc-text :field="fields.Title" />
        </h2>
      </div>
      <div class="download-brochure__content" v-for="carType in fields.Items" :key="carType.id" :class="getHashUrl(carType)">
        <div class="download-brochure__content__heading">
          <h3 class="download-brochure__content__heading__title">
            <sc-text :field="carType.fields.Title" />
          </h3>
          <!-- <p class="download-brochure__content__heading__desc">ออลนิว อีซูซุ ดีแมคซ์ พลานุภาพ...พลิกโลก !</p> -->
          <sc-rich-text tag="p" :field="carType.fields.Description" class="download-brochure__content__heading__desc" />
        </div>
        <div class="download-brochure__content__list">
          <div class="download-brochure__content__list__inner" v-for="subItem in carType.fields.Items" :key="subItem.id">
            <h4 class="download-brochure__content__list__title" v-if="subItem.fields.Title.value">
              <sc-text :field="subItem.fields.Title" />
            </h4>
            <div class="container">
              <div class="row">
                <div class="col-6 col-lg-4" v-for="item in subItem.fields.Items" :key="item.id">
                  <sc-link :field="item.fields.Url" class="download-brochure__content__item">
                    <div class="download-brochure__content__item__image-wrap">
                      <div class="download-brochure__content__item__image-logo">
                        <!-- <img src="../../assets/logo-brochure.png" alt="logo image"> -->
                        <sc-image :media="item.fields.Logo" />
                      </div>
                      <div class="download-brochure__content__item__image-tag">
                        <!-- <img src="../../assets/tag-all-new-brochure.svg" alt="tag image"> -->
                        <sc-image v-if="checkTag(item.fields.Tag)" :media="item.fields.Tag.fields.Image" />
                      </div>
                      <div class="download-brochure__content__item__image-product">
                        <!-- <img src="../../assets/brochure-vcross.png" alt="product image"> -->
                        <sc-image :media="item.fields.Image" />
                        <div class="download-brochure__content__item__btn-download">
                          <!-- <a href="#" class="i-btn btn-download-brochure">ดาวน์โหลด</a> -->
                          <span class="i-btn btn-download-brochure">
                            <sc-text :field="fields.ButtonDownloadTitle" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <!-- <p class="download-brochure__content__item__car-name">วี-ครอส 4x4</p> -->
                    <sc-text tag="p" :field="item.fields.Title" class="download-brochure__content__item__car-name" />
                  </sc-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Link, Image, Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import BrochureDownloadSlider from './BrochureDownloadSlider';
import { isMobile } from '../../util/dom';
import IsuButtonLink from '../shared/IsuButtonLink';

const PADDING_TOP = 52;

export default {
  name: 'BrochureDownload',
  components: {
    ScLink: Link,
    ScImage: Image,
    ScText: Text,
    BrochureDownloadSlider: BrochureDownloadSlider,
    IsuButtonLink: IsuButtonLink,
    ScRichText: RichText,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tabIndex : 0,
      stickyNav: true,
      deviceType: 3,
      detectMobile: false,
    }
  },
  methods: {
    tabClick(index){
      this.tabIndex = index;
    },
    checkTag(tag) {
      return tag?.fields?.Image?.value?.src;
    },
    getHashUrl(item) {
      return item?.fields?.HashUrl?.value || '';
    },
    scollToComponentTarget(component) {
      let targetComponent = this.$el.querySelector('.' + component);
      let offsetTop = targetComponent.offsetTop - PADDING_TOP;
      window.scroll({ top: offsetTop, left: 0, behavior: 'smooth' });
    },
    onScrollHandler() {
      let windowUrl = window.location.hash;
      this.fields.Items.forEach((item) => {
        if (this.getHashUrl(item) && windowUrl == '#' + this.getHashUrl(item)) {
          this.scollToComponentTarget(this.getHashUrl(item));
        }
      });
    },
  },
  mounted() {
    this.onScrollHandler();
    window.addEventListener('popstate', this.onScrollHandler);
    this.deviceType = this.$jss.sitecoreContext()?.deviceInfo?.type;
    this.detectMobile = isMobile(this.deviceType);
  },
  destroyed() {
    window.removeEventListener('popstate', this.onScrollHandler);
  },
}
</script>
<style lang="scss" scoped>
@import '../../../node_modules/swiper/dist/css/swiper.css';
@import '../../assets/reuse-mixin.scss';

.download-brochure {
  padding: 30px 0 25px;
  background: #f4f6f6;

  @include media-breakpoint-up(lg) {
    padding: 50px 0 25px;
  }

  &__heading {
    margin-bottom: 30px;
  }

  &__content {
    text-align: center;
    border-radius: 5px;
    background: #fff;
    box-shadow: 0 0 10px hsla(0,0%,88.6%,.3);
    margin-bottom: 25px;
    padding: 30px 10px;
    display: flex;
    flex-direction: column;

    @include media-breakpoint-up(lg) {
      flex-direction: row;
      padding: 30px 45px;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &__heading {
      @include media-breakpoint-up(lg) {
        width: 25%;
        text-align: left;
        padding-right: 40px;
      }

      @include media-breakpoint-up(xl) {
        width: 17%;
      }
      
      &__title {
        font-size: 3.5rem;
        line-height: 0.95;
        margin: 0;
        font-family: KittithadaBold75;
      }

      &__desc {
        font-size: 2.0rem;
        margin: 0;
        color: #676767;
        line-height: 0.9;
        @include span-break();
      }
    }

    &__list {
      font-size: 2.5rem;
      padding-top: 28px;

      @include media-breakpoint-up(md) {
        padding-top: 20px;
      }

      @include media-breakpoint-up(lg) {
        width: 75%;
      }

      @include media-breakpoint-up(xl) {
        width: 83%;
      }

      .row {
        justify-content: center;

         @include media-breakpoint-up(lg) {
          justify-content: flex-start;
        }
      }

      &__inner {
        @include media-breakpoint-up(lg) {
          border-left: 1px solid #cdcdcd;
        }
      } 

      &__title {
        font-size: 2.8rem;
        line-height: 1em;
        margin: 0 0 20px;
        font-family: KittithadaBold75;

        @include media-breakpoint-up(lg) {
          text-align: left;
          padding-left: 5%;
          // margin-top: 0;
        }
      }
    }

    &__item {
      padding: 0 5px 25px;
      position: relative;
      cursor: pointer;
      display: block;
      color: $body-color;
      // height: 100%;
      // display: flex;
      // flex-direction: column;
      // justify-content: flex-end;

      @include media-breakpoint-up(lg) {
        padding: 0 15px 30px;
      }

      &:hover {
        .download-brochure__content__item__btn-download {
          transform: translate(-50%,-50%);
          opacity: 1;
        }

        .download-brochure__content__item__car-name {
          color: $red-hover-color;
        }
      }

      &__image-wrap {
        height: 100%;
        position: relative;
        // display: flex;
        // flex-direction: column;
        // justify-content: flex-end;
      }

      &__image-logo {
        display: none;
        width: 70%;
        margin: 0 5% 0 auto;
        line-height: 0;

        @include media-breakpoint-up(md) {
          margin: 0 10% 0 auto;
        }

        @include media-breakpoint-up(lg) {
          width: 50%;
          margin: 0 12% 0 auto;
        }

        img {
          @include media-breakpoint-up(md) {
            width: 100px;
          }

          @include media-breakpoint-up(lg) {
            width: 100%;
          }
        }
      }

      &__image-tag {
        position: absolute;
        line-height: 0.9;
        // margin-bottom: 10px;
        // width: 100%;
        // margin: 0 auto 5px;
        top: -20%;
        left: -10%;
        width: 45%;

        @include media-breakpoint-up(md) {
          // width: 65%;
          top: -10%;
          left: 10%;
          width: 20%;
        }

        @include media-breakpoint-up(lg) {
          // width: 100%;
          top: -15%;
          left: 3%;
          width: 36%;

          img {
            height: 15px;
            width: auto;
          }
        }

        @include media-breakpoint-up(xl) {
          top: -5%;
          left: 4%;
          width: 30%;
        }

        img {
          width: 100%;
        }
      }

      &__image-product {
        position: relative;
        padding-top: 65%;

        @include media-breakpoint-up(md) {
          padding-top: 42%;
        }

        @include media-breakpoint-up(lg) {
          padding-top: 65%;
        }

        img {
          width: 100%;
          height: 100%;
          // object-fit: contain;
          object-fit: scale-down;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }

      &__car-name {
        font-size: 0.9em;
        line-height: 0.9;
        margin: 8px 0 0;
        transition: all .2s ease;
        // min-height: 40px;

        @include media-breakpoint-up(md) {
          font-size: 2.5rem;
        }
      }

      &__btn-download {
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transition: all .2s ease;
        transform: translate(-50%,-30%);
        padding: 0 10px;

        .btn-download-brochure {
          font-size: inherit;
          line-height: 35px;
          border-radius: 25px;
          background: #ed1c24;
          padding: 0 10px 0 30px;
          height: 35px;
          color: #fff;
          white-space: nowrap;
          min-width: auto;
          position: relative;

          @include media-breakpoint-up(lg) {
            padding: 0 20px 0 42px;
          }

          &::after {
            content: "";
            background: url('../../assets/icon-download-brochure.png') no-repeat;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 10px;
            width: 19px;
            height: 19px;

            @include media-breakpoint-up(lg) {
              left: 20px;
            }
          }
        }
      }
    }
  }
}

// INFO: Style for component followed by old design:
// .down-brochure-component {
//   padding: 50px 0 0;

//   #down-brochure-tab {
//     margin-top: 30px;

//     & >>> .nav-tabs {
//       border: none;
//       justify-content: space-between;
//       margin-top: 4px;
//       padding: 0 25px;
//       position: relative;
//       flex-wrap: nowrap;
//       overflow-x: auto;
//       overflow-y: hidden;
//       -ms-overflow-style: none;

//       @include media-breakpoint-up(sm) {
//         justify-content: space-evenly;
//       }

//       @include media-breakpoint-up(md) {
//         justify-content: center;
//         border-bottom: 1px solid #dee2e6;
//       }

//       &::-webkit-scrollbar {
//         display: none;
//       }

//       .nav-link {
//         padding: 30px 4px 10px 4px;
//         color: #b7b7b7;
//         border: none;
//         border-radius: 0;
//         padding: 0;

//         .chil-menu-img {
//           display: block;
//         }

//         .chil-menu-hover {
//           display: none;
//         }

//         &.active {
//           border-bottom: 3px solid $red-hover-color;
//           color: $black;
//           height: 100%;
//           display: block;
//           background: none;

//           .chil-menu-img {
//             display: none;
//           }
          
//           .chil-menu-hover {
//             display: block;
//           }
//         }
//       }
//     }

//     & >>> .nav-item {
//       margin: 0 10px;

//       @include media-breakpoint-up(md) {
//         margin: 0 45px;
//       }

//       &:last-child {
//         padding-right: 10px;
//         @include media-breakpoint-up(sm) {
//           padding-right: 0;
//         }
//       }

//       .chil-menu-title {
//         text-align: center;
//         padding: 0 0 10px;

//         img {
//           max-width: 64px;
//           height: 26px;
//           margin: 0 auto;
//         }

//         span {
//           margin-top: 6px;
//           display: block;
//           white-space: nowrap;
//         }
//       }
//     }

//     .chil-menu-content {
//       padding: 30px 10px 20px;
//       position: relative;

//       @include media-breakpoint-up(lg) {
//         padding: 78px 10px 0;
//       }

//       &__item {
//         color: $black;
//         display: flex;
//         margin: 18px 0;
//         padding: 0;

//         @include media-breakpoint-up(xs) {
//           padding: 0 15px;
//         }

//         @include media-breakpoint-up(md) {
//           display: block;
//           margin: 0;
//         }

//         &:first-child {
//           margin-top: 0;
//         }

//         &__link {
//           height: 95px;
//           width: 50%;
//           display: flex;
//           align-items: center;
//           padding-right: 12px;

//           @include media-breakpoint-up(sm) {
//             justify-content: center;
//           }

//           @include media-breakpoint-up(md) {
//             height: 110px;
//             width: 100%;
//             justify-content: center;
//             padding-right: 0;
//           }

//           @include media-breakpoint-up(lg) {
//             margin-bottom: 25px;
//           }
//         }

//         .download {
//           width: 50%;
//           display: flex;
//           flex-direction: column;
//           margin-bottom: 10px;
//           padding-left: 5px;
//           line-height: 18px;
//           justify-content: center;
//           align-items: center;

//           @include media-breakpoint-up(xs) {
//             padding-left: 12px;
//           }

//           @include media-breakpoint-up(md) {
//             width: 100%;
//             padding-left: 0;
//           }

//           &__text {
//             margin-bottom: 10px;

//             @include media-breakpoint-up(lg) {
//               margin-bottom: 35px;
//             }
//           }

//           &__btn {
//             // border: 1px solid #e0e0e0;
//             background: $primary-bgr; //INFO: Follow customer's required
//             color: $primary-color;
//             border-radius: 50px;
//             transition: all 0.25s ease-in-out;

//             a {
//               display: block;
//               padding: 10px 9px;
//               width: 100%;
//               text-align: center;
//               // color: $black;
//               color: $white; //INFO: Follow customer's required
//               line-height: 18px;

//               @include media-breakpoint-up(xs) {
//                 padding: 10px 12px;
//               }

//               @include media-breakpoint-up(lg) {
//                 padding: 11px 35px;
//               }
//             }
//           }

//           &__icon {
//             display: inline-flex;
//             align-items: center;
//             height: 100%;

//             img {
//               margin-left: 4px;

//               @include media-breakpoint-up(lg) {
//                 margin-left: 6px;
//               }
//             }

//             .icon-nomal {
//               // display: block;
//               display: none;
//             }

//             .icon-hover {
//               // display: none;
//               display: block;
//             }
//           }
//         }

//         img {
//           width: auto;
//           height: auto;
//           max-width: 100%;
//           max-height: 100%;
//         }
//       }
//     }

//     // .all-new {
//       //   display: none;
//     //   position: relative;

//     //   @include media-breakpoint-up(md) {
//     //     display: block;
//     //   }

//     //   &::before {
//       //     content: '';
//     //     position: absolute;
//     //     top: 0;
//     //     right: 0;
//     //     width: 72px;
//     //     height: 13px;
//     //     background: url('../../assets/all-new.png') no-repeat;
//     //     background-position: center;
//     //     background-size: cover;
//     //   }
//     // }

//     .download-brochure-des {
//       // display: none;

//       // @include media-breakpoint-up(md) {
//         //   display: block;
//       // }

//       .row {
//         justify-content: center;
//       }
//     }

//     .download-brochure-mobi {
//       @include product-tag();

//       .product-tag {
//         display: flex;
//         top: 20px;
//         height: 9px;

//         @include media-breakpoint-up(sm) {
//           top: 10px;
//           height: 13px;
//         }
//       }
//     }

//     & >>> .swiper-button-prev,
//     & >>> .swiper-button-next {
//       position: absolute;
//       top: 50%;
//       transform: translateX(-50%);
//       outline: none;
//       background-position: center;
//       background-size: cover;
//       background-repeat: no-repeat;
//       width: 17px;
//       height: 32px;
//     }

//     & >>> .swiper-button-prev {
//       background-image: url('../../assets/btn-prev.png');
//       left: -80px;
//     }

//     & >>> .swiper-button-next {
//       background-image: url('../../assets/btn-next.png');
//       right: -93px;
//     }

//     .swiper-row {
//       display: flex;
//       flex-direction: column;
//       justify-content: center;

//       @include media-breakpoint-up(md) {
//         flex-wrap: wrap;
//         flex-direction: row;
//       }

//       @include media-breakpoint-up(lg) {
//         flex-wrap: nowrap;
//       }
//     }

//     & >>> .card {
//       border: none;
//       border-radius: 0;
//     }
//   }
// }
</style>
