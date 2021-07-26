import Vue from 'vue';
import Vuex from 'vuex';
import quotation from './modules/quotation';
import dealers from './modules/dealers';
import testdrive from './modules/testdrive';
import recentcampaign from './modules/recentcampaign';
import savequote from './modules/savequote';
import recentcontent from './modules/recentcontent';
import testdrivethanks from './modules/testdrivethanks';
import campaign from './modules/campaign';
import campaignthanks from './modules/campaignthank';
import accessorydetail from './modules/accessorydetail';
import VuexPersist from 'vuex-persist';
Vue.use(Vuex);

let isuzuLocalStorage = (typeof window === 'undefined') ? {
  getItem: function getItem() {},
  setItem: function setItem() {},
} : window.localStorage;

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: isuzuLocalStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

const store = new Vuex.Store({
  modules: {
    quotation,
    dealers,
    testdrive,
    recentcampaign,
    savequote,
    recentcontent,
    testdrivethanks,
    campaign,
    campaignthanks,
    accessorydetail
  },
  plugins: [vuexLocalStorage.plugin],
  // strict: process.env.NODE_ENV != 'production',
});

export default store;
