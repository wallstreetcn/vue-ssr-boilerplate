import Vue from 'vue'
import App from './App.vue'
import store from './store'

if (window.__INITIAL_VUEX_STATE__) {
  store.replaceState(window.__INITIAL_VUEX_STATE__)
}

new Vue(App).$mount('#app')
