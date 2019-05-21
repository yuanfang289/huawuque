/**
 * 初始化 passport 的参数
 */
let passportParams = {
  local: "localhost:8085",
  test: "211.144.5.130:8075",
  prod: "passport2.urwork.cn"
};

/**
 * 网站链接
 *
 * @desc 不同客户端及不同环境的网站链接，一般用于跨客户端跳转
 * @type {{www: {local: string, test: string, prod: string}}}
 */
let website = {
  www: {
    local: 'http://localhost:8080',
    test: '',
    prod: 'https://www.urwork.cn'
  }
};

/**
 * 存储 localStorage 的键名
 */
let localStorageKey = 'cn.urwork';
let storageKeyName = 'cn.urwork';

/**
 * 验证规则
 */
let regx = {
  isApp: /URWork/i,
};

/**
 * 客户端scheme
 */
let scheme = {
  protocol: 'urwork://'
};

/**
 * openApp 跳转链接
 */
let openAppParams = {
  links: {
    downAppUrl: 'https://mtest.urwork.cn/goDownload',
    downWecart: 'http://a.app.qq.com/o/simple.jsp?pkgname=cn.urwork.www',
    appUrl: 'urwork://webPage',
    iosAppUrl: 'https://mtest.urwork.cn/goDownload'
  },
  getChromeScheme(chromeUrl, url) {
    return `intent://cn.urwork.www/#Intent;scheme=${chromeUrl};package=cn.urwork.www;S.chromeUrl=${encodeURIComponent(url)};end`
  },
  confirmText: '打开优客工场APP？'
};

/**
 * updateApp 更新app
 */
let updateAppParams = {
  downloadLink: {
    ios: 'https://itunes.apple.com/cn/app/you-ke-gong-chang/id1034170822?mt=8',
    android: 'http://m.urwork.cn/android/urwork_urwork.apk'
  }
};

/**
 * 具有识别性的文本
 * @desc 提取具有识别性的文本，如：网站名称、公司名称等；便于移植统一修改
 */
let feature = {
  defTitle: '',    // 默认title
};

module.exports = {
  updateAppParams,
  openAppParams,
  scheme,
  regx,
  feature,
  localStorageKey,
  storageKeyName,
  website,
  passportParams
};
