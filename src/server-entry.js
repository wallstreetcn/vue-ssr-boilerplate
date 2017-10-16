import Vue from 'vue'
import App from './App'
import createRouter from './router'
import createStore from './store'

export default context =>
  new Promise((resolve, reject) => {
    const store = context.store = createStore()
    const router = context.router = createRouter({ store })

    router.on('beforeChange', to => {
      if (to.meta.httpStatus === 404) {
        reject({ code: 404 })
        return false
      }

      if (!to.meta.ssr) {
        reject({ code: 0 })
        return false
      }
    })

    router.on('load', route => {
      const app = new Vue({ ...App, router, store })
      context.state = {
        asyncData: route.asyncData,
        storeState: store.$state
      }
      context.title = app.title
      resolve(app)
    })

    router.on('error', e => reject(e))

    router.start({
      path: context.url,
      external: true,
      context
    })
  })
