import { get } from './genericService';

export function getAccessoryDetail(accessoryId, accessoryType = '') {
  let param = {
    id: accessoryId,
    type: accessoryType
  };
  return get('/accessories/getaccessory', param);
}