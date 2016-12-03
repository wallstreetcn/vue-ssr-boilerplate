import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Index from './views/Index.vue';
import Foo from './views/Foo.vue';

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/foo', component: Foo }
  ]
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
