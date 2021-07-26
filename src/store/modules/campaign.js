export default {
  namespaced: true,
  actions: {
    saveCampaignData({ commit, getters, dispatch }, payload) {
      commit('m_saveCampaignData', payload);
    },
    saveCampaignRegisterData({ commit, getters, dispatch }, payload) {
      commit('m_saveCampaignRegisterData', payload);
    },
  },
  getters: {},
  mutations: {
    m_saveCampaignData(state, content) {
      state.CampaignId = content.CampaignId;
      state.CampaignNameTh = content.CampaignNameTh;
      state.CampaignName = content.CampaignName;
    },
    m_saveCampaignRegisterData(state, content) {
      state.campaignRegisterImage = content.campaignRegisterImage;
    },
  },
  state: {
    CampaignId: '',
    CampaignNameTh: '',
    CampaignName: '',
    campaignRegisterImage: {},
  },
};
