const fs = require('fs');
const express = require('express');
const { createBundleRenderer } = require('vue-server-renderer');

const bundle = fs.readFileSync('./dist/server.js', 'utf8');
const renderer = createBundleRenderer(bundle);

const indexHTML = fs.readFileSync('./dist/index.html', 'utf8').split('<div id="app"></div>');

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
    if (context.data) {
      res.write(`
        <script>
          window.__data__ = ${JSON.stringify(context.data)};
        </script>
      `);
    }

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

app.listen(8300, () => {
  console.log('server started at http://localhost:8300'); // eslint-disable-line
});
