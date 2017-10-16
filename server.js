process.chdir(__dirname)

const { argv } = require('yargs')
const fs = require('fs')
const Koa = require('koa')
const serveStatic = require('koa-static')
const mount = require('koa-mount')
const { createBundleRenderer } = require('vue-server-renderer')

global.URL = require('url').URL

let distDir
if (argv.dev) {
  process.env.NODE_ENV = 'development'
  distDir = 'tmp'
} else {
  process.env.NODE_ENV = 'production'
  distDir = 'dist'
}

const configFile = process.env.npm_config_config || argv.config || 'default'
console.log(`loading config ${configFile}`) // eslint-disable-line
const config = require('./config/' + configFile)

const clientTemplate = fs.readFileSync(`${distDir}/index.html`, 'utf8')
const template = fs.readFileSync(`${distDir}/index-ssr.html`, 'utf8')
const serverBundle = require(`./${distDir}/vue-ssr-server-bundle.json`)
const clientManifest = require(`./${distDir}/vue-ssr-client-manifest.json`)

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

const app = new Koa()

if (config.serveStaticMountPath) {
  app.use(mount(config.serveStaticMountPath, serveStatic(distDir)))
}

app.use(ctx =>
  new Promise(resolve => {
    const context = {
      url: ctx.url,
      title: '',
      meta: ''
    }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        if (err.code === 404) {
          ctx.status = 404
        } else if (err.code !== 0) {
          ctx.status = 500

          console.error(`error during render : ${ctx.url}`) // eslint-disable-line
          console.error(err) // eslint-disable-line
        }

        // let client to render the error page
        ctx.body = clientTemplate.replace('<!--vue-ssr-state-->', `
          <script>
          window.__INITIAL_STATE__ = ${JSON.stringify({ code: err.code, redirect: err.redirect, routeState: err.routeState })}
          </script>
        `)
      } else {
        ctx.body = html
      }

      resolve()
    })
  })
)

app.listen(config.ssrPort, () => {
  console.log(`Server started at port ${config.ssrPort}`) // eslint-disable-line
})
