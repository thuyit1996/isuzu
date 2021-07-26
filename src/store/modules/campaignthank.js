export default {
  namespaced: true,
  actions: {
    setColorTheme({ commit, getters, dispatch }, payload) {
      commit('m_setColorThemen', payload);
    },
  },
  getters: {},
  mutations: {
    m_setColorThemen(state, isWhite) {
      state.isWhiteBackground = isWhite;
    },
  },
  state: {
    isWhiteBackground: true,
  },
};
