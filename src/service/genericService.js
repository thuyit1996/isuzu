import axios from 'axios';
import config from '../temp/config';

const apiHost = config.sitecoreApiHost;
const apiKey = config.sitecoreApiKey;
const apiStem = 'sitecore/api/isuzu';
const lineLoginRequestEndPoint = 'https://access.line.me/oauth2/v2.1/authorize';
axios.defaults.baseURL = apiHost;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function GetEndPoint() {
  // return process.env.NODE_ENV == 'development' ? `${apiHost}/` : '';
  return '';
}

// TODO: consider to add cache in here
export function get(action, payload = {}) {
  return axios.get(`/${apiStem}${action}?sc_apikey=${apiKey}`, {
    params: payload,
  });
}

export function post(action, payload = {}, header = {}) {
  return axios.post(`/${apiStem}${action}?sc_apikey=${apiKey}`, payload, header);
}

export function lineAuthorizationRequest(params) {
  return axios.get(lineLoginRequestEndPoint, {
    params,
  });
}

export function submitSitecoreForm(itemId, htmlPrefix, payload) {
  return axios.post(
    `/api/jss/formbuilder?fxb.FormItemId=${itemId}&fxb.HtmlPrefix=${htmlPrefix}&sc_apikey=${apiKey}`,
    payload,
    {
      withCredentials: true,
    }
  );
}
