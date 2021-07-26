import { getCarType } from '../../service/requestQuotationService';
export default {
  namespaced: true,
  actions: {
    updateQuoteToDealerData({ commit, state }, payload) {
      commit('m_updateQuoteToDealerData', { payload });
      commit('m_resetQuotationData');
    },
    updateCarModelState({ commit, state }, payload) {
      commit('m_updateCarModel', { payload });
      commit('m_resetCarGrade');
      commit('m_resetCarColor');
      commit('m_resetCarInsurance');
      commit('m_resetCarPayment');
    },
    updateCarGradeState({ commit, state }, payload) {
      commit('m_updateCarGrade', { payload });
      commit('m_resetCarColor');
      commit('m_resetCarInsurance');
      commit('m_resetCarPayment');
    },
    updateCarColorState({ commit, state }, payload) {
      commit('m_updateCarColor', { payload });
      commit('m_resetCarInsurance');
      commit('m_resetCarPayment');
    },
    updateCarInsuranceState({ commit, state }, payload) {
      commit('m_updateCarInsurance', { payload });
      // INFO: when go back and change setting, always reset the payment because price change
      // TODO: we can make it more intelligence by compare the price
      commit('m_resetCarPayment');
    },
    resetQuotationData({ commit, state }) {
      commit('m_resetQuotationData');
    },
    resetCarInsuranceState({ commit, state }) {
      commit('m_resetCarInsurance');
      commit('m_resetCarPayment');
    },
    resetCarColorState({ commit, state }) {
      commit('m_resetCarColor');
    },
    resetCarGradeState({ commit, state }) {
      commit('m_resetCarGrade');
    },
    resetCarModelState({ commit, state }) {
      commit('m_resetCarModel');
    },
    resetStepState({ commit, state }) {
      commit('m_resetStep');
    },
    updateStepStatus({ commit, state }, payload) {
      commit('m_updateStepStatus', { payload });
    },
    increaseStep({ commit, state }) {
      commit('m_increaseStep');
    },
    decreaseStep({ commit, state }) {
      commit('m_decreaseStep');
    },
    updateStep({ commit, state }, payload) {
      commit('m_updateStep', { payload });
    },
    updateCarType({ commit, state }, payload) {
      commit('m_updateCarType', { payload });
    },
    updateCarModelTab({ commit, state }, payload) {
      commit('m_updateCarModelTab', { payload });
    },
    updateIsSendFromSaveQuote({ commit, state }, payload) {
      commit('m_updateIsSendFromSaveQuote', { payload });
    },
    updateColorPagingIndex({ commit, state }, payload) {
      commit('m_updateColorPagingIndex', { payload });
    },
    updateGradePagingIndex({ commit, state }, payload) {
      commit('m_updateGradePagingIndex', { payload });
    },
    updatePaymentInfo({commit, state}, payload) {
      commit('m_updatePaymentInfo', { payload });
    },
    async getCarTypes({commit, state}, payload) {
      let carTypeData = await getCarType();
      commit('m_carTypeList', { payload: carTypeData });
    },
    updateIsSendFromRequestQuotation({ commit, state }, payload) {
      commit('m_updateIsSendFromRequestQuotation', { payload });
    },
    updateModifyingQuote({ commit, state }, payload) {
      commit('m_updateModifyingQuote', { payload });
    },
    updateCurrentQuoteId({ commit, state }, payload) {
      commit('m_updateCurrentQuoteId', { payload });
    },
    resetModifyingQuote({ commit, state }) {
      commit('m_resetModifyingQuote');
    },
    saveCarTypeData({ commit, getters, dispatch }, payload) {
      commit('m_saveCarTypeData', payload);
    },
  },
  getters: {
    getFixData(state, getters) {
      return {
        carGrade: state.carGrade,
        carModel: state.carModel,
        carType: state.carType,
        carColor: state.carColor,
        carInsurance: state.carInsurance,
        totalPrice: getters.getTotalPrice,
        allPrice: getters.getAllPrice,
        downPayment: state.downPayment,
        installmentPeriod: state.installmentPeriod,
        interestRate: state.interestRate,
        loanAmount: state.loanAmount,
        monthlyInstallments: state.monthlyInstallments,
      }
    },
    getTotalPrice(state) {
      let totalPrice = 0;

      if (state.carModel.Price && state.carModel.Price.length) {
        totalPrice += parseInt(state.carModel.Price);
      }

      if (state.carGrade.Price && state.carGrade.Price.length) {
        // INFO: use = but NOT += because when user choose car grade, the price of car model is NOT counted
        totalPrice = parseInt(state.carGrade.Price);
      }

      if (state.carColor.price && state.carColor.price.length) {
        totalPrice += parseInt(state.carColor.price);
      }
      // INFO: don't calculate inssurance at 4th steps
      // if (state.carInsurance.price && state.carInsurance.price.length) {
      //   totalPrice += parseInt(state.carInsurance.price);
      // }

      return totalPrice;
    },
    getAllPrice(state, getters) {
      return getters.getTotalPrice + parseInt(state.carInsurance.price ? state.carInsurance.price : 0);
    },
    getStepStatus(state, getters) {
      // TODO: all calculation of step status come here
      let [step1, step2, step3, step4, step5] = state.stepStatus;
      if (state.carModel.Id) {
        step2 = true;
      }
      if (state.carGrade.Id.length) {
        step3 = true;
      }
      if (state.carColor.Id.length) {
        step4 = true;
        step5 = true;
      }
      return [step1, step2, step3, step4, step5];
    },
    getReselect(state, getters) {
      let stepStatus = getters.getStepStatus;
      let isReselect = true;
      for (let stepIdx = 0; stepIdx < stepStatus.length; stepIdx++) {
        if (stepStatus[stepIdx] === false) {
          isReselect = false;
          break;
        }
      }
      return isReselect;
    },
    getcarModelTab(state, getters) {
      let carType = state.carType;
      let carTypeList = state.carTypeList;
      let carModelTab = 0;
      if (carType?.length && carTypeList?.length) {
        carTypeList.forEach((type, typeIdx) => {
          if (type.Title == carType) {
            carModelTab = typeIdx;
          }
        });
      }
      return carModelTab;
    },
  },
  mutations: {
    m_resetQuotationData(state) {
      state.carColor = {
        Id: '',
      };
      state.carGrade = {
        Id: '',
      };
      state.carModel = {};
      state.carInsurance = {
        price: '0',
        Id: '',
      };
      state.stepStatus = [true, false, false, false, false];
      state.reselect = false;
      state.step = 0;
      state.carType = '';
      state.carModelTab = 0;
      state.downPayment = 0;
      state.installmentPeriod = 0;
      state.interestRate = 0;
      state.loanAmount = 0;
      state.monthlyInstallments = 0;
    },
    m_updateQuoteToDealerData(state, { payload }) {
      state.quoteToDealerData = payload;
    },
    m_updateCarColor(state, { payload }) {
      state.carColor = payload;
    },
    m_updateCarModel(state, { payload }) {
      state.carModel = payload;
    },
    m_updateCarGrade(state, { payload }) {
      state.carGrade = payload;
    },
    m_updateCarInsurance(state, { payload }) {
      state.carInsurance = payload;
    },
    m_resetCarPayment(state) {
      state.downPayment = 0;
      state.installmentPeriod = 0;
      state.interestRate = 0;
      state.loanAmount = 0;
      state.monthlyInstallments = 0;
    },
    m_resetCarInsurance(state) {
      state.carInsurance = {
        price: '0',
        Id: '',
      };
    },
    m_resetCarColor(state) {
      state.carColor = {
        Id: '',
      };
      state.carColorPagingIndex = 0;
    },
    m_resetCarGrade(state) {
      state.carGrade = {
        Id: '',
      };
      state.carGradePagingIndex = 0;
    },
    m_resetCarModel(state) {
      state.carModel = {};
    },
    m_resetStep(state) {
      state.step = 0;
    },
    m_updateStepStatus(state, { payload }) {
      state.stepStatus[payload.step] = payload;
    },
    m_updateReSelect(state, { payload }) {
      state.reselect = payload;
    },
    m_increaseStep(state) {
      state.step += 1;
    },
    m_decreaseStep(state) {
      state.step -= 1;
    },
    m_updateStep(state, { payload }) {
      state.step = payload;
    },
    m_updateCarType(state, { payload }) {
      state.carType = payload;
    },
    m_updateCarModelTab(state, { payload }) {
      state.carModelTab = payload;
    },
    m_updateIsSendFromSaveQuote(state, { payload }) {
      state.isFromSaveQuote = payload;
    },
    m_updateColorPagingIndex(state, { payload }) {
      state.carColorPagingIndex = payload;
    },
    m_updateGradePagingIndex(state, { payload }) {
      state.carGradePagingIndex = payload;
    },
    m_updatePaymentInfo(state, { payload }) {
      let {
        downPayment,
        installmentPeriod,
        interestRate,
        loanAmount,
        monthlyInstallments,
      } = payload;
      state.downPayment = downPayment;
      state.installmentPeriod = installmentPeriod;
      state.interestRate = interestRate;
      state.loanAmount = loanAmount;
      state.monthlyInstallments = monthlyInstallments;
    },
    m_carTypeList(state, { payload }) {
      if (payload.data?.Records) {
        state.carTypeList = payload.data?.Records;
      }
    },
    m_updateIsSendFromRequestQuotation(state, { payload }) {
      state.isFromRequestQuotation = payload;
    },
    m_updateModifyingQuote(state, { payload }) {
      state.isModifyingQuote = payload;
    },
    m_updateCurrentQuoteId(state, { payload }) {
      state.currentQuoteId = payload;
    },
    m_resetModifyingQuote(state) {
      state.isModifyingQuote = false;
      state.currentQuoteId = '';
    },
    m_saveCarTypeData(state, content) {
      state.carTypeData = content.carTypeData;
    },
  },
  state: {
    quoteToDealerData: {
      carModel: {},
      carGrade: {},
      carColor: {},
      carInsurance: {},
    },
    carColor: {
      Id: '',
    },
    carGrade: {
      Id: '',
    },
    carModel: {},
    carInsurance: {
      price: '0',
      Id: '',
    },
    stepStatus: [true, false, false, false, false],
    reselect: false,
    step: 0,
    carType: '',
    carModelTab: 0,
    isFromSaveQuote: false,
    isFromRequestQuotation: false,
    carColorPagingIndex: 0,
    carGradePagingIndex: 0,
    downPayment: 0,
    installmentPeriod: 0,
    interestRate: 0,
    loanAmount: 0,
    monthlyInstallments: 0,
    carTypeList: [],
    isModifyingQuote: false,
    currentQuoteId: '',
    carTypeData: {},
  },
}
