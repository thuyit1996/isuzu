<template>
  <div ref="mainMap" class="contact-us-map"></div>
</template>

<script>
import { loadJS } from '../../util/dom';
const mapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#EFF8F3' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#EFF8F3' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#5F6B79' }] },
  {
    featureType: 'poi.business',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'transit.station.bus',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#C8EAB6' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5F6B79' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5F6B79' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#ffffff' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5F6B79' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }, { visibility: 'off' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5F6B79' }, { visibility: 'off' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#A9D3FB' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#5F6B79' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#A9D3FB' }],
  },
];
export default {
  name: 'ContactUsMap',
  components: {},
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
    center: Object,
    markerIcon : {
      type : Object,
    }
  },
  data (){
    return {
      marker : {},
    }
  },
  mounted() {
    this.vMap = null;
    this.markerCluster = null;
    this.mapStyle = mapStyle;
    this.markers = [];
  },
  watch : {
    markerIcon : function(value){
      this.marker = value;
    }
  },
  methods: {
    initMap() {
      const fallBackKeyGoogle = 'AIzaSyClLRaSuv3A3o7gttmaGJx6yuw3w9eqmWo'
      const googleMapKey = this.$jss?.routeData()?.fields?.GoogleMapKey?.value || fallBackKeyGoogle;

      let finishLoadMap = () => {
        loadJS(
          'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js',
          this.initializeMap,
          null, // TODO: Error handling for this, make promise chaining
          document.body
        );
      }

      loadJS(
        `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&libraries=places`,
        finishLoadMap,
        null, // TODO: Error handling for this, make promise chaining
        document.body
      );
    },

    initializeMap() {
      this.vMap = new google.maps.Map(this.$refs.mainMap, {
        zoom: this.$getConst('ZOOM_MAP_CONTACT_US'),
        minZoom: this.$getConst('ZOOM_MAP_MIN_CONTACT_US'),
        maxZoom: this.$getConst('ZOOM_MAP_MAX_CONTACT_US'),
        gestureHandling: 'cooperative', 
        zoomControl: true,
        center: this.center,
        mapTypeControl: false,
        styles: this.mapStyle,
      });
      var marker = new google.maps.Marker({
        position: this.center,
        map: this.vMap,
        title: 'Isuzu!',
        icon: this.marker.src || 'https://www.isuzu-tis.com/_nuxt/img/3fe99bf.png',
      });
    },

    // moveToLocation({ lat, lng }) {
    //   const center = new google.maps.LatLng(lat, lng);
    //   this.vMap.panTo(center);
    // },

    // resetMarkers() {
    //   for (let lp = 0; lp < this.markers.length; lp += 1) {
    //     this.markers[lp].setMap(null);
    //     this.markerCluster.removeMarker(this.markers[lp]);
    //   }
    //   this.markers = [];
    // },

    // generateMarkers(arrayLocations) {
    //   this.resetMarkers();
    //   arrayLocations.forEach((val) => {
    //     const myLatLng = {
    //       lat: val.lat,
    //       lng: val.lng,
    //     };
    //     const locations = myLatLng;
    //     const marker = new google.maps.Marker({
    //       position: locations,
    //       map: this.vMap,
    //       title: val.name,
    //       icon: 'https://www.isuzu-tis.com/_nuxt/img/3fe99bf.png',
    //     });

    //     marker.addListener('click', () => {
    //       this.$root.$emit('open:markerDialog', val.name);
    //     });
    //     this.markers.push(marker);
    //   });

    //   this.markerCluster = new MarkerClusterer(this.vMap, this.markers, {
    //     imagePath:
    //       'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    //   });
    // },
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';
.contact-us-map {
  height: 312px;
  margin-left: -15px;
  margin-right: -15px;

  @include media-breakpoint-up(sm) {
    margin-left: 0;
    margin-right: 0;
    height: 412px;
  }
  @include media-breakpoint-up(lg) {
    height: 100%;
    min-height: 635px;
  }
}
</style>
