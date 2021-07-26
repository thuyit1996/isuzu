<template>
  <div class="accessory-detail-info__share">
    <ul class="accessory-detail-info__share__list">
      <li class="accessory-detail-share-item" v-for="(icon, index) in fields.items" :key="index">
        <a class="share-facebook accessory-detail-share-item__button" :href="icon.fields.Link.value + linkPage" target="_blank">
          <sc-image :media="icon.fields.Icon.value" class="img-default accessory-detail-share-item__button__icon"></sc-image>
          <sc-image :media="icon.fields.IconHover.value" class="img-hover accessory-detail-share-item__button__icon"></sc-image>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Text, Image } from '@sitecore-jss/sitecore-jss-vue';
import { mapState } from 'vuex';
import { GetEndPoint } from '../../service/genericService';

export default {
  name: 'Social',
  components: {
    ScText: Text,
    ScImage: Image,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    }
  },
  data() {
    return {
      linkPage: '',
    }
  },
  computed: {
    ...mapState('accessorydetail', { accessoryData: 'accessoryData' }),
  },
  mounted() {
    if (this.accessoryData?.Accessory?.VehicleType) {
      this.linkPage = `${window.location.protocol}//${window.location.host}${this.accessoryData.Accessory.ItemUrl}?type=${this.accessoryData.Accessory.VehicleType}`;
    } else {
      this.linkPage =  `${window.location.protocol}//${window.location.host}${this.accessoryData?.Accessory?.ItemUrl || ''}`;
    }
  },
}
</script>
