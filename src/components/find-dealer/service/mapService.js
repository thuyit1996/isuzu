import * as $ from 'jquery';
export const mapService = {
  template: '',

  data: function () {
    return {
      listStyleMap: [
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
      ],
    }
  },

  methods: {
    generateMarkers(arrayLocations, map, markerIcon) {
      let infowindow;
      arrayLocations.forEach((val) => {
        const myLatLng = {
          lat: val.lat,
          lng: val.lng,
        };
        const locations = myLatLng;
        const marker = new google.maps.Marker({
          position: locations,
          map: map,
          title: val.name,
          icon: markerIcon?.value?.src || 'https://www.isuzu-tis.com/_nuxt/img/3fe99bf.png',
        });
        // this.markers.push(marker);
        marker.addListener('click', () => {
          // TODO: why need this?
          if (infowindow) {
            infowindow.close();
          }
          infowindow = new google.maps.InfoWindow({
            content: this.addInfoWindowContent(val.name, val.address, val.phone),
            maxWidth: this.$getConst('MARKER_WINDOW_WIDTH'),
          });
          infowindow.open(map, marker);
        });
      });
    },
    addInfoWindowContent(title, content, phone) {
      const contentWindow = `<div id="content"> \
        <div class="site-notice"> \
            <span class="first-heading" class="firstHeading">${title}</span> \
        </div>  \
            <div class="body-content"> \
                <p class = "address-detail"> ${content} </p> \
                <p style = "display : ${phone != 'null' ? 'initial' : 'none'}"> ${phone} </p> \
            </div> \
      </div>`;
      return contentWindow;
    },
    initMap(mapSelectorId = 'map', markerItem, markerIcon) {
      if (document.getElementById(mapSelectorId)) {
        let map = new google.maps.Map(document.getElementById(mapSelectorId), {
          zoom: this.$getConst('ZOOM_MAP_POPUP_DEALER'),
          center: { lat: markerItem.Latitude, lng: markerItem.Longitude },
          mapTypeControl: false,
          styles: this.listStyleMap,
        });
        let marker = {
          name: markerItem.DealerName,
          address: markerItem.Address,
          // INFO: phone is taken from Showroom Info
          phone: markerItem.ShowroomDealer?.PhoneNumber ? markerItem.ShowroomDealer?.PhoneNumber : '',
          lat: markerItem.Latitude,
          lng: markerItem.Longitude,
        };
        this.generateMarkers([marker], map, markerIcon);
      };
    },
    clearMap(mapSelectorId = '') {
      ('empty');
      $(`#${mapSelectorId}`).empty();
    }
  }
};