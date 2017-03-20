import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

export default context => {
  router.push(context.url)

  const matchedComponents = router.getMatchedComponents()

  // no matched routes
  if (!matchedComponents.length) return Promise.reject({ code: '404' })

  // Call prefetch hooks on components matched by the route.
  return Promise.all(matchedComponents.map(component => {
    if (component.prefetch) {
      return component.prefetch(router.currentRoute, store).then(data => {
        component.__INITIAL_STATE__ = data
        return data
      })
    } else {
      return null
    }
  })).then(initialComponentsState => {
    context.initialComponentsState = initialComponentsState
    context.initialVuexState = store.state
    const app = new Vue(App)
    context.meta = app.$meta()
    return app
  })
}
