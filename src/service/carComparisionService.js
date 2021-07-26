import { get } from './genericService';

export function getCarGrade(carModelId = '') {
    const pageSize = -1;
    const pageIndex = -1;
    let params = {
        pageSize,
        pageIndex,
        carModelId,
    }
    return get('/carcomparison/cargrades', params);
}


export function getCarGradeProperties(carGradeId, pageId) {
    let params = {
        carGradeId,
        pageId,
    };
    return get('/carcomparison/getcargradeproperties', params);
};
