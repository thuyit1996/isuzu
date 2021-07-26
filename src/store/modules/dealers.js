import { getDistricts, getProvinces, getDealersByDistrict } from '../../service/dealerService';
function transformData(data, type) {
  let listData = [];
  if (data && data.length) {
    data.forEach((item) => {
      listData.push({
        label: type == 'place' ? item.LocateName : item.DealerName,
        id: type == 'place' ? item.ItemId : item.ItemID,
        parent: item.Parent,
        DealerId: item.DealerId ? item.DealerId : null,
        SubItems : item.SubItems,
      });
    });
  }
  return listData;
};

export default {
  namespaced: true,
  actions: {
    updateServiceList({ commit, state}, payload) {
      commit('m_updateServiceList', { payload });
    },
    async getProvinceList({ commit, state}) {
      commit('m_getProvinceRequest');
      let provincesData = await getProvinces();
      commit('m_updateProvinceList', { provincesData });
    },
    async getDistrictList({ commit, state}) {
      commit('m_getDistrictRequest');
      let districtData = await getDistricts();
      commit('m_updateDistrictList', { districtData });
    },
    updateQuoteToDealerCurrentProvince({commit, state}, payload) {
      commit('m_updateQuoteToDealerCurrentProvince', { payload });
      commit('m_resetQuoteToDealerCurrentDistrict');
      commit('m_resetQuoteToDealerCurrentDealer');
    },
    updateQuoteToDealerCurrentDistrict({commit, state}, payload) {
      commit('m_updateQuoteToDealerCurrentDistrict', { payload });
      commit('m_resetQuoteToDealerCurrentDealer');
    },
    updateQuoteToDealerCurrentDealer({commit, state}, payload) {
      commit('m_updateQuoteToDealerCurrentDealer', { payload });
    },
    updateTestDriveCurrentProvince({commit, state}, payload) {
      commit('m_updateTestDriveCurrentProvince', { payload });
      commit('m_resetTestDriveCurrentDistrict');
      commit('m_resetTestDriveCurrentDealer');
    },
    updateTestDriveCurrentDistrict({commit, state}, payload) {
      commit('m_updateTestDriveCurrentDistrict', { payload });
      commit('m_resetTestDriveCurrentDealer');
    },
    updateTestDriveCurrentDealer({commit, state}, payload) {
      commit('m_updateTestDriveCurrentDealer', { payload });
    },

    async getDealerList({ commit, state}) {
      let dealersList = await getDealersByDistrict(state.quoteToDealerCurrentDistrict.id);
      commit('m_getDealerList', { dealersList });
    },

    async getTestDriveDealerList({ commit, state}, payload) {
      let testDriveDealersList = await getDealersByDistrict(state.testDriveCurrentDistrict.id, payload);
      commit('m_getTestDriveDealerList', { testDriveDealersList });
    },
  },
  getters: {
    getServiceList(state) {
      return state.serviceList;
    },
    getDistrictListByProvinceQuotation(state) {
      return state.districtList.filter((district) => district.parent == state.quoteToDealerCurrentProvince.id);
    },
    getDistrictListByProvinceDealer(state) {
      return state.districtList.filter((district) => district.parent == state.testDriveCurrentProvince.id);
    },
  },
  mutations: {
    m_updateServiceList(state, { payload }) {
      state.serviceList = payload;
    },
    m_getProvinceRequest(state) {
    },
    m_getDistrictRequest(state) {
    },
    m_updateProvinceList(state, { provincesData }) {
      let province = transformData(provincesData.data.records, 'place');
      state.provinceList = province;
    },
    m_updateDistrictList(state, { districtData }) {
      let district = transformData(districtData.data.records, 'place');
      state.districtList = district;
    },
    m_updateQuoteToDealerCurrentProvince(state, { payload }) {
      state.quoteToDealerCurrentProvince = payload;
    },
    m_updateQuoteToDealerCurrentDistrict(state, { payload }) {
      state.quoteToDealerCurrentDistrict = payload;
    },
    m_updateQuoteToDealerCurrentDealer(state, { payload }) {
      state.quoteToDealerCurrentDealer = payload;
    },
    m_updateTestDriveCurrentProvince(state, { payload }) {
      state.testDriveCurrentProvince = payload;
    },
    m_updateTestDriveCurrentDistrict(state, { payload }) {
      state.testDriveCurrentDistrict = payload;
    },
    m_updateTestDriveCurrentDealer(state, { payload }) {
      state.testDriveCurrentDealer = payload;
    },
    m_getDealerList(state, { dealersList }) {
      let dealers = transformData(dealersList.data.records)
      state.dealersList = dealers;
    },
    m_getTestDriveDealerList(state, { testDriveDealersList }) {
      let dealers = transformData(testDriveDealersList.data.records)
      state.testDriveDealersList = dealers;
    },
    m_resetQuoteToDealerCurrentDistrict(state) {
      state.quoteToDealerCurrentDistrict = {};
    },
    m_resetQuoteToDealerCurrentDealer(state) {
      state.quoteToDealerCurrentDealer = {};
    },
    m_resetTestDriveCurrentDistrict(state) {
      state.testDriveCurrentDistrict = {};
    },
    m_resetTestDriveCurrentDealer(state) {
      state.testDriveCurrentDealer = {};
    },
  },
  state: {
    serviceList: [],
    provinceList: [],
    districtList: [],
    dealersList: [],
    testDriveDealersList: [],
    quoteToDealerCurrentProvince: {},
    quoteToDealerCurrentDistrict: {},
    quoteToDealerCurrentDealer: {},
    testDriveCurrentProvince: {},
    testDriveCurrentDistrict: {},
    testDriveCurrentDealer: {},
  },
}
