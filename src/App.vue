<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './registerGlobals'
import Vue from 'vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'

Vue.use(Meta)

export default {
  router,
  store,
  metaInfo: {
    title: 'Default Title',
    titleTemplate: '%s - Company Name'
  }
}
</script>
