<template>
  <div class="faq" role="tablist">
    <div class="container" v-for="(item, index) in fields.items" :key="item.id">
      <sc-text tag="h2" class="faq-collapse-title" :field="item.fields.Title" />
      <b-card no-body class="faq__card"  v-for="(itemChild, indexChild) in item.fields.Items" :key="indexChild" :id="'faq-item-'+item.id + itemChild.id">
        <b-card-header header-tag="header" class="faq__card__header" role="tab">
          <div class="faq__card__header__button" v-b-toggle="'accordion-' + index + '-' +indexChild" variant="info">
            <sc-text tag="span" class="faq__card__header__text" :field="getField(itemChild.fields.Question)"/>
          </div>
        </b-card-header>
        <b-collapse class="faq__card__body" accordion="my-accordion" role="tabpanel"  v-bind:id="'accordion-' + index + '-' +indexChild" @show="() => scrollTopItemFAQ('faq-item-'+item.id + itemChild.id)">
          <!-- <div v-bind:class="itemChild.fields.Image.value.src ? 'faq__card__body__content' : 'faq__card__body__content no-img' ">
            <div class="faq__card__body__content__img">
              <sc-image v-if="itemChild.fields.Image.value.src" :media="itemChild.fields.Image" :alt="itemChild.fields.Image.value.alt" />
            </div>
            <div class="faq__card__body__content__detail">
              <sc-text tag="p" :field="itemChild.fields.Answer"/>
            </div>
          </div> -->
          <div class="faq__card__body__content">
            <div class="faq__card__body__content__detail">
              <sc-rich-text tag="p" :field="getField(itemChild.fields.Answer)"/>
            </div>
          </div>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import { Text, RichText } from '@sitecore-jss/sitecore-jss-vue';
import * as $ from 'jquery';

export default {
  name: 'Accordion',
  components: {
    ScText: Text,
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
      blankText: {
        value: '',
      },
    }
  },
  methods: {
    getField(field, type) {
      return field?.value ? field : this.blankText;
    },
    scrollTopItemFAQ(id) {
      if (window.innerWidth < 768) {
        setTimeout(() => {
          let $target = $('#' + id)
          let topPixel = $($target).offset().top - 50;
          window.scroll({ top: topPixel, behavior: 'smooth' });
        }, 500);
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.faq {
  &__card {
    &__header {
      cursor: pointer;
      padding: 0.45rem 1.25rem;

      &__button {
        position: relative;
        text-decoration: none;
        color: $black;
        outline: none;
        width: 100%;
        padding: 0;
        font-size: $font-size-faq-collapse-mobile;
        line-height: 24px; //INFO: set line-height follow the design

        @include media-breakpoint-up(lg) {
          padding: 5px;
          font-size: $font-size-faq-collapse;
          padding: 6px;
        }

        &:focus {
          outline: none;
        }

        &:after {
          content: '';
          width: 20px;
          height: 11px;
          background: url('../../assets/arrow-faq.svg');
          background-position: center;
          background-repeat: no-repeat;
          transition: all .3s ease-in-out;
          transform: rotate(180deg);
          position: absolute;
          background-size: contain;
          right: 0;
          top: 5px;
          
          @include media-breakpoint-up(lg) {
            right: 13px;
            top: 10px;
            height: 13px;
          }
        }

        &.collapsed {
          &:after {
            transform: rotate(0deg);
            position: absolute;
          }
        }
      }

      &__text {
        width: calc(100% - 35px);

        &:hover {
          @include media-breakpoint-up(lg) {
            color: $red-hover-color;
          }
        }

        @include media-breakpoint-up(lg) {
          width: calc(100% - 40px);
        }
      }
    }

    &__body {
      &__content {
        display: block;
        padding: 30px 15px 20px;
        background-color: #eaeaea;
        box-shadow: inset 0px 24px 7px -19px rgba(210,210,210,1);

        @include media-breakpoint-up(lg) {
          display: flex;
          padding: 30px 70px 20px 50px;
        }

        &__detail {
          font-size: $font-size-faq-desc;
        }
      }
    }
  }

  span {
    display: block;
  }

  .no-img {
    padding-top: 4px;

    @include media-breakpoint-up(lg) {
      padding: 40px 51px 33px 50px;

      .faq__card__body__content__detail {
        margin: 0;
      }
    }
  }

  .faq-collapse-title {
    padding: 50px 0 30px;
    margin: 0;
    font-size: $font-size-faq-title-mobile;

    @include media-breakpoint-up(lg) {
      font-size: $font-size-faq-title;
    }
  }

  .card {
    border-radius: 0;
    border: none;
    margin-bottom: 6px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 10px;
    }
  }

  .card-header {
    background-color: $gray-100;
    border: none;
  }

  @include ul-style();
}
</style>
