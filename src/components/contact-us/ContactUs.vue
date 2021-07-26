<template>
  <div class="information-contact">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <contact-us-content :contactUs="fields"></contact-us-content>
        </div>
        <div class="col-lg-6">
          <contact-us-map ref="map" :center="center" :markerIcon="markerIcon"></contact-us-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactUsContent from './ContactUsContent';
import ContactUsMap from './ContactUsMap';

export default {
  name: 'ContactUs',
  components: {
    ContactUsContent: ContactUsContent,
    ContactUsMap: ContactUsMap,
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      center: {
        lat: parseFloat(this.fields?.HeadOffice?.fields?.Latitude?.value || 0),
        lng: parseFloat(this.fields?.HeadOffice?.fields?.Longitude?.value || 0),
      },
      markerIcon : {},
    };
  },
  mounted() {
    this.markerIcon = this.fields.IsuzuMapIcon?.value;
    this.$refs.map.initMap();
  },

};
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.information-contact {
  margin: 50px 0;

}
</style>
