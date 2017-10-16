const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const url = require('url')
const { execSync } = require('child_process')

module.exports = (options = {}) => {
  const env = require('./config/' + (process.env.npm_config_config || options.config || 'default'))
  const version = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()

  return {
    entry: {
      vendor: './src/vendor',
      client: './src/client-entry'
    },

    output: {
      path: resolve(__dirname, options.dev ? 'tmp' : 'dist'),
      filename: options.dev ? '[name].js' : '[name].[chunkhash].js',
      chunkFilename: '[id].[chunkhash].js',
      publicPath: env.publicPath
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: ['vue-loader', 'eslint-loader']
        },

        {
          test: /\.js$/,
          include: resolve(__dirname, 'src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    'env',
                    {
                      loose: true,
                      modules: false
                    }
                  ],
                  'stage-2'
                ],
                plugins: [
                  'transform-vue-jsx'
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
          test: /favicon\.png$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]'
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
      new webpack.DefinePlugin({
        DEBUG: Boolean(options.dev),
        TARGET: '"web"',
        CONFIG: JSON.stringify(Object.assign({ version }, env.runtimeConfig))
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),

      new HtmlWebpackPlugin({
        template: 'src/index-ssr.html',
        filename: 'index-ssr.html',
        inject: false
      }),

      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),

      new VueSSRClientPlugin(),

      new WriteFilePlugin()
    ],

    resolve: {
      mainFiles: ['index', 'Index'],

      extensions: ['.js', '.json', '.client.vue', '.vue'],

      alias: {
        src: resolve(__dirname, 'src')
      }
    },

    devServer: env.devServer ? {
      host: '0.0.0.0',
      port: env.devServer.port,
      proxy: env.devServer.proxy,
      historyApiFallback: {
        index: url.parse(env.publicPath).pathname,
        disableDotRule: true
      }
    } : undefined,

    performance: {
      hints: options.dev ? false : 'warning'
    }
  }
}
