export default {
    namespaced: true,
    actions: {
        addCampaign({ commit, getters, dispatch }, payload) {
            commit('updateListRecentCampaign', payload);
        }
    },
    getters: {
        getListRecentCampagin(state) {
            return state.recentCampaignList;
        }
    },
    mutations: {
        updateListRecentCampaign(state, campaign) {
            if (!checkIdExists(state.recentCampaignList, campaign.Id)) {
                if (state.recentCampaignList.length >= 5) {
                    state.recentCampaignList.unshift(campaign);
                    state.recentCampaignList.pop();
                } else {
                    state.recentCampaignList.unshift(campaign);
                }
            }
        }
    },
    state: {
        recentCampaignList: [],
    },
}

function checkIdExists(list = [], id) {
    let exists = list.find(item => item.Id === id);
    return exists;
}
