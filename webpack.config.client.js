const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const pkgInfo = require('./package.json');

module.exports = function(options = {}) {
  const config = require('./config/' + (process.env.npm_config_config || options.config || 'default'));

  const cfg = {
    entry: {
      vendor: './src/vendor',
      client: './src/client-entry'
    },

    output: {
      path: resolve(__dirname, options.dev ? 'tmp' : 'dist'),
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
      chunkFilename: '[id].js?[chunkhash]',
      publicPath: '/assets/'
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader', 'eslint-loader']
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['latest', {
                    es2015: {
                      loose: true,
                      modules: false
                    }
                  }]
                ]
              }
            },

            'eslint-loader'
          ]
        },

        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                root: resolve(__dirname, 'src'),
                attrs: ['img:src', 'link:href']
              }
            }
          ]
        },

        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        },

        {
          test: /favicon\.png$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]?[hash]'
              }
            }
          ]
        },

        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          exclude: /favicon\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),

      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),

      new webpack.DefinePlugin({
        DEBUG: Boolean(options.dev),
        TARGET: '"web"',
        VERSION: JSON.stringify(pkgInfo.version),
        CONFIG: JSON.stringify(config.runtimeConfig)
      })
    ],

    devServer: {
      host: '0.0.0.0',
      port: config.devServer.port,
      historyApiFallback: {
        index: '/assets/'
      },

      proxy: config.devServer.proxy
    },

    resolve: {
      alias: {
        '~': resolve(__dirname, 'src')
      }
    }
  };

  if (options.ssr) {
    cfg.plugins.push(new WriteFilePlugin());
    cfg.devServer.proxy = Object.assign(cfg.devServer.proxy, {
      '/': {
        target: `http://localhost:${config.ssrPort}`,
        bypass(req) {
          if (req.url.indexOf('/assets/') === 0) {
            return req.url;
          }
        }
      }
    });
  }

  return cfg;
};
