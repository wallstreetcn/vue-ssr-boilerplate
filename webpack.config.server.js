const { resolve } = require('path')
const webpack = require('webpack')
const pkgInfo = require('./package.json')

module.exports = (options = {}) => {
  const config = require('./config/' + (process.env.npm_config_config || options.config || 'default'))

  return {
    entry: {
      server: './src/server-entry'
    },

    target: 'node',

    output: {
      path: resolve(__dirname, options.dev ? 'tmp' : 'dist'),
      filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
      chunkFilename: '[id].js?[chunkhash]',
      publicPath: config.publicPath,
      libraryTarget: 'commonjs2'
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
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

    externals: /^[a-z0-9].*$/,
    performance: { hints: false }
  }
}
