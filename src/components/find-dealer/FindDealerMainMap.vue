<template>
  <div ref="mainMap" class="map-component__body__map">

  </div>
</template>

<script>
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
  name: 'FindDealerMainMap',
  props: {
    center: {},
    markerClusterIcon : {
      type : Object,
    },
    markerIcon : {
      type : Object,
    }
  },
  mounted() {
    this.vMap = null;
    this.markerCluster = null;
    this.mapStyle = mapStyle;
    this.markers = [];
  },
  methods: {
    initMap() {
      this.vMap = new google.maps.Map(this.$refs.mainMap, {
        zoom: this.$getConst('ZOOM_MAIN_MAP'),
        center: this.center,
        mapTypeControl: false,
        styles: this.mapStyle,
      });
    },

    moveToLocation({ lat, lng }) {
      const center = new google.maps.LatLng(lat, lng);
      this.vMap.panTo(center);
    },

    resetMarkers() {
      if(this.markerCluster){
        this.markerCluster.removeMarkers(this.markers);
      }
      for (let lp = 0; lp < this.markers.length; lp += 1) {
        this.markerCluster.removeMarker(this.markers[lp]);
      }
      this.markers = [];
    },

    generateMarkers(arrayLocations) {
      this.resetMarkers();
      arrayLocations.forEach((val) => {
        const myLatLng = {
          lat: val.lat,
          lng: val.lng,
        };
        const locations = myLatLng;
        const marker = new google.maps.Marker({
          position: locations,
          map: this.vMap,
          icon: this.markerIcon?.value?.src || 'https://www.isuzu-tis.com/_nuxt/img/3fe99bf.png',
        });

        marker.addListener('click', () => {
          this.$root.$emit('open:markerDialog', val.id);
        });
        this.markers.push(marker);
      });
       this.markerCluster = new MarkerClusterer(this.vMap, this.markers, {
        styles: [
          {
            url: this.markerClusterIcon?.value?.src,
            height: '70',
            width: '54',
            lineHeight : '70',
            textColor: '#ffffff',
            textSize: '15',
          },
        ],
      });
    this.vMap.setZoom(this.$getConst('ZOOM_MAIN_MAP'));
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/reuse-mixin.scss';

.map-component__body__map {
  height: 350px;

  @include media-breakpoint-up(lg) {
    height: auto;
  }
}
</style>