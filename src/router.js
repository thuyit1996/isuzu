import Vue from 'vue';
import Router from 'vue-router';
import RouteHandler from './RouteHandler.vue';

Vue.use(Router);

// support languages in the URL prefix
// e.g. /da-DK/path, or /en/path, or /path
export const routePatterns = [
  // INFO: we don't use multiple language, so change the route pattern to fix 404 routing
  // '/:lang([a-z]{2}-[A-Z]{2})/:sitecoreRoute*',
  // '/:lang([a-z]{2})/:sitecoreRoute*',
  '/:sitecoreRoute*',
];

export function createRouter() {
  // create an instance of vue-router and configure routes to use the RouteHandler component
  const router = new Router({
    mode: 'history',
    routes: routePatterns.map((routePattern) => {
      return {
        path: routePattern,
        component: RouteHandler,
        props: (route) => ({
          route,
        }),
      };
    }),
  });
  return router;
}
