<template>
  <div>
    <div class="accessories-tab">
      <div class="container no-container-md">
        <div class="accessories-tab__wrap">
          <picture class="accessories-tab__bg">
            <sc-image :media="fields.BackgroundImage" class="d-none d-md-block"></sc-image>
            <sc-image v-if="!isEditing" :media="fields.SmallBackgroundImage" class="d-md-none"></sc-image>
          </picture>
          <div class="">
            <b-tabs class="accessories-tab__switcher">
              <b-tab class="accessories-tab__switcher__item" v-for="carType in listCarType" :key="carType.id" :disabled="checkIsDisable(carType)">
                <template slot="title">
                  <sc-rich-text tag="div" :field="carType.fields.Title" class="accessories-tab__switcher__item__title" @click="getIdCarTypeSelect(carType.id)"/>
                </template>
                <div class="accessories-tab__content">
                  <div class="accessories-tab__content__image">
                    <sc-image :media="carType.fields.Image" class="d-none d-lg-block"></sc-image>
                    <sc-image v-if="!isEditing" :media="carType.fields.SmallImage" class="d-lg-none"></sc-image>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
    <sc-placeholder name="accessories-listing" :rendering="rendering" />
  </div>
</template>

<script>
import {  Image, RichText } from '@sitecore-jss/sitecore-jss-vue';
import IsuPlaceholder from '../../components/shared/IsuPlaceholder';

const DEFAULT_CAR_TYPE_SELECT = 0;

export default {
  name: 'CarTypeSelection',
  components: {
    ScImage: Image,
    ScRichText: RichText,
    ScPlaceholder: IsuPlaceholder,
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
      listCarType: this.fields?.Items,
      idCarTypeDefault: '',
      isEditing: true,
    };
  },
  mounted() {
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
    this.getDefaultIdCarTypeSelect();
  },
  methods: {
    getIdCarTypeSelect(id) {
      this.$root.$emit('IdCarTypeSelect', id);
    },
    getDefaultIdCarTypeSelect() {
      if (this.fields?.Items) {
        let tabsEnable = this.fields.Items.find((item) => {
          return item.fields?.IsEnable?.value;
        });
        if (tabsEnable) {
          this.$root.$emit('IdCarTypeSelect', tabsEnable.id);
        } else {
          this.$root.$emit('IdCarTypeSelect', '');
        }
      }
    },
    checkIsDisable(item) {
      if (item?.fields?.IsEnable?.value) {
        return false;
      }
      return true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.accessories-tab {
  min-height: 320px;

  @include media-breakpoint-up(md) {
    min-height: 580px;
  }

  @include media-breakpoint-up(lg) {
    min-height: 450px;
  }

  @include media-breakpoint-up(xl) {
    min-height: 540px;
  }

  &__wrap {
    position: relative;
    padding: 0;
  }

  &__bg {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    img {
      width: 100%;
      height: auto;

      @include media-breakpoint-up(md) {
        max-height: 430px;
      }
    }
  }

  &__switcher {
    padding-top: 45px;
    position: relative;

    @include media-breakpoint-up(lg) {
      padding-top: 50px;
    }
  }

  &__content {
    padding-top: 40px;

    &__image {
      max-width: 860px;
      margin: 0 auto;

      >>>img {
        width: auto;
        height: auto;
      }
    }
  }

  >>>.tab-title {
    &__image {
      height: 30px;
      width: auto;

      @include media-breakpoint-up(lg) {
        // height: 36px;
        height: 42px;
      }

      img {
        width: auto;
        height: auto;
      }
    }

    &--nomal {
      display: block;
    }

    &--active {
      display: none;
    }
  }

  //INFO: Custom v-tab::after

  >>> .nav-tabs {
    border: none;
    display: flex;
    width: 95%;
    justify-content: center;
    margin: 0 auto;

    .nav-item {
      border-left: 1.6px solid $black;

      @include media-breakpoint-up(lg) {
        border-left: 2px solid $black;
      }

      &:first-child {
        border: none;
      }
    }

    .nav-link {
      background: transparent;
      border: none;
      padding: 9px 18px;
      transition: all 0.25s;

      @include media-breakpoint-up(lg) {
        padding: 12px 25px;
      }

      &:hover {
        @include hover-desktop() {
          .tab-title {
            &--nomal {
              display: none;
            }

            &--active {
              display: block;
            }
          }
        }
      }

      &.active {
        .tab-title {
          &--nomal {
            display: none;
          }

          &--active {
            display: block;
          }
        }
      }
    }
  }
}
</style>