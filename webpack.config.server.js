const { resolve } = require('path')
const webpack = require('webpack')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const { execSync } = require('child_process')

module.exports = (options = {}) => {
  const env = require('./config/' + (process.env.npm_config_config || options.config || 'default'))
  const version = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()

  return {
    entry: {
      server: './src/server-entry'
    },

    target: 'node',

    output: {
      path: resolve(__dirname, options.dev ? 'tmp' : 'dist'),
      filename: options.dev ? '[name].js' : '[name].[chunkhash].js',
      chunkFilename: '[id].[chunkhash].js',
      publicPath: env.publicPath,
      libraryTarget: 'commonjs2'
    },

    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
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
        CONFIG: JSON.stringify(Object.assign({ version }, env.runtimeConfig))
      }),

      new VueSSRServerPlugin()
    ],

    resolve: {
      alias: {
        src: resolve(__dirname, 'src')
      }
    },

    externals: /^[a-z0-9].*$/,
    performance: { hints: false }
  }
}
