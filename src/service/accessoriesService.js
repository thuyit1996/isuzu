import { get } from './genericService';

export function GetAccessoriesListing(vehicleTypeId, accessoryTypeId, pageSize, pageIndex) {
  let params = {
    vehicleTypeId,
    accessoryTypeId,
    pageSize,
    pageIndex,
  };
  return get('/accessories/getaccessories', params);
}

export function GetBestSellers(vehicleTypeId) {
  let params = {
    vehicleTypeId,
  };
  return get('/accessories/getbestsellers', params);
}
