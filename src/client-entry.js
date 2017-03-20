import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

if (window.__INITIAL_VUEX_STATE__) store.replaceState(window.__INITIAL_VUEX_STATE__)

const app = new Vue(App)
router.onReady(() => app.$mount('#app'))
