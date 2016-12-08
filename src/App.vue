<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from './router';
import store from './store';

export default {
  router,
  store
};
</script>
