import { get } from './genericService';

export function GetSiteMap() {
  return get('/sitemap/getsitemap');
}
