import { get, post } from '../../service/genericService';

const colorCollection = [
  { colorCode: '#f5f5f5', className: 'everest-pearl-white' },
  { colorCode: '#f2f2f2', className: 'siberian-white' },
  { colorCode: '#e2e1e1', className: 'arctic-silver' },
  { colorCode: '#2c2c2c', className: 'bavarian-black-mica' },
  { colorCode: '#860f28', className: 'etna-red' },
  { colorCode: '#206ec4', className: 'polynesian-blue' },
  { colorCode: '#df5223', className: 'valencia-topas-metallic' },
  { colorCode: '#717579', className: 'zermatt-money' },
];

const fallBackClassName = 'everest-pearl-white';

export function findClassByColor(colorCode) {
  return colorCollection.find(item => item.colorCode === colorCode)?.className || fallBackClassName;
}


export function getCarGrade(carModelId = '', type = '', tabIndex = 0) {
  let params = {
    carModelId,
    type,
    tabIndex,
  }
  return get('/carcomparison/getcargrade', params);
}

// "#d6d6d6"
// "#a8a8a8"
// "#2c2c2c"
// "#206ec4"
// "#df5223"