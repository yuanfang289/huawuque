const path   = require('path');
const global = require('./global.var');

module.exports = {
  entry: {
    vendor: [
      'vue',
      'vue-router',
      'vuex',
      'axios',
      'babel-polyfill',
      path.join(global.rootPath, 'vendor/systemInfo/systemInfo'),
      path.join(global.rootPath, 'vendor/DANativeApi/DANativeApi'),
      path.join(global.rootPath, 'vendor/passport/passport_es6'),
    ],
    app: [
      path.join(global.srcPath, 'app')
    ],
    statistics: [
      path.join(global.srcPath, 'statistics')
    ]
  }
};
