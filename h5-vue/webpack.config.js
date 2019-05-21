const webpackMerge      = require('webpack-merge');

const devtool   = require('./webpack_config/devtool.config');
const entry     = require('./webpack_config/entry.config');
const output    = require('./webpack_config/output.config');
const _module   = require('./webpack_config/module.config');
const plugins   = require('./webpack_config/plugins.config');
const resolve   = require('./webpack_config/resolve.config');
const devServer = require('./webpack_config/devServer.config');

let config = webpackMerge(
  entry,
  _module,
  plugins,
  resolve,
  devtool,
  output,
  devServer
);

module.exports = config;
