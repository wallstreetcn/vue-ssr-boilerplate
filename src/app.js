import Vue from 'vue'
import App from './App.vue'
import ssrMixin from './libs/ssrMixin'
import Meta from 'vue-meta'

Vue.use(Meta)
Vue.mixin(ssrMixin)

export default new Vue(App)
