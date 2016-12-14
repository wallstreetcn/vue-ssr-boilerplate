import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from './views/Index.vue'
import Foo from './views/Foo.vue'
import HTTP404 from './views/HTTP404.vue'
import ShowErrorPage from './views/ShowErrorPage.vue'

const routes = [
  { path: '/', component: Index },
  { path: '/foo', component: Foo },
  { path: '/show-error-page', component: ShowErrorPage }
]

if (TARGET === 'web') {
  routes.push(
    // catch-all route must be placed at the last
    { path: '*', component: HTTP404 }
  )
}

export default new Router({
  mode: 'history',
  routes
})
