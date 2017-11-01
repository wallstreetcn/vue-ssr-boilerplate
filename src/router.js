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

export default function(context, beforeChange) {
  const router = new Router({ routes, context })

  // register before all other beforeChange hooks
  if (beforeChange) {
    router.on('beforeChange', beforeChange)
  }

  return router
}
