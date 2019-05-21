//开发环境
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js', 'whatwg-fetch'],
  output: {
    filename: '[name].js',
    hashDigestLength: 7,
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less']
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'babel-preset-env', 'stage-3'],
            plugins: [["transform-class-properties"],["import",{ "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'common/vendor', 
          priority: 10
        },
        utils: {
          test: /\.js$/,
          chunks: 'initial',
          name: 'common/utils',
          minSize: 0
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'sight',
      template: 'public/index.html',
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.NamedModulesPlugin()
    // new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: false,
    historyApiFallback: true,
    //contentBase: path.resolve(__dirname,'src/index.js'),
    compress: true
  }
};