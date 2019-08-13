// Temporary until we can use https://github.com/webpack/webpack-dev-server/pull/2143

const port = 10805 // dev port
module.exports = {
  chainWebpack: config => {
    config.devServer.set('inline', false)
    config.devServer.set('hot', false)
    config.externals(['vue', 'vue-router'])
  },
  filenameHashing: false,

  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      '/v1': {
        target: `http://localhost:10600/`,
        changeOrigin: true,
        // pathRewrite: {
        //   ['^' + process.env.VUE_APP_BASE_API]: ''
        // }
      }
    }
    //after: require('./mock/mock-server.js')
  }
}