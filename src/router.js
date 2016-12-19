import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function _import(module) {
  if (TARGET === 'web') {
    return () => System.import('./views/' + module + '.vue')
  } else {
    return require('./views/' + module + '.vue')
  }
}

const routes = [
  { path: '/', component: _import('Index') },
  { path: '/foo', component: _import('Foo') },
  { path: '/show-error-page', component: _import('ShowErrorPage') }
]

if (TARGET === 'web') {
  routes.push(
    // catch-all route must be placed at the last
    { path: '*', component: _import('HTTP404') }
  )
}

export default new Router({
  mode: 'history',
  routes
})
