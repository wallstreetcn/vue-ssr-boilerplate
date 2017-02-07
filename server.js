const { argv } = require('yargs')
const fs = require('fs')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')

process.chdir(__dirname)

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

const bundle = fs.readFileSync(`${distDir}/server.js`, 'utf8')
const renderer = createBundleRenderer(bundle)

function parseIndexHtml() {
  const [
    entire,
    htmlOpen,
    htmlOpenTailAndHead,
    headCloseAndBodyOpen,
    bodyOpenTailAndContentBeforeApp,
    contentAfterAppAndHtmlClose
  ] = fs.readFileSync(`${distDir}/index.html`, 'utf8').match(/^([\s\S]+?<html)([\s\S]+?)(<\/head>[\s\S]*?<body)([\s\S]+?)<div id="?app"?><\/div>([\s\S]+)$/)

  return {
    entire,
    htmlOpen,
    htmlOpenTailAndHead,
    headCloseAndBodyOpen,
    bodyOpenTailAndContentBeforeApp,
    contentAfterAppAndHtmlClose
  }
}

const indexHtml = parseIndexHtml()

const app = express()

if (config.serveStaticMountPath) {
  app.use(config.serveStaticMountPath, express.static(distDir))
}

app.get('*', (req, res) => {
  const context = {
    url: req.url
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.code === '404') {
        // let client to render a 404 page
        res.status(404).end(indexHtml.entire)
      } else {
        // let client to render a 500 page
        res.status(500).end(indexHtml.entire)
        console.error(`error during render : ${req.url}`) // eslint-disable-line
        console.error(err) // eslint-disable-line
      }

      return
    }

    const { title, htmlAttrs, bodyAttrs, link, style, script, noscript, meta } = context.meta.inject()

    res.write(`
      ${indexHtml.htmlOpen} data-vue-meta-server-rendered ${htmlAttrs.text()} ${indexHtml.htmlOpenTailAndHead}
      ${meta.text()}
      ${title.text()}
      ${link.text()}
      ${style.text()}
      ${script.text()}
      ${noscript.text()}
      ${indexHtml.headCloseAndBodyOpen} ${bodyAttrs.text()} ${indexHtml.bodyOpenTailAndContentBeforeApp}
      ${html}
      <script>
        window.__INITIAL_COMPONENTS_STATE__ = ${JSON.stringify(context.initialComponentsState)}
        window.__INITIAL_VUEX_STATE__ = ${JSON.stringify(context.initialVuexState)}
      </script>
      ${indexHtml.contentAfterAppAndHtmlClose}
    `)

    res.end()
  })
})

app.listen(config.ssrPort, () => {
  console.log(`server started at port ${config.ssrPort}`) // eslint-disable-line
})
