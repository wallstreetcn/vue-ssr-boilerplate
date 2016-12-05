const { argv } = require('yargs');
const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');

process.chdir(__dirname);

let distDir;
if (argv.dev) {
  process.env.NODE_ENV = 'development';
  distDir = 'tmp';
} else {
  process.env.NODE_ENV = 'production';
  distDir = 'dist';
}

const configFile = process.env.npm_config_config || argv.config || 'default';
console.log(`loading config ${configFile}`); // eslint-disable-line
const config = require('./config/' + configFile);

const bundle = fs.readFileSync(`${distDir}/server.js`, 'utf8');
const renderer = createBundleRenderer(bundle);

const indexHTML = fs.readFileSync(`${distDir}/index.html`, 'utf8');
const [indexHTMLHeader, indexHTMLFooter] = indexHTML.split('<div id="app"></div>');

const app = express();

if (config.serveStaticMountPath) {
  app.use(config.serveStaticMountPath, express.static(distDir));
}

app.get('*', (req, res) => {
  const context = {
    url: req.url
  };

  const renderStream = renderer.renderToStream(context);

  renderStream.once('data', () => {
    res.write(indexHTMLHeader);
  });

  renderStream.on('data', chunk => {
    res.write(chunk);
  });

  renderStream.on('end', () => {
    res.write(`
      <script>
        window.__INITIAL_COMPONENTS_STATE__ = ${JSON.stringify(context.initialComponentsState)};
        window.__INITIAL_VUEX_STATE__ = ${JSON.stringify(context.initialVuexState)};
      </script>
    `);

    res.end(indexHTMLFooter);
  });

  renderStream.on('error', err => {
    if (err && err.code === '404') {
      // let client to render a 404 page
      res.status(404).end(indexHTML);
    } else {
      // let client to render a 500 page
      res.status(500).end(indexHTML);
      console.error(`error during render : ${req.url}`); // eslint-disable-line
      console.error(err); // eslint-disable-line
    }
  });
});

app.listen(config.ssrPort, () => {
  console.log(`server started at port ${config.ssrPort}`); // eslint-disable-line
});
