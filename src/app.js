import Vue from 'vue';
import App from './App.vue';
import ssrMixin from './libs/ssrMixin';

Vue.mixin(ssrMixin);

export default new Vue(App);
