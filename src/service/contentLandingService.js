import { get } from './genericService';

export function getContentLanding(pagingSize, pagingIndex, category) {
  let params = {
    pageSize: pagingSize,
    pageIndex: pagingIndex,
  };
  if (category !== 'All') {
    params.category = category;
  }
  return get('/content/getcontents', params);
}

export function getHighLightContent(cateId) {
  return get('/content/gethighlightcontent', {
    categoryId :  cateId !== 'All' ? cateId : ''
  });
}
