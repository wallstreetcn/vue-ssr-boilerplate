module.exports = {
  runtimeConfig: {
    API_BASE: 'https://kitsu.io/api/edge'
  },

  ssrPort: 8200,

  publicPath: '/assets/',
  serveStaticMountPath: '/assets'

  /*
  Serve assets using CDN and Nginx:

  publicPath: 'http://cdn.example.com/assets/',
  serveStaticMountPath: undefined
  */
}
