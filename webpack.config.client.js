const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pkgInfo = require('./package.json')

module.exports = function(options = {}) {
  const config = require('./config/' + (process.env.npm_config_config || options.config || 'default'))

  const cfg = {
    entry: {
      vendor: './src/vendor',
      client: './src/client-entry'
    },

    output: {
      path: resolve(__dirname, options.dev ? 'tmp' : 'dist'),
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
      chunkFilename: '[id].js?[chunkhash]',
      publicPath: config.publicPath
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                loaders: {
                  css: ExtractTextPlugin.extract({
                    loader: ['css-loader', 'postcss-loader'],
                    fallbackLoader: 'style-loader'
                  })
                }
              }
            },
            'eslint-loader']
        },

        {
          test: /\.js$/,
          include: resolve(__dirname, 'src'),
          use: ['babel-loader', 'eslint-loader']
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
      }),

      new WriteFilePlugin(),

      new ExtractTextPlugin({
        filename: '[name].css?[contenthash]',
        allChunks: true,
        disable: options.dev
      })
    ],

    resolve: {
      alias: {
        '~': resolve(__dirname, 'src')
      }
    }
  }

  if (options.dev) {
    cfg.performance = { hints: false }
  }

  if (config.devServer) {
    cfg.devServer = {
      host: '0.0.0.0',
      port: config.devServer.port,
      historyApiFallback: {
        index: config.publicPath
      },

      proxy: config.devServer.proxy
    }
  }

  return cfg
}
