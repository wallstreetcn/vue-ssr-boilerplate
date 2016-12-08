import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ssrMixin from './libs/ssrMixin';

Vue.mixin(ssrMixin);

const app = new Vue(Object.assign(App, {
  router,
  store
}));

export { app, router, store };
