import { app, router } from './app';

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
      return component.prefetch().then(data => {
        component.__SSR_DATA__ = data;
        return data;
      });
    } else {
      return null;
    }
  })).then(data => {
    context.data = data;
    return app;
  });
};
