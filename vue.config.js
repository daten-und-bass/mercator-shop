const appConfig = require('./src/app.config');
// const shopConfig = require('./public/shopData');

module.exports = {
  baseUrl: process.env.MERCATOR_WEB_BASEPATH,
  // baseUrl: shopConfig.mercator_config.base_url,
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
    public: `${process.env.MERCATOR_WEB_DEV_SERVER_PUBLIC_DOMAIN}:${process.env.MERCATOR_WEB_DEV_SERVER_PUBLIC_PORT}`,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 0,
      poll: 1
    },
    // hotOnly: true,
    disableHostCheck: true,
    // stats: 'verbose'
  },
};
