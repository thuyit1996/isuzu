import Vue from 'vue';
import Meta from 'vue-meta';
import VueApollo from 'vue-apollo';
import { SitecoreJssPlaceholderPlugin } from '@sitecore-jss/sitecore-jss-vue';
import AppRoot from './AppRoot';
import { createRouter } from './router';
import SitecoreJssStorePlugin from './lib/SitecoreJssStorePlugin';
import GraphQLClientFactory from './lib/GraphQLClientFactory';
import config from './temp/config';
import componentFactory from './temp/componentFactory';
// import BootstrapVue from 'bootstrap-vue';
// import { CarouselPlugin } from 'bootstrap-vue';
import { CollapsePlugin } from 'bootstrap-vue';
import { CardPlugin } from 'bootstrap-vue';
import { ButtonPlugin } from 'bootstrap-vue';
import { TabsPlugin } from 'bootstrap-vue';
import { CarouselPlugin } from 'bootstrap-vue'
import vSelect from 'vue-select';
import { ModalPlugin } from 'bootstrap-vue';
import store from './store';
import Vuelidate from "vuelidate";
import constantPlugin from './util/constantPlugin'
import { debounce } from './service/delayTimeService'
import { sendError } from './service/errorService';

Vue.use(constantPlugin);
Vue.use(ModalPlugin);
Vue.use(CarouselPlugin)
Vue.component('v-select', vSelect);

Vue.use(Meta);
Vue.use(SitecoreJssStorePlugin);
Vue.use(SitecoreJssPlaceholderPlugin, { componentFactory });
Vue.use(VueApollo);
// Vue.use(BootstrapVue);
Vue.use(ButtonPlugin);
Vue.use(CardPlugin);
Vue.use(CollapsePlugin);
// Vue.use(CarouselPlugin);
Vue.use(TabsPlugin);
const VueAwesomeSwiper = require('./lib/vue-awesome-swiper/dist/ssr');
Vue.use(VueAwesomeSwiper);
Vue.use(Vuelidate);
// import VueAnimateOnScroll from 'vue-animate-onscroll';
import VueAnimateOnScroll from './lib/vue-animate-onscroll.es';
Vue.use(VueAnimateOnScroll);

import clickOutside from "./directive/clickOutside"
Vue.directive("clickoutside", clickOutside)

import './components/shared/DynamicText';
import smoothscroll from 'smoothscroll-polyfill';


// createApp is invoked by both the main and SSR entry points, so the two entry points can use the same app creation process.
export function createApp(initialState, i18n) {
  Vue.config.productionTip = false;
  let errorList = [];
  // TODO: move this to a BE service
  Vue.config.errorHandler = function (err, vm, info) {
    // INFO: keep this comment for debugging
    // console.log(err, vm, info);
    errorList.push({
      err: err.stack,
      info,
    });
    callError();
  }

  let callError = debounce(function () {
    if(errorList?.length){
      let errorToString = transformErrorToString(errorList);
      sendError('error', errorToString).then(() => errorList = []);
    }
  },1500);

  Vue.config.silent = true;

  const router = createRouter();
  const graphQLProvider = createGraphQLProvider(initialState);

  const vueOptions = {
    apolloProvider: graphQLProvider,
    router,
    mounted: () => {
      // INFO: don't want jitter before body load
      window.onerror = function(message, source, lineno, colno, error) {
        this.console.log('error handler from window', message, source, lineno, error);
        return true; // Must return true to prevent event firing
      };

      smoothscroll.polyfill();
      console.log('Build Information =', config.buildTime);
      console.log('Git Version =', config.gitVersion);
    },
    render: (createElement) => createElement(AppRoot),
  };
  // conditionally add i18n to the Vue instance if it is defined
  if (i18n) {
    vueOptions.i18n = i18n;
  }
  vueOptions.store = store;
  const app = new Vue(vueOptions);

  // if there is an initial state defined, push it into the store, where it can be referenced by interested components.
  if (initialState) {
    app.$jss.store.setSitecoreData(initialState);
  }

  return { app, router, graphQLProvider };
}

export function createGraphQLProvider(initialState) {
  const client =
    initialState && initialState.APOLLO_STATE
      ? GraphQLClientFactory(config.graphQLEndpoint, false, initialState.APOLLO_STATE)
      : GraphQLClientFactory(config.graphQLEndpoint, true);

  const provider = new VueApollo({
    defaultClient: client,
  });

  return provider;
}

function transformErrorToString(errorList = []){
  return JSON.stringify(errorList);
}