<template>
  <div>
    <div class="accessory-detail__products__content__swiper detail-content-col" v-if="!isLoading">
      <slot name="swiper"></slot>
    </div>

    <div class="accessory-detail__products__content__info detail-content-col" v-if="!isLoading">
      <div class="accessory-detail-info__title">
        <h3 class="accessory-detail-info__title__text">{{fields.Title}}</h3>
      </div>
      <div class="accessory-detail-info__description">
        <div class="accessory-detail-info__description__price" v-if="accessoryDetailFields && accessoryDetailFields.IsShowPrice">{{fields.Price}}</div>
        <div class="accessory-detail-info__description__desc" v-if="accessoryDetailFields && accessoryDetailFields.IsShowDescription && fields.Description" v-html="fields.Description"></div>
        <div class="accessory-detail-info__description__desc--part" v-if="accessoryDetailFields && accessoryDetailFields.IsShowPartNum">
          <template v-if="fields.PartNumber">
            <span v-if="partNumberLabel">{{partNumberLabel}}: </span>
            <span>{{fields.PartNumber}}</span>
          </template>
        </div>
      </div>
      <slot name="share"></slot>
    </div>
    <div v-if="isLoading">
      <campaign-loading></campaign-loading>
    </div>
  </div>
</template>

<script>
import { Image, RichText, Text } from '@sitecore-jss/sitecore-jss-vue';
import AccessoryDetailSwiper from './AccessoryDetailSwiper';
import CampaignLoading from '../campaign/CampaignLoading';

export default {
  name: 'AccessoryDetailProduct',
  components: {
    ScText: Text,
    ScImage: Image,
    ScRichText: RichText,
    AccessoryDetailSwiper: AccessoryDetailSwiper,
    CampaignLoading: CampaignLoading
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    isLoading: {
      type: Boolean
    }, 
    partNumberLabel: {
      type: String
    },
    accessoryDetailFields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
    }
  },
  mounted() {
  },

  watch : {
    fields : function (val){
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
>>> .campaign-loading {
  padding: 0;
  .container {
    height: 751px;
    @include media-breakpoint-up(lg) {
      height: $content-min-height;
    }
  }
  &__image {
    height: 240px;
    @include media-breakpoint-up(lg) {
      height: 360px;
    }
  }
}
</style>
