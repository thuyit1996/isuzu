export function customMoney(value) {
  // TODO: check this pipe again
  if (value) {
    value = Math.round(Number(value));
    let parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  return '0';
}