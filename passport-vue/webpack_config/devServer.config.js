const global = require('./global.var');

/**
 * @desc devServer --> proxy --> target
 */
const {
  domains,
  env
} = global.config;

const {
  mockUrl,
  devDomain,
  debugDomain
} = domains;

const {
  MOCK,
  DEV,
  DEBUG
} = env;

let proxyTarget = devDomain;
if (DEBUG) {
  proxyTarget = debugDomain;
}
if (MOCK) {
  proxyTarget = mockUrl;
}

const devServer = MOCK || DEV || DEBUG ? {
  contentBase: '/',
  publicPath: '/',
  open: true,
  historyApiFallback: {
    disableDotRule: true
  },
  hot: true,
  // host: '192.168.143.249',         //手机测试使用ip
  inline: true,
  port: 9000,

  proxy: {
    '/api': {
      target: proxyTarget,
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  }
} : {};

module.exports = {
  devServer
};
