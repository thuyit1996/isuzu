export default {
  namespaced: true,
  actions: {
    addTestDriveItem({ commit, getters, dispatch }, payload) {
      commit('m_updateTestDriveItem', { payload });
    },
  },
  mutations: {
    m_updateTestDriveItem(state, { payload }) {
      state.testDriveItem = payload;
    },
  },
  state: {
    testDriveItem: {},
  },
}
