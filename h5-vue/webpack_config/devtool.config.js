const global = require('./global.var');

module.exports = {
  devtool: global.config.env.PROD ? '' : 'inline-source-map'
};
