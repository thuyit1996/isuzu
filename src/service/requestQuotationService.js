import { get, post } from './genericService';

export function getInsurance(carGradeId = '') {
  let params = {
    carGradeId,
  }
  return get('/requestquotation/getinsurance', params);
};


export function getCarType() {
  return get('/requestquotation/getcartype');
}

export function getCarGrade(carModelId='') {
  const pageSize = -1;
  const pageIndex = -1;
  let params = {
    pageSize,
    pageIndex,
    carModelId,
  }
  return get('/requestquotation/getcargrade', params);
}

export function getCarGradeList(carModelId = '') {
  let params = {
    carModelId,
  }
  return get('/requestquotation/getcargrade', params);
}

