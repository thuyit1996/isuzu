import { get, post } from './genericService';
import qs from 'qs';

export function getDealers(payload) {
  let header = {};
  // header['Content-Type'] = 'application/json';
  return post('/dealer/getdealers', qs.stringify(payload), {
    headers: header,
  });
}

export function getSearchNearDealers(payload) {
  let header = {};
  return post('/dealer/getdealersnearbyuser', qs.stringify(payload), {
    headers: header,
  });
}

export function getDistricts() {
  return get('/dealer/getdistricts');
}

export function getProvinces() {
  return get('/dealer/getprovinces');
}

export function getDealersByDistrict(districtID, testDrivename) {
  let customUrl = function() {
    if (testDrivename) {
      let urlname = window?.location?.pathname.toLowerCase();
      let testDrive = testDrivename.toLowerCase();
      let urlList = urlname.split('/');
      let customTestDrive = testDrive
        .trim()
        .split(' ') //INFO: remove space (' ')
        .join('-'); //INFO: separated elements by '-'
      if (urlList.includes(customTestDrive)) return true;
    }
    return false;
  };
  let params = {
    districtID,
    isTestDrive: customUrl(),
  };
  return get('/dealer/getdealersbydistrict', params);
}

export function getServices() {
  return get('/dealer/getservices');
}

export function getDealerById(dealerId){
  let params = {
    dealerId
  };
  return get('/dealer/getdealerbyid', params);
}