const path               = require('path');
const webpack            = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin     = require('webpack-manifest-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const global             = require('./global.var');
const {feature}          = require('../config/feature');

const {
  env
} = global.config;

const {
  PROD,
  TEST,
  MOCK,
  DEV,
  DEBUG
} = env;

const hash = PROD ? 'chunkhash' : 'hash';
const assetsPath = global.output.assetsPath;
const NODE_ENV = MOCK ? 'mock' : (DEV ? 'dev' : (DEBUG ? 'debug': (TEST ? 'test' : 'production')));

let plugins = [
  new webpack.optimize.UglifyJsPlugin({ //自动删除console.log
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: false
    },
    sourceMap: true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV)
    }
  })
];

if (TEST || PROD) {
  plugins = [
    ...plugins,

    new CleanWebpackPlugin(['dist'], {
      root: global.rootPath
    })
  ]
}

plugins = [
  ...plugins,

  new CopyWebpackPlugin([
    {
      from: 'src/app_icon.png',
      to: 'app_icon.png'
    }
  ]),

  new HtmlWebpackPlugin({
    template: path.join(global.srcPath, 'index.html'),
    title: feature.defTitle,
    inject: true,
    favicon: path.join(global.srcPath, 'favicon.ico'),
    chunksSortMode: 'dependency',
  }),
];

// 开发环境
if (!PROD && !TEST) {
  plugins = [
    ...plugins,

    // 开启全局的模块热替换(HMR)
    new webpack.HotModuleReplacementPlugin(),

    // 进程遇到错误代码将不会退出
    new webpack.NoEmitOnErrorsPlugin(),

    // 控制台输出模块命名美化
    new webpack.NamedModulesPlugin()
  ];
}

if (TEST || PROD) {
  plugins = [
    ...plugins,

    // 提取样式表到文件
    new ExtractTextPlugin({
      filename: `${assetsPath}/public.[${PROD ? 'contenthash' : 'hash'}].css`,
      allChunks: true
    })
  ];
}

plugins = [
  ...plugins,

  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: `${assetsPath}/manifest/[name].[${hash}].js`,
    minChunks: Infinity
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime',
    filename: `${assetsPath}/manifest/[name].[${hash}].js`,
  })
];

if (PROD) {
  plugins = [
    ...plugins,

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      mangle: {
        except: ['$super', '$', 'exports', 'require', 'module', '_']
      },
      compress: {
        warnings: false,
      },
    }),

    new ManifestPlugin()
  ];
}

module.exports = {
  plugins
};
