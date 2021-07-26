import axios from 'axios';
import qs from 'qs';
import { get } from './genericService';

export function getLineConfig() {
  return get('/configuration/getconfig');
}

export function getLineToken(payload) {
  return axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify(payload));
}

export function getLineUserInfo(client_id, id_token) {
  return axios.post(
    'https://api.line.me/oauth2/v2.1/verify',
    qs.stringify({
      client_id: client_id,
      id_token: id_token,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }
  );
}
