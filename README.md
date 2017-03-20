<p align="center">
  <img width="100"src="src/favicon.png">
</p>


# Vue SSR Boilerplate
Vue.js Server Side Rendering Boilerplate without Polluting Vuex


## Features:
* Doesn't dependent on Vuex. Putting every thing into Vuex is so ugly.
* Vuex is there, global states can still put into Vuex store.
* Customizable webpack config.
* Hot module replacement.
* Codes can run with or without SSR.
* Lazy loading routes.
* And so on.


## Environments
* Node.js >= 7 (maybe node 6 will work, haven't tested)


## Initialize
First, download or clone this project.

Then install npm packages via `npm install`.


## Development

```sh
npm run dev
```


### without SSR
http://localhost:8100

It's served by webpack-dev-server. I recommend developing in this mode at first. So you can focus on your view things, not bother with server side things.


### with SSR
http://localhost:8200

When your pages look fine, then you step into SSR mode to check the server side is OK. `--inspect` flag is on, so you can debug your server side code using Chrome ( https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js ).
But codes in `src` folder are run in node VM context, so can not be debugged.


```sh
npm run dev:brk
```

This will break on the first line of `server.js`.


## Some Example Pages
When you start the project, you can visit http://localhost:8100 or http://localhost:8200 to look around.


## How to Write Pages
Every thing is the same as developing a SPA, except one thing, you need to define a `prefetch` method in your component. `prefetch` must return a `Promise`, the resolved result will be merge into `this.$data` during rendering.

```js
{
  prefetch(route, store) {
    // return promise
  }
}
```

The first argument of `prefetch` is the [router.currentRoute](https://router.vuejs.org/en/api/router-instance.html).

The Second argument is Vuex store object. so you can set some Vuex state in `prefetch`.

And we use [vue-meta](https://github.com/declandewet/vue-meta) to handle `<title>` and `<meta>`s.

`src/views/Index.vue`:

```html
<template>
  <div class="foo">
    <p>Hello world!</p>
    <p>this.a: {{a}}</p>
    <p><router-link to="/foo">goto /foo</router-link></p>
    <p><router-link to="/page-not-exist">goto /page-not-exist</router-link></p>
    <p><router-link to="/show-error-page">goto /show-error-page</router-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0
    }
  },

  metaInfo: {
    title: 'Vue SSR Boilerplate',
    meta: [
      { vmid: 'description', name: 'description', content: 'Vue SSR Boilerplate' }
    ]
  },

  prefetch() {
    return Promise.resolve({
      a: 123
    })
  },

  // will be called on server side. check your console
  created() {
    console.log(this.a) //eslint-disable-line
  },

  // won't run on server side
  beforeMount() {
    console.log(this.a) //eslint-disable-line
  }
}
</script>
```

`src/views/Foo.vue`:

```html
<template>
  <div class="foo">
    <p>this.id: {{id}}</p>
    <p>this.$store.state.count: {{$store.state.count}}</p>
    <p>Enviroment Variables Defined by webpack.DefinePlugin:</p>
    <pre>{{config}}</pre>
    <p><router-link to="/">goto /</router-link></p>
  </div>
</template>

<style scoped>
.foo {
  color: blue
}
</style>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      id: 0,
      config: null
    }
  },

  metaInfo() {
    return {
      title: this.title,
      meta: [
        { vmid: 'description', name: 'description', content: this.description }
      ]
    }
  },

  prefetch(route, store) {
    return Promise.all([
      new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: 'title async loaded',
            description: 'description async loaded',
            id: route.params.id
          })
        })
      }),

      store.dispatch('asyncIncrement')
    ]).then(([componentData]) => componentData)
  },

  // won't run on server side
  beforeMount() {
    console.log(this.a) //eslint-disable-line

    /*
    can not be defined in data(),
    because the TARGET is different between server side (TARGET: node) and client side (TARGET: web)
    and this will cause the client-side rendered virtual DOM tree not matching server-rendered content

    can not use object-shorthand, because the tokens will be replaced by webpack.DefinePlugin
    */
    this.config = JSON.stringify({
      DEBUG: DEBUG, //eslint-disable-line
      TARGET: TARGET, //eslint-disable-line
      VERSION: VERSION, //eslint-disable-line
      CONFIG: CONFIG //eslint-disable-line
    }, null, 2)
  }
}
</script>
```

`prefetch` is only effective on components which are defined as route components. And `prefetch` is optional, you can omit it if the component don't need SSR.


## Handling Errors

### 404 Not Found
When route is not found on server side, the server will send a HTTP 404 status code, and with `dist/index.html` (yield by html-webpack-plugin from `src/index.html`) as payload. Thus, the page runs as if a SPA without SSR.

We define a catch-all routes in `src/router.js` when code is run in browser:

```js
if (TARGET === 'web') {
  routes.push(
    // catch-all route must be placed at the last
    { path: '*', component: _import('HTTP404') }
  )
}
```

So our SPA can serve a Not Found page for that request.

Your can check it at whatever URL that not exists like `http://localhost:8100/page-not-exist`


#### Why not rendering the 404 page on server side?
Because if we define the catch-all route on server side, then no 404 HTTP status code will be sent. The search engine will handle it as a normal response.

And it let you resolve a 404 in different ways, such as, in navigation guard of vue-router. Also, it simplified the server side code.


### 500 Internal Server Error
When `prefetch` return a rejected promise, the server will send a HTTP 500 status code, and response with `dist/index.html`.

In your component, you can handle it whatever you like.

`src/views/ShowErrorPage.vue`:

```html
<template>
  <div class="show-error-page">

  </div>
</template>

<script>
export default {
  data() {
    return {
      foo: 0
    }
  },

  prefetch() {
    return Promise.reject()
  },

  beforeMount() {
    this.prefetched.catch(() => {
      alert('500 Internal Server Error')
    })
  }
}
</script>
```

`this.prefetched` is the promise return by `prefetch` method. `prefetch` will be called again during initializing the component in the browser. Because the server won't preserve the failed data and rendering the page, it give you the flexibility to handle it whatever you like.

Checkout `http://localhost:8100/show-error-page` to see effects.


## Build Distribution

```sh
npm run build
```

That's it.

Files will be output to `dist` folder. In `npm run dev` mode, files are output to `tmp` folder.


## Run in Production
```sh
node server.js
```
In production, instead of serving static assets by SSR server, you should setup a nginx to serve static assets for performance reason.


## Configuration
By default, the boilerplate provides two sets of config files.
`config/dev.js` is used in development mode, `config/default.js` is used in production mode.
You can override by

```sh
npm run dev --config=YOUR-CONFIG-FILE-NAME
```

in development.

Or you can use

```sh
nm run local
```

which is an alias of

```sh
npm run dev --config=local
```

And in production, you can override `default.js` by:

```sh
node server.js --config=YOUR-CONFIG-FILE-NAME
```


### Options in config file:
* `ssrPort`: The port number that the server-side listened on.
* `publicPath`: `output.publicPath` of webpack.
* `serveStaticMountPath`: Mount path of `express.static()`.

   In production environment, it's normally the same as `publicPath` without trailing slash.
   Needn't set it if you use Nginx to serve static files.

   In development environment, `publicPath` can set to the full URL of webpack-dev-server, e.g, `http://127.0.0.1:8100/assets/`,
   and needn't set `serveStaticMountPath`.

* `devServer.port`: `devServer.port` of webpack.
* `devServer.proxy`: `devServer.proxy` of webpack.
* `runtimeConfig`: Object. Customizable runtime params that can be accessed as `CONFIG` variable in code.

We also defined some environment variables using webpack.DefinePlugin:
* `DEBUG`: `true` in development, `false` in production.
* `VERSION`: `version` in `package.json`.
* `TARGET`: `node` on server-side, `web` on client-side.
* `CONFIG`: `runtimeConfig` in config file.


## Why XXX loaders are not configured?
No dish suits all tastes. Just fork it and add your sass/stylus/typescript/... loaders. Or change to your favorite eslint or babel presets.


## Why not use renderToStream?
vue-meta has some problems with `renderToStream`. If the first chunk is too big, vue-meta can't get correct meta info of child components ( [vue-meta#44](https://github.com/declandewet/vue-meta/issues/44) ). We switched back to `renderToString` until this issue be fixed.


## Contributing
If you find bugs, please submit issues on github. Pull requests are welcome!


## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016 Jiang Fengming
