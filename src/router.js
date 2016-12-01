import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Foo from './views/Foo.vue';

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/foo', component: Foo }
  ]
});

if (TARGET === 'web') {
  router.afterEach(() => {
    if (window.__SSR_DATA__) {
      router.getMatchedComponents().forEach((component, i) => {
        component.__SSR_DATA__ = window.__SSR_DATA__[i];
      });

      window.__SSR_DATA__ = null;
    }
  });
}

export default router;
