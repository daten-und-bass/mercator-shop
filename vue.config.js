const appConfig = require('./src/app.config');

module.exports = {
  configureWebpack: {
    name: appConfig.title,
    resolve: {
      alias: require('./aliases.config').webpack,
    },
    watch: false,
  },
  devServer: {
    // host: '0.0.0.0',
    // port: 8080,
    // hot: true,
    // public: '192.168.99.101:8080',
    public: '192.168.178.27:8080',
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 0,
      poll: 1
    }
    // hotOnly: true,
    // disableHostCheck: true,
    // https: false
    // stats: 'verbose'
  },
};
