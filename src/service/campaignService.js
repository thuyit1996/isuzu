import { get, post } from './genericService';
import qs from 'qs';

export function GetCampaign(pagingSize, pagingIndex, currentTab) {
  let params = {
    pageSize: pagingSize,
    pageIndex: pagingIndex,
  };
  if (currentTab && currentTab != 'All') {
    params.campaignCategory = currentTab;
  }
  return get('/campaign/getcampaigns', params);
}

export function GetCampaignButtons() {
  return get('/campaign/getbutton');
}

export function submitCampaignRegisterTruck(payload) {
  return post('/Campaign/submitcampaigntruckregister', qs.stringify(payload))
}

export function submitCampaignRegister(payload) {
  return post('/Campaign/submitcampaignregister', qs.stringify(payload))
}

export function GetCampaignRegisterDealer(isIsp, districtID) {
  let params = {
    isIsp: isIsp,
    districtID: districtID,
  };
  return get('/dealer/getcampaigndealersbydistrict', params);
}

export function getTruckProvinces() {
  return get('/dealer/gettruckprovinces');
}
