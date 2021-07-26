import { loadJS } from '../../../util/dom';

const markerClusterCdn = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js';

export function loadJsMap(initializeMap, key) {
  let mapApiCdn = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
  let finishLoadMap = () => {
    loadJS(
      markerClusterCdn,
      initializeMap,
      null,
      document.body
    );
  };

  loadJS(
    mapApiCdn,
    finishLoadMap,
    null,
    document.body
  );
}

export function detectLocaltion() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => reject(null),
      );
    }
  })
}

export function getProvinceList(res, defaultName) {
  let records = res?.data?.records || [];
  let data = records.map(item => {
    return {
      ...item,
      label: item.LocateName,
      id: item.ItemId
    }
  })
  // INFO : append item default province
  let defaultItem = {
    label: defaultName,
    id: defaultName
  }
  data.unshift(defaultItem);
  return data;
}

export function getDistrictList(listProvince, provinceID, defaultName) {
  let province = listProvince.find(item => item.ItemId === provinceID);
  let data = [];
  if (province) {
    data = province?.SubItems || [];
    data = data.map(item => {
      return {
        label: item.LocateName,
        id: item.ItemId,
      }
    })
  }
  // INFO : add default district
  let defaultDistrict = {
    label: defaultName,
    id: defaultName
  }
  data.unshift(defaultDistrict);
  return data;
}

export function createSearchDealerBody({
  province,
  district,
  dealerShip,
  chosenService,
  latitude,
  longitude,
  currentPos,
  pageSize,
  pageIndex,
  defaultProvinceName,
  defaultDistrictName
}) {
  let body = {};
  if (province.id) {
    body.provinceID = province.id;
  }
  if (district.id) {
    body.districtID = district.id;
  }
  if (dealerShip.length) {
    body.dealerName = dealerShip;
  }
  if (chosenService.length) {
    body.ServicesChecked = chosenService;
  }
  body.Latitude = latitude;
  body.Longitude = longitude;
  if (body.Latitude == '' || body.Latitude == undefined) {
    delete body.Latitude;
  }
  if (body.Longitude == '' || body.Longitude == undefined) {
    delete body.Longitude;
  }
  if (body.districtID == defaultDistrictName) {
    delete body.districtID;
  }
  if (body.provinceID == defaultProvinceName) {
    delete body.provinceID;
  }
  if (currentPos.lat) {
    body.Latitude = currentPos.lat;
  }
  if (currentPos.lng) {
    body.Longitude = currentPos.lng;
  }
  body.PageSize = pageSize;
  body.PageIndex = pageIndex;
  return body;
};
