import { app, store } from './app';

if (window.__INITIAL_VUEX_STATE__) {
  store.replaceState(window.__INITIAL_VUEX_STATE__);
}

app.$mount('#app');
