export function transformDate(date) {
  let transform = new Date(date).toLocaleDateString('th-TH');
  let year = '';
  let month = '';
  if (typeof transform == 'string') {
    let splitDate = transform.split('/');
    if (splitDate.length === 3) {
      month = splitDate[1] || '';
      year = splitDate[2] || '';
    }
  }
  return {
    month,
    year
  };
};