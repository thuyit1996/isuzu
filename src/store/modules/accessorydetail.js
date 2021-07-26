export default {
  namespaced: true,
  actions: {
    updateAccessoryData({ commit }, payload) {
      commit('m_updateAccessoryData', payload);
    },
  },
  getters: {},
  mutations: {
    m_updateAccessoryData(state, content) {
      state.accessoryData = content;
    },
  },
  state: {
    accessoryData: {},
  },
};
