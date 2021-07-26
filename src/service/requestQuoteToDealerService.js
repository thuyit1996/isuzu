import { get, post } from './genericService';
import qs from 'qs';

export function getCarRequest() {
  let params = {
    carGradelId: 'bc9ee6a4-a645-429c-be94-d1f55e36bd69',
    colorId: '17193017-5c42-4088-98bd-683aa8361aa9'
  };
  return get('/requestquoteTodealer/getcarrequest', params);
}

export function submitRequestQuoteToDealer(payload) {
  return post('/requestquotetodealer/submitrequestquotetodealer', qs.stringify(payload))
}
