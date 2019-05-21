const path       = require('path');
const rootPath   = path.join(__dirname, '../');
const srcPath    = path.join(rootPath, 'src');
const appPath    = path.join(srcPath, 'app');
const assetsPath = path.join(srcPath, 'assets');

const config      = require('../config/config');

module.exports = {
  config          : config,

  rootPath        : rootPath,
  nodeModulesPath : path.join(rootPath, 'node_modules'),

  assetsPath      : assetsPath,
  srcPath         : srcPath,
  appPath         : appPath,
  apiPath         : path.join(srcPath, 'api'),
  configPath      : path.join(rootPath, 'config'),
  vendorPath      : path.join(rootPath, 'vendor'),
  componentPath   : path.join(srcPath, 'component'),
  utilsPath       : path.join(srcPath, 'utils'),
  libPath         : path.join(srcPath, 'lib'),
  imagesPath      : path.join(assetsPath, 'images'),
  fontsPath       : path.join(assetsPath, 'fonts'),
  scssPath        : path.join(assetsPath, 'scss'),

  distPath        : path.join(rootPath, 'dist'),
  output          : {
    assetsPath: 'assets'
  }
};

