'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer


const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      favicon: path.resolve('favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new PrerenderSPAPlugin({
      // 生成文件的路径，也可以与webpakc打包的一致。
      // 下面这句话非常重要！！！
      // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
      staticDir: path.join(__dirname, '../dist'),

      // 对应自己的路由文件，比如index有参数，就需要写成 /index/param1。
      routes: ['/','/commu', '/commu/detail','/about','/cont','/join','/legal','/policy',],

      // 这个很重要，如果没有配置这段，也不会进行预编译
      renderer: new Renderer({
        inject: {
          foo: 'bar'
        },
        headless: false,
        // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
       // renderAfterDocumentEvent: 'render-event'
      }),
      postProcessHtml: function (context) {
        var titles = {
          '/': '<title>UCommune - To Bring those in the Paralleled World Together</title><meta name="description" content="全球联合办公网络社交平台，优客工场致力于为创新者赋能，助力中小企业成长，营造理想的工作生活方式场景，让工作更简单，让办公更灵活"><meta name="keywords"  content="优客工场-全球联合办公,共享办公平台,众创空间,孵化器,创业,共享经济,投融资,企业服务,毛大庆,办公社区,写字楼租赁，小面积办公出租，创客空间，拎包入住，拎包入驻，一站式办公，商务中心出租，小面积写字楼出租，服务式办公室出租，精装写字楼出租，小型办公室出租，写字楼出租">',
          '/commu': '<title>Communities - UCommune</title><meta name="description" content="全球联合办公网络社交平台，优客工场致力于为创新者赋能，助力中小企业成长，营造理想的工作生活方式场景，让工作更简单，让办公更灵活"><meta name="keywords"  content="优客工场-全球联合办公,共享办公平台,众创空间,孵化器,创业,共享经济,投融资,企业服务,毛大庆,办公社区,写字楼租赁，小面积办公出租，创客空间，拎包入住，拎包入驻，一站式办公，商务中心出租，小面积写字楼出租，服务式办公室出租，精装写字楼出租，小型办公室出租，写字楼出租">',
          '/commu/detail': '<title>Communities - UCommune</title><meta name="description" content="全球联合办公网络社交平台，优客工场致力于为创新者赋能，助力中小企业成长，营造理想的工作生活方式场景，让工作更简单，让办公更灵活"><meta name="keywords"  content="优客工场-全球联合办公,共享办公平台,众创空间,孵化器,创业,共享经济,投融资,企业服务,毛大庆,办公社区,写字楼租赁，小面积办公出租，创客空间，拎包入住，拎包入驻，一站式办公，商务中心出租，小面积写字楼出租，服务式办公室出租，精装写字楼出租，小型办公室出租，写字楼出租">',
          '/about':'<title>About UCOMMUNE - UCommune</title><meta name="description" content="全球联合办公网络社交平台，优客工场致力于为创新者赋能，助力中小企业成长，营造理想的工作生活方式场景，让工作更简单，让办公更灵活"><meta name="keywords"  content="优客工场-全球联合办公,共享办公平台,众创空间,孵化器,创业,共享经济,投融资,企业服务,毛大庆,办公社区,写字楼租赁，小面积办公出租，创客空间，拎包入住，拎包入驻，一站式办公，商务中心出租，小面积写字楼出租，服务式办公室出租，精装写字楼出租，小型办公室出租，写字楼出租">',
          '/cont':'<title>Contact Us - UCommune</title><meta name="description" content="全球联合办公网络社交平台，优客工场致力于为创新者赋能，助力中小企业成长，营造理想的工作生活方式场景，让工作更简单，让办公更灵活"><meta name="keywords"  content="优客工场-全球联合办公,共享办公平台,众创空间,孵化器,创业,共享经济,投融资,企业服务,毛大庆,办公社区,写字楼租赁，小面积办公出租，创客空间，拎包入住，拎包入驻，一站式办公，商务中心出租，小面积写字楼出租，服务式办公室出租，精装写字楼出租，小型办公室出租，写字楼出租">',
          '/join':'<title>Join Us - UCommune</title><meta name="description" content="全球联合办公网络社交平台，优客工场致力于为创新者赋能，助力中小企业成长，营造理想的工作生活方式场景，让工作更简单，让办公更灵活"><meta name="keywords"  content="优客工场-全球联合办公,共享办公平台,众创空间,孵化器,创业,共享经济,投融资,企业服务,毛大庆,办公社区,写字楼租赁，小面积办公出租，创客空间，拎包入住，拎包入驻，一站式办公，商务中心出租，小面积写字楼出租，服务式办公室出租，精装写字楼出租，小型办公室出租，写字楼出租">',
          '/legal':'<title>Legal Notices - UCommune</title><meta name="description" content="全球联合办公网络社交平台，优客工场致力于为创新者赋能，助力中小企业成长，营造理想的工作生活方式场景，让工作更简单，让办公更灵活"><meta name="keywords"  content="优客工场-全球联合办公,共享办公平台,众创空间,孵化器,创业,共享经济,投融资,企业服务,毛大庆,办公社区,写字楼租赁，小面积办公出租，创客空间，拎包入住，拎包入驻，一站式办公，商务中心出租，小面积写字楼出租，服务式办公室出租，精装写字楼出租，小型办公室出租，写字楼出租">',
          '/policy':'<title>Privacy Policy - UCommune</title><meta name="description" content="全球联合办公网络社交平台，优客工场致力于为创新者赋能，助力中小企业成长，营造理想的工作生活方式场景，让工作更简单，让办公更灵活"><meta name="keywords"  content="优客工场-全球联合办公,共享办公平台,众创空间,孵化器,创业,共享经济,投融资,企业服务,毛大庆,办公社区,写字楼租赁，小面积办公出租，创客空间，拎包入住，拎包入驻，一站式办公，商务中心出租，小面积写字楼出租，服务式办公室出租，精装写字楼出租，小型办公室出租，写字楼出租">',
        }
        return context.html.replace(
          /<title>[^<]*<\/title>/i,
          titles[context.route]
        )
      }
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
