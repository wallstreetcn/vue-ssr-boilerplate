const { resolve } = require('path');
const webpack = require('webpack');
const pkgInfo = require('./package.json');

module.exports = function(options = {}) {
  const config = require('./config/' + (process.env.npm_config_config || options.config || 'default'));

  return {
    entry: {
      server: './src/server-entry'
    },

    target: 'node',

    output: {
      path: resolve(__dirname, options.dev ? 'tmp' : 'dist'),
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
      chunkFilename: '[id].js?[chunkhash]',
      publicPath: '/assets/',
      libraryTarget: 'commonjs2'
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
          use: 'eslint-loader'
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
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
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
      new webpack.DefinePlugin({
        DEBUG: Boolean(options.dev),
        TARGET: '"node"',
        VERSION: JSON.stringify(pkgInfo.version),
        CONFIG: JSON.stringify(config.runtimeConfig)
      })
    ],

    resolve: {
      alias: {
        '~': resolve(__dirname, 'src')
      }
    },

    externals: /^[a-z0-9].*$/
  };
};
