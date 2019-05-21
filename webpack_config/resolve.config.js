const global = require('./global.var');

module.exports = {
  resolve: {
    alias: {
      '$vue'      : 'vue/dist/vue.js',
      'config'   : global.configPath,
      'vendor'   : global.vendorPath,
      'src'      : global.srcPath,
      'router'   : global.routerPath,
      'api'      : global.apiPath,
      'component': global.componentPath,
      'utils'    : global.utilsPath,
      'app'      : global.appPath,
      'scss'     : global.scssPath,
      'static'   : global.staticPath,
      'images'   : global.imagesPath,
      'lib'      : global.libPath
    },
    extensions: ['.vue', '.js', '.css', '.scss', '.png', '.jpg', '.jpeg', '.gif', '.json'],
    modules: [global.srcPath, 'node_modules']
  }
};
