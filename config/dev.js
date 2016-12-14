module.exports = {
  runtimeConfig: {
    settingFoo: true,
    settingBar: false
  },

  ssrPort: 8200,

  publicPath: '/assets/',
  serveStaticMountPath: '/assets',

  devServer: {
    port: 8100,
    proxy: {
      '/api/auth/': {
        target: 'http://api.example.dev',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      },

      '/api/pay/': {
        target: 'http://pay.example.dev',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
