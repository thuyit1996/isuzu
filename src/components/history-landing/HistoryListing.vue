<template>
  <div class="history-listing">
    <div class="container">
      <div class="history-general-info delay-500 animated" v-animate-onscroll="'fadeInUp-big'">
        <div class="history-general-info__heading">
          <sc-text class="history-general-info__heading__title isu-title" tag="h2" :field="fields.Title" />
        </div>
        <sc-rich-text class="history-general-info__content" tag="div" :field="fields.Description"></sc-rich-text>
      </div>
      <div class="history-landing" v-if="historyList && historyList.length">
        <div v-for="(item, index) in historyList" :key="index">
          <div v-bind:class="'history-landing__item  history-landing__item--image-'+checkPosition(index)" v-if="checkDisplayHistory(item)">
            <div class="history-landing__item__line"></div>
            <div v-bind:class="checkImageExists(item) ? 'history-landing__item__image animated delay-500' : 'history-landing__item__image hidden'" v-animate-onscroll="'fadeInUp'">
              <sc-image v-if="checkImageExists(item)" :media="item.Image" :alt="item.Image.value.alt"/>
            </div>
            <sc-date tag="div" class="history-landing__item__year" :field="item.Date" :formatter="formatDate" :class="{'is-editing': isEditing}"/>
            <div class="history-landing__item__content animated delay-500" v-animate-onscroll="'fadeInUp'">
              <sc-text tag="p" class="history-landing__item__content__title" :field="item.Title" />
              <sc-rich-text tag="p" class="history-landing__item__content__desc" :field="item.Description" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Text, Image, RichText, DateField } from '@sitecore-jss/sitecore-jss-vue';
import { transformDate } from '../../util/customDate';
export default {
  name: 'HistoryListing',
  components: {
    ScText: Text,
    ScImage: Image,
    ScRichText: RichText,
    ScDate: DateField,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data () {
    return {
      historyList : [],
      isEditing: false,
    }
  },
  methods: {
    checkPosition(index) {
      return index % 2 == 0 ? 'left' : 'right';
    },
    formatDate(date) {
      let { year } = transformDate(date);
      return year;
    },
    checkImageExists(item){
      return item['Image']?.value?.src?.length;
    },
    checkDisplayHistory(item){
      let isDescription = item['Description']?.value?.length;
      let isTitle = item['Title']?.value?.length;
      let isImage = this.checkImageExists(item);
      return isDescription ||  isTitle || this.checkImageExists(item);
    },
  },
  mounted (){
    if(this.fields.Items && this.fields.Items.length){
      this.historyList = this.fields.Items; 
      this.historyList = this.historyList.filter(item => this.checkDisplayHistory(item)); 
    }
    this.isEditing = this.$jss.sitecoreContext()?.pageEditing;
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.history-listing {
  @include ul-style();

  >>> .history-general-info {
    padding-top: 50px;

    &__heading {
      text-align: center;
      margin-bottom: 30px;
    }

    &__content {
      &__desc {
        font-size: 2.4rem;
        line-height: 2.4rem; // INFO: Line-height follow as the design
        margin-bottom: 15px;

        @include media-breakpoint-up(lg) {
          font-size: 3rem;
          line-height: 3rem; // INFO: Line-height follow as the design
        }
      }
    }
  }

  .history-landing {
    padding-top: 80px;

    &__item {
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 0 5px 50px 27%;

      @include media-breakpoint-up(md) {
        padding-left: 0;
        flex-direction: row;
        justify-content: center;
      }

      @include media-breakpoint-up(lg) {
        padding-right: 20px;
      }

      &__image {
        width: 100%;
        position: relative;
        padding-bottom: 15px;
        text-align: center;

        @include media-breakpoint-up(md) {
          width: calc((100%-15px)/2);
          padding: 0 75px 0 0;
        }

        @include media-breakpoint-up(lg) {
          padding: 0 0 0 10px;
        }

        @include media-breakpoint-up(xl) {
          padding: 0 0 0 9%;
        }

        &::before,
        &::after {
          content: "";
          position: absolute;
          display: block;
          top: 50%;
          transform: translateY(-50%);
          background: #ee3026;
          z-index: 1;
        }

        &::before {
          height: 1px;
          width: 30%;
          left: -24%;

          @include media-breakpoint-up(md) {
            left: auto;
            right: -5px;
          }

          @include media-breakpoint-up(lg) {
            right: -10px;
          }
        }

        &::after {
          left: -24%;
          width: 6px;
          height: 6px;
          border-radius: 50%;

          @include media-breakpoint-up(md) {
            left: auto;
            right: -7px;
            width: 9px;
            height: 9px;
          }

          @include media-breakpoint-up(lg) {
            right: -15px;
          }
        }

        img {
          position: relative;
          z-index: 2;
          display: block;
          border-radius: 50%;
          width: 85%;
          height: auto;
          margin: 0;
          transition: transform .5s ease;

          &:hover {
            transform: scale(1.1);
          }

          @include media-breakpoint-up(md) {
            margin: 0 auto;
            width: auto;
          }
        }

        &.hidden {
          opacity: 0;
        }

      }

      &__line {
        position: absolute;
        left: 9%;
        width: 10px;
        height: 100%;
        background: $gray-300;

        @include media-breakpoint-up(md) {
          left: 50%;
          transform: translateX(-50%);
          width: 15px;
        }
      }

      &__year {
        font-size: 3rem;
        color: #ee3026;
        transform: rotate(-90deg);
        position: absolute;
        top: calc(30vw - 19px);
        left: -3%;

        @include media-breakpoint-up(sm) {
          top: 28%;
        }

        @include media-breakpoint-up(md) {
          font-size: 6rem;
          display: inline-block;
          top: 30%;
          left: 50%;
        }
        &.is-editing {
          @include media-breakpoint-up(md) {
            left: 40%;
          }
        }
      }

      &__content {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @include media-breakpoint-up(md) {
          width: calc((100%-15px)/2);
          padding-left: 100px;
        }

        @include media-breakpoint-up(lg) {
          padding-left: 120px;
        }

        &__title {
          font-size: 2.4rem;
          margin-bottom: 5px;

          @include media-breakpoint-up(md) {
            font-size: 3rem;
          }
        }

        &__desc {
          width: 100%;

          @include media-breakpoint-up(lg) {
            width: 350px;
          }
        }
      }
    }

    &__item--image-right {
      @include media-breakpoint-up(md) {
        padding-right: 0;
        
      }
      
      .history-landing__item {
        &__image {
          order: 1;

          @include media-breakpoint-up(md) {
            order: 2;
            padding: 0 10px 0 90px;
          }

          @include media-breakpoint-up(lg) { 
            padding: 0 10px 0 0;
          }

          @include media-breakpoint-up(xl) { 
            padding: 0 100px 0 0;
          }

          &::before,
          &::after {
            @include media-breakpoint-up(md) {
              left: -4px;
            }
          }
        }

        &__year {
          @include media-breakpoint-up(md) {
            left: 37%;
          }

          @include media-breakpoint-up(lg) {
            left: 40%;
          }

          @include media-breakpoint-up(xl) {
            left: 42%;
          }

          &.is-editing {
            @include media-breakpoint-up(xl) {
              left: 32%;
            }
          }
        }

        &__content {
          order: 2;

          @include media-breakpoint-up(md) {
            order: 1;
            padding: 0 90px 0 0;
          }

          @include media-breakpoint-up(lg) {
            padding: 0 110px 0 0;
          }

          @include media-breakpoint-up(xl) {
            padding-left: 90px;
          }
        }
      }
    }
  }
}
</style>
