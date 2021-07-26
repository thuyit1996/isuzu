import { get, post, lineAuthorizationRequest } from './genericService';
import qs from 'qs';

export function getCarModel() {
  return get('/testdrive/getcarmodel');
}

export function getAllCarModel() {
  return get('/carcomparison/getallcarmodel');
}
export function lineLoginRequest(params) {
  return lineAuthorizationRequest(params);
}
export function submitTestDrive(payload) {
  return post('/testdrive/submittestdrive', qs.stringify(payload))
}
