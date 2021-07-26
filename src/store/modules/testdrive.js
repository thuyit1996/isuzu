import { getCarModel } from '../../service/testDriveService';
import { getCarType } from '../../service/requestQuotationService';
import { GetEndPoint } from '../../service/genericService';
export default {
  namespaced: true,
  actions: {
    updatecarValue({ commit, state}, payload) {
      commit('m_updatecarvalue', { payload });
    },
    async getCarModelList({ commit, state}, payload) {
      let carModels = await getCarType();
      commit('m_getCarModelList', { carModels });
    },

    updateCarValueById({ commit, state}, payload) {
      commit('m_updateCarValueById', { payload });
    },
    updateThankUrlList({ commit, state}, payload) {
      commit('m_updateThankUrlList', { payload });
    },
  },
  getters: {
    getcarvalue(state, getters) {
      return (state.carValue.id ? state.carValue : getters.getCarList[0]) || {};
    },
    getCarList(state) {
      return state.carModelList.map(model => {
        return {
          label: model.Title,
          id: model.Id,
          carTypeId : model.CarTypeId,
          carImage: model.Image,
          carImageSm: model.ImageSm,
        };
      });
    },
    getImage(state) {
      const currentModel = state.carModelList.find(model => {
        return model.Id === state.carValue.id;
      });
      const image = currentModel
        ? currentModel.Image
        : state.carModelList[0] && state.carModelList[0].Image;
      return image ? `${GetEndPoint()}${image}` : '';
    },
    getImageSm(state) {
      const currentModel = state.carModelList.find(model => {
        return model.Id === state.carValue.id;
      });
      const imageSm = currentModel
        ? currentModel.ImageSm
        : state.carModelList[0] && state.carModelList[0].ImageSm;
      return imageSm ? `${GetEndPoint()}${imageSm}` : '';
    },
    getThankUrl(state, getters) {
      let gradeType = state.thankUrlList.find((item) => {
        if (state.carValue.carTypeId) {
          return item.GradeType == state.carValue.carTypeId;
        } else {
          return item.GradeType == getters.getCarList[0].carTypeId;
        }
      })
      return gradeType ? gradeType.ThanksUrl : "/";
    }
  },
  mutations: {
    m_updatecarvalue(state, { payload }) {
      state.carValue = payload;
    },
    m_updateCarValueById(state, { payload }) {
      let carValueId = payload;
      let updatedModel = state.carModelList.find((model) => {
        return model.CarTypeId == carValueId;
      });
      if (updatedModel) {
        state.carValue = {
          label: updatedModel.Title,
          id: updatedModel.Id,
          carTypeId: updatedModel.CarTypeId,
          carImage: updatedModel.Image,
          carImageSm: updatedModel.ImageSm,
        };
      }
    },
    m_getCarModelList(state, { carModels }) {
      state.carModelList = carModels.data.Records;
    },
    m_updateThankUrlList(state, { payload }) {
      if (Array.isArray(payload)) {
        state.thankUrlList = payload;
      }
    },
  },
  state: {
    carValue: {},
    carModelList: [],
    thankUrlList: [],
  },
}
