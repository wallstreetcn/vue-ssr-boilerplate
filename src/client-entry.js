import Vue from 'vue'
import App from './App'
import createStore from './store'
import createRouter from './router'

const store = createStore()
const router = createRouter({ store })

const ssrData = window.__INITIAL_STATE__ || {}
if (ssrData.storeState) store.$setState(ssrData.storeState)

router.once('load', () => new Vue({ ...App, router, store }).$mount('#app'))

router.start({
  path: ssrData.redirect || location.href,
  external: !ssrData.redirect,
  asyncData: ssrData.asyncData,
  state: ssrData.routeState
})
