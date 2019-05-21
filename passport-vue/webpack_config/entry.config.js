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
      path.join(global.rootPath, 'vendor/systemInfo/systemInfo')
    ],
    app: [
      path.join(global.srcPath, 'app')
    ]
  }
};
