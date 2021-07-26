import { post } from './genericService';
import qs from 'qs';

export function sendError(errorType = 'error', error) {
  let url = getErrorUrl(errorType);
  let body = {
    message: error,
  }
  return post(url, qs.stringify(body));
}

function getErrorUrl(type) {
  return `/log/${type}`;
}
