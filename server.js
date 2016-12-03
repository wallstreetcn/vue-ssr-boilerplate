const { argv } = require('yargs');
const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');

process.chdir(__dirname);

let distDir;
if (argv.dev) {
  process.env.NODE_ENV = 'development';
  distDir = './tmp';
} else {
  process.env.NODE_ENV = 'production';
  distDir = './dist';
}

const configFile = process.env.npm_config_config || argv.config || 'default';
console.log(`loading config ${configFile}`); // eslint-disable-line
const config = require('./config/' + configFile);

const bundle = fs.readFileSync(`${distDir}/server.js`, 'utf8');
const renderer = createBundleRenderer(bundle);

const indexHTML = fs.readFileSync(`${distDir}/index.html`, 'utf8').split('<div id="app"></div>');

const app = express();
app.get('*', (req, res) => {
  const context = {
    url: req.url
  };

  const renderStream = renderer.renderToStream(context);

  renderStream.once('data', () => {
    res.write(indexHTML[0]);
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

    res.end(indexHTML[1]);
  });

  renderStream.on('error', err => {
    if (err && err.code === '404') {
      res.status(404).end('404 | Page Not Found');
    } else {
      res.status(500).end('Internal Error 500');
      console.error(`error during render : ${req.url}`); // eslint-disable-line
      console.error(err); // eslint-disable-line
    }
  });
});

app.listen(config.ssrPort, () => {
  console.log(`server started at port ${config.ssrPort}`); // eslint-disable-line
});
