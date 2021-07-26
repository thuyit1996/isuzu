<template>
  <div class="accessory-item" v-if="accessory">
    <a :href="urlDetailProduct(accessory)" class="accessory-item__image">
      <img :src="getImageDesktop()" alt="x" class="d-none d-md-block">
      <img :src="getImageMobile()" alt="x" class="d-md-none">
    </a>
    <h3 class="accessory-item__title"><a :href="urlDetailProduct(accessory)">{{accessory.Title}}</a></h3>
    <div class="accessory-item__body">
      <div class="accessory-item__price" v-if="accessoryPageData.IsShowPrice && accessoryPageData.IsShowPrice.value"><strong>{{accessory.Price}}</strong></div>
      <div class="accessory-item__contents" :class="checkHiddenContent(accessoryPageData)">
        <p class="accessory-item__description" v-if="accessoryPageData.IsShowShortDes && accessoryPageData.IsShowShortDes.value && accessory.ShortDescription" v-html="accessory.ShortDescription"></p>
        <p class="accessory-item__part-number" v-if="accessoryPageData.IsShowPartNum && accessoryPageData.IsShowPartNum.value">
          <template v-if="accessory.PartNumber">
            <span v-if="pageData.PartNumberLable && pageData.PartNumberLable.value">{{pageData.PartNumberLable && pageData.PartNumberLable.value}}: </span>
            <span>{{accessory.PartNumber}}</span>
          </template>
        </p>
      </div>
    </div>
    <div>
      <a :href="urlDetailProduct(accessory)" class="i-btn i-btn__primary">{{pageData.ReadMoreLable && pageData.ReadMoreLable.value}} ></a>
    </div>
  </div>
</template>

<script>
import { Text } from '@sitecore-jss/sitecore-jss-vue';
import defaultDesktop from '../../assets/fallback-image/accessories-fallback.png';
import defaultMobile from '../../assets/fallback-image/accessories-fallback.png';
export default {
  name: 'AccessoryItem',
  components: {
    ScText: Text,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    accessory: {
      type: Object,
      default: () => ({}),
    },
    pageData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      accessoryPageData: {},
    };
  },
  mounted() {
    this.accessoryPageData = this.$jss.routeData().fields;
  },
  methods: {
    urlDetailProduct(accessory) {
      if (accessory?.ItemUrl) {
        let url = accessory.ItemUrl;
        let vehicleType = accessory.VehicleType;
        let type = vehicleType ? `?type=${vehicleType}` : '';
        return `${url}${type}`;
      }
      return '';
    },
    getImageDesktop(){
      return this.accessory.Image || defaultDesktop; 
    },
    getImageMobile(){
      return this.accessory.MobileImage || defaultMobile; 
    },
    checkHiddenContent(data) {
      if (!data?.IsShowPartNum?.value && !data?.IsShowShortDes?.value) {
        return 'height-none';
      } else if (!data?.IsShowShortDes?.value) {
        return 'height-part-number';
      } else if (!data?.IsShowPartNum?.value) {
        return 'height-description'
      }
      return '';
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.accessory-item {
  text-align: left;
  margin-bottom: 40px;
  height: calc(100% - 40px);
  flex-direction: column;
  align-items: stretch;
  display: flex;
  justify-content: space-between;

  &__image {
    position: relative;
    padding-bottom: 59%;
    overflow: hidden;
    margin-bottom: 15px;

    @include media-breakpoint-up(md) {
      margin-bottom: 20px;
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.4s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }

  &__body {
    padding-top: 15px;
    border-top: 1px solid $black;

    @include media-breakpoint-up(lg) {
      padding-top: 25px;
      border-top: 2px solid $black;
    }
  }

  &__title,
  &__price {
    font-family: $font-family-eurothai;
    font-weight: bold;
    font-size: 2.3rem;

    @include media-breakpoint-up(lg) {
      font-size: 2.6rem;
    }
  }

  &__title {
    line-height: 2.7rem;
    padding-bottom: 14px;
    overflow: hidden;
    position: relative;
    margin-bottom: auto;

    @include span-break();
    @include max-line-text(2);

    @include media-breakpoint-up(lg) {
      line-height: 3.1rem;
      padding-bottom: 18px;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      height: 15px;
      width: 100%;
      left: 0;
      bottom: 0;
      background: $white;
    }

    a {
      color: $black;

      &:hover {
        color: #ed2600;
      }
    }
  }

  &__price {
    margin-bottom: 8px;
    min-height: 27px;

    @include media-breakpoint-up(lg) {
      margin-bottom: 15px;
      min-height: 31px;
    }
  }

  &__contents {
    min-height: 94px;
    margin-bottom: 15px;
    @include media-breakpoint-up(lg) {
      min-height: 118px;
      margin-bottom: 30px;
    }

    &.height-part-number {
      min-height: 21px;
      @include media-breakpoint-up(lg) {
        min-height: 27px;
      }
    }

    &.height-description {
      min-height: 63px;
      @include media-breakpoint-up(lg) {
        min-height: 81px;
      }
    }

    &.height-none {
      min-height: initial;
    }
  }

  &__description {
    margin-bottom: 10px;
    height: 63px;

    @include media-breakpoint-up(lg) {
      height: 81px;
    }

    @include span-break();
    @include max-line-text(3);

    >>>* {
      margin: 0;
    }
  }

  &__part-number {
    min-height: 21px;

    @include media-breakpoint-up(lg) {
      min-height: 27px;
    }
  }
}
</style>
