module.exports = {
  runtimeConfig: {
    API_BASE: 'https://hacker-news.firebaseio.com/v0/'
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
