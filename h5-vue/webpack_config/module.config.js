const path               = require('path');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const global             = require('./global.var');
const postcss            = require('./postcss.config');

const {
  env
} = global.config;

const {
  PROD,
  TEST
} = env;

const assetsPath = global.output.assetsPath;
const staticPath = global.output.staticPath;

let sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      path.join(global.scssPath, '_variables.scss'),
      path.join(global.scssPath, '_mixins.scss')
    ]
  }
};

let cssScss = [
  {
    loader: 'css-loader',
    options: {
      minimize: PROD
    }
  },
  {
    loader: "postcss-loader",
    options: {
      plugins: postcss
    }
  }
];

let transformToRequire = {
  video: 'src',
  source: 'src',
  img: 'src',
  image: 'xlink:href'
};

let vueLoaderOptions = {
  loaders: {
    scss: [
      'vue-style-loader',
      'css-loader',
      'sass-loader',
      // sassResourcesLoader
    ]
  },
  postcss,
  transformToRequire
};

let rules = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.(png|jpe?g|gif|ico)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10,
        // name: `${assetsPath}/images/[name].[hash:7].[ext]`,
        name(file) {

          // 区分UI资源，还是业务资源，输出到不同目录
          if (/\/src\/static\//.test(file)) {
            return `${staticPath}/images/[name].[hash:7].[ext]`
          } else {
            return `${assetsPath}/images/[name].[hash:7].[ext]`
          }
        }
      },
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10,
      // name: `${assetsPath}/media/[name].[hash:7].[ext]`,
      name(file) {

        // 区分UI资源，还是业务资源，输出到不同目录
        if (/\/src\/static\//.test(file)) {
          return `${staticPath}/media/[name].[hash:7].[ext]`
        } else {
          return `${assetsPath}/media/[name].[hash:7].[ext]`
        }
      }
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10,
        name: `${assetsPath}/fonts/[name].[hash:7].[ext]`
      }
    }
  }
];

if (PROD || TEST) {
  rules = [
    ...rules,

    // 解析页面，不提取样式到样式表
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      include: [
        global.appPath
      ],
      options: vueLoaderOptions
    },
    // 解析公共组件，提取样式表到文件
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: [
        /node_modules/,
        global.appPath
      ],
      options: {
        loaders: {
          scss: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: PROD
                }
              },
              'sass-loader',
              // sassResourcesLoader
            ],
            fallback: 'vue-style-loader'
          }),
        },
        postcss,
        transformToRequire
      }
    },
    {
      test: /\.css$/,
      exclude: [
        global.appPath
      ],
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: cssScss
      })
    },
    {
      test: /\.scss$/,
      exclude: [
        global.appPath
      ],
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          ...cssScss,
          {loader: "sass-loader"}
        ]
      })
    }
  ];
} else {
  rules = [
    ...rules,

    {
      test: /\.vue$/,
      loader: 'vue-loader',
      exclude: /node_modules/,
      options: vueLoaderOptions
    },
    {
      test: /\.css$/,
      use: [
        {loader: 'style-loader'},
        ...cssScss
      ]
    },
    {
      test: /\.scss$/,
      use: [
        {loader: 'style-loader'},
        ...cssScss,
        {loader: 'sass-loader'}
      ]
    }
  ];
}

module.exports = {
  module: {
    rules
  }
};
