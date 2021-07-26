
const defaultColorList = [
  '#FFFFFF', '#ffffff', '#f7f7f7', '#F7F7F7', '#FFF', '#fff', '#f5f5f5', '#F57F5F5', '#c8c8c8', '#C8C8C8'
];

export function getCarColor(colorCode) {
  return defaultColorList.includes(colorCode) ?
    {
      backgroundImage: 'linear-gradient(170deg,#f0f0ed 9%,' + colorCode + '  35%,#d6d6d6 43%,' + colorCode + '  52%,#f0f0ed)'
    }
    : {
      backgroundColor: colorCode
    }
}

export function changeActiveColor(color) {
  return defaultColorList.includes(color) ? '#f0f0ed' : color;
}
