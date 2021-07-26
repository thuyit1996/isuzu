import { getHighLightContent } from '../../service/contentLandingService';
export default {
    namespaced: true,
    actions: {
        addContent({ commit, getters, dispatch }, payload) {
            commit('updateListRecentContent', payload);
        },
        getHighLightContent({ commit, getters, dispatch }, payload) {
            commit('updateIsLoading', true);  
            getHighLightContent(payload).then((response) => {
                commit('updateIsLoading',false) 
                commit('getHighLightContent',  response?.data?.Contents || {})

            });
        },
    },
    getters: {
        getListRecentCampagin(state) {
            return state.recentContentList;
        }
    },
    mutations: {
        updateListRecentContent(state, content) {
            if (!checkIdExists(state.recentContentList, content.Id)) {
                if (state.recentContentList.length >= 5) {
                    state.recentContentList.unshift(content);
                    state.recentContentList.pop();
                } else {
                    state.recentContentList.unshift(content);
                }
            }
        },
        getHighLightContent(state, payload) {
            state.highLightContents = payload;
        },

        updateIsLoading (state, payload){
            state.isLoading = payload;
        }
    },
    state: {
        recentContentList: [],
        highLightContents: {},
        isLoading : false
    },
}
function checkIdExists(list = [], id) {
    let exists = list.find(item => item.Id === id);
    return exists;
}
