import app from './app';
import router from './router';
import store from './store';

export default context => {
  router.push(context.url);

  const matchedComponents = router.getMatchedComponents();

  // no matched routes
  if (!matchedComponents.length) {
    return Promise.reject({ code: '404' });
  }

  // Call prefetch hooks on components matched by the route.
  return Promise.all(matchedComponents.map(component => {
    if (component.prefetch) {
      return component.prefetch(store).then(data => {
        component.__INITIAL_STATE__ = data;
        return data;
      });
    } else {
      return null;
    }
  })).then(initialComponentsState => {
    context.initialComponentsState = initialComponentsState;
    context.initialVuexState = store.state;
    return app;
  });
};
