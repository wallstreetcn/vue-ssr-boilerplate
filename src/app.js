import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.mixin({
  created() {
    if (this.constructor.extendOptions && this.constructor.extendOptions.__SSR_DATA__) {
      Object.assign(this.$data, this.constructor.extendOptions.__SSR_DATA__);
      this.prefetched = Promise.resolve(this.constructor.extendOptions.__SSR_DATA__);
      this.constructor.extendOptions.__SSR_DATA__ = null;
    } else if (this.$options.prefetch) {
      this.prefetched = this.$options.prefetch().then(data => {
        Object.assign(this.$data, data);
        return data;
      });
    }
  }
});

const app = new Vue({
  router,
  render: h => h(App)
});

export { app, router };
