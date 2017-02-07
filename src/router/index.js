import Vue from 'vue'
import Router from 'vue-router'

// can't put import() here, because node will complain "SyntaxError: Unexpected token import"
const _import = require('./_import_' + TARGET)

Vue.use(Router)

const routes = [
  { path: '/', component: _import('Index') },
  { path: '/foo/:id', name: 'foo', component: _import('Foo') },
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
