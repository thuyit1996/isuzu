export function getCarTypeFromModel(carModel, carTypeList) {
  let title = '';
  carTypeList.forEach(carType => {
    carType.CarModels.forEach(model => {
      if ( model.Id == carModel.Id) {
        title = carType.Title;
      }
    });
  });
  return title;
}