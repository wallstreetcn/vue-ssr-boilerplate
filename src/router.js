import Vue from 'vue'
import Router from 'vue-stateful-router/PathRouter'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('./views/Index'),
    meta: { ssr: true }
  },

  {
    path: '/articles/:id',
    component: () => import('./views/Article'),
    props: ({ params: { id } }) => ({ id }),
    meta: { ssr: true }
  },

  {
    path: '*',
    component: () => import('./views/404'),
    meta: { httpStatus: 404 }
  }
]

export default function(context) {
  return new Router({ routes, context })
}
