const global = require('./global.var');
const env    = require('../config/config').env;

const hash = env.PROD ? 'chunkhash' : 'hash';
const assetsPath = global.output.assetsPath;

// 热更新不能使用chunkhash
module.exports = {
  output: {
    path          : global.distPath,
    publicPath    : '/',    // 如果不添加此项, browserRouter不能正常使用
    filename      : `${assetsPath}/[name].[${hash}].js`,
    chunkFilename : `${assetsPath}/manifest/[name].[${hash}].js`,
  }
};
