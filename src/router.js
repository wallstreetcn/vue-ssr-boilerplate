import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Index from './views/Index.vue';
import Foo from './views/Foo.vue';
import HTTP404 from './views/HTTP404.vue';
import ShowErrorPage from './views/ShowErrorPage.vue';

const routes = [
  { path: '/', component: Index },
  { path: '/foo', component: Foo },
  { path: '/show-error-page', component: ShowErrorPage }
];

if (TARGET === 'web') {
  routes.push(
    // catch-all route must be placed at the last
    { path: '*', component: HTTP404 }
  );
}

const router = new Router({
  mode: 'history',
  routes
});

if (TARGET === 'web') {
  router.afterEach(() => {
    if (window.__INITIAL_COMPONENTS_STATE__) {
      router.getMatchedComponents().forEach((component, i) => {
        component.__INITIAL_STATE__ = window.__INITIAL_COMPONENTS_STATE__[i];
      });

      window.__INITIAL_COMPONENTS_STATE__ = null;
    }
  });
}

export default router;
