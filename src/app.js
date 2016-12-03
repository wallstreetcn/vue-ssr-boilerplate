import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.mixin({
  created() {
    if (this.constructor.extendOptions && this.constructor.extendOptions.__INITIAL_STATE__) {
      Object.assign(this.$data, this.constructor.extendOptions.__INITIAL_STATE__);
      this.prefetched = Promise.resolve(this.constructor.extendOptions.__INITIAL_STATE__);
      this.constructor.extendOptions.__INITIAL_STATE__ = null;
    } else if (this.$options.prefetch) {
      this.prefetched = this.$options.prefetch(store).then(data => {
        Object.assign(this.$data, data);
        return data;
      });
    }
  }
});

const app = new Vue({
  router,
  store,
  render: h => h(App)
});

export { app, router, store };
